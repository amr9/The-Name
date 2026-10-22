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

// The catalogue cards, the page's main section, in the order of the "Main
// Catalogue" section on vertex.ae/catalogues — except that Brands.jsx moves
// each brand's later catalogues up beside its first. Each cover opens `url`, the
// catalogue that same cover opens there (FlippingBook / Fliplink viewers), in
// a new tab.
//   id      — keys its cover (media.brandCatalogues[id]) and its line (i18n
//             brandsPage.catalogues.items[id]).
//   brandId — optional data/brands.js id: the card is titled by that brand's
//             name, with the line under it. Without one (a multi-brand or
//             non-partner catalogue) the line IS the title.
export const brandCatalogues = [
  { id: 'powerOfBrands', url: 'https://go.fliplink.me/view/E3EB5196-497B-423F-90F3-8CA668E0A2E2' },
  { id: 'hugoBoss2026', brandId: 'hugoBoss', url: 'https://go.fliplink.me/view/88E683DB-DCAC-44BC-B874-CB159AD5E557' },
  { id: 'christianLacroix2026', brandId: 'christianLacroix', url: 'https://go.fliplink.me/view/EA203490-E2FB-4813-A068-5BC8F16044F2' },
  { id: 'cerruti2026', brandId: 'cerruti1881', url: 'https://go.fliplink.me/view/1EFCBF65-2555-4D22-B3E3-DDB218C9DBB5' },
  { id: 'ungaro2026', brandId: 'ungaro', url: 'https://go.fliplink.me/view/21E3766D-224D-4BBE-9135-B2017CEE4444' },
  { id: 'festina2026', brandId: 'festina', url: 'https://go.fliplink.me/view/40FE54B2-224F-43A5-92B2-181145E37F5E' },
  { id: 'cacharel2026', brandId: 'cacharel', url: 'https://go.fliplink.me/view/42A2D642-BB18-47E5-ADD6-74A733B629B5' },
  { id: 'giftsToRemember', url: 'https://online.flippingbook.com/view/536400535/' },
  { id: 'makito2026', brandId: 'makito', url: 'https://generalcatalogue2026.eu/40edbe98075cfdadfa3399d65bd57834/#page/72' },
  { id: 'brandCharger2026', url: 'https://go.fliplink.me/view/25FDE8CA-124F-4E43-AFF4-9700B5C5568E' },
  { id: 'senator2026', brandId: 'senator', url: 'https://online.flippingbook.com/view/541962284/' },
  { id: 'sols2026', brandId: 'sols', url: 'https://go.fliplink.me/view/45CE9217-53A6-4008-8A01-2F7B0BB9EF71' },
  { id: 'lexon', brandId: 'lexon', url: 'https://go.fliplink.me/view/26658EF2-4BA5-4696-9E13-1586BB8B7A42' },
  { id: 'lundLondon', brandId: 'lundLondon', url: 'https://go.fliplink.me/view/11EDDBA4-778E-4AC0-B73E-6828ED7ACD66' },
  { id: 'hugoBossPowerBanks', brandId: 'hugoBoss', url: 'https://online.flippingbook.com/view/376244091/' },
  { id: 'hugoBossWriting', brandId: 'hugoBoss', url: 'https://go.fliplink.me/view/0188CC64-BBB2-480C-A977-1D32E1BDA75E' },
  { id: 'bossUmbrellas', brandId: 'hugoBoss', url: 'https://go.fliplink.me/view/58C7589B-9946-4CB2-B82B-6CAF106A41D7' },
  { id: 'korin', brandId: 'korin', url: 'https://online.flippingbook.com/view/557274778/' },
];

// PARKED — not rendered: the page has no category sections any more (the
// category NAMES are the hero's pills, i18n home.pillars.brands.tags, and
// the catalogue cards are the main section). Kept, with its copy (i18n
// brandsPage.categories), to bring them back as ServicePage `services`.
// The page's CATEGORY sections (components/ServicePage), in order. Each
// title is the matching Brands chip on Home (i18n home.pillars.brands.tags,
// SAME ORDER); the copy is i18n brandsPage.categories[id].
//   brands — data/brands.js ids, listed as chips in the section. Every brand
//            sits in exactly one category.
//            The chips are plain names, never links. Brands
//            WITHOUT a catalogue are COMMENTED OUT (kept in place) — put
//            one back once its catalogue is in brandCatalogues.
//   image  — a brandCatalogues id: the ONE catalogue cover standing for the
//            category, pinned beside the sections on desktop and behind the
//            copy on phones (the brands have no films).
export const brandCategories = [
  { id: 'lifestyle', image: 'cacharel2026', brands: ['cacharel', 'festina' /* , 'iceWatch', 'kreafunk' */] },
  { id: 'office', image: 'senator2026', brands: [/* 'pantone', 'prodir', */ 'senator' /* , 'pitaka', 'mob' */] },
  { id: 'design', image: 'lexon', brands: ['lexon', 'lundLondon', 'korin' /* , 'gingko' */] },
  { id: 'corporate', image: 'sols2026', brands: ['makito', 'sols'] },
  { id: 'premium', image: 'cerruti2026', brands: ['hugoBoss', 'cerruti1881', 'christianLacroix', 'ungaro' /* , 'ninaRicci' */] },
];

// The rolling logo strips under the hero and under the categories
// (components/LogoMarquee), in this order — data/brands.js ids. Each shows
// its logo (media.brands) and opens its brand's catalogue (its first in
// brandCatalogues); one without a logo file shows its name. Brands WITHOUT
// a catalogue are COMMENTED OUT (kept in place) — put one back once its
// catalogue is in brandCatalogues.
export const marqueeBrands = [
  'hugoBoss', 'cerruti1881', 'festina', 'cacharel', /* 'iceWatch', */ 'christianLacroix',
  'ungaro', 'lexon', 'senator', 'makito', /* 'pantone', 'kreafunk', */ 'sols',
  'lundLondon', /* 'mob', 'gingko', */
];
