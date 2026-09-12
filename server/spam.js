// Content heuristics.
//
// Every rule adds to a score; at or above config.spam.threshold the
// submission is HELD — written to the database, flagged with its reasons,
// and never emailed. The sender still gets a 200, exactly like the
// honeypot, so a bot learns nothing from the difference and a
// false-positive enquiry is still sitting in the database to be read.
//
// Nothing here is language-specific to English: Arabic is a first-class
// language on this site, so only a script that has never appeared in a
// genuine enquiry here (Cyrillic) counts against a submission. Rules match
// on behaviour — what the message is doing — never on who appears to be
// sending it.

import { config } from './config.js';
import { statements } from './db.js';

const URL_RE = /\b(?:https?:\/\/|www\.)\S+/gi;
const MARKUP_RE = /\[url[=\]]|<a\s+href|\[link[=\]]/i;
const CYRILLIC_RE = /[Ѐ-ӿ]/;

// Phrases a catering, cafe or engraving enquiry has no reason to contain.
const PHRASES = [
  'seo', 'backlink', 'link building', 'guest post', 'rank higher',
  'rank on google', 'digital marketing agency', 'web design services',
  'crypto', 'bitcoin', 'forex', 'binary option', 'casino', 'viagra',
  'cialis', 'make money', 'earn $', 'work from home', 'loan offer',
  'investment opportunity', 'click here', 'limited time offer', 'act now',
  'dear sir/madam', 'you have won', 'claim your prize', 'wire transfer',
  'unsubscribe', 'bulk email', 'increase your sales', 'boost your traffic',
];

// Escaped one by one so a phrase can contain regex punctuation ($, /) and
// still be matched literally. Built with String.raw so the \b survives —
// in a normal template literal \b is a backspace, not a word boundary.
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const PHRASE_SOURCE = String.raw`\b(?:${PHRASES.map(escape).join('|')})`;
const PHRASE_RE = new RegExp(PHRASE_SOURCE, 'i');
const PHRASE_RE_G = new RegExp(PHRASE_SOURCE, 'gi');

function capsRatio(text) {
  const letters = text.replace(/[^A-Za-z]/g, '');
  if (letters.length < 40) return 0; // too short to mean anything
  const upper = letters.replace(/[^A-Z]/g, '').length;
  return upper / letters.length;
}

// Returns { score, reasons: string[], held: boolean }.
export function scoreSubmission(values, meta = {}) {
  const { name = '', email = '', message = '' } = values;
  const reasons = [];
  let score = 0;

  const add = (points, reason) => {
    score += points;
    reasons.push(reason);
  };

  // — links —
  const links = (message.match(URL_RE) ?? []).length;
  if (links >= 4) add(4, 'many-links');
  else if (links >= 2) add(2, 'links');
  if (MARKUP_RE.test(message)) add(3, 'link-markup');

  // — sales vocabulary —
  const phrases = (message.match(PHRASE_RE_G) ?? []).length;
  if (phrases > 0) add(Math.min(2 * phrases, 6), 'spam-phrases');
  if (PHRASE_RE.test(name)) add(2, 'spam-phrase-in-name');

  // — shouting —
  if (capsRatio(message) > 0.6) add(2, 'all-caps');

  // — a name that is really a payload —
  // A URL is enough on its own: no real visitor types one into the name
  // box. A bare @ is not — people do put their email address there by
  // mistake, and that must not silently cost them a reply.
  if (/https?:\/\/|www\./i.test(name)) add(5, 'url-in-name');
  else if (name.includes('@')) add(2, 'address-in-name');

  // — a script that has never turned up in a real enquiry here —
  if (CYRILLIC_RE.test(message) || CYRILLIC_RE.test(name)) add(2, 'cyrillic');

  // — filled in faster than a person can type —
  // A missing timer is only a nudge: an old cached page or a visitor with
  // JS quirks can lose it, and that must not cost them their enquiry.
  const fillMs = Number(meta.fillMs);
  if (Number.isFinite(fillMs) && fillMs >= 0) {
    if (fillMs < config.spam.minFillMs) add(3, 'too-fast');
  } else {
    add(1, 'no-timing');
  }

  // — the same message again —
  // Bots retry verbatim; a person who really does send twice in a day is
  // not pushed over the threshold by this alone.
  if (email && message) {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { n } = statements.duplicateSince.get({ email, message, since });
    if (n > 0) add(4, 'duplicate');
  }

  return { score, reasons, held: score >= config.spam.threshold };
}
