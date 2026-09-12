// The Name — contact form service.
//
// One endpoint: POST /api/contact. What happens to a submission:
//
//   rate limit (IP) → honeypot → shared validation → email verification
//   → rate limit (address) → spam scoring → WRITE TO DATABASE → respond
//
// The response is sent as soon as the row is on disk; a background worker
// (queue.js) does the SMTP send and retries it with backoff. So a slow or
// broken mail server costs the visitor nothing, and no enquiry is ever lost
// to one — it is in the database either way.
//
// Run it with `npm start` in this folder; see .env for the config it
// expects and README.md for deployment notes.

import express from 'express';
import cors from 'cors';

import { contactFields, honeypotField, timingField, validateContact } from '../shared/contactForm.js';
import { config } from './config.js';
import { insertSubmission, queueStats, closeDb } from './db.js';
import { checkEmail } from './emailCheck.js';
import { record, overLimit, tooManyAttempts, pruneOldData } from './rateLimit.js';
import { scoreSubmission } from './spam.js';
import { mailTo, verifyTransport, closeMailer } from './mailer.js';
import { startWorker, wakeWorker, stopWorker } from './queue.js';

// — messages for the error keys the validators return —
// The browser has its own translated copy of each (contact.errors.*, in all
// four languages) and prefers it; these are for anyone calling the API
// directly, and are the reason the response carries both.
const ERROR_TEXT = {
  required: 'This field is required.',
  email: 'That email address does not look right.',
  emailUndeliverable: 'That email domain cannot receive mail — check it for a typo.',
  emailDisposable: 'Please use an address we can actually reply to.',
  tooLong: 'That value is too long.',
};

const app = express();
app.set('trust proxy', 1); // behind a reverse proxy, so req.ip is the real client
app.disable('x-powered-by');
app.use(express.json({ limit: '32kb' }));
app.use(
  cors({
    origin(origin, cb) {
      // No Origin header = a non-browser client (curl, uptime check). The
      // browser is the only thing CORS protects, so let those through.
      if (!origin || config.allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error(`origin not allowed: ${origin}`));
    },
    methods: ['POST', 'OPTIONS'],
  })
);

// Both shapes of a field error in one place: keys for the site to
// translate, English text for everyone else.
function fieldErrors(keys) {
  return {
    fieldKeys: keys,
    fields: Object.fromEntries(
      Object.entries(keys).map(([id, key]) => [id, ERROR_TEXT[key] ?? key])
    ),
  };
}

app.get('/api/health', (req, res) => res.json({ ok: true, queue: queueStats() }));

app.post('/api/contact', async (req, res) => {
  const body = req.body ?? {};
  const ip = req.ip ?? null;

  // — 1. the abuse ceiling —
  // Counted before anything else, so a flood of junk costs the sender their
  // budget rather than costing us DNS lookups and database writes. This is
  // the request limit, not the message limit; the stricter one is at step 5,
  // where we know the submission is real.
  if (tooManyAttempts(ip)) {
    return res.status(429).json({ ok: false, key: 'rateLimited', error: 'Too many requests. Try again later.' });
  }

  // — 2. honeypot —
  // A real visitor never sees this field. Keep the submission (it is
  // evidence, and the retention prune clears it), answer 200 so the bot has
  // nothing to learn from the difference.
  if (typeof body[honeypotField] === 'string' && body[honeypotField].trim()) {
    insertSubmission({
      name: String(body.name ?? '').slice(0, 120),
      email: String(body.email ?? '').slice(0, 200),
      phone: String(body.phone ?? '').slice(0, 40) || null,
      message: String(body.message ?? '').slice(0, 4000),
      ip,
      user_agent: req.get('user-agent')?.slice(0, 300) ?? null,
      status: 'held',
      spam_score: 99,
      spam_reasons: 'honeypot',
    });
    console.warn('[contact] honeypot tripped, holding submission');
    return res.json({ ok: true });
  }

  const values = Object.fromEntries(
    contactFields.map((f) => [f.id, typeof body[f.id] === 'string' ? body[f.id].trim() : ''])
  );

  // — 3. the same rules the browser applied —
  const invalid = validateContact(values);
  if (Object.keys(invalid).length > 0) {
    return res.status(400).json({ ok: false, error: 'Some fields need fixing.', ...fieldErrors(invalid) });
  }

  // — 4. can that address actually receive a reply —
  const email = await checkEmail(values.email);
  if (!email.ok) {
    return res
      .status(400)
      .json({ ok: false, error: 'Some fields need fixing.', ...fieldErrors({ email: email.key }) });
  }

  // — 5. the message limit —
  // Read-only: the budget is spent below, when a submission is actually
  // stored. So a rejected attempt never uses up a real visitor's allowance.
  const emailKey = values.email.toLowerCase();
  if (overLimit('ip', ip) || overLimit('email', emailKey)) {
    return res
      .status(429)
      .json({ ok: false, key: 'rateLimited', error: 'Too many messages from this address. Try again later.' });
  }

  // — 6. content heuristics —
  const fillMs = Number(body[timingField]);
  const spam = scoreSubmission(values, { fillMs });

  const id = insertSubmission({
    name: values.name,
    email: values.email,
    phone: values.phone || null,
    message: values.message,
    ip,
    user_agent: req.get('user-agent')?.slice(0, 300) ?? null,
    // Held submissions are stored and flagged, never emailed. The sender
    // gets the same 200 either way — a false positive is still readable in
    // the database, and a bot learns nothing.
    status: spam.held ? 'held' : 'queued',
    spam_score: spam.score,
    spam_reasons: spam.reasons.join(',') || null,
    fill_ms: Number.isFinite(fillMs) ? fillMs : null,
  });

  // Spend the message budget now that one is actually stored. Held ones
  // count too — a bot should not get an unlimited allowance just because
  // its output is being caught.
  record('ip', ip);
  record('email', emailKey);

  if (spam.held) {
    console.warn(`[contact] #${id} held — score ${spam.score} (${spam.reasons.join(', ')})`);
  } else {
    console.log(`[contact] #${id} queued from ${values.email}`);
    wakeWorker(); // don't wait for the next poll
  }

  res.json({ ok: true });
});

// CORS rejections arrive here as errors; answer 403 instead of a 500 stack.
app.use((err, req, res, next) => {
  if (err?.message?.startsWith('origin not allowed')) {
    return res.status(403).json({ ok: false, error: 'Origin not allowed.' });
  }
  console.error('[contact] unhandled error:', err);
  res.status(500).json({ ok: false, error: 'Something went wrong.' });
});

// — start up —
startWorker();
verifyTransport(); // logs the result; failures are not fatal, the queue holds

const pruneTimer = setInterval(pruneOldData, 60 * 60 * 1000);
pruneTimer.unref();
pruneOldData();

const server = app.listen(config.port, () => {
  const stats = queueStats();
  console.log(`[contact] listening on :${config.port} — delivering to ${mailTo}`);
  console.log(`[contact] database ${config.dbPath} — ${stats.queued} queued, ${stats.sent} sent, ${stats.held} held`);
});

// Finish what is in flight before the process goes away, so a deploy never
// leaves a row stuck mid-send.
async function shutdown(signal) {
  console.log(`[contact] ${signal} — shutting down`);
  server.close();
  await stopWorker();
  closeMailer();
  closeDb();
  process.exit(0);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
