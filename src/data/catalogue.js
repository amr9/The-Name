import { site } from './site.js';

// The shop catalogue — curated objects we personalise. Read by the Shop page.
// Only non-linguistic facts live here: the code, the category key, the brand
// (a proper noun, the same in every language) and which customization methods
// the piece takes — keys from pages/Home/data.js `customMethods`, so the method
// names come from the same i18n entries as the Home "how it works" panel.
// Names/notes/finishes/lead times live in src/i18n/translations/*.js under
// shop.items[code], keyed by `code`.
//
// Partner brands: Lexon, Lund London, Pantone, Korin, Kreafunk, Gingko —
// plus house pieces sold under our own name.
export const catalogue = [
  { code: 'TN-101', catKey: 'drinkware', brand: 'Lund London', methods: ['engraving', 'print'] },
  { code: 'TN-102', catKey: 'drinkware', brand: 'Lund London', methods: ['engraving', 'print'] },
  { code: 'TN-103', catKey: 'drinkware', brand: 'Pantone', methods: ['print'] },
  { code: 'TN-201', catKey: 'tech', brand: 'Lexon', methods: ['engraving', 'print'] },
  { code: 'TN-202', catKey: 'tech', brand: 'Lexon', methods: ['print'] },
  { code: 'TN-203', catKey: 'tech', brand: 'Kreafunk', methods: ['engraving', 'print'] },
  { code: 'TN-301', catKey: 'desk', brand: 'Lexon', methods: ['engraving'] },
  { code: 'TN-302', catKey: 'desk', brand: site.name, methods: ['engraving', 'emboss'] },
  { code: 'TN-303', catKey: 'desk', brand: 'Gingko', methods: ['engraving'] },
  { code: 'TN-401', catKey: 'travel', brand: site.name, methods: ['engraving', 'emboss'] },
  { code: 'TN-402', catKey: 'travel', brand: 'Korin', methods: ['print', 'embroidery'] },
  { code: 'TN-501', catKey: 'giftSets', brand: site.name, methods: ['engraving', 'print'] },
];

export const filterKeys = ['all', 'drinkware', 'tech', 'desk', 'travel', 'giftSets'];
