// Topics the on-site assistant (components/ChatLauncher/Chatbot.jsx) can
// answer, in the order its quick replies show. Structural only — each
// topic's label, answer and match keywords live in i18n under chat.topics[id].
//   to            — adds a link to that page under the answer
//   href          — the same, for a page outside the site (the Odoo store)
//   whatsapp      — adds a hand-off button to WhatsApp
//   appendMethods — lists every customization method with its lead time and
//                   minimum, read from the same i18n entries as the Home
//                   "how it works" panel, so the two can never disagree
import { routes, shopLink } from './site.js';

export const chatTopics = [
  { id: 'products', href: shopLink },
  { id: 'personalise', to: '/about' },
  { id: 'leadTimes', appendMethods: true },
  { id: 'business', to: routes.business },
  // The cafe page is parked (see App.jsx) — restore this topic alongside it.
  // { id: 'cafe', to: '/cafe' },
  { id: 'human', whatsapp: true },
];
