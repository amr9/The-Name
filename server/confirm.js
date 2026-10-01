// Email confirmation (double opt-in): the token, the link, and the click.
//
// Why: the form already checks that an address is well-formed and that its
// domain accepts mail (emailCheck.js), but anyone can still type an address
// that is not theirs, or a real-looking one that does not exist. Only the
// visitor clicking a link we emailed proves the address is real AND theirs —
// so an enquiry reaches the business inbox only after that click.

import crypto from 'node:crypto';

import { config } from './config.js';
import { statements } from './db.js';

// 256 bits, URL-safe. Unguessable, so the confirm endpoint needs no rate
// limit of its own: there is nothing to brute-force.
export function mintToken() {
  return crypto.randomBytes(32).toString('base64url');
}

export const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

export const confirmLink = (token) => `${config.publicUrl}/api/contact/confirm/${token}`;

// Where the click lands: the contact section on About, in the visitor's
// language, with the outcome for ContactForm to show.
export function landingUrl(lang, outcome) {
  const prefix = lang === 'AR' ? '/ar' : '';
  return `${config.publicUrl}${prefix}/about?enquiry=${outcome}#contact`;
}

/**
 * Handles a click on a confirmation link. Returns { outcome, lang, id }:
 *   confirmed — first valid click: the enquiry is now queued for the business
 *   already   — clicked again after confirming (a second click, a mail
 *               scanner that followed the link first): still good news
 *   expired   — too late; the enquiry will never be delivered
 *   invalid   — no such token (mistyped, truncated, or from an old link)
 */
export function confirmByToken(token) {
  if (typeof token !== 'string' || !/^[A-Za-z0-9_-]{20,100}$/.test(token)) {
    return { outcome: 'invalid', lang: 'EN' };
  }
  const row = statements.findByConfirmToken.get({ hash: hashToken(token) });
  if (!row) return { outcome: 'invalid', lang: 'EN' };
  if (row.confirmed_at) return { outcome: 'already', lang: row.lang, id: row.id };

  if (row.status === 'expired' || (row.confirm_expires_at && row.confirm_expires_at < Date.now())) {
    statements.markExpired.run({ id: row.id });
    return { outcome: 'expired', lang: row.lang, id: row.id };
  }

  const { changes } = statements.confirm.run({ id: row.id, confirmed_at: new Date().toISOString() });
  // 0 changes = another request confirmed it a moment ago.
  return { outcome: changes ? 'confirmed' : 'already', lang: row.lang, id: row.id };
}

// Hourly sweep, alongside the retention prune.
export function expireUnconfirmed() {
  const { changes } = statements.expireUnconfirmed.run({ now: Date.now() });
  if (changes) console.log(`[contact] ${changes} unconfirmed enquiry(ies) expired`);
}
