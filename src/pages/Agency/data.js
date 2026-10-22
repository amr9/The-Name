// The Agency page's services, in order: one text section each. The titles
// are the Agency pillar's tags on Home (i18n home.pillars.agency.tags); the
// copy, under i18n agency.services[id], is from The Name Agency's Pitch
// presentation.
// `positioning` is "Brand Positioning & Exposure": the old Exposure section
// was merged into it, and Brand Awareness was removed.
export const agencyServices = [
  { id: 'positioning' },
  { id: 'communication' },
  { id: 'csr' },
  { id: 'ooh' },
];

// The "Highlighted Services" section under the service rows (Agency.jsx
// HighlightedServices), as on thenameagency.me: six groups, in this order —
// three to a row on desktop. Each id keys its icon (AGENCY_ICONS in
// Agency.jsx) and its copy (i18n agency.highlights.groups[id]: title, items).
export const agencyHighlights = [
  { id: 'media' },
  { id: 'creative' },
  { id: 'digital' },
  { id: 'events' },
  { id: 'branding' },
  { id: 'consulting' },
];
