// Structural service-row data only — the display copy (kicker/title/body/
// points/cta/placeholder) lives in src/i18n/translations/*.js under
// home.services[id], keyed by `id`.
export const services = [
  { id: 'dineIn', num: '01', to: '/menu', textOrder: 1, imgOrder: 2 },
  { id: 'vertexShowroom', num: '02', to: '/shop', textOrder: 2, imgOrder: 1 },
  { id: 'catering', num: '03', to: '/catering', tab: 'Catering', textOrder: 1, imgOrder: 2 },
  { id: 'events', num: '04', to: '/catering', tab: 'Events', textOrder: 2, imgOrder: 1 },
];

// Delivery partners shown in the carousel under the hero. Structural only —
// the name/note copy lives in i18n under home.partners.items[id], and the
// logo file in data/media.js under media.partners[id].
export const partners = [
  { id: 'talabat', url: 'https://www.talabat.com' },
  { id: 'noon', url: 'https://www.noon.com' },
];

// Decorative bubbles drifting up the gutters beside the service rows
// (rendered by FoodBubbles.jsx). Structural only — no copy, they are
// aria-hidden ornament. `x`/`y` are percentages across and up the gutter,
// `delay`/`duration` are seconds and `drift` the sideways sway in px.
export const serviceBubbles = [
  { id: 'l1', side: 'left', icon: 'burger', y: 2, x: 20, size: 78, delay: 0, duration: 11, drift: 26 },
  { id: 'l2', side: 'left', icon: 'cup', y: 15, x: 60, size: 54, delay: 2.1, duration: 13, drift: -20 },
  { id: 'l3', side: 'left', icon: 'coffee', y: 28, x: 30, size: 46, delay: 4.4, duration: 9.5, drift: 34 },
  { id: 'l4', side: 'left', icon: 'shake', y: 41, x: 66, size: 66, delay: 6.2, duration: 14, drift: -30 },
  { id: 'l5', side: 'left', icon: 'can', y: 54, x: 24, size: 42, delay: 8.6, duration: 10.5, drift: 22 },
  { id: 'l6', side: 'left', icon: 'fries', y: 67, x: 58, size: 70, delay: 10.8, duration: 12.5, drift: -26 },
  { id: 'l7', side: 'left', icon: 'burger', y: 80, x: 18, size: 50, delay: 13.1, duration: 9, drift: 30 },
  { id: 'l8', side: 'left', icon: 'cup', y: 92, x: 64, size: 62, delay: 15.4, duration: 13.5, drift: -18 },
  { id: 'r1', side: 'right', icon: 'cup', y: 8, x: 62, size: 70, delay: 1.2, duration: 12, drift: -24 },
  { id: 'r2', side: 'right', icon: 'burger', y: 21, x: 24, size: 48, delay: 3.3, duration: 9.5, drift: 30 },
  { id: 'r3', side: 'right', icon: 'fries', y: 34, x: 58, size: 62, delay: 5.6, duration: 13, drift: -32 },
  { id: 'r4', side: 'right', icon: 'can', y: 47, x: 28, size: 44, delay: 7.8, duration: 10.2, drift: 24 },
  { id: 'r5', side: 'right', icon: 'coffee', y: 60, x: 66, size: 74, delay: 9.9, duration: 14, drift: -18 },
  { id: 'r6', side: 'right', icon: 'shake', y: 73, x: 22, size: 56, delay: 12.2, duration: 11, drift: 28 },
  { id: 'r7', side: 'right', icon: 'cup', y: 86, x: 60, size: 46, delay: 14.5, duration: 9.8, drift: -22 },
  { id: 'r8', side: 'right', icon: 'burger', y: 96, x: 30, size: 66, delay: 16.6, duration: 12.8, drift: 20 },
];
