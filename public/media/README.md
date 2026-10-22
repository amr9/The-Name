# public/media — every file the website serves

Everything here is deployed as-is and reachable at `/media/...`.
Code never types these paths: they are all listed in `src/data/media.js`
(store photos: `storeImage()` in `src/data/storeProducts.js`).
Originals that the site does NOT serve (catalogue PDFs, logo exports, the
Odoo product export) live in `/source-files/` at the repo root.

| Folder | What it is for |
|---|---|
| `the-name/` | The Name's own identity: logos (dark / yellow, main / secondary), the mark (also the favicon), the footer pattern, the "From The Name to your name" artwork. |
| `partner-brands/logos/` | Logos of the brands we carry (Brands page cards, Home logo strip). One file per brand id in `src/data/brands.js`. |
| `partner-brands/products/` | Two product photos per featured brand on the Brands page (4:5 WebP, taken from each brand's catalogue). |
| `store-products/` | One photo per online-store product (`<store id>.webp`). Written by `scripts/import-store-products.mjs` and `scripts/import-store-images.mjs` — do not edit by hand. |
| `videos/` | Every film and its poster frame (Home hero, the "What we do" rows, Events activation, About). |
| `photos/<page>/` | Page photography, one folder per page or section: `home`, `events`, `about`, `corporate-gifts`, `cafe`, `gift-sets`, `methods` (personalisation methods). |

Empty folders hold a `.gitkeep`: `media.js` already points at files there that
have not been supplied yet, and the page shows a placeholder until they are.

**Adding a file:** put it in the folder for its purpose, use a lowercase
kebab-case name, then add its path to `src/data/media.js`.
