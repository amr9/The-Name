// Partner brands we curate and personalise. Brand names are proper nouns —
// the same in every language — so they live here, not in i18n. Read by the
// Home logo strip and by data/catalogue.js (each piece's brand), so a brand
// is named in exactly one place. Logo files: data/media.js `brands[id]`.
// TODO: confirm each URL is the site customers should be sent to.
export const brands = [
  { id: 'lexon', name: 'Lexon', url: 'https://www.lexon-design.com' },
  { id: 'lundLondon', name: 'Lund London', url: 'https://lundlondon.com' },
  { id: 'pantone', name: 'Pantone', url: 'https://www.pantone.com' },
  { id: 'korin', name: 'Korin', url: 'https://korindesign.com' },
  { id: 'kreafunk', name: 'Kreafunk', url: 'https://kreafunk.com' },
  { id: 'gingko', name: 'Gingko', url: 'https://gingkodesign.com' },
];

export const brandsById = Object.fromEntries(brands.map((b) => [b.id, b]));
