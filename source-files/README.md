# source-files — originals the website does NOT serve

Reference material and raw exports kept with the code. Nothing here is
deployed: the Dockerfile copies only `public/`, `src/`, `shared/` and
`scripts/`. Files the site actually shows live in `public/media/`.

| Folder | What it is for |
|---|---|
| `catalogues/` | Brand catalogues (PDF) that product photos and facts are taken from — PANTONE, Lund Design House, Prodir. |
| `the-name-brand/` | Original logo and favicon exports, and the brand guideline (the guideline PDF is git-ignored, local only). |
| `data/` | `Product (product.template).xlsx` — the Odoo store export read by `scripts/import-store-products.mjs`. |
| `videos/` | Raw / unused film footage. |
| `images/` | Design reference images. |
