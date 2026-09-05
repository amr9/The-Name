export const tabsContent = {
  Events: {
    label: 'Events (in the café)',
    title: 'Events, in the café',
    colOne: 'Format',
    intro: 'Every event happens in the café itself — the room after service, or before we open. Same kitchen and same team that cooks the Friday supper, and the floor can be re-dressed with the Vertex pieces that suit the night. Anything at your address is catering.',
    placeholder: 'The room set for a private evening',
    packages: [
      { name: 'Room hire, evening', note: 'The whole room from six, bar staffed.', covers: '40 seated', notice: '3 weeks', from: '£900 room' },
      { name: 'Supper club', note: 'Set four courses, one sitting, our menu.', covers: '28 seated', notice: '4 weeks', from: '£46' },
      { name: 'Launch night', note: 'The floor re-dressed with the pieces you are launching.', covers: '20–60 standing', notice: '5 weeks', from: '£38' },
      { name: 'Private breakfast', note: 'The room before opening, doors closed until ten.', covers: '20–30 seated', notice: '2 weeks', from: '£24' },
    ],
    askFor: [
      'The date and the finish time',
      'Headcount and whether it is seated — the room holds 40',
      'Format — supper club, launch night, tasting, room only',
      'Anything the room has to hold: AV, a speech, a cake',
    ],
  },
  Catering: {
    label: 'Catering (off-site)',
    title: 'Catering, off-site',
    colOne: 'Package',
    intro: 'Everything we cook for you away from the café: lunches, buffets and full off-site events, cooked in the café kitchen and delivered in reusable crates. The menu rotates with the delivery, so it changes through the year.',
    placeholder: 'Off-site setup at a client venue',
    packages: [
      { name: 'Desk lunch', note: 'Boxed individually, delivered to your reception.', covers: '10–60', notice: '48 hours', from: '£11' },
      { name: 'Standing buffet', note: 'Platters set up and staffed at your venue for ninety minutes.', covers: '25–120', notice: '5 days', from: '£19' },
      { name: 'Off-site event catering', note: 'We bring the kitchen and the team to your address.', covers: '50–200', notice: '6 weeks', from: '£54' },
      { name: 'Breakfast trolley', note: 'Pastry, fruit, urns of house filter, delivered.', covers: '10–80', notice: '48 hours', from: '£8' },
    ],
    askFor: [
      'The address and the delivery time',
      'Covers and how they eat — boxed or platters',
      'Dietary lines you need covered',
      'Whether this repeats weekly',
    ],
  },
};
