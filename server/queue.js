// The send worker.
//
// It polls the submissions table for rows in 'queued' whose next_attempt_at
// has come, claims one at a time (the claim is an atomic UPDATE ... WHERE
// status = 'queued', so a second worker cannot take the same row), sends it,
// and either marks it sent or schedules a retry with backoff.
//
// Failure is never data loss: the submission is on disk before the visitor
// sees their confirmation, and a row that exhausts its attempts is marked
// 'failed' and stays there to be read or re-queued by hand.

import { config } from './config.js';
import { statements } from './db.js';
import { sendEnquiry } from './mailer.js';

let timer = null;
let running = false;   // a tick is in flight
let stopped = false;

function backoffFor(attempts) {
  const table = config.queue.backoffMs;
  return table[Math.min(attempts, table.length - 1)];
}

async function drain() {
  // Keep going while there is due work, so a backlog clears in one tick
  // rather than one row per poll interval.
  for (;;) {
    if (stopped) return;

    const [row] = statements.claim.all({ now: Date.now() });
    if (!row) return;

    try {
      await sendEnquiry(row);
      statements.markSent.run({ id: row.id, sent_at: new Date().toISOString() });
      console.log(`[contact] #${row.id} sent to the operations inbox`);
    } catch (err) {
      const attempts = row.attempts + 1;
      const message = String(err?.message ?? err).slice(0, 500);

      if (attempts >= config.queue.maxAttempts) {
        statements.markFailed.run({ id: row.id, last_error: message });
        console.error(`[contact] #${row.id} gave up after ${attempts} attempts: ${message}`);
      } else {
        const wait = backoffFor(row.attempts);
        statements.markRetry.run({
          id: row.id,
          next_attempt_at: Date.now() + wait,
          last_error: message,
        });
        console.warn(`[contact] #${row.id} attempt ${attempts} failed (${message}) — retrying in ${Math.round(wait / 1000)}s`);
      }
    }
  }
}

async function tick() {
  if (running || stopped) return;
  running = true;
  try {
    await drain();
  } catch (err) {
    // A bug in the loop itself must not kill the interval.
    console.error('[contact] queue tick failed:', err);
  } finally {
    running = false;
  }
}

export function startWorker() {
  // A crash can leave rows marked 'sending' with nobody sending them.
  const { changes } = statements.requeueStuck.run();
  if (changes) console.log(`[contact] re-queued ${changes} submission(s) left mid-send`);

  timer = setInterval(tick, config.queue.pollMs);
  timer.unref(); // never hold the process open on its own
  tick();        // and don't wait a whole interval for the first pass
}

// Lets a queued submission go out immediately instead of waiting for the
// next poll — called right after a submission is accepted.
export function wakeWorker() {
  if (!stopped) setImmediate(tick);
}

export async function stopWorker() {
  stopped = true;
  if (timer) clearInterval(timer);
  // Let an in-flight send finish so it is not retried needlessly.
  for (let i = 0; running && i < 100; i++) {
    await new Promise((r) => setTimeout(r, 100));
  }
}
