// Icon sets for <Bubbles>. Simple single-color marks — they read as
// silhouettes at bubble size, so they are drawn flat on a 24×24 grid and take
// their color from the CSS `color` property (white shapes are cut-outs).
// Each set is an ordered list; the component deals them out in turn.

// The cafe: food and drink.
export const foodIcons = [
  // burger
  <>
    <path d="M4 11.2c0-3.6 3.6-6.2 8-6.2s8 2.6 8 6.2H4Z" />
    <rect x="3.2" y="12.4" width="17.6" height="2.2" rx="1.1" />
    <path d="M4 16.2h16c0 2.1-1.7 3.8-3.8 3.8H7.8C5.7 20 4 18.3 4 16.2Z" />
  </>,
  // takeaway cup with straw
  <>
    <path d="M14.4 2.4 16 7.6l-1.5.5-1.6-5.2 1.5-.5Z" />
    <path d="M5 8h14l-1.4 11.1A2.1 2.1 0 0 1 15.5 21h-7a2.1 2.1 0 0 1-2.1-1.9L5 8Z" />
    <rect x="6.6" y="11" width="10.8" height="1.6" rx=".8" fill="#fff" />
  </>,
  // coffee
  <>
    <path d="M4 7h12v7.4A4.6 4.6 0 0 1 11.4 19H8.6A4.6 4.6 0 0 1 4 14.4V7Z" />
    <path d="M16.6 8.6h1.6a2.9 2.9 0 0 1 0 5.8h-1.6v-1.8h1.6a1.1 1.1 0 0 0 0-2.2h-1.6V8.6Z" />
    <rect x="3.2" y="20.2" width="13.6" height="1.8" rx=".9" />
  </>,
  // shake
  <>
    <path d="M6.6 8.6h10.8l-1.3 10.6A2.1 2.1 0 0 1 14 21h-4a2.1 2.1 0 0 1-2.1-1.8L6.6 8.6Z" />
    <path d="M6.2 7.2c0-2.9 2.6-5.2 5.8-5.2s5.8 2.3 5.8 5.2H6.2Z" />
    <circle cx="17.4" cy="3.4" r="1.6" />
  </>,
  // can
  <>
    <rect x="6.5" y="3" width="11" height="18" rx="2.6" />
    <rect x="8.4" y="6.4" width="7.2" height="1.5" rx=".75" fill="#fff" />
    <rect x="8.4" y="9.4" width="4.6" height="1.5" rx=".75" fill="#fff" />
  </>,
  // fries
  <>
    <path d="m7.4 3.8 1.7-.4 1.3 6-1.7.4-1.3-6Zm4.1-.9 1.7.2-.7 6.4-1.7-.2.7-6.4Zm4.3 1 1.6.7-2.3 5.7-1.6-.7 2.3-5.7Z" />
    <path d="M4.6 10.4h14.8l-1.5 8.4A2.6 2.6 0 0 1 15.3 21H8.7a2.6 2.6 0 0 1-2.6-2.2l-1.5-8.4Z" />
  </>,
];

// The shop: the kinds of things we sell and personalise.
export const shopIcons = [
  // t-shirt
  <>
    <path d="M8.5 3 4 5.4 2.4 9.6l3.2 1.4 1-1.8V21h10.8V9.2l1 1.8 3.2-1.4L20 5.4 15.5 3c-.6 1.4-1.9 2.3-3.5 2.3S9.1 4.4 8.5 3Z" />
  </>,
  // table lamp
  <>
    <path d="M7.5 3h9l3 8h-15l3-8Z" />
    <rect x="11.2" y="11" width="1.6" height="7.6" />
    <rect x="7" y="18.4" width="10" height="2.4" rx="1.2" />
  </>,
  // insulated bottle
  <>
    <rect x="9.5" y="2" width="5" height="3" rx="1" />
    <path d="M9 5.6h6v1.6c1.9.8 3 2.4 3 4.4V19a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-7.4c0-2 1.1-3.6 3-4.4V5.6Z" />
    <rect x="8" y="12.4" width="8" height="1.6" rx=".8" fill="#fff" />
  </>,
  // speaker
  <>
    <rect x="3" y="6" width="18" height="13" rx="3.5" />
    <circle cx="12" cy="12.5" r="3.6" fill="#fff" />
    <circle cx="12" cy="12.5" r="1.4" />
  </>,
  // backpack
  <>
    <path d="M9 4.5a3 3 0 0 1 6 0V6h-1.6V4.5a1.4 1.4 0 0 0-2.8 0V6H9V4.5Z" />
    <path d="M5 10a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v9.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 19.5V10Z" />
    <rect x="8" y="14" width="8" height="5" rx="1.4" fill="#fff" />
  </>,
  // mug
  <>
    <path d="M4 5h12v11a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V5Z" />
    <path d="M16.6 7.4h1.4a3 3 0 0 1 0 6h-1.4v-1.8h1.4a1.2 1.2 0 0 0 0-2.4h-1.4V7.4Z" />
  </>,
  // cube alarm clock
  <>
    <rect x="3" y="5" width="18" height="15" rx="3" />
    <rect x="6" y="10" width="12" height="5" rx="1" fill="#fff" />
  </>,
  // notebook
  <>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <rect x="8" y="3" width="1.2" height="18" fill="#fff" />
    <rect x="11" y="7" width="5.5" height="1.4" rx=".7" fill="#fff" />
  </>,
  // cap
  <>
    <path d="M3.5 15c0-5 3.8-9 8.5-9s8.5 4 8.5 9h-17Z" />
    <path d="M2 15.8h13.5c3 0 5.6.9 6.5 2.6H2v-2.6Z" />
  </>,
];
