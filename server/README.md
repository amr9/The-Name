# Contact form service

A single-purpose Node service behind `/contact`. It accepts the enquiry
form, verifies it, **stores it in SQLite**, and a background worker emails
it to `MAIL_TO` over SMTP with retries.

The visitor's confirmation is sent as soon as the submission is on disk. A
slow or broken mail server therefore costs them nothing, and no enquiry is
ever lost to one — it is in the database either way.

## Run it

```sh
cd server
npm install
# fill in the SMTP credentials in .env
npm start               # listens on :8787
```

`npm run dev` is the same with `--watch`. Node 20.12+ is required — the
scripts use the built-in `--env-file-if-exists`, so there is no dotenv
dependency, and the file is optional (in Docker the config comes from the
environment instead).

With the service running, `npm run dev` at the repo root proxies
`/api/contact` to it (see `vite.config.js`), so the form works end to end
locally. Put the dev origin in `ALLOWED_ORIGINS` — `http://localhost:5173` —
because a browser sends an `Origin` header on POST even same-origin.

## What happens to a submission

```
POST /api/contact
  1. abuse ceiling      requests per IP (RATE_ATTEMPTS_PER_IP, default 20/15min)
  2. honeypot           a filled `company` field → stored as held, 200 returned
  3. shared validation  the same rules the browser ran (/shared/contactForm.js)
  4. email verification syntax → disposable blocklist → MX lookup
  5. message limit      stored messages per IP and per address
  6. spam scoring       content heuristics; at/above SPAM_THRESHOLD → held
  7. INSERT             status 'queued' (or 'held'), then 200 to the visitor
                ↓
  queue worker  claims a due row, sends it, marks it 'sent'
                on failure: retry at 1m, 5m, 15m, 1h, 6h, then 'failed'
```

Nothing on the request path waits for SMTP.

## Files

| File | What it is |
|---|---|
| `index.js` | The HTTP layer: routes, middleware, and the order above |
| `config.js` | Every environment variable, read and validated once at boot |
| `db.js` | SQLite connection, schema migrations, prepared statements |
| `queue.js` | The send worker — claim, send, retry with backoff |
| `mailer.js` | The SMTP transport and the message it builds |
| `emailCheck.js` | Syntax, disposable blocklist, MX lookup |
| `disposableDomains.js` | The blocklist itself — append to it as needed |
| `spam.js` | Content heuristics and the score |
| `rateLimit.js` | The three budgets, counted in the database |
| `scripts/submissions.js` | Read the collected submissions from a shell |

## The database

One SQLite file (`DB_PATH`, default `./data/contact.db`; `/app/data/contact.db`
in Docker, on a named volume). It is both the record of every submission and
the send queue — `status` is the job state, so there is no second piece of
infrastructure to run or to lose messages between.

`submissions` holds, per enquiry: `created_at`, the four form fields, the
submitter's **public IP** and user agent, `status`
(`queued`/`sending`/`sent`/`failed`/`held`), `attempts`, `next_attempt_at`,
`last_error`, `sent_at`, `spam_score`, `spam_reasons` and `fill_ms`.

`rate_events` is the durable rate-limit log, pruned automatically.

### Reading it

```sh
npm run submissions                  # latest 20
npm run submissions -- --status held # just the held ones
npm run submissions -- --stats       # counts by status
npm run submissions -- --retry 42    # put a failed one back on the queue
npm run submissions -- --limit 100 --full

docker compose exec contact node scripts/submissions.js --status held
```

A CLI rather than an admin HTTP route on purpose: these rows hold personal
data and IP addresses, and an endpoint is one leaked token away from
exposing them. Reading them needs a shell on the box.

### Retention

Submissions older than `RETENTION_DAYS` (default 365) are deleted hourly.
They contain personal data and an IP address, so keeping them forever is a
liability rather than an asset — shorten it if you have no reason to keep
a year.

## API

### `POST /api/contact`

```json
{ "name": "…", "email": "…", "phone": "…", "message": "…", "fillMs": 18342 }
```

`fillMs` is how long the form was on screen before it was submitted. The
browser sends it; a submission faster than `MIN_FILL_MS` scores as a bot.

| Status | Body | Meaning |
|---|---|---|
| 200 | `{ "ok": true }` | Stored and queued — or held (honeypot/spam), which looks identical from outside |
| 400 | `{ "ok": false, "error": "…", "fieldKeys": {…}, "fields": {…} }` | Validation failed |
| 403 | `{ "ok": false, "error": "Origin not allowed." }` | Origin missing from `ALLOWED_ORIGINS` |
| 429 | `{ "ok": false, "key": "rateLimited", "error": "…" }` | Over one of the three budgets |
| 500 | `{ "ok": false, "error": "…" }` | Unexpected |

A 400 carries the same errors twice: `fieldKeys` maps a field to a key
(`required`, `email`, `emailUndeliverable`, `emailDisposable`, `tooLong`)
for the site to translate into the visitor's language, and `fields` maps it
to English text for anyone calling the API directly. The site prefers
`fieldKeys`; both always appear.

There is no longer a 502 — SMTP failures happen after the response, and are
retried.

### `GET /api/health`

`{ "ok": true, "queue": { "queued": 0, "sending": 0, "sent": 12, "failed": 0, "held": 3 } }`

## Email verification

Three gates, cheapest first:

1. **Syntax** — stricter than the shared regex (which only catches the
   obvious typo): RFC-shaped local part, real domain labels, length caps.
2. **Disposable blocklist** — `disposableDomains.js`. A reply to one of
   these is guaranteed to die.
3. **MX lookup** — does the domain publish a mail route at all. Falls back
   to A/AAAA for the implicit-MX rule, and the result is cached per domain
   for an hour.

It **fails open** on infrastructure trouble: a DNS timeout or SERVFAIL lets
the address through, because a resolver having a bad minute must never cost
a real enquiry. It fails closed only on a definitive answer — the domain
does not exist, or has no mail route.

This proves an address *can* receive mail. It does not prove the mailbox
exists; only a reply does.

## What it does about abuse

- **Three rate budgets**, all in the database so a restart does not reset
  them: requests per IP (the abuse ceiling), stored messages per IP, and
  stored messages per address. Keeping them apart is deliberate — a visitor
  who mistypes their address five times is not locked out, while a bot
  posting five real-looking enquiries is.
- **Honeypot** — a field no human sees (`company`). Anything in it and the
  submission is stored as held and answered with a 200, so the sender
  learns nothing.
- **Timing** — the form reports how long it was open. Filled in under
  `MIN_FILL_MS` (3s) is a strong bot signal. A *missing* timer is only a
  nudge, since a cached page can lose it.
- **Content heuristics** (`spam.js`) — links, link markup, sales
  vocabulary, shouting, a URL in the name field, a duplicate of a message
  already sent today. At or above `SPAM_THRESHOLD` the submission is
  **held**: stored and flagged, never emailed, and the sender still gets a
  200. A false positive is a delay, not a lost enquiry — read them with
  `npm run submissions -- --status held`.
- **Header injection** — CR/LF is stripped from every value that reaches a
  mail header.
- **32 kB body cap** and a per-field length cap from
  `/shared/contactForm.js`.

Rules match on behaviour, never on who appears to be sending: Arabic is a
first-class language on this site, and no rule scores a language or a
nationality.

## Configuration

| Variable | Default | What it does |
|---|---|---|
| `SMTP_HOST` `SMTP_USER` `SMTP_PASS` `MAIL_FROM` | — | **Required**; the service exits at boot without them |
| `SMTP_PORT` / `SMTP_SECURE` | 465 / true | |
| `MAIL_TO` | `site.email` | Where enquiries land |
| `PORT` | 8787 | |
| `ALLOWED_ORIGINS` | — | Comma-separated; must include the site's own origin |
| `DB_PATH` | `./data/contact.db` | The SQLite file |
| `RATE_WINDOW_MS` | 15 min | The window all three budgets count in |
| `RATE_PER_IP` / `RATE_PER_EMAIL` | 5 / 3 | Stored messages per window |
| `RATE_ATTEMPTS_PER_IP` | 20 | Requests per window, accepted or not |
| `SPAM_THRESHOLD` | 5 | Score at which a submission is held |
| `MIN_FILL_MS` | 3000 | Faster than this scores as a bot |
| `DNS_TIMEOUT_MS` | 3000 | Per MX/A lookup |
| `QUEUE_POLL_MS` | 5000 | How often the worker looks for work |
| `QUEUE_MAX_ATTEMPTS` | 5 | Then the row is marked `failed` |
| `RETENTION_DAYS` | 365 | Then submissions are deleted |

## Validation is shared, not copied

`/shared/contactForm.js` holds the field list, the rules, the honeypot name
and the timing field name, and is imported by both this service and the
React form. Change a rule there and both sides move together. That is why
this folder imports from outside itself (`../shared`, `../src/data/site.js`)
— deploy from the repo root, not by copying `server/` on its own.

## Deploying

Any host that runs a long-lived Node process (a VPS behind nginx, Railway,
Fly, Render). Two shapes work:

1. **Same domain** — reverse-proxy `/api/` on the site's domain to this
   service. The frontend needs no configuration; `/api/contact` just works.
2. **Separate domain** — set `VITE_CONTACT_ENDPOINT` in the site's build
   environment to the full URL, and add the site's origin to
   `ALLOWED_ORIGINS` here.

In both shapes `ALLOWED_ORIGINS` must list the site's own origin: browsers
send `Origin` on POST same-origin too.

The database makes this **stateful** — give it a real disk, not a container
filesystem, and back that path up. The rate limiter and the queue are also
single-instance: run one process per database file. Two instances would each
apply their own budgets, and while the queue claim is atomic, SQLite is not
built to be shared across hosts.

### In Docker

`server/Dockerfile` packages this service; build it from the **repo root**,
not from this folder, for the reason above:

```sh
docker build -f server/Dockerfile -t thename-contact .
```

`docker compose up` at the root runs it behind nginx in shape 1 — see the
Docker section of `STRUCTURE.md`. The image runs `node index.js` rather than
`npm start`, so it takes its config from the container environment and needs
no `.env` file, and the database lives on the named volume `contact-data`
(mounted at `/app/data`). That volume is the thing to back up.

Terminate TLS at the proxy and keep `trust proxy` on so the rate limiter and
the stored IP are the real client's, not the proxy's.
