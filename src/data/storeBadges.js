// Corner badges on the Shop cards — HAND-EDITED, and deliberately kept out of
// data/storeProducts.js.
//
// That file is generated from the Odoo export: anything written into it is
// overwritten the next time scripts/import-store-products.mjs runs. A badge is
// an editorial decision, not export data, so it lives here where no script
// touches it and adding or removing one is a one-line change.
//
// To badge a product: add its id (the same id as in storeProducts.js, which is
// also its image filename) with a badge key. To remove one: delete the line.
// A product with no entry here simply has no badge, which is the default.
//
// Badge keys map to i18n `shop.badges.<key>`, so the label is translated in all
// four languages rather than typed in here.
export const productBadges = {
  'castelli-milano-1938-a5-appeel': 'bestSeller',
};

// The badge for a product, or undefined. Used by the Shop card so no component
// has to know how the map above is shaped.
export const productBadge = (p) => productBadges[p.id];
