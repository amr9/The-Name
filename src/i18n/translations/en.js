export default {
  // `cafe` is kept for the parked cafe page; `contact` for the enquiry form,
  // which now sits at the foot of About rather than on its own page.
  nav: { home: 'Home', cafe: 'Cafe', kids: 'Kids', shop: 'The Name Store', business: 'Business', about: 'About', contact: 'Contact us', menu: 'Menu' },

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
      emailUndeliverable: 'That email domain cannot receive mail — check it for a typo.',
      emailDisposable: 'Please use an address we can reply to.',
      rateLimited: 'That is a few messages in a short time. Try again shortly, or reach us on WhatsApp.',
      send: 'That did not send. Try again, or reach us on WhatsApp.',
    },
  },

  footer: {
    rights: 'All rights reserved.',
  },

  home: {
    hero: {
      titleLeadPrefix: 'From',
      titleScript: 'To Your Name.',
      body: 'We curate design-forward objects and make them personal — with your name, your message, your story or your brand. From one meaningful gift to a full corporate collection, every piece is made to carry an identity.',
      mediaLabel: 'Customization video loop or still — engraving, printing, finished gifts',
      ctaTour: 'Virtual product view',
      ctaShop: 'Make It Personal',
    },
    whatWeDo: {
      kicker: 'What we do',
      heading: 'Objects With Your Story',
      body: 'We find objects worth keeping — then make them mean something more. A name. An initial. A message. A brand. A story that turns something beautifully designed into something unmistakably yours.',
    },
    services: {
      personalGifts: {
        kicker: 'For you', title: 'Make It Personal',
        placeholder: 'A personalised gift being wrapped',
        body: 'For birthdays, milestones, thank-yous, little celebrations — or simply because it should have your name on it. Choose from our curated collection and make it yours with a name, initials, date or message.',
        points: ['One piece? Absolutely.', 'Personalize it your way', 'Beautifully finished and ready to gift.'],
        cta: 'Shop & Personalize',
      },
      businessBranding: {
        kicker: 'For your business', title: 'Make Your Brand the Gift',
        placeholder: 'Branded corporate gift boxes',
        body: 'Corporate gifting should do more than carry your logo. We create thoughtful, design-led gifts and branded collections that keep your identity visible, useful and remembered — from employee kits and client gifts to events, VIP gifting and large-scale orders.',
        points: ['Individual personalization at scale', 'Curated products, custom kits & premium packaging', 'Corporate, government & event orders', 'Creative concepts built around your brand'],
        cta: 'Start a Business Enquiry',
      },
    },
    howItWorks: {
      kicker: 'How it works',
      heading: 'Four steps from blank to boxed.',
      lede: 'One piece or one thousand, we make personalization simple.',
      methodsKicker: 'Customization methods',
      suits: 'Best on',
      minimum: 'Minimum',
      leadTime: 'Lead time',
      ctaShop: 'Make It Personal',
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
    partners: {
      heading: 'Our partners',
      items: {
        talabat: { name: 'talabat' },
        noon: { name: 'noon' },
      },
    },
    askAboutDish: (dish) => `Ask about ${dish} on WhatsApp`,
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
    badge: 'Curated brands · personalised by us',
    title: 'Make It Personal',
    body: 'We curate design-led objects from brands like Lexon, Lund London, Pantone, Korin, Kreafunk and Gingko, then make them yours — a name, initials, a message or a logo, engraved, printed or embossed. Not off the shelf. Too personal to regift.',
    openShop: 'Open the shop ↗',
    askPersonal: 'Ask about personalising →',
    filters: { all: 'All', drinkware: 'Drinkware', tech: 'Tech', desk: 'Desk', travel: 'Travel', giftSets: 'Gift sets' },
    viewList: 'List',
    viewCards: 'Cards',
    resultPiece: (n) => `${n} piece`,
    resultPieces: (n) => `${n} pieces`,
    prevPieces: 'Previous pieces',
    nextPieces: 'More pieces',
    viewLink: 'View ↗',
    personaliseItem: (name) => `Personalise ${name}`,
    giftSets: {
      kicker: 'Gift sets',
      heading: 'Boxed, wrapped and ready to give',
      lede: 'Curated pieces put together as one set, personalised and packed in wrapping that carries your name or your brand. The easiest way to give something considered without assembling it yourself.',
    },
    items: {
      'TN-101': {
        name: 'Skittle bottle, 500 ml', finish: 'Double-walled stainless steel', lead: '3 – 5 days',
        note: 'Keeps drinks cold all day. A name down the side, or a logo on the shoulder.',
        placeholder: 'Lund London Skittle bottle with an engraved name',
      },
      'TN-102': {
        name: 'Insulated coffee cup', finish: 'Stainless steel, matte finish', lead: '3 – 5 days',
        note: 'The daily coffee, carried in something with their initials on it.',
        placeholder: 'Lund London coffee cup with printed initials',
      },
      'TN-201': {
        name: 'Fine speaker', finish: 'Aluminium, wireless', lead: '5 – 7 days',
        note: 'A pocket-sized speaker that engraves cleanly — a favourite for team and client gifts.',
        placeholder: 'Lexon Fine speaker with an engraved logo',
      },
      'TN-202': {
        name: 'Oblio wireless charger', finish: 'Wireless charging station', lead: '5 – 7 days',
        note: 'It sits on the desk all day, so the brand printed on it does too.',
        placeholder: 'Lexon Oblio charger with a printed logo',
      },
      'TN-301': {
        name: 'Mina lamp', finish: 'Rechargeable LED', lead: '3 – 5 days',
        note: 'A small lamp that goes anywhere. Engraved with initials, it becomes theirs.',
        placeholder: 'Lexon Mina lamp engraved with initials',
      },
      'TN-302': {
        name: 'Leather desk set', finish: 'Notebook, pen and card holder', lead: '7 – 10 days',
        note: "A desk accessory that carries your team's names, one on every piece.",
        placeholder: 'Leather desk set embossed with a name',
      },
      'TN-401': {
        name: 'Leather passport cover', finish: 'Full-grain leather', lead: '7 – 10 days',
        note: 'Initials pressed into the cover. Quiet, tactile, and too personal to regift.',
        placeholder: 'Leather passport cover with embossed initials',
      },
      'TN-501': {
        name: 'Signature gift box', finish: 'Curated pieces, full wrap', lead: '7 – 10 days',
        note: 'Lexon and Lund London pieces, personalised and boxed in packaging that carries your name or your brand.',
        placeholder: 'A personalised gift box, opened',
      },
      'TN-502': {
        name: 'Desk starter set', finish: 'Notebook, pen and leather sleeve', lead: '7 – 10 days',
        note: 'A first-day set for a new starter — the notebook embossed, the pen engraved, boxed as one.',
        placeholder: 'A boxed desk starter set',
      },
      'TN-503': {
        name: "Coffee lover's set", finish: 'Cup, beans and ceramic pour-over', lead: '7 – 10 days',
        note: 'Everything for a morning at home, with the cup printed and the box wrapped in your name.',
        placeholder: 'A boxed coffee set, opened',
      },
      'TN-504': {
        name: 'Welcome kit, large', finish: 'Bottle, notebook, tote and tech', lead: '10 – 14 days',
        note: 'Our biggest set — four pieces personalised together for onboarding, VIP gifting or a launch.',
        placeholder: 'A large branded welcome kit',
      },
      'TN-103': {
        name: 'Pantone mug', finish: 'Porcelain, colour of your choice', lead: '2 – 4 days',
        note: 'Pick their Pantone colour, then add the name. A mug that is theirs twice over.',
        placeholder: 'Pantone mug with a printed name',
      },
      'TN-203': {
        name: 'aGO speaker', finish: 'Portable, wireless', lead: '5 – 7 days',
        note: 'Danish-designed sound, small enough for a desk or a bag, with a logo on the front.',
        placeholder: 'Kreafunk aGO speaker with a printed logo',
      },
      'TN-303': {
        name: 'Click alarm clock', finish: 'Natural wood, LED display', lead: '3 – 5 days',
        note: 'Tap the top and the time lights up through the wood. Engraved, it wakes them with their name.',
        placeholder: 'Gingko Click clock engraved with a name',
      },
      'TN-402': {
        name: 'ClickPack backpack', finish: 'Anti-theft, water-resistant', lead: '7 – 10 days',
        note: 'Hidden zips, a slim laptop sleeve, and room on the front for a team logo.',
        placeholder: 'Korin ClickPack with an embroidered logo',
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
      },
    },
    terms: {
      heading: 'How an account works',
      cta: 'Start a quote on WhatsApp',
      items: [
        { term: 'Quoted, not priced', detail: 'Send the product, the quantity and the deadline. A written quote comes back the same working day.' },
        { term: 'Artwork kept on file', detail: 'Approved once, then stored against your account. Reorders skip straight to production.' },
        { term: 'Bulk pricing', detail: 'The unit price steps down at 25, 100 and 500 pieces. Your quote shows every band.' },
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
        breakfastTrolley: { name: 'Breakfast trolley', note: 'Pastry, fruit, urns of house filter, delivered.', covers: '10–80', notice: '48 hours', from: '£8' },
      },
    },
  },

  about: {
    video: {
      kicker: 'About us',
      title: 'Watch the story.',
      lede: 'A short film on who we are, what we make, and why a name changes an object.',
      placeholder: 'About The Name — brand video',
    },
    kicker: 'About us',
    title: 'What\'s in a name? Everything.',
    lede: 'A name is identity, history and connection — your signature and your story. The Name was built on one belief: an object becomes meaningful when it carries your name, your initials, your message or your brand. We curate design-led pieces, then make them yours.',
    servicesHeading: 'What we do',
    servicesLede: 'One studio for people and for brands — from a single engraved gift to a full corporate gifting programme.',
    services: {
      personalGifts: {
        title: 'Personalised gifts',
        body: 'Birthdays, weddings, new babies and thank-yous. Choose a piece, add a name, initials or a message, and we make it theirs — one piece is a perfectly normal order.',
        cta: 'Browse the shop',
      },
      corporateGifting: {
        title: 'Corporate gifting',
        body: 'Client gifts, VIP delegations, conference giveaways, excellence awards and onboarding kits — carrying your logo, delivered in bulk on a set date.',
        cta: 'For business',
      },
      curatedBrands: {
        title: 'Curated design brands',
        body: 'We work with brands people already love, so every gift starts from an object worth keeping.',
        cta: 'See the products',
      },
      packaging: {
        title: 'Gift kits & packaging',
        body: 'Custom kits, signature packaging and full item wraps that carry your name or your brand from the box inwards.',
        cta: 'Plan a kit',
      },
      creative: {
        title: 'Creative concepts',
        body: 'We started as a creative agency, so concept, storytelling and design are in-house — a full 360 service, not just a print run.',
        cta: 'Talk to us',
      },
      cafe: {
        title: 'The cafe & catering',
        body: 'The other half of the address: breakfast to late lunch, private evenings in our room, and catering at yours.',
        cta: 'See the cafe',
      },
    },
    howHeading: 'How we do it',
    howLede: 'The same four steps whether it is one engraved keepsake or five hundred branded kits.',
    methodsLabel: 'We personalise with',
    mission: {
      kicker: 'Our mission',
      statement: 'To turn everyday objects into meaningful ones — curating thoughtful, design-led pieces and personalising them, so every gift carries a name, a story or a brand.',
    },
    vision: {
      kicker: 'Our vision',
      statement: 'To be the region\'s destination for identity-driven design: where people come to give something truly personal, and brands come to make themselves worth remembering.',
    },
    cta: {
      heading: 'Let\'s put a name on it.',
      body: 'Tell us who it is for and what it should say — we\'ll take it from there.',
      contact: 'Contact us',
      whatsapp: 'Chat on WhatsApp',
    },
  },

  kids: {
    kicker: 'For kids',
    title: 'Their name on it, from day one.',
    lede: "Lunchboxes, bottles, backpacks and keepsakes with a child's name on them — so less goes missing, and what comes home is theirs. The same engraving, printing and embroidery we do for everything else, sized for smaller hands.",
    heroPlaceholder: "A child's bottle and lunchbox with a name on them",
    ctaShop: 'Browse the products',
    ctaAsk: "Ask about a kids' gift",
    offerHeading: 'What we make for children',
    offerLede: 'Three things we are asked for most. Anything in the shop can be personalised for a child — these are just the ones that come up every week.',
    offers: {
      backToSchool: {
        name: 'Back to school',
        note: 'Bottles, lunchboxes, pencil cases and bag tags, each with a name or initials, so a class of thirty stops losing them.',
        placeholder: 'Named bottle, lunchbox and pencil case',
      },
      newBaby: {
        name: 'New baby',
        note: 'Keepsakes for a birth or a naming — a name, a date and a weight, engraved or embossed to be kept rather than used.',
        placeholder: 'An engraved new-baby keepsake',
      },
      birthdays: {
        name: 'Birthdays and parties',
        note: 'Named party favours and a personalised main gift, made to match, from one piece up to the whole guest list.',
        placeholder: 'Named party favours on a table',
      },
    },
    note: {
      kicker: 'How we make them',
      heading: 'Made to be used, not just looked at.',
      points: [
        'Engraved and printed with the same food-safe finishes we use across the shop',
        'A digital proof of the name and its placement before anything is made',
        'One piece is a perfectly normal order — no minimum for a single child',
        'Whole-class and party quantities quoted, usually within a working day',
      ],
    },
    cta: {
      heading: 'Put their name on it.',
      body: 'Tell us the name, the age and what it is for, and we will come back with options.',
      shop: 'Browse the products',
      whatsapp: 'Chat on WhatsApp',
    },
  },

  process: {
    steps: {
      pick: { title: 'Choose It', body: 'Find your piece from our curated collection — from lifestyle and desk objects to drinkware, accessories, gifting and more.' },
      artwork: { title: 'Name It', body: 'Add a name, initials, message, artwork or brand identity.' },
      proof: { title: 'See It', body: 'We prepare your artwork or mock-up where required, so you know how your personalization will look before production.' },
      produce: { title: 'Make It Yours', body: 'We produce, finish and prepare your order for collection or delivery.' },
    },
  },

  chat: {
    open: 'Chat with us',
    close: 'Close',
    menuTitle: 'How would you like to talk?',
    botTitle: 'Talk to our assistant',
    botNote: 'Instant answers, any time',
    whatsappTitle: 'Chat on WhatsApp',
    whatsappNote: 'A person from our team',
    assistantName: 'The Name assistant',
    assistantStatus: 'Automated replies',
    typing: 'The assistant is typing…',
    greeting: 'Hi! I can answer questions about our products, personalisation, business orders and the cafe. Pick a topic or type your question.',
    placeholder: 'Type your question…',
    send: 'Send',
    back: 'Back',
    fallback: 'I\'m not sure about that one. Pick a topic below, or continue on WhatsApp and our team will help.',
    openPage: 'Open the page',
    continueWhatsapp: 'Continue on WhatsApp',
    topics: {
      products: {
        label: 'What do you sell?',
        answer: 'Design-led objects from brands like Lexon, Lund London, Pantone, Korin, Kreafunk and Gingko — drinkware, tech, desk pieces, travel and gift sets — plus our own house pieces. Every one can be personalised.',
        keywords: ['product', 'sell', 'shop', 'store', 'brand', 'buy', 'bottle', 'speaker', 'lamp', 'bag'],
      },
      personalise: {
        label: 'How does personalisation work?',
        answer: 'Pick a product, send us a name, initials, a message or a logo, approve the digital proof, and we make and ship it. Nothing is made until you approve.',
        keywords: ['personal', 'engrav', 'print', 'emboss', 'embroider', 'name', 'logo', 'custom'],
      },
      leadTimes: {
        label: 'How long does it take?',
        answer: 'It depends on the method:',
        keywords: ['how long', 'time', 'days', 'deliver', 'ship', 'when', 'lead', 'minimum'],
      },
      business: {
        label: 'Corporate & bulk orders',
        answer: 'We handle corporate gifting, onboarding kits, event giveaways and uniform, with bulk pricing from 25 pieces and your artwork kept on file for reorders.',
        keywords: ['business', 'corporate', 'company', 'bulk', 'team', 'quote'],
      },
      cafe: {
        label: 'The cafe',
        answer: 'The cafe is open 08:00 – 16:00 daily, with a four-course supper on Friday evenings. Walk-ins only; the room can be booked for private events.',
        keywords: ['cafe', 'café', 'food', 'menu', 'coffee', 'open', 'hours'],
      },
      human: {
        label: 'Talk to a person',
        answer: 'Of course — our team replies on WhatsApp within the hour during opening times.',
        keywords: ['person', 'human', 'agent', 'whatsapp', 'call', 'talk', 'phone'],
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
