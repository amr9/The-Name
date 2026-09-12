// Is this address one we could actually reply to?
//
// Three gates, cheapest first:
//   1. syntax   — stricter than the shared regex, which only catches typos
//   2. blocklist— throwaway providers, where a reply is guaranteed to die
//   3. MX       — does the domain publish anywhere to receive mail at all
//
// Deliberately fails OPEN on infrastructure trouble: a DNS timeout or
// SERVFAIL lets the address through. A resolver having a bad minute must
// never cost a real enquiry. It only fails CLOSED on a definitive answer —
// the domain does not exist, or it has no mail route.

import dns from 'node:dns/promises';

import { config } from './config.js';
import { disposableDomains } from './disposableDomains.js';

// RFC 5321's practical limits. Anything longer is not a real mailbox.
const MAX_LOCAL = 64;
const MAX_TOTAL = 254;

// Deliberately conservative: unquoted local part, dot-separated labels,
// a TLD of at least two letters. Quoted-string local parts ("a b"@x.com)
// are legal and vanishingly rare; rejecting them is the right trade here.
const LOCAL = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/;
const DOMAIN = /^(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/;

// Domains are looked up far more often than they change — one MX lookup
// per domain per hour is plenty, and it keeps a burst of submissions from
// one company off the resolver.
const CACHE_TTL_MS = 60 * 60 * 1000;
// Capped so a flood of one-off domains cannot grow it without bound. Map
// keeps insertion order, so the oldest key is the one to drop.
const CACHE_MAX = 5000;
const cache = new Map(); // domain -> { deliverable: boolean, at: number }

function remember(domain, deliverable) {
  if (cache.size >= CACHE_MAX) cache.delete(cache.keys().next().value);
  cache.set(domain, { deliverable, at: Date.now() });
}

function parse(email) {
  const at = email.lastIndexOf('@');
  if (at < 1 || at === email.length - 1) return null;
  return { local: email.slice(0, at), domain: email.slice(at + 1).toLowerCase() };
}

// dns.promises has no timeout of its own, so race it.
function withTimeout(promise, ms) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error('dns timeout')), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

// A domain with no MX record still accepts mail at its A/AAAA address
// (RFC 5321 §5.1, the "implicit MX" rule), so check that before rejecting.
async function hasMailRoute(domain) {
  try {
    const mx = await withTimeout(dns.resolveMx(domain), config.email.dnsTimeoutMs);
    if (mx.length > 0 && mx.some((r) => r.exchange && r.exchange !== '.')) return true;
  } catch (err) {
    // ENOTFOUND/ENODATA are real answers: no such record. Anything else
    // (timeout, SERVFAIL, EAI_AGAIN) is our problem, not the address's.
    if (err.code !== 'ENOTFOUND' && err.code !== 'ENODATA') {
      console.warn(`[contact] MX lookup for ${domain} inconclusive (${err.code ?? err.message}) — allowing`);
      return true;
    }
  }

  try {
    await withTimeout(dns.resolve(domain), config.email.dnsTimeoutMs);
    return true; // implicit MX
  } catch (err) {
    if (err.code !== 'ENOTFOUND' && err.code !== 'ENODATA') {
      console.warn(`[contact] A lookup for ${domain} inconclusive (${err.code ?? err.message}) — allowing`);
      return true;
    }
    return false;
  }
}

// Returns { ok: true } or { ok: false, key } where key is one the frontend
// translates (contact.errors.*).
export async function checkEmail(email) {
  const value = String(email ?? '').trim();

  if (value.length > MAX_TOTAL) return { ok: false, key: 'tooLong' };

  const parts = parse(value);
  if (!parts) return { ok: false, key: 'email' };

  const { local, domain } = parts;
  if (local.length > MAX_LOCAL) return { ok: false, key: 'email' };
  if (!LOCAL.test(local) || !DOMAIN.test(domain)) return { ok: false, key: 'email' };

  if (disposableDomains.has(domain)) return { ok: false, key: 'emailDisposable' };

  const hit = cache.get(domain);
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) {
    return hit.deliverable ? { ok: true } : { ok: false, key: 'emailUndeliverable' };
  }

  const deliverable = await hasMailRoute(domain);
  remember(domain, deliverable);

  return deliverable ? { ok: true } : { ok: false, key: 'emailUndeliverable' };
}
