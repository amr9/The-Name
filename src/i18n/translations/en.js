export default {
  nav: { home: 'Home', cafe: 'Cafe', shop: 'Shop', business: 'Business', contact: 'Contact us' },

  common: { whatsapp: 'WhatsApp', chatOnWhatsapp: 'Chat on WhatsApp' },

  contact: {
    kicker: 'Contact',
    title: 'Tell us what you need.',
    body: 'Bookings for eight or more, catering quotes, private nights, press and trade enquiries — send it here and the operations desk picks it up.',
    emailHeading: 'Email',
    phoneHeading: 'Phone & WhatsApp',
    optional: 'optional',
    send: 'Send message',
    sending: 'Sending…',
    privacy: 'We use your details to answer this enquiry and nothing else.',
    sentTitle: 'Thank you — that is with us.',
    sentBody: 'The operations desk replies within one working day. For anything urgent during service, WhatsApp is faster.',
    sendAnother: 'Send another message',
    fields: {
      name: { label: 'Name', placeholder: 'Your name' },
      email: { label: 'Email', placeholder: 'you@example.com' },
      phone: { label: 'Phone', placeholder: '+971 …' },
      message: { label: 'Message', placeholder: 'Dates, numbers, and anything we should know.' },
    },
    errors: {
      required: 'This one is needed.',
      email: 'That email address does not look right.',
      tooLong: 'That is longer than we can accept.',
      send: 'That did not send. Try again, or reach us on WhatsApp.',
    },
  },

  footer: {
    address: ['12 Rowan Street', 'City centre'],
    contactHeading: 'Contact us',
    note: 'WhatsApp — tables, allergens, quotes and custom orders. Replies within the hour during service.',
    message: 'Message us',
    rights: 'All rights reserved.',
  },

  home: {
    hero: {
      title: 'Anything here, with your name on it.',
      body: 'We are a customization shop. Pick a product, send us a name, a logo or a whole brand, and we put it on — engraved, printed, embroidered or embossed. One gift or two thousand. There is a cafe attached, too.',
      mediaLabel: 'Customization video loop or still — engraving, printing, finished gifts',
      ctaMenu: 'The cafe menu',
      ctaShop: 'Browse the products',
    },
    partners: {
      heading: 'Our partners',
      items: {
        talabat: { name: 'talabat' },
        noon: { name: 'noon' },
      },
    },
    whatWeDo: {
      kicker: 'What we do',
      heading: 'Customization first — for you, then for your business',
      body: 'Everything starts with a blank product and your artwork. Personal gifts one at a time, branded runs for companies, and — because we cook as well — a cafe that caters and hosts.',
    },
    services: {
      personalGifts: {
        kicker: 'For you', title: 'Gifts with a name on them',
        placeholder: 'A personalised gift being wrapped',
        body: 'Birthdays, weddings, new babies, thank-yous and leaving presents. Pick a product, tell us the name or the date, and we put it on. Single pieces are welcome — there is no minimum on engraving or printing.',
        points: ['One piece is a perfectly normal order', 'A digital proof before anything is made', 'Gift wrapping and a handwritten card on request'],
        cta: 'Browse the products',
      },
      businessBranding: {
        kicker: 'For your business', title: 'Your logo, on everything',
        placeholder: 'Branded corporate gift boxes',
        body: 'Corporate gifting, staff onboarding kits, client thank-yous, event giveaways and uniform. Send your brand files once and we keep them on file, so every reorder comes back identical to the last.',
        points: ['Bulk pricing from 25 pieces up', 'Brand files kept on file for exact reorders', 'Quoted, invoiced and delivered on a set date'],
        cta: 'Get a quote',
      },
      cafe: {
        kicker: 'The cafe', title: 'And there is a cafe',
        placeholder: 'Table mid-service, food and coffee',
        body: 'The other half of the address. Breakfast to late lunch seven days, a four-course supper on Friday nights, and a short list that moves with the delivery. Collect an order over coffee.',
        points: ['08:00 – 16:00 daily, Friday supper 18:00', 'Forty covers, twelve tables and a long bench', 'Walk-ins only — no online booking', 'The room is available for private evenings'],
        cta: 'See the menu',
      },
      catering: {
        kicker: 'Off-site', title: 'Catering, at your address',
        placeholder: 'Crates being loaded for an off-site event',
        body: 'The kitchen away from the counter. Boxed desk lunches, staffed buffets and full off-site events, cooked here and delivered in reusable crates. Branded favours can be made to match.',
        points: ['Ten to two hundred covers', "From 48 hours' notice on lunches", 'Weekly standing orders discounted 10%'],
        cta: 'Catering packages',
      },
    },
    howItWorks: {
      kicker: 'How it works',
      heading: 'Four steps from blank to boxed.',
      lede: 'The same process whether it is one engraved keepsake or five hundred branded kits.',
      steps: {
        pick: { title: 'Pick a product', body: 'Choose the blank from the shop — drinkware, apparel, stationery, whatever it is. Sizes and colours are listed on each item.' },
        artwork: { title: 'Send your artwork', body: 'A name, a logo, a monogram or a full brand kit. We take vector files, and we will redraw a rough one for you.' },
        proof: { title: 'Approve the mock-up', body: 'We send back a digital proof showing exact placement and size. Nothing is made until you say yes to it.' },
        produce: { title: 'We make and ship', body: 'Produced in-house, checked by hand, gift-wrapped if you asked, then shipped or held here for collection.' },
      },
      methodsKicker: 'Customization methods',
      suits: 'Best on',
      minimum: 'Minimum',
      leadTime: 'Lead time',
      ctaShop: 'Browse the products',
      footnote: 'Business quantities are quoted — talk to us',
      methods: {
        engraving: {
          name: 'Engraving', suits: 'Metal, wood, glass, leather', minimum: '1 piece', lead: '3 – 5 days',
          note: 'Cut into the surface with a laser. Permanent, no colour, and it never wears off.',
          placeholder: 'Close-up of an engraved surface',
        },
        print: {
          name: 'Printing', suits: 'Ceramic, paper, plastic, textiles', minimum: '1 piece', lead: '2 – 4 days',
          note: 'Full colour, photographic detail. The one to use when a logo has more than two colours or a gradient.',
          placeholder: 'Close-up of a printed product',
        },
        embroidery: {
          name: 'Embroidery', suits: 'Caps, apparel, bags, aprons', minimum: '10 pieces', lead: '7 – 10 days',
          note: 'Stitched in thread. Heavier and more textured than print, and it survives washing.',
          placeholder: 'Close-up of an embroidered logo',
        },
        emboss: {
          name: 'Embossing', suits: 'Leather, card, cloth covers', minimum: '25 pieces', lead: '7 – 10 days',
          note: 'Pressed into the material, raised or recessed. Quiet and tactile — no ink at all.',
          placeholder: 'Close-up of an embossed cover',
        },
      },
    },
  },

  cafe: {
    kicker: 'The cafe',
    title: 'Fresh Flavours Every Day',
    viewList: 'List',
    viewCards: 'Cards',
    updated: 'Updated Wed 02 Sep',
    askAllergens: 'Ask about allergens',
    shopLink: 'Customize a gift →',
    prevDishes: 'Previous dishes',
    nextDishes: 'More dishes',
    sections: {
      counter: {
        name: 'Counter', time: '08:00 – 16:00',
        items: {
          breadConservaOil: { dish: 'Bread, conserva, oil', note: "Friday's loaf, day two, on the Orbit side plate.", tag: 'All day', price: '£6' },
          anchovyToast: { dish: 'Anchovy toast', note: 'Two slices, butter, chilli.', tag: 'All day', price: '£7' },
          oliveOilCake: { dish: 'Olive oil cake', note: 'Whole cakes to order — ask us.', tag: 'Bakes', price: '£5' },
        },
      },
      kitchen: {
        name: 'Kitchen', time: '11:30 – 15:00',
        items: {
          whiteBeans: { dish: 'White beans, greens, chilli oil', note: 'Slow-cooked, finished at the pass.', tag: 'Vegan', price: '£11' },
          roastCarrot: { dish: 'Roast carrot, yoghurt, dukkah', note: 'Whole carrots, charred hard.', tag: 'Vegetarian', price: '£10' },
          porkSandwich: { dish: 'Pork shoulder sandwich', note: 'Until it runs out, usually by two.', tag: 'Lunch', price: '£13' },
        },
      },
      drinks: {
        name: 'Drinks', time: 'All day',
        items: {
          houseFilter: { dish: 'House filter', note: 'Brewed by the litre, refills half price.', tag: 'Coffee', price: '£3.20' },
          flatWhite: { dish: 'Flat white', note: 'Also espresso, macchiato, cortado.', tag: 'Coffee', price: '£3.40' },
          citrusSoda: { dish: 'Citrus soda', note: 'Made here, changes weekly.', tag: 'Cold', price: '£4' },
        },
      },
    },
    intro: 'Breakfast to late lunch seven days, a four-course supper on Friday nights, and the room itself free for private evenings. Anything cooked for your own address is catering — that is on the business page.',
    events: {
      kicker: 'Events',
      heading: 'Private nights, held here',
      lede: 'Every event happens in the cafe itself — the room after service, or before we open. We can brand the favours to match the night.',
      title: 'Events, in the café',
      colOne: 'Format',
      intro: 'Every event happens in the café itself — the room after service, or before we open. Same kitchen and same team that cooks the Friday supper, and the floor can be re-dressed to suit the night. Anything at your address is catering.',
      placeholder: 'The room set for a private evening',
      askFor: [
        'The date and the finish time',
        'Headcount and whether it is seated — the room holds 40',
        'Format — supper club, launch night, tasting, room only',
        'Anything the room has to hold: AV, a speech, a cake',
      ],
      packages: {
        roomHire: { name: 'Room hire, evening', note: 'The whole room from six, bar staffed.', covers: '40 seated', notice: '3 weeks', from: '£900 room' },
        supperClub: { name: 'Supper club', note: 'Set four courses, one sitting, our menu.', covers: '28 seated', notice: '4 weeks', from: '£46' },
        launchNight: { name: 'Launch night', note: 'The floor re-dressed around whatever you are launching.', covers: '20–60 standing', notice: '5 weeks', from: '£38' },
        privateBreakfast: { name: 'Private breakfast', note: 'The room before opening, doors closed until ten.', covers: '20–30 seated', notice: '2 weeks', from: '£24' },
      },
    },
  },

  shop: {
    badge: 'Vertex · the pieces in this room',
    title: 'All You Need, Right Here',
    body: 'Vertex is an online shop for interiors — lighting, seating, tabletop and wall systems. This restaurant is its showroom: everything you sit on, eat off and look at is on the shelf.',
    openShop: 'Open the shop ↗',
    askFloor: 'Ask what is on the floor →',
    finish: 'Finish',
    leadTime: 'Lead time',
    filters: { all: 'All', lighting: 'Lighting', seating: 'Seating', tables: 'Tables', tabletop: 'Tabletop', systems: 'Systems' },
    viewList: 'List',
    viewCards: 'Cards',
    resultPiece: (n) => `${n} piece`,
    resultPieces: (n) => `${n} pieces`,
    prevPieces: 'Previous pieces',
    nextPieces: 'More pieces',
    viewLink: 'View ↗',
    viewOnShop: 'View on Vertex ↗',
    inTheRoom: 'In the room',
    items: {
      'VX-101': {
        name: 'Halo pendant, 600mm', finish: 'Brushed brass, opal glass', lead: '2 weeks', where: 'Over every table',
        note: 'A single ring of light on a slim drop — what gives the room its glow.',
        placeholder: 'Halo pendant light over a table',
      },
      'VX-204': {
        name: 'Arc dining chair', finish: 'Bent ash, terracotta wool', lead: 'In stock', where: 'All 40 covers',
        note: 'One continuous curve for the back and arms. Stacks four high.',
        placeholder: 'Arc dining chair',
      },
      'VX-318': {
        name: 'Monolith table, 2.4m', finish: 'Cast stone, powder-coat base', lead: '4 weeks', where: 'The long bench',
        note: 'One slab, one plinth. The table the Friday supper is served on.',
        placeholder: 'Monolith dining table',
      },
      'VX-422': {
        name: 'Orbit tableware set', finish: 'Matte stoneware, six pieces', lead: 'In stock', where: 'Every plate you eat off',
        note: 'The plates, bowls and side dishes the kitchen plates on.',
        placeholder: 'Orbit stoneware tableware set',
      },
      'VX-530': {
        name: 'Grid wall system, 1.2m bay', finish: 'Anodised aluminium', lead: '3 weeks', where: 'The back wall',
        note: 'Modular bays that carry shelves, planters or lights. Add bays as you go.',
        placeholder: 'Grid wall shelving system',
      },
      'VX-611': {
        name: 'Signal floor lamp', finish: 'Steel, linen shade', lead: '2 weeks', where: 'By the window seats',
        note: 'Tall, thin, dimmable to almost nothing. The one guests ask about most.',
        placeholder: 'Signal floor lamp by a window',
      },
    },
  },

  business: {
    kicker: 'For business',
    title: 'Your brand, made and delivered.',
    intro: 'Branded goods for companies — gifting, onboarding, events and uniform — plus catering at your own address. One contact, one invoice, and your artwork kept on file so every reorder matches the last.',
    offer: {
      heading: 'What we brand',
      lede: 'Send the logo once. We keep the artwork, the placement and the colours on file, so a reorder in six months comes back identical.',
      items: {
        corporateGifts: {
          name: 'Corporate gifts', moq: 'From 25',
          note: 'Client thank-yous, milestone gifts and seasonal sends, boxed and ready to hand over.',
          placeholder: 'Branded corporate gift boxes',
        },
        onboardingKits: {
          name: 'Onboarding kits', moq: 'From 10 kits',
          note: 'Everything a new starter gets on day one, packed as one kit and held in stock for you.',
          placeholder: 'A new-starter welcome kit, packed',
        },
        eventGiveaways: {
          name: 'Event giveaways', moq: 'From 50',
          note: 'Conference and launch handouts, the run sized to your guest list and delivered to the venue.',
          placeholder: 'Branded giveaways on an event table',
        },
        uniform: {
          name: 'Uniform and workwear', moq: 'From 10',
          note: 'Aprons, caps, tees and polos, embroidered and re-ordered by size as your team changes.',
          placeholder: 'Embroidered aprons and caps',
        },
      },
    },
    terms: {
      heading: 'How an account works',
      cta: 'Start a quote on WhatsApp',
      items: [
        { term: 'Quoted, not priced', detail: 'Send the product, the quantity and the deadline. A written quote comes back the same working day.' },
        { term: 'Artwork kept on file', detail: 'Approved once, then stored against your account. Reorders skip straight to production.' },
        { term: 'Bulk pricing', detail: 'The unit price steps down at 25, 100 and 500 pieces. Your quote shows every band.' },
        { term: 'Invoiced monthly', detail: 'One named contact, one invoice, thirty-day terms once an account is open.' },
      ],
    },
    catering: {
      kicker: 'Catering',
      heading: 'Catering, at your address',
      lede: 'The kitchen away from the counter. Anything held in our own room is an event instead — that is on the cafe page.',
      title: 'Catering, off-site',
      colOne: 'Package',
      intro: 'Everything we cook for you away from the café: lunches, buffets and full off-site events, cooked in the café kitchen and delivered in reusable crates. The menu rotates with the delivery, so it changes through the year.',
      placeholder: 'Off-site setup at a client venue',
      askFor: [
        'The address and the delivery time',
        'Covers and how they eat — boxed or platters',
        'Dietary lines you need covered',
        'Whether this repeats weekly',
      ],
      packages: {
        deskLunch: { name: 'Desk lunch', note: 'Boxed individually, delivered to your reception.', covers: '10–60', notice: '48 hours', from: '£11' },
        standingBuffet: { name: 'Standing buffet', note: 'Platters set up and staffed at your venue for ninety minutes.', covers: '25–120', notice: '5 days', from: '£19' },
        offSiteCatering: { name: 'Off-site event catering', note: 'We bring the kitchen and the team to your address.', covers: '50–200', notice: '6 weeks', from: '£54' },
        breakfastTrolley: { name: 'Breakfast trolley', note: 'Pastry, fruit, urns of house filter, delivered.', covers: '10–80', notice: '48 hours', from: '£8' },
      },
    },
  },

  packages: {
    coversHeader: 'Covers',
    noticeHeader: 'Notice',
    fromHeader: 'From',
    footnote: 'Prices per head, excluding VAT and delivery. Standing orders of four weeks or more are discounted 10%.',
    directLineKicker: 'Direct line',
    directLineTitle: 'Send us the date and the covers',
    openWhatsapp: 'Open WhatsApp',
    replyNote: 'Replies within one working day · Mon–Fri 08:00–18:00',
  },
};
