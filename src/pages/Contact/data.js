// The field definitions live in /shared/contactForm.js, not here: the Node
// server in /server re-validates every submission against the exact same
// rules, so they cannot live inside src/. This file keeps the page-folder
// convention (a page imports its structural data from its own data.js)
// while there is only ever one definition.
export { contactFields, emailPattern, honeypotField, timingField, validateContact } from '../../../shared/contactForm.js';
