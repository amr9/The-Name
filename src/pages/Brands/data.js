// The brands shown as full sections on the Brands page, in order — each with
// at most TWO products. A brand listed here gets a section (its logo, intro and
// product cards); every other brand in data/brands.js falls through to the
// logo row underneath, so adding products for one moves it up automatically.
//
// `brandId` is a data/brands.js id. A product `id` keys BOTH its photo
// (media.brandProducts[id]) and its copy (i18n brandsPage.brands[brandId]
// .products[id]: name, line, facts). Facts come from each brand's catalogue.
export const featuredBrands = [
  { brandId: 'pantone', products: ['pantoneOriginalMug', 'pantoneGatefoldNotebook'] },
  { brandId: 'lundLondon', products: ['skittleWaterBottle', 'lundWirelessLamp'] },
  { brandId: 'prodir', products: ['prodirMs8', 'prodirMc01'] },
];
