// The brands shown as full sections on the Brands page, in order — each with
// at most TWO products. A brand listed here gets a section (its logo, intro and
// product cards); every other brand in data/brands.js falls through to the
// logo row underneath, so adding products for one moves it up automatically.
//
// `brandId` is a data/brands.js id. A product `id` keys BOTH its photo
// (media.brandProducts[id]) and its copy (i18n brandsPage.brands[brandId]
// .products[id]: name, line, facts). Facts come from each brand's catalogue.
//
// An entry WITHOUT `products` is a brand still waiting for its content: its
// section shows the shared "coming soon" intro and PENDING_SLOTS dashed
// product cards (i18n brandsPage.pending). Filling one in = add its copy under
// brandsPage.brands[brandId], its photos under media.brandProducts, and a
// `products` list here — nothing in Brands.jsx changes.
export const PENDING_SLOTS = 2;

export const featuredBrands = [
  { brandId: 'pantone', products: ['pantoneOriginalMug', 'pantoneGatefoldNotebook'] },
  { brandId: 'lundLondon', products: ['skittleWaterBottle', 'lundWirelessLamp'] },
  { brandId: 'prodir', products: ['prodirMs8', 'prodirMc01'] },
  // PARKED until their content arrives — for now these brands sit in the
  // "Also in our collection" logo cards (every brand not listed here does).
  // To give one its own row: uncomment it here (it shows the "coming soon"
  // row), or better, add its `products` and copy first. In the order of the
  // MENA partner slide.
  // { brandId: 'cerruti1881' },
  // { brandId: 'hugoBoss' },
  // { brandId: 'cacharel' },
  // { brandId: 'ninaRicci' },
  // { brandId: 'festina' },
  // { brandId: 'iceWatch' },
  // { brandId: 'christianLacroix' },
  // { brandId: 'korin' },
  // { brandId: 'gingko' },
  // { brandId: 'lexon' },
  // { brandId: 'senator' },
  // { brandId: 'sols' },
  // { brandId: 'ungaro' },
  // { brandId: 'pitaka' },
  // { brandId: 'makito' },
  // { brandId: 'mob' },
];
