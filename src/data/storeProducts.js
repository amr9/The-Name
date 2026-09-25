import { site } from './site.js';

// The Name Store catalogue - GENERATED from the Odoo export
// `Product (product.template).xlsx` at the repo root. Do not hand-edit a
// product here: re-export the sheet and regenerate, or the next export
// silently overwrites the edit. Only the fields the sheet actually carries
// are kept - the id (a slug of the name, and the image filename), the display
// name, the internal reference and the AED sales price.
//
// CATEGORIES come from a second source: `cats` on each row is written by
// scripts/import-store-categories.mjs, which reads the LIVE STORE at
// store.thename.ae, because the spreadsheet export leaves the category column
// empty. It is an array — a product is often on several shelves (a kids water
// bottle is under both Kids and Drinkware). 188 of the 192 carry one; the four
// without are not filed under any category on the store either.
//
// The note below is why that second script exists:
// NOT here, because the export does not contain it: a per-product CATEGORY.
// Column C ("Product Category") is empty for all 192 rows, so every product
// currently sits under 'all' and the other nine category filters render empty
// - see storeCategories below. Fill column C, re-export, and add a `cat` to
// each row here; nothing else on the Shop page has to change.
//
// Images live in public/media/store/<id>.webp, written from the sheet's
// "Image 128" column. 34 of the 192 rows carry a 74-byte blob instead of an
// image (mostly the MOB and Message In The Bulb lines); those are flagged
// `image: false` and fall back to <ImagePlaceholder>. The rest are 128px
// thumbnails - small for a card, so they upscale softly. Re-exporting with
// Odoo's "Image 1920" field instead is the fix, and needs no code change
// beyond dropping the bigger files in.

// The store's shelves, in the order they appear on the page. `all` is not a
// shelf - it is the unfiltered view, and it is the only one with anything in
// it until the export carries categories. Labels are in i18n under
// `shop.filters`, keyed by id.
export const storeCategories = [
  { id: 'all' },
  { id: 'bagsTravel' },
  { id: 'deskStationery' },
  { id: 'drinkware' },
  { id: 'games' },
  { id: 'homeAccessories' },
  { id: 'kids' },
  { id: 'photoFrames' },
  { id: 'giftSets' },
  { id: 'technology' },
];

export const storeProducts = [
  { id: "castelli-milano-1938-a5-appeel", name: "Castelli Milano 1938 A5 Appeel", ref: "9", price: 109, url: "/shop/desk-stationery-75/castelli-milano-1938-a5-appeel-100", cats: ['deskStationery'] },
  { id: "castelli-milano-1938-a5-pu-leather", name: "Castelli Milano 1938 A5 PU Leather", ref: "6", price: 87, url: "/shop/desk-stationery-75/castelli-milano-1938-a5-pu-leather-102", cats: ['deskStationery'] },
  { id: "castelli-milano-1938-a5-pu-velvet", name: "Castelli Milano 1938 A5 PU Velvet", ref: "1", price: 87, url: "/shop/desk-stationery-75/castelli-milano-1938-a5-pu-velvet-103", cats: ['deskStationery'] },
  { id: "castelli-milano-1938-a5-pvc", name: "Castelli Milano 1938 A5 PVC", ref: "4", price: 87, url: "/shop/desk-stationery-75/castelli-milano-1938-a5-pvc-101", cats: ['deskStationery'] },
  { id: "gingko-brick-click-alarm-clock", name: "Gingko BRICK CLICK ALARM CLOCK", ref: "3", price: 307, url: "/shop/home-accessories-76/gingko-brick-click-alarm-clock-110", cats: ['homeAccessories', 'kids'] },
  { id: "gingko-cube-click-alarm-clock", name: "Gingko CUBE CLICK ALARM CLOCK", ref: "2", price: 189, url: "/shop/home-accessories-76/gingko-cube-click-alarm-clock-111", cats: ['homeAccessories', 'kids'] },
  { id: "gingko-flip-click-clock", name: "Gingko FLIP CLICK CLOCK", ref: "2", price: 260, url: "/shop/home-accessories-76/gingko-flip-click-clock-106", cats: ['homeAccessories', 'kids'] },
  { id: "gingko-hifi-square-bluetooth-speaker", name: "Gingko HiFi SQUARE BLUETOOTH SPEAKER", ref: "1", price: 610, url: "/shop/kids-77/gingko-hifi-square-bluetooth-speaker-107", cats: ['kids', 'technology'] },
  { id: "gingko-mi-square-pocket-bluetooth-speaker", name: "Gingko MI SQUARE POCKET BLUETOOTH SPEAKER", ref: "1", price: 260, url: "/shop/kids-77/gingko-mi-square-pocket-bluetooth-speaker-112", cats: ['kids', 'technology'] },
  { id: "gingko-octagon-lamp-one", name: "Gingko OCTAGON LAMP ONE", ref: "2", price: 421, url: "/shop/home-accessories-76/gingko-octagon-lamp-one-105", cats: ['homeAccessories'] },
  { id: "gingko-octagon-lamp-one-plus", name: "Gingko OCTAGON LAMP ONE PLUS", ref: "2", price: 468, url: "/shop/home-accessories-76/gingko-octagon-lamp-one-plus-104", cats: ['homeAccessories'] },
  { id: "gingko-smart-accordion-lamp", name: "Gingko SMART ACCORDION LAMP", ref: "1", price: 283, url: "/shop/home-accessories-76/gingko-smart-accordion-lamp-113", cats: ['homeAccessories', 'kids'] },
  { id: "gingko-smart-book-light", name: "Gingko SMART BOOK LIGHT", ref: "1", price: 378, url: "/shop/home-accessories-76/gingko-smart-book-light-114", cats: ['homeAccessories', 'kids'] },
  { id: "gingko-smart-vase-light", name: "Gingko SMART VASE LIGHT", ref: "1", price: 421, url: "/shop/home-accessories-76/gingko-smart-vase-light-115", cats: ['homeAccessories', 'kids'] },
  { id: "gingko-the-r-space-lamp", name: "Gingko THE R SPACE LAMP", ref: "2", price: 378, url: "/shop/home-accessories-76/gingko-the-r-space-lamp-109", cats: ['homeAccessories'] },
  { id: "gingko-tumbler-click-alarm-clock-walnut", name: "Gingko Tumbler Click Alarm Clock Walnut", ref: "1", price: 378, url: "/shop/home-accessories-76/gingko-tumbler-click-alarm-clock-walnut-260", cats: ['homeAccessories', 'kids'] },
  { id: "korin-click-pack-travlo-bundle-i-anti-theft-backpack-k15-bla", name: "KORIN-Click Pack Travlo Bundle I Anti- Theft Backpack- K15 (Black)", ref: "1", price: 1418, url: "/shop/bags-travel-74/korin-click-pack-travlo-bundle-i-anti-theft-backpack-k15-black-265", cats: ['bagsTravel'] },
  { id: "korin-click-sling-s-shoulder-bag-k16-black", name: "KORIN-Click Sling S/Shoulder Bag- K16 (Black)", ref: "1", price: 498, url: "/shop/bags-travel-74/korin-click-sling-s-shoulder-bag-k16-black-263", cats: ['bagsTravel'] },
  { id: "korin-click-sling-x-slash-proof-k8-anti-cut-inclined-shoulde", name: "KORIN-Click Sling X | Slash Proof- K8 Anti-cut Inclined shoulder bag (Black)", ref: "1", price: 691, url: "/shop/bags-travel-74/korin-click-sling-x-slash-proof-k8-anti-cut-inclined-shoulder-bag-black-264", cats: ['bagsTravel'] },
  { id: "korin-click-sling-slash-proof-k6-anti-cut-inclined-shoulder-", name: "KORIN-Click Sling/Slash Proof- K6 Anti-cut Inclined shoulder bag (Black)", ref: "1", price: 498, url: "/shop/bags-travel-74/korin-click-sling-slash-proof-k6-anti-cut-inclined-shoulder-bag-black-262", cats: ['bagsTravel'] },
  { id: "korin-flex-pack-gym-i-18-5l-anti-theft-collapsable-structure", name: "KORIN-Flex Pack Gym I 18.5L Anti-Theft collapsable structure duffle bag with TSA lock K4 (Black)", ref: "1", price: 653, url: "/shop/bags-travel-74/korin-flex-pack-gym-i-18-5l-anti-theft-collapsable-structure-duffle-bag-with-tsa-lock-k4-black-269", cats: ['bagsTravel'] },
  { id: "korin-flex-pack-pro-i-36l-anti-theft-collapsable-structure-d", name: "KORIN-Flex Pack PRO I 36L Anti-Theft collapsable structure duffle bag with TSA lock- K2 (Deep Grey)", ref: "1", price: 824, url: "/shop/bags-travel-74/korin-flex-pack-pro-i-36l-anti-theft-collapsable-structure-duffle-bag-with-tsa-lock-k2-deep-grey-268", cats: ['bagsTravel'] },
  { id: "korin-flex-pack-pro-anti-theft-backpack-k3-dark-grey", name: "KORIN-Flex Pack Pro | Anti-theft Backpack- K3 (Dark Grey)", ref: "1", price: 765, url: "/shop/bags-travel-74/korin-flex-pack-pro-anti-theft-backpack-k3-dark-grey-271", cats: ['bagsTravel'] },
  { id: "korin-hub-pack-33-slash-proof-backpack-ky025-black-grey", name: "KORIN-Hub Pack 33 | Slash Proof Backpack- KY025 (Black/Grey)", ref: "2", price: 924, url: "/shop/bags-travel-74/korin-hub-pack-33-slash-proof-backpack-ky025-black-grey-272", cats: ['bagsTravel'] },
  { id: "korin-hub-pack-x-slash-proof-backpack-ky041-black", name: "KORIN-Hub Pack X | Slash Proof Backpack- KY041 (Black)", ref: "1", price: 1039, url: "/shop/bags-travel-74/korin-hub-pack-x-slash-proof-backpack-ky041-black-273", cats: ['bagsTravel'] },
  { id: "korin-hub-sling-x-slash-proof-ky042-black", name: "KORIN-Hub Sling X | Slash Proof- KY042 (Black)", ref: "1", price: 691, url: "/shop/bags-travel-74/korin-hub-sling-x-slash-proof-ky042-black-274", cats: ['bagsTravel'] },
  { id: "korin-insta-pack-backpack-ky033-black", name: "KORIN-Insta Pack Backpack- KY033 (Black)", ref: "1", price: 885, url: "/shop/bags-travel-74/korin-insta-pack-backpack-ky033-black-267", cats: ['bagsTravel'] },
  { id: "korin-snap-sling-slash-proof-k18-grey", name: "KORIN-Snap Sling | Slash Proof- K18 (Grey)", ref: "1", price: 537, url: "/shop/bags-travel-74/korin-snap-sling-slash-proof-k18-grey-266", cats: ['bagsTravel'] },
  { id: "korin-tripper-backpack-kc1816", name: "KORIN-Tripper-Backpack KC1816", ref: "1", price: 1512, url: "/shop/bags-travel-74/korin-tripper-backpack-kc1816-288", cats: ['bagsTravel'] },
  { id: "lexon-mina", name: "LEXON -  MINA", ref: "13", price: 132, url: "/shop/home-accessories-76/lexon-mina-14", cats: ['homeAccessories'] },
  { id: "lexon-airline-double-back-pack", name: "LEXON - Airline Double Back Pack", ref: "1", price: 265, url: "/shop/bags-travel-74/lexon-airline-double-back-pack-234", cats: ['bagsTravel'] },
  { id: "lexon-bubble-lamp", name: "LEXON - BUBBLE LAMP", ref: "5", price: 442, url: "/shop/home-accessories-76/lexon-bubble-lamp-203", cats: ['homeAccessories'] },
  { id: "lexon-backpack-premium-backpack", name: "LEXON - Backpack Premium Backpack", ref: "1", price: 265, url: "/shop/bags-travel-74/lexon-backpack-premium-backpack-233", cats: ['bagsTravel'] },
  { id: "lexon-city-energy-pro", name: "LEXON - CITY ENERGY PRO", ref: "3", price: 309, url: "/shop/technology-79/lexon-city-energy-pro-222", cats: ['technology'] },
  { id: "lexon-challenger-laptop-brief-15", name: "LEXON - Challenger Laptop Brief 15”", ref: "1", price: 535, url: "/shop/bags-travel-74/lexon-challenger-laptop-brief-15-236", cats: ['bagsTravel'] },
  { id: "lexon-flip-premium", name: "LEXON - FLIP PREMIUM", ref: "7", price: 221, url: "/shop/home-accessories-76/lexon-flip-premium-230", cats: ['homeAccessories', 'kids'] },
  { id: "lexon-gift-set-lexon-keith-sharing-love-black", name: "LEXON - GIFT SET - LEXON KEITH SHARING LOVE BLACK", ref: "1", price: 884, url: "/shop/personalized-gift-sets-80/lexon-gift-set-lexon-keith-sharing-love-black-248", cats: ['giftSets'] },
  { id: "lexon-gift-set-lexon-x-jean-michel-basquiat-crown", name: "LEXON - GIFT SET LEXON X JEAN-MICHEL BASQUIAT CROWN", ref: "1", price: 884, url: "/shop/personalized-gift-sets-80/lexon-gift-set-lexon-x-jean-michel-basquiat-crown-246", cats: ['giftSets'] },
  { id: "lexon-gift-set-lexon-x-jean-michel-basquiat-equals", name: "LEXON - GIFT SET LEXON X JEAN-MICHEL BASQUIAT EQUALS", ref: "1", price: 884, url: "/shop/personalized-gift-sets-80/lexon-gift-set-lexon-x-jean-michel-basquiat-equals-285", cats: ['giftSets'] },
  { id: "lexon-gift-set-lexon-x-jean-michel-basquiat-happy-heart", name: "LEXON - GIFT SET LEXON X JEAN-MICHEL BASQUIAT HAPPY HEART", ref: "1", price: 884, url: "/shop/personalized-gift-sets-80/lexon-gift-set-lexon-x-jean-michel-basquiat-happy-heart-287", cats: ['giftSets'] },
  { id: "lexon-gift-set-lexon-x-jean-michel-basquiat-in-italian", name: "LEXON - GIFT SET LEXON X JEAN-MICHEL BASQUIAT IN ITALIAN", ref: "1", price: 884, url: "/shop/personalized-gift-sets-80/lexon-gift-set-lexon-x-jean-michel-basquiat-in-italian-249", cats: ['giftSets'] },
  { id: "lexon-gift-set-lexon-x-jean-michel-basquiat-skull", name: "LEXON - GIFT SET LEXON X JEAN-MICHEL BASQUIAT SKULL", ref: "1", price: 884, url: "/shop/personalized-gift-sets-80/lexon-gift-set-lexon-x-jean-michel-basquiat-skull-286", cats: ['giftSets'] },
  { id: "lexon-gift-set-lexon-x-keith-haring-heart", name: "LEXON - GIFT SET LEXON X KEITH HARING HEART", ref: "1", price: 884, url: "/shop/personalized-gift-sets-80/lexon-gift-set-lexon-x-keith-haring-heart-247", cats: ['giftSets'] },
  { id: "lexon-horizon-diffuser", name: "LEXON - HORIZON DIFFUSER", ref: "2", price: 309, url: "/shop/home-accessories-76/lexon-horizon-diffuser-224", cats: ['homeAccessories'] },
  { id: "lexon-horizon-hanging-lamp", name: "LEXON - HORIZON HANGING LAMP", ref: "4", price: 309, url: "/shop/home-accessories-76/lexon-horizon-hanging-lamp-204", cats: ['homeAccessories', 'kids'] },
  { id: "lexon-luma-l", name: "LEXON - LUMA L", ref: "4", price: 397, url: "/shop/home-accessories-76/lexon-luma-l-202", cats: ['homeAccessories'] },
  { id: "lexon-luma-m", name: "LEXON - LUMA M", ref: "3", price: 265, url: "/shop/home-accessories-76/lexon-luma-m-164", cats: ['homeAccessories'] },
  { id: "lexon-luma-s", name: "LEXON - LUMA S", ref: "7", price: 176, url: "/shop/home-accessories-76/lexon-luma-s-166", cats: ['homeAccessories'] },
  { id: "lexon-luma-xl", name: "LEXON - LUMA XL", ref: "4", price: 574, url: "/shop/home-accessories-76/lexon-luma-xl-193", cats: ['homeAccessories'] },
  { id: "lexon-mano", name: "LEXON - MANO", ref: "5", price: 265, url: "/shop/home-accessories-76/lexon-mano-223", cats: ['homeAccessories'] },
  { id: "lexon-mina-l", name: "LEXON - MINA L", ref: "9", price: 309, url: "/shop/home-accessories-76/lexon-mina-l-159", cats: ['homeAccessories'] },
  { id: "lexon-mina-l-audio", name: "LEXON - MINA L AUDIO", ref: "6", price: 442, url: "/shop/home-accessories-76/lexon-mina-l-audio-156", cats: ['homeAccessories'] },
  { id: "lexon-mina-m", name: "LEXON - MINA M", ref: "7", price: 221, url: "/shop/home-accessories-76/lexon-mina-m-158", cats: ['homeAccessories'] },
  { id: "lexon-mina-sunrise", name: "LEXON - MINA SUNRISE", ref: "7", price: 353, url: "/shop/home-accessories-76/lexon-mina-sunrise-162", cats: ['homeAccessories'] },
  { id: "lexon-mino-speaker", name: "LEXON - MINO + - SPEAKER", ref: "14", price: 132, url: "/shop/technology-79/lexon-mino-speaker-210", cats: ['technology'] },
  { id: "lexon-mino-l", name: "LEXON - MINO + L", ref: "7", price: 221, url: "/shop/technology-79/lexon-mino-l-213", cats: ['technology'] },
  { id: "lexon-mino-s", name: "LEXON - MINO S", ref: "5", price: 88, url: "/shop/technology-79/lexon-mino-s-212", cats: ['technology'] },
  { id: "lexon-mino-t", name: "LEXON - MINO T", ref: "7", price: 221, url: "/shop/technology-79/lexon-mino-t-216", cats: ['technology'] },
  { id: "lexon-mino-x", name: "LEXON - MINO X", ref: "2", price: 176, url: "/shop/technology-79/lexon-mino-x-211", cats: ['technology'] },
  { id: "lexon-minut", name: "LEXON - MINUT", ref: "9", price: 176, url: "/shop/home-accessories-76/lexon-minut-231", cats: ['homeAccessories', 'kids'] },
  { id: "lexon-nomaday-power-bank", name: "LEXON - NOMADAY POWER BANK", ref: "6", price: 132, url: "/shop/technology-79/lexon-nomaday-power-bank-221", cats: ['technology'] },
  { id: "lexon-oblio", name: "LEXON - OBLIO", ref: "2", price: 353, url: "/shop/technology-79/lexon-oblio-225", cats: ['technology'] },
  { id: "lexon-oblio-box", name: "LEXON - OBLIO BOX", ref: "2", price: 265, url: "/shop/technology-79/lexon-oblio-box-226", cats: ['technology'] },
  { id: "lexon-orbe", name: "LEXON - ORBE", ref: "5", price: 353, url: "/shop/home-accessories-76/lexon-orbe-206", cats: ['homeAccessories', 'kids'] },
  { id: "lexon-oslo-energy", name: "LEXON - OSLO ENERGY +", ref: "3", price: 353, url: "/shop/technology-79/lexon-oslo-energy-214", cats: ['technology'] },
  { id: "lexon-packable-backpack", name: "LEXON - PACKABLE BACKPACK", ref: "1", price: 353, url: "/shop/bags-travel-74/lexon-packable-backpack-243", cats: ['bagsTravel'] },
  { id: "lexon-packable-duffle", name: "LEXON - PACKABLE DUFFLE", ref: "2", price: 265, url: "/shop/bags-travel-74/lexon-packable-duffle-244", cats: ['bagsTravel'] },
  { id: "lexon-peas-hub-c", name: "LEXON - PEAS HUB C", ref: "4", price: 132, url: "/shop/technology-79/lexon-peas-hub-c-220", cats: ['technology'] },
  { id: "lexon-power-sound", name: "LEXON - POWER SOUND", ref: "2", price: 353, url: "/shop/technology-79/lexon-power-sound-219", cats: ['technology'] },
  { id: "lexon-ray-clock", name: "LEXON - RAY CLOCK", ref: "5", price: 265, url: "/shop/home-accessories-76/lexon-ray-clock-209", cats: ['homeAccessories', 'kids'] },
  { id: "lexon-ray-speaker", name: "LEXON - RAY SPEAKER", ref: "5", price: 353, url: "/shop/kids-77/lexon-ray-speaker-208", cats: ['kids', 'technology'] },
  { id: "lexon-romino", name: "LEXON - ROMINO", ref: "5", price: 221, url: "/shop/kids-77/lexon-romino-227", cats: ['kids', 'technology'] },
  { id: "lexon-soft-power-magbank", name: "LEXON - SOFT POWER MAGBANK", ref: "4", price: 309, url: "/shop/technology-79/lexon-soft-power-magbank-218", cats: ['technology'] },
  { id: "lexon-steli", name: "LEXON - STELI", ref: "8", price: 442, url: "/shop/home-accessories-76/lexon-steli-205", cats: ['homeAccessories'] },
  { id: "lexon-terrace", name: "LEXON - TERRACE+", ref: "4", price: 574, url: "/shop/technology-79/lexon-terrace-160", cats: ['technology'] },
  { id: "lexon-tomorrow-expandable-bag", name: "LEXON - TOMORROW EXPANDABLE BAG", ref: "1", price: 221, url: "/shop/bags-travel-74/lexon-tomorrow-expandable-bag-237", cats: ['bagsTravel'] },
  { id: "lexon-twin-mino", name: "LEXON - TWIN MINO+", ref: "1", price: 221, url: "/shop/kids-77/lexon-twin-mino-217", cats: ['kids', 'technology'] },
  { id: "lexon-tykho-3", name: "LEXON - TYKHO 3", ref: "16", price: 265, url: "/shop/kids-77/lexon-tykho-3-215", cats: ['kids', 'technology'] },
  { id: "lexon-travel-bag-new-airline", name: "LEXON - Travel bag NEW AIRLINE", ref: "1", price: 265, url: "/shop/bags-travel-74/lexon-travel-bag-new-airline-235", cats: ['bagsTravel'] },
  { id: "lund-london-active-water-bottle", name: "Lund London Active Water Bottle", ref: "6", price: 150, url: "/shop/drinkware-73/lund-london-active-water-bottle-62", cats: ['drinkware'] },
  { id: "lund-london-active-water-bottle-250ml", name: "Lund London Active Water Bottle 250ml", ref: "4", price: 115, url: "/shop/drinkware-73/lund-london-active-water-bottle-250ml-64", cats: ['drinkware'] },
  { id: "lund-london-back-pencil-cases", name: "Lund London Back Pencil Cases", ref: "6", price: 59, url: "/shop/desk-stationery-75/lund-london-back-pencil-cases-47", cats: ['deskStationery', 'kids'] },
  { id: "lund-london-back-packs", name: "Lund London Back packs", ref: "5", price: 169, url: "/shop/desk-stationery-75/lund-london-back-packs-46", cats: ['deskStationery', 'kids'] },
  { id: "lund-london-bamboo", name: "Lund London Bamboo", ref: "6", price: 49, url: "/shop/drinkware-73/lund-london-bamboo-117", cats: ['drinkware'] },
  { id: "lund-london-bottles", name: "Lund London Bottles", ref: "3", price: 106, url: "/shop/drinkware-73/lund-london-bottles-48", cats: ['drinkware'] },
  { id: "lund-london-bowling", name: "Lund London Bowling", ref: "1", price: 147, url: "/shop/games-44/lund-london-bowling-119", cats: ['games'] },
  { id: "lund-london-card-set-game", name: "Lund London Card Set Game", ref: "1", price: 194, url: "/shop/games-44/lund-london-card-set-game-120", cats: ['games'] },
  { id: "lund-london-chess-and-draught-set", name: "Lund London Chess and Draught Set", ref: "1", price: 892, url: "/shop/games-44/lund-london-chess-and-draught-set-121", cats: ['games'] },
  { id: "lund-london-cleaning-brush", name: "Lund London Cleaning Brush", ref: "2", price: 53, url: "/shop/drinkware-73/lund-london-cleaning-brush-72", cats: ['drinkware'] },
  { id: "lund-london-collapsible-cup", name: "Lund London Collapsible Cup", ref: "6", price: 96, url: "/shop/drinkware-73/lund-london-collapsible-cup-66", cats: ['drinkware'] },
  { id: "lund-london-corn-hole", name: "Lund London Corn Hole", ref: "1", price: 120, url: "/shop/games-44/lund-london-corn-hole-84", cats: ['games'] },
  { id: "lund-london-curling", name: "Lund London Curling", ref: "1", price: 120 },
  { id: "lund-london-edge-frames-5x7", name: "Lund London Edge Frames 5x7", ref: "2", price: 154, url: "/shop/photo-frames-78/lund-london-edge-frames-5x7-147", cats: ['photoFrames'] },
  { id: "lund-london-instax-frames", name: "Lund London Instax Frames", ref: "2", price: 120, url: "/shop/photo-frames-78/lund-london-instax-frames-86", cats: ['photoFrames'] },
  { id: "lund-london-lite-water-bottle", name: "Lund London Lite Water Bottle", ref: "3", price: 119, url: "/shop/drinkware-73/lund-london-lite-water-bottle-58", cats: ['drinkware'] },
  { id: "lund-london-lunch-boxes", name: "Lund London Lunch Boxes", ref: "5", price: 154, url: "/shop/kids-77/lund-london-lunch-boxes-49", cats: ['kids'] },
  { id: "lund-london-luxe-straw-for-life", name: "Lund London Luxe Straw for Life", ref: "3", price: 49, url: "/shop/drinkware-73/lund-london-luxe-straw-for-life-149", cats: ['drinkware'] },
  { id: "lund-london-magnet-frames-5x7", name: "Lund London Magnet Frames  5x7", ref: "4", price: 154, url: "/shop/photo-frames-78/lund-london-magnet-frames-5x7-146", cats: ['photoFrames'] },
  { id: "lund-london-magnet-frames-8x10", name: "Lund London Magnet Frames  8x10", ref: "2", price: 220, url: "/shop/photo-frames-78/lund-london-magnet-frames-8x10-148", cats: ['photoFrames'] },
  { id: "lund-london-magnet-frames-4x6", name: "Lund London Magnet Frames 4x6", ref: "6", price: 132, url: "/shop/photo-frames-78/lund-london-magnet-frames-4x6-145", cats: ['photoFrames'] },
  { id: "lund-london-mini-wireless-lamp", name: "Lund London Mini Wireless Lamp", ref: "5", price: 169, url: "/shop/home-accessories-76/lund-london-mini-wireless-lamp-82", cats: ['homeAccessories', 'kids'] },
  { id: "lund-london-plant-travel-straws", name: "Lund London Plant Travel Straws", ref: "5", price: 79, url: "/shop/drinkware-73/lund-london-plant-travel-straws-76", cats: ['drinkware'] },
  { id: "lund-london-shuffle-board", name: "Lund London Shuffle Board", ref: "1", price: 120, url: "/shop/games-44/lund-london-shuffle-board-295", cats: ['games'] },
  { id: "lund-london-skittle-bottle-lids", name: "Lund London Skittle Bottle Lids", ref: "12", price: 49, url: "/shop/drinkware-73/lund-london-skittle-bottle-lids-57", cats: ['drinkware'] },
  { id: "lund-london-skittle-bottle-series-2-0-300ml-10oz", name: "Lund London Skittle Bottle Series 2.0- 300ml/ 10oz", ref: "4", price: 170, url: "/shop/drinkware-73/lund-london-skittle-bottle-series-2-0-300ml-10oz-153", cats: ['drinkware'] },
  { id: "lund-london-skittle-bottle-series-2-0-500ml-17oz", name: "Lund London Skittle Bottle Series 2.0- 500ml/ 17oz", ref: "2", price: 204, url: "/shop/drinkware-73/lund-london-skittle-bottle-series-2-0-500ml-17oz-154", cats: ['drinkware'] },
  { id: "lund-london-skittle-bottles", name: "Lund London Skittle Bottles", ref: "17", price: 169, url: "/shop/drinkware-73/lund-london-skittle-bottles-51", cats: ['drinkware'] },
  { id: "lund-london-skittle-bottles-300ml-solid-colors", name: "Lund London Skittle Bottles 300ml (Solid Colors)", ref: "4", price: 169, url: "/shop/drinkware-73/lund-london-skittle-bottles-300ml-solid-colors-52", cats: ['drinkware'] },
  { id: "lund-london-skittle-bottles-500ml", name: "Lund London Skittle Bottles 500ml", ref: "6", price: 200, url: "/shop/drinkware-73/lund-london-skittle-bottles-500ml-53", cats: ['drinkware'] },
  { id: "lund-london-skittle-bottles-750ml", name: "Lund London Skittle Bottles 750ml", ref: "2", price: 239, url: "/shop/drinkware-73/lund-london-skittle-bottles-750ml-54", cats: ['drinkware'] },
  { id: "lund-london-skittle-bottles-stripes-300ml", name: "Lund London Skittle Bottles Stripes 300ml", ref: "2", price: 169, url: "/shop/drinkware-73/lund-london-skittle-bottles-stripes-300ml-150", cats: ['drinkware'] },
  { id: "lund-london-skittle-bottles-stripes-500ml", name: "Lund London Skittle Bottles Stripes 500ml", ref: "2", price: 200, url: "/shop/drinkware-73/lund-london-skittle-bottles-stripes-500ml-55", cats: ['drinkware'] },
  { id: "lund-london-skittle-water-bottle-500ml-pink-mint-customizabl", name: "Lund London Skittle Water Bottle (500ml) – Pink & Mint | Customizable", ref: "1", price: 300, url: "/shop/drinkware-73/lund-london-skittle-water-bottle-500ml-pink-mint-customizable-293", cats: ['drinkware'] },
  { id: "lund-london-sport-water-bottles", name: "Lund London Sport water bottles", ref: "4", price: 159, url: "/shop/drinkware-73/lund-london-sport-water-bottles-60", cats: ['drinkware', 'kids'] },
  { id: "lund-london-stacking-mugs", name: "Lund London Stacking Mugs", ref: "4", price: 79, url: "/shop/drinkware-73/lund-london-stacking-mugs-88", cats: ['drinkware'] },
  { id: "lund-london-straw-for-life", name: "Lund London Straw for Life", ref: "8", price: 88, url: "/shop/drinkware-73/lund-london-straw-for-life-74", cats: ['drinkware'] },
  { id: "lund-london-travel-mug-240ml", name: "Lund London Travel Mug 240ml", ref: "5", price: 132, url: "/shop/drinkware-73/lund-london-travel-mug-240ml-68", cats: ['drinkware'] },
  { id: "lund-london-travel-mug-350ml", name: "Lund London Travel Mug 350ml", ref: "7", price: 159, url: "/shop/drinkware-73/lund-london-travel-mug-350ml-151", cats: ['drinkware'] },
  { id: "lund-london-wireless-desktop-fan", name: "Lund London Wireless Desktop Fan", ref: "3", price: 169, url: "/shop/desk-stationery-75/lund-london-wireless-desktop-fan-78", cats: ['deskStationery', 'homeAccessories'] },
  { id: "lund-london-wireless-lamp-and-charger", name: "Lund London Wireless Lamp and Charger", ref: "5", price: 407, url: "/shop/home-accessories-76/lund-london-wireless-lamp-and-charger-80", cats: ['homeAccessories', 'kids'] },
  { id: "mob-animal-light", name: "MOB Animal Light", ref: "1", price: 135, image: false, url: "/shop/home-accessories-76/mob-animal-light-135", cats: ['homeAccessories', 'kids'] },
  { id: "mob-astro-bluetooth-speaker", name: "MOB Astro Bluetooth Speaker", ref: "1", price: 162, url: "/shop/kids-77/mob-astro-bluetooth-speaker-116", cats: ['kids', 'technology'] },
  { id: "mob-astro-cable-4-in-1", name: "MOB Astro Cable 4 in 1", ref: "1", price: 108, image: false, url: "/shop/technology-79/mob-astro-cable-4-in-1-124", cats: ['technology'] },
  { id: "mob-billy-clock", name: "MOB Billy Clock", ref: "4", price: 271, image: false, url: "/shop/kids-77/mob-billy-clock-10", cats: ['kids', 'technology'] },
  { id: "mob-creative-kit-memory-booklet-4-paper-rolls-3-classical-1-", name: "MOB CREATIVE KIT: MEMORY BOOKLET+ 4 PAPER ROLLS  (3  CLASSICAL + 1 STICKER)", ref: "1", price: 71, image: false, url: "/shop/personalized-gift-sets-80/mob-creative-kit-memory-booklet-4-paper-rolls-3-classical-1-sticker-132", cats: ['giftSets'] },
  { id: "mob-cosmo-bubbly", name: "MOB Cosmo Bubbly", ref: "1", price: 217, image: false, url: "/shop/home-accessories-76/mob-cosmo-bubbly-138", cats: ['homeAccessories', 'kids', 'technology'] },
  { id: "mob-dancing-animal-speaker", name: "MOB Dancing Animal speaker", ref: "5", price: 163, image: false, url: "/shop/home-accessories-76/mob-dancing-animal-speaker-129", cats: ['homeAccessories', 'kids', 'technology'] },
  { id: "mob-dancing-clock", name: "MOB Dancing Clock", ref: "2", price: 326, image: false, url: "/shop/home-accessories-76/mob-dancing-clock-143", cats: ['homeAccessories', 'kids', 'technology'] },
  { id: "mob-enceinte-reveil-vs-80", name: "MOB Enceinte & réveil VS-80", ref: "2", price: 177, image: false, url: "/shop/home-accessories-76/mob-enceinte-reveil-vs-80-127", cats: ['homeAccessories', 'technology'] },
  { id: "mob-enceinte-rs-80", name: "MOB Enceinte RS-80", ref: "2", price: 141, image: false, url: "/shop/home-accessories-76/mob-enceinte-rs-80-126", cats: ['homeAccessories', 'kids', 'technology'] },
  { id: "mob-kit-de-recharge-pixiprint-refill-kit", name: "MOB KIT DE RECHARGE PIXIPRINT - REFILL KIT", ref: "1", price: 101.85, image: false, url: "/shop/photo-frames-78/mob-kit-de-recharge-pixiprint-refill-kit-142", cats: ['photoFrames'] },
  { id: "mob-mega-mush-speaker", name: "MOB Mega Mush Speaker", ref: "3", price: 163.8, image: false, url: "/shop/kids-77/mob-mega-mush-speaker-134", cats: ['kids', 'technology'] },
  { id: "mob-mini-stellar-white", name: "MOB Mini Stellar - White", ref: "1", price: 217.35, image: false, url: "/shop/home-accessories-76/mob-mini-stellar-white-144", cats: ['homeAccessories', 'kids'] },
  { id: "mob-pixiprint-click-print", name: "MOB Pixiprint - Click & Print", ref: "4", price: 434, image: false, url: "/shop/kids-77/mob-pixiprint-click-print-130", cats: ['kids', 'photoFrames'] },
  { id: "mob-power-pets-4800-mah", name: "MOB Power Pets 4800 mAh", ref: "3", price: 163, image: false, url: "/shop/technology-79/mob-power-pets-4800-mah-128", cats: ['technology'] },
  { id: "mob-reveil-tvc-80", name: "MOB Reveil TVC-80", ref: "1", price: 141, image: false, url: "/shop/home-accessories-76/mob-reveil-tvc-80-125", cats: ['homeAccessories', 'kids', 'technology'] },
  { id: "mob-space-rover-conquest-of-space", name: "MOB Space Rover - Conquest of space", ref: "1", price: 327, image: false, url: "/shop/home-accessories-76/mob-space-rover-conquest-of-space-133", cats: ['homeAccessories', 'kids', 'technology'] },
  { id: "mob-stellar-light", name: "MOB Stellar Light", ref: "1", price: 271, image: false, url: "/shop/home-accessories-76/mob-stellar-light-140", cats: ['homeAccessories', 'kids'] },
  { id: "mob-stellar-light-silver", name: "MOB Stellar Light Silver", ref: "1", price: 271, image: false, url: "/shop/home-accessories-76/mob-stellar-light-silver-141", cats: ['homeAccessories', 'kids'] },
  { id: "mob-travel-kit-pixiprint-case-4-paper-rolls-3-classical-1-st", name: "MOB TRAVEL KIT: PIXIPRINT CASE + 4  PAPER ROLLS  (3 CLASSICAL + 1 STICKER)", ref: "1", price: 162, image: false, url: "/shop/photo-frames-78/mob-travel-kit-pixiprint-case-4-paper-rolls-3-classical-1-sticker-131", cats: ['photoFrames', 'giftSets'] },
  { id: "mob-cutie-clock-connect-with-app", name: "MOB-Cutie Clock Connect with app", ref: "2", price: 207, url: "/shop/home-accessories-76/mob-cutie-clock-connect-with-app-284", cats: ['homeAccessories', 'kids', 'technology'] },
  { id: "mob-enceinte-karaoke-ks-80-blue", name: "MOB-Enceinte Karaoke KS-80 Blue", ref: "1", price: 261, url: "/shop/kids-77/mob-enceinte-karaoke-ks-80-blue-282", cats: ['kids', 'technology'] },
  { id: "mob-glowy-lamp-torche", name: "MOB-Glowy Lamp Torche", ref: "1", price: 109, url: "/shop/home-accessories-76/mob-glowy-lamp-torche-281", cats: ['homeAccessories', 'kids'] },
  { id: "mob-micro-groovy", name: "MOB-Micro Groovy", ref: "1", price: 182, url: "/shop/kids-77/mob-micro-groovy-280", cats: ['kids', 'technology'] },
  { id: "mob-singing-party-karaoke-luminouse", name: "MOB-Singing Party Karaoke Luminouse", ref: "3", price: 271, url: "/shop/kids-77/mob-singing-party-karaoke-luminouse-283", cats: ['kids', 'technology'] },
  { id: "message-in-the-box", name: "Message In The Box", ref: "5", price: 663, image: false, url: "/shop/home-accessories-76/message-in-the-box-258", cats: ['homeAccessories', 'kids'] },
  { id: "message-in-the-bulb-mitb-1", name: "Message In The Bulb(MITB)-1", ref: "6", price: 142, url: "/shop/home-accessories-76/message-in-the-bulb-mitb-1-189", cats: ['homeAccessories', 'kids'] },
  { id: "message-in-the-bulb-mitb-10", name: "Message In The Bulb(MITB)-10", ref: "17", price: 261 },
  { id: "message-in-the-bulb-mitb-11", name: "Message In The Bulb(MITB)-11", ref: "4", price: 285, url: "/shop/home-accessories-76/message-in-the-bulb-mitb-11-253", cats: ['homeAccessories', 'kids'] },
  { id: "message-in-the-bulb-mitb-12", name: "Message In The Bulb(MITB)-12", ref: "3", price: 289, image: false, url: "/shop/home-accessories-76/message-in-the-bulb-mitb-12-254", cats: ['homeAccessories', 'kids'] },
  { id: "message-in-the-bulb-mitb-2", name: "Message In The Bulb(MITB)-2", ref: "9", price: 156, image: false, url: "/shop/home-accessories-76/message-in-the-bulb-mitb-2-194", cats: ['homeAccessories', 'kids'] },
  { id: "message-in-the-bulb-mitb-3", name: "Message In The Bulb(MITB)-3", ref: "3", price: 157, image: false },
  { id: "message-in-the-bulb-mitb-4", name: "Message In The Bulb(MITB)-4", ref: "3", price: 166, image: false, url: "/shop/home-accessories-76/message-in-the-bulb-mitb-4-196", cats: ['homeAccessories', 'kids'] },
  { id: "message-in-the-bulb-mitb-5", name: "Message In The Bulb(MITB)-5", ref: "13", price: 231, image: false, url: "/shop/home-accessories-76/message-in-the-bulb-mitb-5-198", cats: ['homeAccessories', 'kids'] },
  { id: "message-in-the-bulb-mitb-6", name: "Message In The Bulb(MITB)-6", ref: "8", price: 234, url: "/shop/home-accessories-76/message-in-the-bulb-mitb-6-199", cats: ['homeAccessories', 'kids'] },
  { id: "message-in-the-bulb-mitb-7", name: "Message In The Bulb(MITB)-7", ref: "2", price: 245, image: false, url: "/shop/home-accessories-76/message-in-the-bulb-mitb-7-200", cats: ['homeAccessories', 'kids'] },
  { id: "message-in-the-bulb-mitb-8", name: "Message In The Bulb(MITB)-8", ref: "8", price: 253, image: false, url: "/shop/home-accessories-76/message-in-the-bulb-mitb-8-201", cats: ['homeAccessories', 'kids'] },
  { id: "message-in-the-bulb-mitb-9", name: "Message In The Bulb(MITB)-9", ref: "6", price: 255, url: "/shop/home-accessories-76/message-in-the-bulb-mitb-9-250", cats: ['homeAccessories', 'kids'] },
  { id: "message-in-the-bulb-mitb-lamp-base", name: "Message In The Bulb(MITB)-Lamp Base", ref: "9", price: 152, url: "/shop/home-accessories-76/message-in-the-bulb-mitb-lamp-base-192", cats: ['homeAccessories', 'kids'] },
  { id: "message-in-the-bulb-mitb-pop-table-lamp-base-pink-with-white", name: "Message In The Bulb(MITB)-POP TABLE LAMP BASE - PINK WITH WHITE", ref: "1", price: 149, image: false, url: "/shop/home-accessories-76/message-in-the-bulb-mitb-pop-table-lamp-base-pink-with-white-191", cats: ['homeAccessories', 'kids'] },
  { id: "message-in-the-bulb-lamp-base-madison", name: "Message In The Bulb-Lamp Base (Madison)", ref: "3", price: 219, image: false, url: "/shop/home-accessories-76/message-in-the-bulb-lamp-base-madison-197", cats: ['homeAccessories', 'kids'] },
  { id: "message-in-the-frame-led-neon-sign-crazy-in-love", name: "Message In The Frame-LED NEON SIGN - CRAZY IN LOVE", ref: "1", price: 926, image: false, url: "/shop/home-accessories-76/message-in-the-frame-led-neon-sign-crazy-in-love-259", cats: ['homeAccessories', 'kids'] },
  { id: "message-in-the-tube", name: "Message In The Tube", ref: "5", price: 337, image: false, url: "/shop/home-accessories-76/message-in-the-tube-256", cats: ['homeAccessories', 'kids'] },
  { id: "message-in-the-tube-black-marble-table-lamp-support-black-al", name: "Message In the Tube-BLACK MARBLE TABLE LAMP SUPPORT & BLACK ALUMINUM HANDLE", ref: "1", price: 375, image: false, url: "/shop/home-accessories-76/message-in-the-tube-black-marble-table-lamp-support-black-aluminum-handle-290", cats: ['homeAccessories', 'kids'] },
  { id: "pantone-new-notebook-with-pencil-lined", name: "PANTONE  New Notebook with Pencil (Lined)", ref: "8", price: 289, url: "/shop/desk-stationery-75/pantone-new-notebook-with-pencil-lined-184", cats: ['deskStationery'] },
  { id: "pantone-booklet-set-of-2", name: "PANTONE Booklet Set of 2", ref: "2", price: 67, url: "/shop/desk-stationery-75/pantone-booklet-set-of-2-276", cats: ['deskStationery'] },
  { id: "pantone-bowl", name: "PANTONE Bowl", ref: "4", price: 105, url: "/shop/desk-stationery-75/pantone-bowl-178", cats: ['deskStationery'] },
  { id: "pantone-cortado-set-of-4", name: "PANTONE Cortado Set of 4", ref: "1", price: 420, url: "/shop/drinkware-73/pantone-cortado-set-of-4-275", cats: ['drinkware'] },
  { id: "pantone-cortado-thermo-cup", name: "PANTONE Cortado Thermo Cup", ref: "5", price: 100, url: "/shop/drinkware-73/pantone-cortado-thermo-cup-175", cats: ['drinkware'] },
  { id: "pantone-credit-card-holder", name: "PANTONE Credit Card Holder", ref: "8", price: 50, url: "/shop/desk-stationery-75/pantone-credit-card-holder-187", cats: ['deskStationery'] },
  { id: "pantone-drinking-water-bottle-tritan", name: "PANTONE Drinking Water Bottle Tritan", ref: "8", price: 113, url: "/shop/drinkware-73/pantone-drinking-water-bottle-tritan-279", cats: ['drinkware'] },
  { id: "pantone-eraser", name: "PANTONE Eraser", ref: "4", price: 21, url: "/shop/desk-stationery-75/pantone-eraser-188", cats: ['deskStationery'] },
  { id: "pantone-espresso-cup", name: "PANTONE Espresso Cup", ref: "19", price: 71, url: "/shop/drinkware-73/pantone-espresso-cup-169", cats: ['drinkware'] },
  { id: "pantone-jar-container", name: "PANTONE Jar Container", ref: "9", price: 231, url: "/shop/desk-stationery-75/pantone-jar-container-183", cats: ['deskStationery'] },
  { id: "pantone-key-chain-long", name: "PANTONE Key Chain Long", ref: "17", price: 60, url: "/shop/bags-travel-74/pantone-key-chain-long-177", cats: ['bagsTravel'] },
  { id: "pantone-key-chain-short", name: "PANTONE Key Chain Short", ref: "3", price: 58, url: "/shop/bags-travel-74/pantone-key-chain-short-176", cats: ['bagsTravel'] },
  { id: "pantone-latte-thermo-cup", name: "PANTONE LATTE THERMO CUP", ref: "6", price: 105, url: "/shop/drinkware-73/pantone-latte-thermo-cup-173", cats: ['drinkware'] },
  { id: "pantone-large-notebook", name: "PANTONE Large Notebook", ref: "2", price: 92, url: "/shop/desk-stationery-75/pantone-large-notebook-278", cats: ['deskStationery'] },
  { id: "pantone-mug-limited-edition", name: "PANTONE MUG (Limited Edition)", ref: "6", price: 126, url: "/shop/drinkware-73/pantone-mug-limited-edition-168", cats: ['drinkware'] },
  { id: "pantone-machiato-cup", name: "PANTONE Machiato Cup", ref: "5", price: 71, url: "/shop/drinkware-73/pantone-machiato-cup-174", cats: ['drinkware'] },
  { id: "pantone-mug", name: "PANTONE Mug", ref: "19", price: 92, url: "/shop/drinkware-73/pantone-mug-167", cats: ['drinkware'] },
  { id: "pantone-new-notebook-with-pencil-unlined", name: "PANTONE New Notebook with Pencil (Unlined)", ref: "9", price: 289, url: "/shop/desk-stationery-75/pantone-new-notebook-with-pencil-unlined-185", cats: ['deskStationery'] },
  { id: "pantone-pencil-cup", name: "PANTONE Pencil Cup", ref: "8", price: 92, url: "/shop/desk-stationery-75/pantone-pencil-cup-180", cats: ['deskStationery'] },
  { id: "pantone-ruler", name: "PANTONE Ruler", ref: "8", price: 168, url: "/shop/desk-stationery-75/pantone-ruler-179", cats: ['deskStationery'] },
  { id: "pantone-small-notebook", name: "PANTONE Small Notebook", ref: "2", price: 79, url: "/shop/desk-stationery-75/pantone-small-notebook-277", cats: ['deskStationery'] },
  { id: "pantone-sticky-note", name: "PANTONE Sticky Note", ref: "2", price: 420, url: "/shop/desk-stationery-75/pantone-sticky-note-261", cats: ['deskStationery'] },
  { id: "pantone-tablet-sleeve-13", name: "PANTONE Tablet Sleeve 13\"", ref: "3", price: 205, url: "/shop/bags-travel-74/pantone-tablet-sleeve-13-186", cats: ['bagsTravel'] },
  { id: "pantone-tea-cup", name: "PANTONE Tea Cup", ref: "15", price: 100, url: "/shop/drinkware-73/pantone-tea-cup-172", cats: ['drinkware'] },
  { id: "pantone-thermo-steel-drinking-bottle", name: "PANTONE Thermo Steel Drinking Bottle", ref: "8", price: 168, image: false, url: "/shop/drinkware-73/pantone-thermo-steel-drinking-bottle-20", cats: ['drinkware'] },
  { id: "pantone-to-go-cup", name: "PANTONE To Go cup", ref: "8", price: 168, url: "/shop/drinkware-73/pantone-to-go-cup-181", cats: ['drinkware'] },
  { id: "pantone-travel-umbrella-in-a-smart-box-with-a-long-logo-key-", name: "PANTONE Travel Umbrella in a smart Box with a Long Logo Key Chain", ref: "4", price: 147, url: "/shop/bags-travel-74/pantone-travel-umbrella-in-a-smart-box-with-a-long-logo-key-chain-182", cats: ['bagsTravel'] },
  { id: "tips", name: "Tips", ref: "TIPS", price: 1, image: false },
];

// The product's own page on the store, e.g.
// https://store.thename.ae/shop/bags-travel-74/lexon-backpack-premium-backpack-233
// `url` is the path captured from the store by
// scripts/import-store-categories.mjs; that trailing number is the store's own
// product id and cannot be derived from anything in the spreadsheet, so a
// product the script could not match has none and falls back to the shop
// front rather than to a link that would 404.
export const productUrl = (p) => (p.url ? `${site.shopUrl}${p.url}` : site.shopUrl);

// Everything the page needs to know about a product's picture in one place,
// so no component has to remember the folder or the extension.
export const storeImage = (p) => (p.image === false ? null : `/media/store/${p.id}.webp`);

// 'all' is every product; any other shelf is everything whose `cats` includes
// it. A product can be on several, so this is `includes`, not equality.
export const productsInCategory = (catId) =>
  catId === 'all' ? storeProducts : storeProducts.filter((p) => p.cats?.includes(catId));
