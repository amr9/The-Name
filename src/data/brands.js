// Partner brands we curate and personalise. Brand names are proper nouns —
// the same in every language — so they live here, not in i18n. Read by the
// Home logo strip and by data/catalogue.js (each piece's brand), so a brand
// is named in exactly one place. Logo files: data/media.js `brands[id]`.
// Lund London now trades as Lund Design House (lundlondon.com redirects
// there), and Korin Design is korin-design.com — korindesign.com is an
// unrelated parked domain.
//
// `logoScale` (optional, default 1) scales one logo's slot (above 1 enlarges,
// below 1 shrinks) in the strip and the Brands page logo cards.
// Every logo is fitted into the same box, so a tall or stacked mark renders
// much smaller than a long wordmark — raise its scale until they look even.
export const brands = [
  { id: 'lexon', name: 'Lexon', url: 'https://www.lexon-design.com' },
  { id: 'lundLondon', name: 'Lund London', url: 'https://lunddesignhouse.com', logoScale: 1.35 },
  { id: 'pantone', name: 'Pantone', url: 'https://www.pantone.com' },
  { id: 'korin', name: 'Korin', url: 'https://www.korin-design.com' },
  { id: 'kreafunk', name: 'Kreafunk', url: 'https://kreafunk.com' },
  { id: 'gingko', name: 'Gingko', url: 'https://gingkodesign.com', logoScale: 1.6 },
  // Swiss pens and accessories, from the Prodir Novelties 2026 catalogue.
  // No logo file yet, so it shows as a wordmark.
  { id: 'prodir', name: 'Prodir', url: 'https://www.prodir.com' },
  // The rest of the brands we distribute in the MENA region (the partner
  // slide, Oct 2026). Listed on the Brands page under "Also in our
  // collection" as logo cards until their copy and product photos arrive
  // (their rows are commented out in pages/Brands/data.js). Logos: media.js
  // `brands`. `url` is each brand's own site, checked Oct 2026 — the Brands page
  // logo strips (LogoMarquee) link to it when the brand has no catalogue.
  { id: 'cerruti1881', name: 'Cerruti 1881', url: 'https://www.cerruti.com', logoScale: 1.2 },
  { id: 'hugoBoss', name: 'Hugo Boss', url: 'https://www.hugoboss.com' },
  { id: 'cacharel', name: 'Cacharel', url: 'https://www.cacharel.com' },
  { id: 'ninaRicci', name: 'Nina Ricci', url: 'https://www.ninaricci.com' },
  { id: 'festina', name: 'Festina', url: 'https://www.festina.com', logoScale: 1.4 },
  { id: 'iceWatch', name: 'Ice-Watch', url: 'https://www.ice-watch.com', logoScale: 1.3 },
  { id: 'christianLacroix', name: 'Christian Lacroix', url: 'https://www.christian-lacroix.com' },
  { id: 'senator', name: 'Senator', url: 'https://www.senator.com' },
  // sols-europe.com now redirects into its parent, Solo Group Paris.
  { id: 'sols', name: "SOL'S", url: 'https://www.sologroup-paris.com/en/catalog/sol-s' },
  { id: 'ungaro', name: 'Ungaro', url: 'https://www.ungaro.com' },
  // ipitaka.com — pitaka.com is a parked domain, not the brand.
  { id: 'pitaka', name: 'Pitaka', url: 'https://www.ipitaka.com', logoScale: 0.9 },
  { id: 'makito', name: 'Makito', url: 'https://www.makito.es', logoScale: 1.1 },
  // MOB — Mobility On Board, French tech accessories.
  { id: 'mob', name: 'MOB', url: 'https://www.mob.paris', logoScale: 0.85 },
];

export const brandsById = Object.fromEntries(brands.map((b) => [b.id, b]));

// Where the Brands page's "Visit <brand>" buttons and logo cards lead.
// PARKED on the 404 for now: each goes to /brands/<id>, a path no route
// matches, so it lands on the custom 404 (the same trick as the unpublished
// socials in data/site.js). To send a brand somewhere real, give its entry
// above a `link` — an in-app path ('/store') or a full URL — and that wins.
// `url` (the brand's own site) is deliberately NOT used here.
export const brandLink = (brand) => brand.link ?? `/brands/${brand.id}`;
