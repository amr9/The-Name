// Partner brands we curate and personalise. Brand names are proper nouns —
// the same in every language — so they live here, not in i18n. Read by the
// Home logo strip and by data/catalogue.js (each piece's brand), so a brand
// is named in exactly one place. Logo files: data/media.js `brands[id]`.
// Lund London now trades as Lund Design House (lundlondon.com redirects
// there), and Korin Design is korin-design.com — korindesign.com is an
// unrelated parked domain.
//
// `logoScale` (optional, default 1) enlarges one logo's slot in the strip.
// Every logo is fitted into the same box, so a tall or stacked mark renders
// much smaller than a long wordmark — raise its scale until they look even.
export const brands = [
  { id: 'lexon', name: 'Lexon', url: 'https://www.lexon-design.com' },
  { id: 'lundLondon', name: 'Lund London', url: 'https://lunddesignhouse.com', logoScale: 1.35 },
  { id: 'pantone', name: 'Pantone', url: 'https://www.pantone.com' },
  { id: 'korin', name: 'Korin', url: 'https://www.korin-design.com' },
  { id: 'kreafunk', name: 'Kreafunk', url: 'https://kreafunk.com' },
  { id: 'gingko', name: 'Gingko', url: 'https://gingkodesign.com', logoScale: 1.6 },
];

export const brandsById = Object.fromEntries(brands.map((b) => [b.id, b]));
