// Media registry — maps every image slot on the site to a file in
// `public/media/`. Files in `public/` are served as-is, so adding artwork is
// a drag-and-drop job: save the file under the name below and it appears.
//
// Until a file exists the request 404s and <ImagePlaceholder> quietly falls
// back to its dashed placeholder, so listing paths up front is safe — the
// list below doubles as the shot list of what photography is still needed.
//
// Keys mirror the ids used elsewhere (page data.js + i18n), so a slot's copy
// and its image are always looked up by the same key.
const BASE = '/media';

// The "Brand Communication" film — the Agency row's film, and also the Home
// hero's on phones (portrait 4:5, so it fills a tall screen far better than
// the 16:9 showreel cropped to a sliver).
const agencyFilm = {
  src: `${BASE}/videos/brand-communication.mp4`,
  poster: `${BASE}/videos/brand-communication-poster.jpg`,
};

export const media = {
  // Full-bleed hero film on the Home page — the R Investments showreel, its
  // first 1:55 (3450 frames; the logo end card after that was cut, so the
  // loop restarts on a scene cut from the "Let's forge a path…" card).
  // 1600x900, CRF 31, no audio, +faststart (the command under
  // serviceVideos, plus -vf scale=1600:-2); 16 MB. The poster IS frame 0, so
  // the swap from poster to playing film is invisible.
  hero: {
    src: `${BASE}/videos/hero.mp4`,
    poster: `${BASE}/videos/hero-poster.jpg`,
  },
  // On phones (≤700px) the hero plays the Agency film instead (agencyFilm).
  heroPhone: agencyFilm,

  // The picture in Home's "Customize Yours" section (CustomizeSection.jsx),
  // shown wide at 16:7.
  customize: `${BASE}/photos/home/customize.jpg`,

  // Home page "What we do" pillar rows — keys match pages/Home/data.js
  // `pillars` id. The dashed ImagePlaceholder shows until each file exists.
  services: {
    corporateGifts: `${BASE}/photos/home/corporate-gifts.jpg`,
    brands: `${BASE}/photos/home/brands.jpg`,
    agency: `${BASE}/photos/home/agency.jpg`,
    events: `${BASE}/photos/home/events.jpg`,
    fnb: `${BASE}/photos/home/fnb.jpg`,
  },
  // A pillar row with an entry here shows this VIDEO instead of its image
  // above, in the same 4:5 frame every row uses (ROW_RATIO in Home.jsx). The films
  // live in public/media/home/, COMPRESSED for page speed — H.264 High, no
  // audio, +faststart so they start playing before they have fully downloaded:
  //   ffmpeg -i in.mp4 -an -c:v libx264 -preset slow -crf <N> -profile:v high
  //          -pix_fmt yuv420p -movflags +faststart out.mp4
  // The uncompressed originals are in git history (commit 176ea44). Each
  // poster is a frame from 2s in. public/media/home/marketing-strategy.mp4 is
  // currently unused — add it here under a pillar id to show it.
  serviceVideos: {
    // Vertex showroom + workshop reel (from "Vertex IPAD", 1080x1920), the
    // first 2:45 — the last seconds after that were cut. Pre-cropped to the
    // centre 4:5 (crop=1080:1350,scale=768:960) so the file holds only what
    // the frame shows; CRF 28, 18 MB, SSIM 0.985.
    corporateGifts: {
      src: `${BASE}/videos/vertex.mp4`,
      poster: `${BASE}/videos/vertex-poster.jpg`,
    },
    // "The Name Events IPAD" (1080x1920, 5:59) with two cuts: 4:26 to the
    // end of the NAJ Academy contact card (frames 7980-8128, through 4:30.97
    // where the next shot starts), and 5:45 to the end. 5:40 left. Same 4:5
    // centre crop as Vertex; CRF 30 for its length, 33 MB.
    events: {
      src: `${BASE}/videos/events.mp4`,
      poster: `${BASE}/videos/events-poster.jpg`,
    },
    // "Brand Communication" — 1024x1280 (already 4:5, shown uncropped), 92s,
    // CRF 28, SSIM 0.993.
    agency: agencyFilm,
  },

  // Customization methods shown in the Home page "how it works" panel —
  // keys match pages/Home/data.js `customMethods` id. Each wants a close-up
  // of that technique on a finished product.
  methods: {
    engraving: `${BASE}/photos/methods/engraving.jpg`,
    print: `${BASE}/photos/methods/print.jpg`,
    embroidery: `${BASE}/photos/methods/embroidery.jpg`,
    emboss: `${BASE}/photos/methods/emboss.jpg`,
  },

  // Menu dishes — keys match pages/Menu/data.js item ids.
  menu: {
    breadConservaOil: `${BASE}/photos/cafe/bread-conserva-oil.jpg`,
    anchovyToast: `${BASE}/photos/cafe/anchovy-toast.jpg`,
    oliveOilCake: `${BASE}/photos/cafe/olive-oil-cake.jpg`,
    whiteBeans: `${BASE}/photos/cafe/white-beans.jpg`,
    roastCarrot: `${BASE}/photos/cafe/roast-carrot.jpg`,
    porkSandwich: `${BASE}/photos/cafe/pork-sandwich.jpg`,
    houseFilter: `${BASE}/photos/cafe/house-filter.jpg`,
    flatWhite: `${BASE}/photos/cafe/flat-white.jpg`,
    citrusSoda: `${BASE}/photos/cafe/citrus-soda.jpg`,
  },

  // Shop products — keys match the `code` in data/catalogue.js.
  shop: {
    'TN-101': `${BASE}/photos/gift-sets/tn-101.jpg`,
    'TN-102': `${BASE}/photos/gift-sets/tn-102.jpg`,
    'TN-103': `${BASE}/photos/gift-sets/tn-103.jpg`,
    'TN-201': `${BASE}/photos/gift-sets/tn-201.jpg`,
    'TN-202': `${BASE}/photos/gift-sets/tn-202.jpg`,
    'TN-203': `${BASE}/photos/gift-sets/tn-203.jpg`,
    'TN-301': `${BASE}/photos/gift-sets/tn-301.jpg`,
    'TN-302': `${BASE}/photos/gift-sets/tn-302.jpg`,
    'TN-303': `${BASE}/photos/gift-sets/tn-303.jpg`,
    'TN-401': `${BASE}/photos/gift-sets/tn-401.jpg`,
    'TN-402': `${BASE}/photos/gift-sets/tn-402.jpg`,
    'TN-501': `${BASE}/photos/gift-sets/tn-501.jpg`,
    'TN-502': `${BASE}/photos/gift-sets/tn-502.jpg`,
    'TN-503': `${BASE}/photos/gift-sets/tn-503.jpg`,
    'TN-504': `${BASE}/photos/gift-sets/tn-504.jpg`,
  },

  // Kids page — the hero and one image per offer block (keys match
  // pages/Kids/data.js `kidsOffers` id).
  kids: {
    hero: `${BASE}/photos/events/hero.jpg`,
    offers: {
      backToSchool: `${BASE}/photos/events/back-to-school.jpg`,
      newBaby: `${BASE}/photos/events/new-baby.jpg`,
      birthdays: `${BASE}/photos/events/birthdays.jpg`,
    },

    // The Little Creators activation. `video` is the opening film (kids
    // showing their products, the Two T's pieces, the Hearts collection
    // close-ups) and `videoPoster` its still; `shots` is the gallery, keys
    // matching `activationShots` in pages/Kids/data.js. `interviews` is the
    // second film, the kids interviews under the Two T's story.
    activation: {
      video: `${BASE}/videos/activation.mp4`,
      videoPoster: `${BASE}/videos/activation-poster.jpg`,
      shots: {
        showingProducts: `${BASE}/photos/events/activation-showing-products.jpg`,
        theCollection: `${BASE}/photos/events/activation-the-collection.jpg`,
        mugs: `${BASE}/photos/events/activation-mugs.jpg`,
        withParents: `${BASE}/photos/events/activation-with-parents.jpg`,
        makingTogether: `${BASE}/photos/events/activation-making-together.jpg`,
        onTheStand: `${BASE}/photos/events/activation-on-the-stand.jpg`,
      },
      interviews: `${BASE}/videos/activation-interviews.mp4`,
      interviewsPoster: `${BASE}/videos/activation-interviews-poster.jpg`,
    },
  },

  // The Name's own artwork, cropped to its edges from the guideline exports.
  // Each lockup comes in two inks so it always contrasts with its ground —
  // `dark` (charcoal) for light grounds, `yellow` for dark ones; the
  // choice is made in components/Logo.jsx. The N mark comes as an outline
  // (inside the Home/Cafe bubbles) and a filled tile (the browser tab icon in
  // index.html). The chat button uses the bare dark secondary logo instead.
  brand: {
    logos: {
      dark: { main: `${BASE}/the-name/logo-main-dark.png`, secondary: `${BASE}/the-name/logo-secondary-dark.png` },
      yellow: { main: `${BASE}/the-name/logo-main-yellow.png`, secondary: `${BASE}/the-name/logo-secondary-yellow.png` },
    },
    markOutline: `${BASE}/the-name/mark-outline.png`,
    markFilled: `${BASE}/the-name/mark-filled.png`,
    // "From The Name, to your Name" lettering — UNUSED since the Home hero
    // and About tagline became live type; kept for reuse.
    tagline: `${BASE}/the-name/from-the-name-to-your-name.png`,
  },

  // Partner-brand logos for the Home logo strip — keys match data/brands.js
  // `id`. Taken from each brand's own site and stored locally (their CDN
  // paths are versioned, so hot-linking would break on their next deploy).
  // Gingko only publishes a white-on-black logo, so gingko.png is that
  // artwork converted to dark ink on transparency for our light strip.
  // gingko.png and lund-london.png are also cropped to the artwork's edges —
  // the originals carried wide empty margins that made them render small.
  // If a file goes missing the strip shows the brand name as a wordmark.
  brands: {
    lexon: `${BASE}/partner-brands/logos/lexon.svg`,
    lundLondon: `${BASE}/partner-brands/logos/lund-london.png`,
    pantone: `${BASE}/partner-brands/logos/pantone.svg`,
    korin: `${BASE}/partner-brands/logos/korin.png`,
    kreafunk: `${BASE}/partner-brands/logos/kreafunk.png`,
    gingko: `${BASE}/partner-brands/logos/gingko.png`,
    prodir: `${BASE}/partner-brands/logos/prodir.svg`,
    // The MENA partner slide's other brands (Oct 2026). Each is the brand's
    // own current logo: from its official site (Cerruti 1881, Festina,
    // Christian Lacroix, Ungaro, Pitaka, Makito, MOB, Senator) or Wikimedia
    // Commons (Hugo Boss, Cacharel, Nina Ricci, Ice-Watch). Christian
    // Lacroix, Ungaro and Makito publish only WHITE logos (for dark site
    // headers); these are the same artwork recoloured to one-colour black.
    // Senator's is its site header logo, 131x46 — swap in a larger file
    // when the brand sends one. SOL'S has no file yet (wordmark).
    cerruti1881: `${BASE}/partner-brands/logos/cerruti-1881.svg`,
    hugoBoss: `${BASE}/partner-brands/logos/hugo-boss.svg`,
    cacharel: `${BASE}/partner-brands/logos/cacharel.svg`,
    ninaRicci: `${BASE}/partner-brands/logos/nina-ricci.svg`,
    festina: `${BASE}/partner-brands/logos/festina.svg`,
    iceWatch: `${BASE}/partner-brands/logos/ice-watch.svg`,
    christianLacroix: `${BASE}/partner-brands/logos/christian-lacroix.png`,
    senator: `${BASE}/partner-brands/logos/senator.png`,
    ungaro: `${BASE}/partner-brands/logos/ungaro.svg`,
    pitaka: `${BASE}/partner-brands/logos/pitaka.svg`,
    makito: `${BASE}/partner-brands/logos/makito.png`,
    mob: `${BASE}/partner-brands/logos/mob.png`,
  },

  // Brands page — one photo per featured product (keys match
  // pages/Brands/data.js `featuredBrands[].products`). Taken from the brands'
  // own 2025/26 catalogues (Copenhagen Design's PANTONE Lifestyle Collection,
  // Lund Design House, Prodir Novelties 2026), resized to 900px WebP.
  brandProducts: {
    pantoneOriginalMug: `${BASE}/partner-brands/products/pantone-original-mug.webp`,
    pantoneGatefoldNotebook: `${BASE}/partner-brands/products/pantone-gatefold-notebook.webp`,
    skittleWaterBottle: `${BASE}/partner-brands/products/skittle-water-bottle.webp`,
    lundWirelessLamp: `${BASE}/partner-brands/products/lund-wireless-lamp.webp`,
    prodirMs8: `${BASE}/partner-brands/products/prodir-ms8.webp`,
    prodirMc01: `${BASE}/partner-brands/products/prodir-mc01.webp`,
    // From the 2026 brand catalogues on vertex.ae/catalogues (Main
    // Catalogue), cropped to 4:5 from the catalogue pages; Lexon, SOL'S and
    // Makito are the catalogues' own embedded photos.
    cerrutiHudsonTravelBag: `${BASE}/partner-brands/products/cerruti-hudson-travel-bag.webp`,
    cerrutiEastonBackpack: `${BASE}/partner-brands/products/cerruti-easton-backpack.webp`,
    hugoBossElementalSpeaker: `${BASE}/partner-brands/products/hugo-boss-elemental-speaker.webp`,
    hugoBossVarsityUmbrella: `${BASE}/partner-brands/products/hugo-boss-varsity-umbrella.webp`,
    cacharelSeraphineTote: `${BASE}/partner-brands/products/cacharel-seraphine-tote.webp`,
    cacharelSeraphineWatch: `${BASE}/partner-brands/products/cacharel-seraphine-watch.webp`,
    festinaInterlaceTravelBag: `${BASE}/partner-brands/products/festina-interlace-travel-bag.webp`,
    festinaBlackEditionPen: `${BASE}/partner-brands/products/festina-black-edition-pen.webp`,
    lacroixCaprioWatch: `${BASE}/partner-brands/products/lacroix-caprio-watch.webp`,
    lacroixWhitelineTravelBag: `${BASE}/partner-brands/products/lacroix-whiteline-travel-bag.webp`,
    lexonMinaM: `${BASE}/partner-brands/products/lexon-mina-m.webp`,
    lexonFlipPremium: `${BASE}/partner-brands/products/lexon-flip-premium.webp`,
    solsCameronHoodie: `${BASE}/partner-brands/products/sols-cameron-hoodie.webp`,
    solsLegendTee: `${BASE}/partner-brands/products/sols-legend-tee.webp`,
    ungaroMiloWatch: `${BASE}/partner-brands/products/ungaro-milo-watch.webp`,
    ungaroPaolaDocumentBag: `${BASE}/partner-brands/products/ungaro-paola-document-bag.webp`,
    makitoMekongBackpack: `${BASE}/partner-brands/products/makito-mekong-backpack.webp`,
    makitoStaverBottle: `${BASE}/partner-brands/products/makito-staver-bottle.webp`,
  },

  // Delivery partner logos for the Cafe logo strip (currently commented out)
  // — keys match pages/Cafe/data.js `partners` id.
  // These two are hot-linked from each brand's own CDN rather than copied
  // into public/media/, so a rebrand on their side shows up here with no
  // change. If either URL ever moves, <ImagePlaceholder> falls back to its
  // dashed slot — drop a local file in public/media/partners/ and point the
  // path below at it to pin the asset instead.
  partners: {
    talabat: 'https://www.talabat.com/assets/images/remix-logo.svg',
    // noon also publishes an Arabic lockup at .../noon-logo-ar.svg.
    noon: 'https://f.nooncdn.com/s/app/com/noon/design-system/logos/noon-logo-en.svg',
  },

  // Cafe page — the events section at its foot.
  cafe: {
    events: `${BASE}/photos/cafe/events.jpg`,
  },

  // Business page — the branded-goods offer cards (keys match
  // pages/Business/data.js `brandingOffers` id) and the catering section.
  business: {
    catering: `${BASE}/photos/corporate-gifts/catering.jpg`,
    offers: {
      corporateGifts: `${BASE}/photos/corporate-gifts/corporate-gifts.jpg`,
      onboardingKits: `${BASE}/photos/corporate-gifts/onboarding-kits.jpg`,
      eventGiveaways: `${BASE}/photos/corporate-gifts/event-giveaways.jpg`,
    },
  },

  // About page — the brand film at the top. `videoPoster` is the still shown
  // by <ImagePlaceholder> until the film lands (dashed slot until then);
  // `video` is the file the commented-out <video> in About.jsx points at.
  about: {
    videoPoster: `${BASE}/videos/about-video-poster.jpg`,
    video: `${BASE}/videos/about-video.mp4`,

    // The three chapters of the story timeline — keys match `storyChapters`
    // in pages/About/data.js. Archive photography for the first two, a shot
    // of the space as it is now for the third.
    story: {
      legacy: `${BASE}/photos/about/story-1990.jpg`,
      evolution: `${BASE}/photos/about/story-evolution.jpg`,
      today: `${BASE}/photos/about/story-today.jpg`,
    },

    // The takeovers — keys match `takeovers` in pages/About/data.js. Each
    // wants the space, product or experience built around that name.
    takeovers: {
      bentley: `${BASE}/photos/about/takeover-bentley.jpg`,
      sephora: `${BASE}/photos/about/takeover-sephora.jpg`,
      vogue: `${BASE}/photos/about/takeover-vogue.jpg`,
      colombianPavilion: `${BASE}/photos/about/takeover-colombian-pavilion.jpg`,
      customShow: `${BASE}/photos/about/takeover-custom-show.jpg`,
    },
  },
};
