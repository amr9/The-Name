// The Name — contact form service.
//
// One endpoint: POST /api/contact. It re-validates the submission against
// the same rules the browser used (/shared/contactForm.js — imported, not
// copied), then emails it to MAIL_TO over SMTP.
//
// Run it with `npm start` in this folder; see .env for the config it
// expects and README.md for deployment notes.

import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

import { contactFields, honeypotField, validateContact } from '../shared/contactForm.js';
import { site } from '../src/data/site.js';

const PORT = Number(process.env.PORT) || 8787;

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

// Fail at boot rather than silently accepting submissions we cannot deliver.
for (const key of ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'MAIL_FROM']) {
  if (!process.env[key]) {
    console.error(`[contact] missing required env var ${key} — see server/.env`);
    process.exit(1);
  }
}

const MAIL_TO = process.env.MAIL_TO || site.email;

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE !== 'false',
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

// — rate limiting —
// In-memory and per-process, which is all a single-instance contact form
// needs. Run more than one instance and each gets its own budget; move to a
// shared store (Redis) before that matters.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map(); // ip -> number[] of timestamps

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

// Drop cold entries periodically so the map cannot grow without bound.
// unref() so this timer never holds the process open on shutdown.
setInterval(() => {
  const now = Date.now();
  for (const [ip, times] of hits) {
    if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(ip);
  }
}, WINDOW_MS).unref();

// — messages for the error keys /shared/contactForm.js returns —
// The browser shows its own translated copy; these are for anyone calling
// the API directly.
const ERROR_TEXT = {
  required: 'This field is required.',
  email: 'That email address does not look right.',
  tooLong: 'That value is too long.',
};

const app = express();
app.set('trust proxy', 1); // behind a reverse proxy, so req.ip is the real client
app.use(express.json({ limit: '32kb' }));
app.use(
  cors({
    origin(origin, cb) {
      // No Origin header = a non-browser client (curl, uptime check). The
      // browser is the only thing CORS protects, so let those through.
      if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
      cb(new Error(`origin not allowed: ${origin}`));
    },
    methods: ['POST', 'OPTIONS'],
  })
);

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.post('/api/contact', async (req, res) => {
  if (rateLimited(req.ip)) {
    return res.status(429).json({ ok: false, error: 'Too many messages from this address. Try again later.' });
  }

  const body = req.body ?? {};

  // Honeypot: a real visitor never sees this field, so a value here is a
  // bot. Answer 200 so it has nothing to learn from the difference.
  if (typeof body[honeypotField] === 'string' && body[honeypotField].trim()) {
    console.warn('[contact] honeypot tripped, dropping submission');
    return res.json({ ok: true });
  }

  const values = Object.fromEntries(
    contactFields.map((f) => [f.id, typeof body[f.id] === 'string' ? body[f.id].trim() : ''])
  );

  const invalid = validateContact(values);
  if (Object.keys(invalid).length > 0) {
    const fields = Object.fromEntries(
      Object.entries(invalid).map(([id, key]) => [id, ERROR_TEXT[key] ?? key])
    );
    return res.status(400).json({ ok: false, error: 'Some fields need fixing.', fields });
  }

  try {
    await transport.sendMail({
      from: process.env.MAIL_FROM,
      to: MAIL_TO,
      // So hitting reply in the mail client answers the visitor directly.
      replyTo: `${values.name} <${values.email}>`,
      subject: `Website enquiry — ${values.name}`,
      text: [
        `Name:    ${values.name}`,
        `Email:   ${values.email}`,
        `Phone:   ${values.phone || '—'}`,
        '',
        values.message,
        '',
        `— sent from the ${site.name} website contact form`,
      ].join('\n'),
    });
  } catch (err) {
    // The visitor gets a generic failure; the detail stays in the logs.
    console.error('[contact] SMTP send failed:', err);
    return res.status(502).json({ ok: false, error: 'Could not send the message right now.' });
  }

  console.log(`[contact] sent enquiry from ${values.email}`);
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

app.listen(PORT, () => {
  console.log(`[contact] listening on :${PORT} — delivering to ${MAIL_TO}`);
});
