// Structural pillar-row data only — display copy lives in
// src/i18n/translations/*.js under home.pillars[id], keyed by `id`.
// The five "What we do" pillars, in the order the brief lists them. Rows
// zig-zag by index (Home.jsx), so reordering here needs nothing else.
// `links` are the row's buttons; `key` picks the label from
// home.pillars[id].ctas. F&B points at the enquiry form because its own page
// (/cafe) is PARKED — swap in routes.cafe when that route comes back.
import { contactLink, routes, shopLink } from '../../data/site.js';

export const pillars = [
  { id: 'corporateGifts', num: '01', links: [{ key: 'explore', to: routes.business }] },
  {
    id: 'brands',
    num: '02',
    links: [
      { key: 'explore', to: routes.brands },
      { key: 'shop', to: shopLink },
    ],
  },
  { id: 'agency', num: '03', links: [{ key: 'explore', to: routes.agency }] },
  { id: 'events', num: '04', links: [{ key: 'explore', to: routes.events }] },
  { id: 'fnb', num: '05', links: [{ key: 'explore', to: contactLink }] },
];

// The ways a name/logo can be put onto a product. No longer shown on Home
// (the "how it works" panel is PARKED), but still read by data/catalogue.js;
// copy lives in i18n under home.howItWorks.methods[id] and the image in
// data/media.js under media.methods[id].
export const customMethods = [
  { id: 'engraving' },
  { id: 'print' },
  { id: 'embroidery' },
  { id: 'emboss' },
];
