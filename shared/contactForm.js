// The contact form's field definitions and validation rules.
//
// This lives outside src/ because BOTH sides need it: the React form in
// src/pages/Contact/ (which re-exports it through its own data.js, keeping
// the page-folder convention) and the Node server in server/, which must
// re-check everything the browser checked. One definition, so the two can
// never drift apart.
//
// Structural only — no display text. `validateContact` returns error *keys*
// that the frontend looks up in i18n under contact.errors; the server maps
// them to its own plain-English messages.

export const contactFields = [
  { id: 'name', type: 'text', autoComplete: 'name', required: true, max: 120 },
  { id: 'email', type: 'email', autoComplete: 'email', required: true, max: 200 },
  { id: 'phone', type: 'tel', autoComplete: 'tel', required: false, max: 40 },
  { id: 'message', type: 'textarea', rows: 5, required: true, max: 4000 },
];

// Deliberately loose: this only catches the obvious typo. Deliverability is
// proven by the reply, not by a regex.
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// How long the form was on screen before it was submitted, in ms. The
// browser measures it and sends it under this name; the server treats an
// implausibly fast fill as a spam signal (a bot posts instantly, a person
// cannot). Structural, like the honeypot — the threshold itself is the
// server's business (MIN_FILL_MS).
export const timingField = 'fillMs';

// A field no human sees (hidden + aria-hidden + tabindex -1). Bots fill in
// every input they find, so anything here means the submission is one.
export const honeypotField = 'company';

// Returns { [fieldId]: 'required' | 'email' | 'tooLong' } — empty when valid.
export function validateContact(values = {}) {
  const found = {};
  for (const f of contactFields) {
    const value = typeof values[f.id] === 'string' ? values[f.id].trim() : '';
    if (f.required && !value) found[f.id] = 'required';
    else if (f.id === 'email' && value && !emailPattern.test(value)) found[f.id] = 'email';
    else if (value.length > f.max) found[f.id] = 'tooLong';
  }
  return found;
}
