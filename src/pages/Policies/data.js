// Structure of the policies page: which documents it holds, and the order of
// the sections inside each. Every heading and paragraph lives in
// src/i18n/translations/ under `policies.docs.<docId>.sections.<sectionId>` —
// this file holds only the ids and their order, the same split Business and
// About use.
//
// The doc ids double as the in-page anchors (#terms, #delivery, #privacy) that
// the navbar's hover menu links to, so renaming one breaks those links.
export const policyDocs = [
  {
    id: 'terms',
    sections: [
      'orders',
      'prices',
      'personalization',
      'artwork',
      'production',
      'delivery',
      'cancellations',
      'returns',
      'damaged',
      'refunds',
      'corporate',
      'warranty',
      'accounts',
      'privacy',
      'age',
      'ip',
      'changes',
      'law',
    ],
  },
  {
    id: 'delivery',
    sections: [
      'production',
      'across',
      'collection',
      'cancelling',
      'returns',
      'personalized',
      'damaged',
      'refunds',
    ],
  },
  {
    id: 'privacy',
    sections: [
      'who',
      'collect',
      'payment',
      'use',
      'marketing',
      'sharing',
      'accounts',
      'personalization',
      'children',
      'retention',
      'security',
      'rights',
      'cookies',
      'thirdParty',
      'changes',
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NOT YET CLEARED FOR PUBLICATION.
//
// The source copy for these policies carried "⚠️ REVIEW" markers on the
// clauses below — commercial figures and processes that had not been confirmed
// when the text was written. The customer-facing wording is live on the page;
// the internal notes ("must be confirmed against Stripe", "TBC") are NOT
// rendered, because a published legal page cannot show its own drafting notes.
//
// Confirm each of these against the real operation, correct the copy in
// src/i18n/translations/en.js, then delete the entry from this list.
// ─────────────────────────────────────────────────────────────────────────────
export const pendingReview = [
  { at: 'terms.personalization', question: 'Changes after checkout — is amendment really possible right up until production starts?' },
  { at: 'terms.delivery / delivery.across', question: 'Standard UAE delivery fee stated as AED 30 — confirm.' },
  { at: 'terms.delivery / delivery.across', question: 'Delivery window stated as 1–2 business days after production — confirm.' },
  { at: 'terms.delivery / delivery.across', question: 'Free-delivery threshold was "TBC". The page currently promises only that a threshold "will be confirmed" — set a figure or drop the sentence.' },
  { at: 'terms.delivery / delivery.collection', question: 'Is free collection from Dubai CommerCity actually offered?' },
  { at: 'terms.refunds / delivery.refunds', question: 'Refund window stated as 7–14 business days — must be checked against Stripe payout timings before publication.' },
  { at: 'terms.warranty', question: 'Manufacturer-warranty handling for third-party branded goods is undefined. The section currently says only that statutory rights are unaffected.' },
];
