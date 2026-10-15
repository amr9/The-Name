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
  // The brands whose 2026 catalogues are on vertex.ae/catalogues (Main
  // Catalogue) — products and facts taken from those catalogues. In the
  // order of the MENA partner slide.
  { brandId: 'cerruti1881', products: ['cerrutiHudsonTravelBag', 'cerrutiEastonBackpack'] },
  { brandId: 'hugoBoss', products: ['hugoBossElementalSpeaker', 'hugoBossVarsityUmbrella'] },
  { brandId: 'cacharel', products: ['cacharelSeraphineTote', 'cacharelSeraphineWatch'] },
  { brandId: 'festina', products: ['festinaInterlaceTravelBag', 'festinaBlackEditionPen'] },
  { brandId: 'christianLacroix', products: ['lacroixCaprioWatch', 'lacroixWhitelineTravelBag'] },
  { brandId: 'lexon', products: ['lexonMinaM', 'lexonFlipPremium'] },
  { brandId: 'sols', products: ['solsCameronHoodie', 'solsLegendTee'] },
  { brandId: 'ungaro', products: ['ungaroMiloWatch', 'ungaroPaolaDocumentBag'] },
  { brandId: 'makito', products: ['makitoMekongBackpack', 'makitoStaverBottle'] },
  // PARKED until their content arrives — for now these brands sit in the
  // "Also in our collection" logo cards (every brand not listed here does).
  // To give one its own row: uncomment it here (it shows the "coming soon"
  // row), or better, add its `products` and copy first. Senator and Korin
  // are on vertex.ae too, but their FlippingBook catalogues were offline.
  // { brandId: 'ninaRicci' },
  // { brandId: 'iceWatch' },
  // { brandId: 'korin' },
  // { brandId: 'gingko' },
  // { brandId: 'senator' },
  // { brandId: 'pitaka' },
  // { brandId: 'mob' },
];
