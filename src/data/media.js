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

export const media = {
  // Full-bleed hero on the Home page. A video loop can go here later.
  hero: `${BASE}/hero/hero.jpg`,

  // Home page "shop the room" — the wide room shot the hotspots sit on.
  roomWide: `${BASE}/hero/room-wide.jpg`,

  // Home page service rows — keys match pages/Home/data.js `id`.
  services: {
    dineIn: `${BASE}/services/dine-in.jpg`,
    vertexShowroom: `${BASE}/services/vertex-showroom.jpg`,
    catering: `${BASE}/services/catering.jpg`,
    events: `${BASE}/services/events.jpg`,
  },

  // Menu dishes — keys match pages/Menu/data.js item ids.
  menu: {
    breadConservaOil: `${BASE}/menu/bread-conserva-oil.jpg`,
    anchovyToast: `${BASE}/menu/anchovy-toast.jpg`,
    oliveOilCake: `${BASE}/menu/olive-oil-cake.jpg`,
    whiteBeans: `${BASE}/menu/white-beans.jpg`,
    roastCarrot: `${BASE}/menu/roast-carrot.jpg`,
    porkSandwich: `${BASE}/menu/pork-sandwich.jpg`,
    houseFilter: `${BASE}/menu/house-filter.jpg`,
    flatWhite: `${BASE}/menu/flat-white.jpg`,
    citrusSoda: `${BASE}/menu/citrus-soda.jpg`,
  },

  // Vertex pieces — keys match the `code` in data/catalogue.js.
  vertex: {
    'VX-101': `${BASE}/vertex/vx-101.jpg`,
    'VX-204': `${BASE}/vertex/vx-204.jpg`,
    'VX-318': `${BASE}/vertex/vx-318.jpg`,
    'VX-422': `${BASE}/vertex/vx-422.jpg`,
    'VX-530': `${BASE}/vertex/vx-530.jpg`,
    'VX-611': `${BASE}/vertex/vx-611.jpg`,
  },

  // Delivery partner logos — keys match pages/Home/data.js `partners` id.
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

  // Catering & events — keys match the tab keys ('Events' | 'Catering').
  catering: {
    Events: `${BASE}/catering/events.jpg`,
    Catering: `${BASE}/catering/catering.jpg`,
  },
};
