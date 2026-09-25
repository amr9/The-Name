// Regenerates the store catalogue from the Odoo product export.
//
//   node scripts/import-store-products.mjs ["Product (product.template).xlsx"]
//
// Writes:
//   src/data/storeProducts.js   — one row per product (id, name, ref, price)
//   public/media/store/<id>.webp — the picture from the sheet's "Image 128"
//
// It reads the .xlsx directly (a zip of XML), so there is no dependency to
// install. Only the columns the Shop page uses are read; everything else in
// the sheet is ignored.
//
// KNOWN GAPS in the export, both reported when you run it:
//   - "Product Category" (column C) is empty for every row, so no product can
//     be filed under one of the ten storeCategories. Fill it in Odoo, re-export
//     and this script will need a small change to carry it through as `cat`.
//   - Some rows carry a 74-byte blob where the image should be. Those get
//     `image: false` and fall back to <ImagePlaceholder> on the page.
import { readFileSync, writeFileSync, rmSync, mkdirSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const xlsx = process.argv[2] ?? 'Product (product.template).xlsx';
if (!existsSync(xlsx)) {
  console.error(`No such file: ${xlsx}`);
  process.exit(1);
}

// Unzip with the system tool rather than pulling in a zip library.
const work = join(tmpdir(), `store-import-${Date.now()}`);
mkdirSync(work, { recursive: true });
execFileSync('unzip', ['-o', '-q', xlsx, '-d', work]);

const decode = (s) => s
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'").replace(/&amp;/g, '&');

const shared = [...readFileSync(join(work, 'xl/sharedStrings.xml'), 'utf8')
  .matchAll(/<si>([\s\S]*?)<\/si>/g)]
  .map((m) => decode([...m[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((x) => x[1]).join('')));

const sheet = readFileSync(join(work, 'xl/worksheets/sheet1.xml'), 'utf8');
const rows = [...sheet.matchAll(/<row[^>]*>([\s\S]*?)<\/row>/g)].map((m) => {
  const cells = {};
  for (const c of m[1].matchAll(/<c r="([A-Z]+)\d+"([^>]*)>([\s\S]*?)<\/c>/g)) {
    let v = (c[3].match(/<v>([\s\S]*?)<\/v>/) ?? [])[1];
    if (/t="s"/.test(c[2]) && v !== undefined) v = shared[+v];
    if (v !== undefined) cells[c[1]] = String(v);
  }
  return cells;
});

// Column letters, from the header row this export produces.
const COL = { category: 'C', name: 'E', ref: 'F', price: 'H', image: 'J' };
const data = rows.slice(1).filter((r) => (r[COL.name] ?? '').trim());

// Reads a WebP's real dimensions, which is also how a non-image is detected:
// anything that is not a RIFF/VP8* file has no picture in it.
const webpSize = (b) => {
  if (b.slice(0, 4).toString() !== 'RIFF') return null;
  const tag = b.slice(12, 16).toString();
  if (tag === 'VP8 ') return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
  if (tag === 'VP8L') { const v = b.readUInt32LE(21); return [(v & 0x3fff) + 1, ((v >> 14) & 0x3fff) + 1]; }
  if (tag === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
  return null;
};

const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);

const outDir = 'public/media/store';
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const seen = new Map();
const items = [];
const noImage = [];
let smallest = Infinity;
for (const r of data) {
  const name = r[COL.name].trim();
  let id = slug(name);
  const n = (seen.get(id) ?? 0) + 1;
  seen.set(id, n);
  if (n > 1) id = `${id}-${n}`;

  const buf = Buffer.from(r[COL.image] ?? '', 'base64');
  const dims = webpSize(buf);
  if (dims) { writeFileSync(join(outDir, `${id}.webp`), buf); smallest = Math.min(smallest, Math.max(...dims)); }
  else noImage.push(name);

  items.push({ id, name, ref: (r[COL.ref] ?? '').trim() || null, price: r[COL.price] ? Number(r[COL.price]) : null, hasImage: !!dims });
}

const q = (s) => JSON.stringify(s);
const body = items.map((i) => {
  const parts = [`id: ${q(i.id)}`, `name: ${q(i.name)}`];
  if (i.ref) parts.push(`ref: ${q(i.ref)}`);
  if (i.price != null) parts.push(`price: ${i.price}`);
  if (!i.hasImage) parts.push('image: false');
  return `  { ${parts.join(', ')} },`;
}).join('\n');

const header = readFileSync('src/data/storeProducts.js', 'utf8').split('export const storeProducts = [')[0];
writeFileSync('src/data/storeProducts.js', `${header}export const storeProducts = [
${body}
];

// The product's own page on the store. \`url\` is written by
// scripts/import-store-categories.mjs; a product it could not match has none
// and falls back to the shop front rather than to a link that would 404.
export const productUrl = (p) => (p.url ? \`\${site.shopUrl}\${p.url}\` : site.shopUrl);

// Everything the page needs to know about a product's picture in one place,
// so no component has to remember the folder or the extension.
export const storeImage = (p) => (p.image === false ? null : \`/media/store/\${p.id}.webp\`);

// 'all' is every product; any other shelf is everything whose \`cats\` includes
// it. A product can be on several, so this is \`includes\`, not equality.
export const productsInCategory = (catId) =>
  catId === 'all' ? storeProducts : storeProducts.filter((p) => p.cats?.includes(catId));
`);


const categorised = data.filter((r) => (r[COL.category] ?? '').trim()).length;
console.log(`${items.length} products -> src/data/storeProducts.js`);
console.log(`${items.length - noImage.length} images -> ${outDir}/ (largest side of the smallest: ${smallest}px)`);
if (noImage.length) console.log(`no usable image (${noImage.length}): ${noImage.join(', ')}`);
if (!categorised) console.log(`WARNING: "Product Category" is empty for all ${items.length} rows — every product falls under "All Products".`);
