// The submissions database — SQLite, opened once and shared.
//
// The submissions table doubles as the send queue: `status` is the job
// state and the worker in queue.js claims rows from it. One store, no
// second piece of infrastructure, and a submission is on disk before the
// visitor gets their confirmation — so nothing is ever lost to an SMTP
// outage or a restart.

import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';

import { config } from './config.js';

fs.mkdirSync(path.dirname(config.dbPath), { recursive: true });

export const db = new Database(config.dbPath);

// WAL: a reader never blocks the writer, and the file survives an
// ungraceful kill. NORMAL is the matching durability level for WAL.
db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');
db.pragma('foreign_keys = ON');
// Wait rather than throwing SQLITE_BUSY if the worker and a request collide.
db.pragma('busy_timeout = 5000');

// — schema —
// Migrations are applied in order and gated by PRAGMA user_version, so
// adding one is: append to the array, never edit an existing entry.
const MIGRATIONS = [
  // 1 — submissions + the durable rate-limit log
  () => {
    db.exec(`
      CREATE TABLE submissions (
        id              INTEGER PRIMARY KEY,
        created_at      TEXT    NOT NULL,          -- ISO-8601 UTC
        name            TEXT    NOT NULL,
        email           TEXT    NOT NULL,
        phone           TEXT,
        message         TEXT    NOT NULL,
        ip              TEXT,                      -- public IP of the submitter
        user_agent      TEXT,
        status          TEXT    NOT NULL,          -- queued|sending|sent|failed|held (+ awaiting|expired, migration 2)
        attempts        INTEGER NOT NULL DEFAULT 0,
        next_attempt_at INTEGER NOT NULL DEFAULT 0,-- epoch ms
        last_error      TEXT,
        sent_at         TEXT,
        spam_score      INTEGER NOT NULL DEFAULT 0,
        spam_reasons    TEXT,                      -- comma-separated reason keys
        fill_ms         INTEGER                    -- how long the form took to fill
      );

      CREATE INDEX idx_submissions_pending ON submissions(status, next_attempt_at);
      CREATE INDEX idx_submissions_created ON submissions(created_at);
      CREATE INDEX idx_submissions_email   ON submissions(email);

      CREATE TABLE rate_events (
        id         INTEGER PRIMARY KEY,
        scope      TEXT    NOT NULL,               -- 'ip' | 'email'
        key        TEXT    NOT NULL,
        created_at INTEGER NOT NULL                -- epoch ms
      );

      CREATE INDEX idx_rate_events ON rate_events(scope, key, created_at);
    `);
  },

  // 2 — email confirmation (double opt-in)
  //
  // A new submission is stored with confirmed_at NULL. The worker's first job
  // for it is the CONFIRMATION email to the visitor (status queued ->
  // awaiting); only the click on its link sets confirmed_at and re-queues
  // the row, and only then does the worker send the enquiry to the business.
  // Rows that already existed predate confirmation — they were real
  // deliveries — so they are marked confirmed, or the worker would mail
  // their senders a confirmation for a message already delivered.
  () => {
    db.exec(`
      ALTER TABLE submissions ADD COLUMN lang               TEXT NOT NULL DEFAULT 'EN';
      ALTER TABLE submissions ADD COLUMN confirm_token_hash TEXT;    -- sha256 of the emailed token
      ALTER TABLE submissions ADD COLUMN confirm_expires_at INTEGER; -- epoch ms
      ALTER TABLE submissions ADD COLUMN confirm_sent_at    TEXT;
      ALTER TABLE submissions ADD COLUMN confirmed_at       TEXT;

      UPDATE submissions SET confirmed_at = created_at;

      CREATE UNIQUE INDEX idx_submissions_confirm ON submissions(confirm_token_hash);
    `);
  },
];

function migrate() {
  const current = db.pragma('user_version', { simple: true });
  for (let v = current; v < MIGRATIONS.length; v++) {
    db.transaction(() => {
      MIGRATIONS[v]();
      db.pragma(`user_version = ${v + 1}`);
    })();
    console.log(`[contact] database migrated to version ${v + 1}`);
  }
}

migrate();

// — statements —
// Prepared once; better-sqlite3 caches the compiled plan.
const statements = {
  insert: db.prepare(`
    INSERT INTO submissions
      (created_at, name, email, phone, message, ip, user_agent,
       status, next_attempt_at, spam_score, spam_reasons, fill_ms, lang)
    VALUES
      (@created_at, @name, @email, @phone, @message, @ip, @user_agent,
       @status, @next_attempt_at, @spam_score, @spam_reasons, @fill_ms, @lang)
  `),

  // Claim one due job. The status check inside the UPDATE is what makes
  // this safe: two workers racing, only one sees a row still 'queued'.
  claim: db.prepare(`
    UPDATE submissions
       SET status = 'sending'
     WHERE id = (
       SELECT id FROM submissions
        WHERE status = 'queued' AND next_attempt_at <= @now
        ORDER BY id
        LIMIT 1
     )
       AND status = 'queued'
    RETURNING *
  `),

  // — confirmation —
  // The token is minted by the worker at the moment the email goes out, so
  // a retry after an SMTP failure simply mints a fresh one. Only its hash is
  // stored: a copy of the database cannot be used to confirm anything.
  setConfirmToken: db.prepare(`
    UPDATE submissions
       SET confirm_token_hash = @hash, confirm_expires_at = @expires_at
     WHERE id = @id
  `),

  // The confirmation email is out: wait for the click. The attempt counter
  // is reset, because it counts SMTP failures for the NEXT send — the
  // enquiry itself — which has not been tried yet.
  markAwaiting: db.prepare(`
    UPDATE submissions
       SET status = 'awaiting', confirm_sent_at = @sent_at,
           attempts = 0, next_attempt_at = 0, last_error = NULL
     WHERE id = @id
  `),

  findByConfirmToken: db.prepare(`
    SELECT id, status, lang, confirmed_at, confirm_expires_at
      FROM submissions WHERE confirm_token_hash = @hash
  `),

  // The click. Guarded on status, so a double click (or two tabs) confirms
  // once and queues the enquiry once.
  confirm: db.prepare(`
    UPDATE submissions
       SET status = 'queued', confirmed_at = @confirmed_at,
           attempts = 0, next_attempt_at = 0, last_error = NULL
     WHERE id = @id AND status = 'awaiting' AND confirmed_at IS NULL
  `),

  // Links nobody clicked in time. Swept hourly and checked again on click.
  expireUnconfirmed: db.prepare(`
    UPDATE submissions SET status = 'expired'
     WHERE status = 'awaiting' AND confirmed_at IS NULL AND confirm_expires_at < @now
  `),

  markExpired: db.prepare(`UPDATE submissions SET status = 'expired' WHERE id = @id AND status = 'awaiting'`),

  markSent: db.prepare(`
    UPDATE submissions
       SET status = 'sent', sent_at = @sent_at, attempts = attempts + 1, last_error = NULL
     WHERE id = @id
  `),

  markRetry: db.prepare(`
    UPDATE submissions
       SET status = 'queued', attempts = attempts + 1,
           next_attempt_at = @next_attempt_at, last_error = @last_error
     WHERE id = @id
  `),

  markFailed: db.prepare(`
    UPDATE submissions
       SET status = 'failed', attempts = attempts + 1, last_error = @last_error
     WHERE id = @id
  `),

  // Anything left mid-send by a crash goes back on the queue at boot.
  requeueStuck: db.prepare(`
    UPDATE submissions SET status = 'queued' WHERE status = 'sending'
  `),

  countByStatus: db.prepare(`
    SELECT status, COUNT(*) AS n FROM submissions GROUP BY status
  `),

  duplicateSince: db.prepare(`
    SELECT COUNT(*) AS n FROM submissions
     WHERE email = @email AND message = @message AND created_at >= @since
  `),

  recordRateEvent: db.prepare(`
    INSERT INTO rate_events (scope, key, created_at) VALUES (@scope, @key, @created_at)
  `),

  countRateEvents: db.prepare(`
    SELECT COUNT(*) AS n FROM rate_events
     WHERE scope = @scope AND key = @key AND created_at > @since
  `),

  pruneRateEvents: db.prepare(`DELETE FROM rate_events WHERE created_at < @before`),

  pruneSubmissions: db.prepare(`
    DELETE FROM submissions WHERE created_at < @before AND status IN ('sent', 'failed', 'held', 'expired')
  `),
};

export { statements };

export function insertSubmission(row) {
  const info = statements.insert.run({
    created_at: new Date().toISOString(),
    next_attempt_at: 0,
    phone: null,
    ip: null,
    user_agent: null,
    spam_score: 0,
    spam_reasons: null,
    fill_ms: null,
    lang: 'EN',
    ...row,
  });
  return Number(info.lastInsertRowid);
}

export function queueStats() {
  const out = { queued: 0, sending: 0, awaiting: 0, sent: 0, failed: 0, held: 0, expired: 0 };
  for (const { status, n } of statements.countByStatus.all()) out[status] = n;
  return out;
}

export function closeDb() {
  try {
    db.close();
  } catch {
    // Already closed, or closed by a second shutdown signal — nothing to do.
  }
}
