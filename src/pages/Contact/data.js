// Structural field definitions only — every label, placeholder and error
// message lives in src/i18n/translations/*.js under contact.fields[id] and
// contact.errors, keyed by the same `id`.
export const contactFields = [
  { id: 'name', type: 'text', autoComplete: 'name', required: true },
  { id: 'email', type: 'email', autoComplete: 'email', required: true },
  { id: 'phone', type: 'tel', autoComplete: 'tel', required: false },
  { id: 'message', type: 'textarea', rows: 5, required: true },
];

// Deliberately loose: the real check is the server's, this only catches the
// obvious typo before the visitor hits send.
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
