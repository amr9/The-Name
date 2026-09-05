// The six Vertex pieces on the floor — shared between the Home page's
// "shop the room" hotspots and the full Vertex pieces (Shop) page.
// Only non-linguistic facts live here; names/notes/prices/etc. live in
// src/i18n/translations/*.js under vertex.items[code], keyed by `code`.
export const catalogue = [
  { code: 'VX-101', catKey: 'lighting', x: '26%', y: '22%' },
  { code: 'VX-204', catKey: 'seating', x: '58%', y: '62%' },
  { code: 'VX-318', catKey: 'tables', x: '44%', y: '48%' },
  { code: 'VX-422', catKey: 'tabletop', x: '72%', y: '40%' },
  { code: 'VX-530', catKey: 'systems', x: '86%', y: '24%' },
  { code: 'VX-611', catKey: 'lighting', x: '12%', y: '58%' },
];

export const filterKeys = ['all', 'lighting', 'seating', 'tables', 'tabletop', 'systems'];
