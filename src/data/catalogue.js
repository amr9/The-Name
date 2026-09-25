import { brandsById } from './brands.js';
import { site } from './site.js';

// The shop catalogue — curated objects we personalise. Read by the Shop page.
// Only non-linguistic facts live here: the code, the category key, the brand
// name (taken from data/brands.js, so each brand is spelled in one place;
// house pieces carry our own name) and which customization methods the piece
// takes — keys from pages/Home/data.js `customMethods`, so the method names
// come from the same i18n entries as the Home "how it works" panel.
// Names/notes/finishes/lead times live in src/i18n/translations/*.js under
// shop.items[code], keyed by `code`.
const { lexon, lundLondon, pantone, korin, kreafunk, gingko } = brandsById;

export const catalogue = [
  { code: 'TN-101', catKey: 'drinkware', brand: lundLondon.name, methods: ['engraving', 'print'] },
  { code: 'TN-102', catKey: 'drinkware', brand: lundLondon.name, methods: ['engraving', 'print'] },
  { code: 'TN-103', catKey: 'drinkware', brand: pantone.name, methods: ['print'] },
  { code: 'TN-201', catKey: 'tech', brand: lexon.name, methods: ['engraving', 'print'] },
  { code: 'TN-202', catKey: 'tech', brand: lexon.name, methods: ['print'] },
  { code: 'TN-203', catKey: 'tech', brand: kreafunk.name, methods: ['engraving', 'print'] },
  { code: 'TN-301', catKey: 'desk', brand: lexon.name, methods: ['engraving'] },
  { code: 'TN-302', catKey: 'desk', brand: site.name, methods: ['engraving', 'emboss'] },
  { code: 'TN-303', catKey: 'desk', brand: gingko.name, methods: ['engraving'] },
  { code: 'TN-401', catKey: 'travel', brand: site.name, methods: ['engraving', 'emboss'] },
  { code: 'TN-402', catKey: 'travel', brand: korin.name, methods: ['print', 'embroidery'] },
  { code: 'TN-501', catKey: 'giftSets', brand: site.name, methods: ['engraving', 'print'] },
  { code: 'TN-502', catKey: 'giftSets', brand: site.name, methods: ['engraving', 'emboss'] },
  { code: 'TN-503', catKey: 'giftSets', brand: site.name, methods: ['print', 'emboss'] },
  { code: 'TN-504', catKey: 'giftSets', brand: site.name, methods: ['engraving', 'print', 'embroidery'] },
];

// Only the GIFT SETS are still rendered. The Shop page's catalogue grid now
// reads data/storeProducts.js — the real 192-product Odoo export — and its
// filters come from `storeCategories` there, so `filterKeys` and `pieces`
// below have no caller. They are kept, with their eleven TN-1xx..TN-4xx
// entries above and the matching i18n `shop.items` copy and media paths,
// because they are the only curated, written-up product descriptions on the
// site and the store export carries nothing like them: it has names, prices
// and 128px pictures, and no note, finish, lead time or method. Delete them
// only once something replaces that copy.
export const giftSetKey = 'giftSets';
export const filterKeys = ['all', 'drinkware', 'tech', 'desk', 'travel'];
export const giftSets = catalogue.filter((p) => p.catKey === giftSetKey);
export const pieces = catalogue.filter((p) => p.catKey !== giftSetKey);
