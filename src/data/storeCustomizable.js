// Which products the Customize Yours page shows — HAND-EDITED, for the same
// reason data/storeBadges.js is: storeProducts.js is generated from the Odoo
// export, so a flag written there is wiped by the next import run.
//
// These are the products the store lists at /customizable-products. That page
// builds its grid client-side from a dynamic snippet, so unlike the category
// pages it cannot be scraped with a plain fetch — hence a list kept by hand
// rather than a script. When the store's selection changes, edit here.
//
// Ids are the same ids as in storeProducts.js (also the image filenames).
// Several of the store's entries are colour VARIANTS of one product — two
// NOMADAY power banks, two SOFT POWER MAGBANKs — and our catalogue is
// template-level, so those collapse to one id each. That is why 16 listings
// there are 14 products here.
export const customizableIds = [
  'lund-london-shuffle-board',
  'lund-london-corn-hole',
  'lund-london-skittle-water-bottle-500ml-pink-mint-customizabl',
  'lexon-nomaday-power-bank',
  'lexon-soft-power-magbank',
  'lexon-ray-speaker',
  'lexon-horizon-diffuser',
  'lexon-mino-t',
  'lexon-mina',
  'lexon-mina-sunrise',
  'lexon-bubble-lamp',
  'lexon-mina-l-audio',
  'pantone-jar-container',
  'pantone-latte-thermo-cup',
];

// The steps shown above the grid. Ids key the copy in i18n `customize.steps`.
export const customizeSteps = ['base', 'detail', 'life'];
