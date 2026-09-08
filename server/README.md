# Contact form service

A single-purpose Node service behind `/contact`. It accepts the enquiry
form, re-validates it, and emails it to `MAIL_TO` over SMTP.

## Run it

```sh
cd server
npm install
# fill in the SMTP credentials in .env
npm start               # listens on :8787
```

`npm run dev` is the same with `--watch`. Node 20.6+ is required — the
scripts use the built-in `--env-file`, so there is no dotenv dependency.

With the service running, `npm run dev` at the repo root proxies
`/api/contact` to it (see `vite.config.js`), so the form works end to end
locally with no CORS involved.

## API

### `POST /api/contact`

```json
{ "name": "…", "email": "…", "phone": "…", "message": "…" }
```

| Status | Body | Meaning |
|---|---|---|
| 200 | `{ "ok": true }` | Sent (also returned to a tripped honeypot, which is dropped) |
| 400 | `{ "ok": false, "error": "…", "fields": { "email": "…" } }` | Validation failed; `fields` is per-field |
| 403 | `{ "ok": false, "error": "Origin not allowed." }` | Origin missing from `ALLOWED_ORIGINS` |
| 429 | `{ "ok": false, "error": "…" }` | More than 5 submissions from one IP in 15 minutes |
| 502 | `{ "ok": false, "error": "…" }` | SMTP refused the message |

### `GET /api/health`

`{ "ok": true }` — for uptime checks.

## What it does about abuse

- **Rate limit** — 5 per IP per 15 minutes, in-memory. It is per-process, so
  running more than one instance multiplies the budget; move to a shared
  store before scaling out.
- **Honeypot** — a field no human sees (`company`). Anything in it and the
  submission is dropped with a 200, so the sender learns nothing.
- **CORS allowlist** — only origins in `ALLOWED_ORIGINS` may post from a
  browser. Requests with no `Origin` header (curl, uptime checks) pass.
- **32 kB body cap** and a per-field length cap from
  `/shared/contactForm.js`.

## Validation is shared, not copied

`/shared/contactForm.js` holds the field list and the rules, and is imported
by both this service and the React form. Change a rule there and both sides
move together. That is why this folder imports from outside itself
(`../shared`, `../src/data/site.js`) — deploy from the repo root, not by
copying `server/` on its own.

## Deploying

Any host that runs a long-lived Node process (a VPS behind nginx, Railway,
Fly, Render). Two shapes work:

1. **Same domain** — reverse-proxy `/api/` on the site's domain to this
   service. The frontend needs no configuration; `/api/contact` just works.
2. **Separate domain** — set `VITE_CONTACT_ENDPOINT` in the site's build
   environment to the full URL, and add the site's origin to
   `ALLOWED_ORIGINS` here.

Terminate TLS at the proxy and keep `trust proxy` on so the rate limiter
sees real client IPs rather than the proxy's.
