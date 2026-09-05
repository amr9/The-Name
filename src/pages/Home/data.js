// Structural service-row data only — the display copy (kicker/title/body/
// points/cta/placeholder) lives in src/i18n/translations/*.js under
// home.services[id], keyed by `id`.
export const services = [
  { id: 'dineIn', num: '01', to: '/menu', textOrder: 1, imgOrder: 2 },
  { id: 'vertexShowroom', num: '02', to: '/shop', textOrder: 2, imgOrder: 1 },
  { id: 'catering', num: '03', to: '/catering', tab: 'Catering', textOrder: 1, imgOrder: 2 },
  { id: 'events', num: '04', to: '/catering', tab: 'Events', textOrder: 2, imgOrder: 1 },
];
