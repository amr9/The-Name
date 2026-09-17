// Topics the on-site assistant (components/ChatLauncher/Chatbot.jsx) can
// answer, in the order its quick replies show. Structural only — each
// topic's label, answer and match keywords live in i18n under chat.topics[id].
//   to            — adds a link to that page under the answer
//   whatsapp      — adds a hand-off button to WhatsApp
//   appendMethods — lists every customization method with its lead time and
//                   minimum, read from the same i18n entries as the Home
//                   "how it works" panel, so the two can never disagree
export const chatTopics = [
  { id: 'products', to: '/shop' },
  { id: 'personalise', to: '/about' },
  { id: 'leadTimes', appendMethods: true },
  { id: 'business', to: '/business' },
  // The cafe page is parked (see App.jsx) — restore this topic alongside it.
  // { id: 'cafe', to: '/cafe' },
  { id: 'human', whatsapp: true },
];
