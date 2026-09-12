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
        status          TEXT    NOT NULL,          -- queued|sending|sent|failed|held
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
       status, next_attempt_at, spam_score, spam_reasons, fill_ms)
    VALUES
      (@created_at, @name, @email, @phone, @message, @ip, @user_agent,
       @status, @next_attempt_at, @spam_score, @spam_reasons, @fill_ms)
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
    DELETE FROM submissions WHERE created_at < @before AND status IN ('sent', 'failed', 'held')
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
    ...row,
  });
  return Number(info.lastInsertRowid);
}

export function queueStats() {
  const out = { queued: 0, sending: 0, sent: 0, failed: 0, held: 0 };
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
