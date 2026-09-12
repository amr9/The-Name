// Rate limiting, in the database rather than in a Map.
//
// The old in-memory counter reset on every deploy and every crash, which is
// exactly when a flood is cheapest to run. This one survives both.
//
// Three budgets, because "a request" and "a message" are not the same thing:
//
//   ip-attempt  every request, accepted or not. The abuse ceiling — it is
//               what stops someone hammering the endpoint with junk.
//   ip          only submissions we actually stored. The real message limit.
//   email       the same, per address, so rotating IPs buys nothing.
//
// Keeping them apart is what lets a visitor mistype their address five times
// without being locked out, while a bot posting five real-looking enquiries
// still is.

import { config } from './config.js';
import { statements } from './db.js';

const MAX = {
  'ip-attempt': () => config.rate.attemptsPerIp,
  ip: () => config.rate.perIp,
  email: () => config.rate.perEmail,
};

// Writes one event against a budget.
export function record(scope, key) {
  if (!key) return;
  statements.recordRateEvent.run({ scope, key, created_at: Date.now() });
}

// Reads a budget without spending it.
export function overLimit(scope, key) {
  if (!key) return false;
  const { n } = statements.countRateEvents.get({
    scope,
    key,
    since: Date.now() - config.rate.windowMs,
  });
  return n > MAX[scope]();
}

// The abuse ceiling: spend first, then check, so the request being rejected
// still counts against whoever sent it.
export function tooManyAttempts(ip) {
  record('ip-attempt', ip);
  return overLimit('ip-attempt', ip);
}

// Old counters and expired personal data. Runs on an interval from
// index.js; both deletes are cheap and indexed.
export function pruneOldData() {
  const rates = statements.pruneRateEvents.run({ before: Date.now() - config.rate.windowMs });
  const subs = statements.pruneSubmissions.run({
    before: new Date(Date.now() - config.retentionMs).toISOString(),
  });

  if (rates.changes || subs.changes) {
    console.log(`[contact] pruned ${rates.changes} rate events, ${subs.changes} expired submissions`);
  }
}
