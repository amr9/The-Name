// Structural service-row data only — display copy lives in
// src/i18n/translations/*.js under home.services[id], keyed by `id`.
// Customization leads — personal first, then business. The cafe and its
// catering/events arm are the side of the business, and sit below them.
// `textOrder`/`imgOrder` alternate down the page so the rows zig-zag.
export const services = [
  { id: 'personalGifts', num: '01', to: '/shop', textOrder: 1, imgOrder: 2 },
  { id: 'businessBranding', num: '02', to: '/business', textOrder: 2, imgOrder: 1 },
  { id: 'cafe', num: '03', to: '/cafe', textOrder: 1, imgOrder: 2 },
  { id: 'catering', num: '04', to: '/business', textOrder: 2, imgOrder: 1 },
];

// The ways a name/logo can be put onto a product. Selectable in the panel
// under the steps; copy lives in i18n under home.howItWorks.methods[id] and
// the image in data/media.js under media.methods[id].
export const customMethods = [
  { id: 'engraving' },
  { id: 'print' },
  { id: 'embroidery' },
  { id: 'emboss' },
];

// The partner-brand logo strip reads data/brands.js, and the bubble layouts
// live in data/bubbles.js — both are shared with other pages.
