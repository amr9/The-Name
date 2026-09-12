// Read the collected submissions from the command line.
//
//   node scripts/submissions.js                 latest 20
//   node scripts/submissions.js --status held   only held ones
//   node scripts/submissions.js --limit 100 --full     whole message bodies
//   node scripts/submissions.js --retry 42      put a failed one back on the queue
//   node scripts/submissions.js --stats         counts by status
//
// In Docker:  docker compose exec contact node scripts/submissions.js
//
// A CLI rather than an HTTP endpoint on purpose: the submissions hold
// personal data and IP addresses, and an admin route is one leaked token
// away from exposing them. This needs a shell on the box.

import { db, queueStats } from '../db.js';

const args = process.argv.slice(2);
const flag = (name, fallback = null) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1] ?? true;
};
const has = (name) => args.includes(`--${name}`);

if (has('stats')) {
  console.table(queueStats());
  process.exit(0);
}

const retryId = flag('retry');
if (retryId) {
  const { changes } = db
    .prepare(`UPDATE submissions SET status = 'queued', attempts = 0, next_attempt_at = 0 WHERE id = ?`)
    .run(Number(retryId));
  console.log(changes ? `#${retryId} re-queued — the worker picks it up within a poll.` : `No submission #${retryId}.`);
  process.exit(0);
}

const status = flag('status');
const limit = Number(flag('limit', 20));
const full = has('full');

const rows = db
  .prepare(
    `SELECT id, created_at, name, email, phone, ip, status, attempts,
            spam_score, spam_reasons, last_error, message
       FROM submissions
      ${status ? 'WHERE status = @status' : ''}
      ORDER BY id DESC
      LIMIT @limit`
  )
  .all(status ? { status, limit } : { limit });

if (rows.length === 0) {
  console.log(status ? `No submissions with status '${status}'.` : 'No submissions yet.');
  process.exit(0);
}

for (const r of rows) {
  console.log(`\n#${r.id}  ${r.created_at}  [${r.status}]${r.attempts ? ` attempts:${r.attempts}` : ''}`);
  console.log(`  ${r.name} <${r.email}>${r.phone ? `  ${r.phone}` : ''}`);
  console.log(`  ip: ${r.ip ?? 'unknown'}${r.spam_score ? `   spam: ${r.spam_score} (${r.spam_reasons})` : ''}`);
  if (r.last_error) console.log(`  last error: ${r.last_error}`);
  const body = full ? r.message : r.message.replace(/\s+/g, ' ').slice(0, 160);
  console.log(`  ${body}${!full && r.message.length > 160 ? '…' : ''}`);
}

console.log(`\n${rows.length} submission(s). ${JSON.stringify(queueStats())}`);
