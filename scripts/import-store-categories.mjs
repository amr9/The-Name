// Fills in each product's CATEGORIES by reading the live store.
//
//   node scripts/import-store-categories.mjs
//
// The Odoo spreadsheet export leaves "Product Category" empty for every row,
// so the categories cannot come from the same place the products do. The shop
// at store.thename.ae does know them — it files each product under one or more
// of the ten category pages — so this walks those pages, matches each listing
// back to a product in src/data/storeProducts.js by name, and writes a `cats`
// array onto the row. Products legitimately sit in several categories (a kids
// water bottle is under both Kids and Drinkware), which is why it is an array.
//
// Run it after scripts/import-store-products.mjs, which is what creates the
// rows this fills in. Re-run whenever the store is recategorised. It reports
// anything it could not match rather than guessing.
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

const BASE = 'https://store.thename.ae';
// Keys match `storeCategories` in src/data/storeProducts.js; the values are the
// store's own category slugs. 'all' is not here — it is every product.
const CATEGORY_PAGES = {
  bagsTravel: 'bags-travel-74',
  deskStationery: 'desk-stationery-75',
  drinkware: 'drinkware-73',
  games: 'games-44',
  homeAccessories: 'home-accessories-76',
  kids: 'kids-77',
  photoFrames: 'photo-frames-78',
  giftSets: 'personalized-gift-sets-80',
  technology: 'technology-79',
};
// Odoo serves 21 products a page and ignores ?ppg=, so pages are walked until
// one comes back short or repeats what we already have.
const PAGE_SIZE = 21;

const entities = (s) => s
  .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d))
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&');

// Each tile's image link carries both facts we need: `title` is the exact
// product name and `href` is its page. Reading ONE anchor keeps the two in
// step - parsing the name from one element and the link from another risks
// pairing the wrong ones when a tile is missing a piece.
const tilesIn = (html) => [...html.matchAll(/<a[^>]*href="([^"]+)"[^>]*class="[^"]*oe_product_image_link[^"]*"[^>]*title="([^"]*)"/g)]
  .map((m) => ({ url: m[1], name: entities(m[2]).replace(/\s+/g, ' ').trim() }))
  .filter((t) => t.name);

// Both sides of the match run through this, so an accent or a stray character
// only has to be handled consistently rather than correctly: "Enceinte &
// réveil" folds the same way here as it does there. This is deliberately NOT
// the id-slug from the product importer, which strips combining marks first.
const fold = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const { storeProducts } = await import(pathToFileURL(`${process.cwd()}/src/data/storeProducts.js`).href);
const byName = new Map(storeProducts.map((p) => [fold(p.name), p.id]));

const cats = new Map();
const urls = new Map();
const unmatched = new Set();
for (const [key, path] of Object.entries(CATEGORY_PAGES)) {
  const seen = [];
  for (let page = 1; page <= 15; page++) {
    const url = page === 1 ? `${BASE}/shop/category/${path}` : `${BASE}/shop/category/${path}/page/${page}`;
    const got = tilesIn(await fetch(url).then((r) => r.text()));
    const fresh = got.filter((t) => !seen.some((x) => x.name === t.name));
    seen.push(...fresh);
    if (got.length < PAGE_SIZE || fresh.length === 0) break;
  }
  for (const tile of seen) {
    const id = byName.get(fold(tile.name));
    if (!id) { unmatched.add(`${tile.name}  [${key}]`); continue; }
    if (!cats.has(id)) cats.set(id, []);
    if (!cats.get(id).includes(key)) cats.get(id).push(key);
    if (!urls.has(id)) urls.set(id, tile.url);
  }
  console.log(`${key}: ${seen.length}`);
}

// Rewrite each product line in place, so everything else in the file — the
// header comment, storeCategories, the helpers — is left exactly as it is.
const file = 'src/data/storeProducts.js';
let out = fs.readFileSync(file, 'utf8');
let written = 0;
for (const p of storeProducts) {
  const line = out.split('\n').find((l) => l.includes(`{ id: ${JSON.stringify(p.id)},`));
  if (!line) continue;
  const list = cats.get(p.id);
  const url = urls.get(p.id);
  let stripped = line
    .replace(/, cats: \[[^\]]*\]/, '')
    .replace(/, url: "[^"]*"/, '');
  if (url) stripped = stripped.replace(/ },$/, `, url: ${JSON.stringify(url)} },`);
  const next = list ? stripped.replace(/ \},$/, `, cats: [${list.map((c) => `'${c}'`).join(', ')}] },`) : stripped;
  if (next !== line) { out = out.replace(line, next); written++; }
}
fs.writeFileSync(file, out);

console.log(`\n${cats.size} of ${storeProducts.length} products categorised, ${urls.size} with a store URL (${written} rows rewritten)`);
const none = storeProducts.filter((p) => !cats.has(p.id));
if (none.length) console.log(`no category on the store (${none.length}): ${none.map((p) => p.name).join(', ')}`);
if (unmatched.size) console.log(`listed on the store but not in the export (${unmatched.size}): ${[...unmatched].join(' | ')}`);
