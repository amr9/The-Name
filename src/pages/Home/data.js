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
