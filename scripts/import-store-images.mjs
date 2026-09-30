// Replaces the product pictures with the REAL ones from the live store.
//
//   node scripts/import-store-images.mjs
//
// The spreadsheet export's "Image 128" column is a 128px thumbnail — 85x128
// for most rows — and the Shop page now shows a product roughly 350px wide, so
// those upscale about four times and look pixelated. Odoo serves the original
// upload at a predictable path:
//
//   /web/image/product.template/<store id>/image_1920
//
// and the <store id> is already in this repo: it is the trailing number on the
// `url` that scripts/import-store-categories.mjs wrote onto each row
// ('/shop/desk-stationery-75/castelli-milano-1938-a5-appeel-100' -> 100).
// Nothing new has to be scraped to find it.
//
// Run it LAST, after import-store-products.mjs and then
// import-store-categories.mjs: it needs the `url` the second one writes, and
// the first one resets the `image` flags this rewrites. Re-run whenever the
// store's photography changes.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { pathToFileURL } from 'node:url';

const BASE = 'https://store.thename.ae';
const OUT = 'public/media/store';

// Odoo answers EVERY id, including ones that do not exist — a product with no
// picture gets a stock "no image" PNG rather than a 404, so the HTTP status
// tells us nothing. That placeholder is one fixed 6078-byte file, so its hash
// is the check. Verified against ids 1, 2 and 999999, which all return it.
const PLACEHOLDER_MD5 = 'ed4046b72d8bf5add8585af91355734c';

// Requests that do not accept webp get a JPEG back, which would land in a
// .webp file and be wrong about its own format.
const ACCEPT = 'image/webp,image/*';

// The store's own product id, off the end of the url slug.
const storeIdOf = (p) => {
  const m = /-(\d+)$/.exec(p.url ?? '');
  return m ? m[1] : null;
};

const { storeProducts } = await import(pathToFileURL(`${process.cwd()}/src/data/storeProducts.js`).href);

fs.mkdirSync(OUT, { recursive: true });

const got = new Set();      // product ids that now have a real picture
const noStoreId = [];       // never matched to the store, so nothing to fetch
const noPicture = [];       // matched, but the store has no picture either
const failed = [];

for (const p of storeProducts) {
  const storeId = storeIdOf(p);
  if (!storeId) { noStoreId.push(p.name); continue; }

  const url = `${BASE}/web/image/product.template/${storeId}/image_1920`;
  let res;
  try {
    res = await fetch(url, { headers: { Accept: ACCEPT } });
  } catch (err) {
    failed.push(`${p.name}: ${err.message}`);
    continue;
  }
  if (!res.ok) { failed.push(`${p.name}: HTTP ${res.status}`); continue; }

  const buf = Buffer.from(await res.arrayBuffer());
  if (crypto.createHash('md5').update(buf).digest('hex') === PLACEHOLDER_MD5) {
    noPicture.push(p.name);
    continue;
  }

  fs.writeFileSync(path.join(OUT, `${p.id}.webp`), buf);
  got.add(p.id);
  process.stdout.write(`${got.size} `);
}

// Rewrite the `image: false` flags in place, the same line-surgery
// import-store-categories.mjs does, so the header comment, storeCategories and
// the helpers are left exactly as they are.
//
// The flag's MEANING changes with this script: it used to mean "the
// spreadsheet's Image 128 cell held a 74-byte blob", and it now means "the
// store has no picture for this either". Most of the 34 rows the export
// flagged turn out to have a perfectly good photo on the store, so they lose
// the flag here — which is also why import-store-products.mjs must be re-run
// BEFORE this and never after.
const file = 'src/data/storeProducts.js';
let out = fs.readFileSync(file, 'utf8');
let written = 0;
for (const p of storeProducts) {
  const line = out.split('\n').find((l) => l.includes(`{ id: ${JSON.stringify(p.id)},`));
  if (!line) continue;
  const stripped = line.replace(/, image: false/, '');
  // Re-inserted in the same slot the export puts it in: after `price`, so a
  // regenerated file and a rewritten one diff cleanly against each other.
  const next = got.has(p.id) ? stripped : stripped.replace(/(, price: [^,}]+)/, '$1, image: false');
  if (next !== line) { out = out.replace(line, next); written++; }
}
fs.writeFileSync(file, out);

// A product that LOST its picture — flagged image: false just above — leaves
// its old thumbnail behind, and storeImage() will never reference it again.
// Sweep those, so the folder holds exactly what the data says it holds.
const wanted = new Set([...got].map((id) => `${id}.webp`));
const stale = fs.readdirSync(OUT).filter((f) => f.endsWith('.webp') && !wanted.has(f));
for (const f of stale) fs.unlinkSync(path.join(OUT, f));

console.log(`\n\n${got.size} of ${storeProducts.length} products now carry a full-size picture (${written} rows rewritten)`);
if (stale.length) console.log(`\nswept ${stale.length} orphaned file(s): ${stale.join(', ')}`);
if (noPicture.length) console.log(`\nno picture on the store either (${noPicture.length}): ${noPicture.join(', ')}`);
if (noStoreId.length) console.log(`\nnot matched to the store, so no id to fetch (${noStoreId.length}): ${noStoreId.join(', ')}`);
if (failed.length) console.log(`\nfailed (${failed.length}): ${failed.join(' | ')}`);
