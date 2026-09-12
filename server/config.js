// Every knob the service reads from the environment, in one place.
//
// Required vars are checked here at import time so a misconfigured deploy
// dies at boot with a clear message rather than at the first submission.

import path from 'node:path';

const REQUIRED = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'MAIL_FROM'];

for (const key of REQUIRED) {
  if (!process.env[key]) {
    console.error(`[contact] missing required env var ${key} — see server/.env`);
    process.exit(1);
  }
}

const num = (v, fallback) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

const MINUTE = 60 * 1000;
const DAY = 24 * 60 * MINUTE;

export const config = {
  port: num(process.env.PORT, 8787),

  // Comma-separated origins allowed to post from a browser. Note that a
  // browser sends Origin even on a same-origin POST, so the site's own
  // origin belongs in here too.
  allowedOrigins: (process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),

  smtp: {
    host: process.env.SMTP_HOST,
    port: num(process.env.SMTP_PORT, 465),
    secure: process.env.SMTP_SECURE !== 'false',
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.MAIL_FROM,
  },

  // Absolute so it does not depend on the working directory the process
  // happens to start in. In Docker this points at the mounted volume.
  dbPath: path.resolve(process.env.DB_PATH || './data/contact.db'),

  queue: {
    // How often the worker looks for something to send.
    pollMs: num(process.env.QUEUE_POLL_MS, 5 * 1000),
    // Give up after this many SMTP failures for one submission.
    maxAttempts: num(process.env.QUEUE_MAX_ATTEMPTS, 5),
    // Backoff between attempts, indexed by attempt number. The submission
    // stays in the database either way, so a give-up is never a data loss.
    backoffMs: [MINUTE, 5 * MINUTE, 15 * MINUTE, 60 * MINUTE, 6 * 60 * MINUTE],
  },

  rate: {
    windowMs: num(process.env.RATE_WINDOW_MS, 15 * MINUTE),
    // Stored submissions per IP / per address. These are message limits.
    perIp: num(process.env.RATE_PER_IP, 5),
    perEmail: num(process.env.RATE_PER_EMAIL, 3),
    // Requests per IP, accepted or not — the abuse ceiling. Higher than the
    // message limit on purpose: a visitor fixing a typo four times over is
    // not an attacker, and must not be locked out for it.
    attemptsPerIp: num(process.env.RATE_ATTEMPTS_PER_IP, 20),
  },

  spam: {
    // Score at or above this is held for review instead of emailed.
    threshold: num(process.env.SPAM_THRESHOLD, 5),
    // A form filled in faster than this was almost certainly not typed.
    minFillMs: num(process.env.MIN_FILL_MS, 3000),
  },

  email: {
    // How long to wait on the MX lookup before letting the address through.
    dnsTimeoutMs: num(process.env.DNS_TIMEOUT_MS, 3000),
  },

  // Submissions older than this are deleted. They hold personal data and an
  // IP address, so they should not be kept forever by default.
  retentionMs: num(process.env.RETENTION_DAYS, 365) * DAY,

  mailTo: process.env.MAIL_TO || '',
};
