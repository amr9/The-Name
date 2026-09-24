export default {
  // `cafe` is kept for the parked cafe page; `contact` for the enquiry form,
  // which now sits at the foot of About rather than on its own page.
  nav: { home: 'Home', cafe: 'Cafe', kids: 'Kids', shop: 'The Name Store', business: 'Business', about: 'About', policies: 'Policies', contact: 'Contact us', menu: 'Menu',
         policyTabs: { terms: 'Terms & Conditions', delivery: 'Delivery & Returns', privacy: 'Privacy Policy' } },

  // `chatOnWhatsapp` is the label on ContactForm's WhatsApp button — today
  // that form appears only at the foot of /about.
  common: { whatsapp: 'WhatsApp', chatOnWhatsapp: 'Chat with us', backToTop: 'Back to the top' },

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

  // ───────────────────────────────────────────────────────────────────────────
  // The three legal documents on /policies. Structure (which docs, which
  // sections, in what order) is in pages/Policies/data.js; this is the copy.
  //
  // Each section is { heading, blocks: [...] }. A block is either a string (one
  // paragraph) or { list: [...] } (a bulleted list). The renderer walks them in
  // order, so a section's shape is set entirely here.
  //
  // {legalName}, {licensedBy} and {address} are filled from data/site.js at
  // render time — the entity details are never retyped into the copy.
  //
  // The "Contact Us" clause that closed each of the three source documents is
  // NOT repeated per doc: the page ends with a single `policies.contact` block.
  //
  // DELIBERATELY NOT TRANSLATED: fr.js, es.js and ar.js carry no `policies`
  // key, so every locale falls through to this English text via the deepMerge
  // in LanguageContext. Machine-translating binding consumer terms would create
  // four versions that could be read against each other; a translation here
  // needs a person who can be held to it.
  // ───────────────────────────────────────────────────────────────────────────
  policies: {
    kicker: 'Legal',
    title: 'Policies',
    lede: 'Our terms of sale, how delivery and returns work, and what we do with your information. Everything below applies to purchases made through this website.',
    updated: 'Last updated: September 2026',
    tocHeading: 'On this page',

    docs: {
      terms: {
        title: 'Terms & Conditions',
        intro: [
          'Welcome to THE NAME.',
          'This website and online store are operated by {legalName}, licensed by {licensedBy} and operating from {address}.',
          'These Terms & Conditions apply to purchases made through THE NAME website. By placing an order, you agree to these Terms & Conditions.',
          'Nothing in these Terms is intended to limit any rights available to you under applicable UAE consumer protection laws.',
        ],
        sections: {
          orders: {
            heading: 'Online Orders',
            blocks: [
              'Products displayed on our website are subject to availability.',
              'Payment is made in full at checkout. Once payment has been received, your order will be reviewed by THE NAME to confirm product availability, requested quantity and, where applicable, customization requirements.',
              'Your payment confirmation does not by itself mean that your order has been accepted for production. Your order is confirmed once it has been reviewed and accepted by THE NAME.',
              'If we are unable to fulfil your order, we may offer you a suitable alternative. If you choose not to accept the alternative, the amount paid for the unavailable order will be refunded to your original payment method.',
            ],
          },
          prices: {
            heading: 'Prices & Payment',
            blocks: [
              'All prices on the website are displayed in UAE Dirhams (AED) unless otherwise stated.',
              'Applicable VAT is calculated and displayed before checkout and will form part of the final amount payable.',
              'Online payments are processed securely through Stripe. THE NAME does not directly store your complete payment-card details.',
            ],
          },
          personalization: {
            heading: 'Personalization & Custom Orders',
            blocks: [
              'THE NAME allows selected products to be personalized with details such as names, initials, dates, messages, logos or artwork.',
              'Where the online customization tool is available, you will be shown a digital mock-up of your personalization before proceeding to checkout.',
              'Please review your personalization carefully before placing your order. You are responsible for checking the accuracy of all information you submit, including spelling, names, initials, dates, messages and uploaded artwork.',
              'If an item is produced correctly according to the personalization submitted and approved by you, THE NAME is not responsible for errors contained in the information you provided. Any requested remake in such circumstances may be subject to additional charges.',
              'If THE NAME produces an item incorrectly or differently from the personalization approved by you, please contact us and we will arrange an appropriate replacement, remake or other remedy.',
              'Requests to amend personalization after an order has been submitted may be accommodated only where production has not yet started. Once production has begun, changes may no longer be possible.',
            ],
          },
          artwork: {
            heading: 'Customer-Supplied Artwork & Content',
            blocks: [
              'By submitting a logo, image, artwork, trademark or other material for customization, you confirm that you own the material or have the necessary permission or rights to use it for the requested purpose.',
              'THE NAME reserves the right to decline customization containing content that is unlawful, offensive, inappropriate or reasonably suspected of infringing the rights of another person or organization.',
            ],
          },
          production: {
            heading: 'Production Time',
            blocks: [
              'Standard personalized B2C orders normally require approximately 3–5 business days for production after the order has been reviewed and confirmed.',
              "For this purpose, THE NAME's business days are Monday to Saturday, excluding UAE public holidays.",
              'Production time and delivery time are separate.',
              'Large-volume, corporate, bulk and specially produced orders may require different production timelines. Applicable timelines and commercial terms for such orders will be stated in the relevant quotation and/or invoice.',
            ],
          },
          delivery: {
            heading: 'Delivery',
            blocks: [
              'THE NAME currently delivers within the United Arab Emirates only, covering all seven Emirates.',
              'The standard UAE delivery fee is AED 30 per order. Orders are normally delivered 1–2 business days after production is completed.',
              "Delivery estimates are provided in good faith and may be affected by circumstances outside THE NAME's reasonable control.",
              'A minimum order value for free delivery will be confirmed and published here.',
              'Customers may have the option to collect their completed order free of charge from THE NAME at Dubai CommerCity, Dubai.',
              'Full delivery information is in the Delivery & Returns Policy below.',
            ],
          },
          cancellations: {
            heading: 'Cancellations',
            blocks: [
              'For non-customized products, an order may be cancelled before it has been dispatched.',
              'For personalized or custom-made products, cancellation is possible only before production has started. Once production of a personalized item has begun, the order becomes non-cancellable and non-refundable for change-of-mind purposes.',
              'This does not affect your rights where a product is defective, damaged, incorrect or has been produced differently from the customization approved by you.',
            ],
          },
          returns: {
            heading: 'Returns & Exchanges',
            blocks: [
              'Eligible non-customized products may be returned within 7 days of receipt, provided that the product is unused, undamaged, in its original condition and returned with its original packaging and tags intact.',
              'Personalized or custom-made products are non-returnable and non-refundable for change of mind once they have been produced specifically for you. This does not apply where an item is defective, damaged, incorrect or has been incorrectly customized by THE NAME.',
              'These terms do not exclude or limit any rights or remedies that cannot lawfully be excluded under applicable UAE consumer-protection legislation. UAE rules require e-commerce providers to disclose return and exchange conditions, and restrict contractual provisions that improperly waive consumer rights.',
            ],
          },
          damaged: {
            heading: 'Damaged, Defective or Incorrect Orders',
            blocks: [
              'If your order arrives damaged or defective, you receive the wrong product, or THE NAME has produced personalization differently from what you approved, please contact us within 48 hours of delivery.',
              'We may ask you to provide clear photographs of the product and, where relevant, its packaging so that we can review the issue.',
              'Where THE NAME confirms an error or qualifying issue, we will first arrange an appropriate replacement or remake. Where replacement or remake is not possible, a full refund will be issued.',
              'The 48-hour reporting request does not limit any statutory rights you may have under applicable UAE law.',
            ],
          },
          refunds: {
            heading: 'Refunds',
            blocks: [
              'Approved refunds will be issued to the original payment method used to make the purchase.',
              'Refunds are normally processed within 7–14 business days of approval.',
              'Your bank or payment provider may require additional time for a processed refund to appear in your account.',
            ],
          },
          corporate: {
            heading: 'Corporate & Bulk Orders',
            blocks: [
              'Corporate, government, event, bulk and other B2B orders may be subject to separate commercial terms.',
              'Where applicable, payment terms, production schedules, quantities, delivery requirements and other project-specific conditions will be stated in the relevant quotation and/or invoice.',
              'Where project-specific terms have been agreed separately, those terms will apply to that order to the extent specified.',
            ],
          },
          warranty: {
            heading: 'Product Warranty',
            blocks: [
              'Where a third-party branded product carries a manufacturer warranty, the terms of that warranty are set by the manufacturer. Contact us and we will tell you what cover applies to your item and how to make a claim.',
              'Any applicable statutory warranty or consumer rights remain unaffected.',
            ],
          },
          accounts: {
            heading: 'Customer Accounts',
            blocks: [
              'You may purchase through THE NAME using guest checkout or by creating a customer account.',
              'Registered customers may access their account information and previous order history when logged in.',
              'You are responsible for keeping your account credentials secure and for notifying us if you believe your account has been accessed without authorization.',
            ],
          },
          privacy: {
            heading: 'Privacy',
            blocks: [
              'When you purchase from THE NAME or create an account, we may collect information necessary to process and fulfil your order, including your name, email address, mobile number, delivery address and order or customization information.',
              'Our handling of personal information is explained in the Privacy Policy below.',
              'Purchasing from THE NAME does not automatically subscribe you to marketing communications. Promotional communications will only be sent where you have separately opted in.',
            ],
          },
          age: {
            heading: 'Age Requirements',
            blocks: [
              'You must be 18 years of age or older to make a purchase directly through this website.',
              'Any purchase, registration or submission involving a person under the age of 18 must be completed by or through their parent or legal guardian.',
            ],
          },
          ip: {
            heading: 'Intellectual Property',
            blocks: [
              'Unless otherwise stated, the website design, copy, photography, graphics, creative materials and original content associated with THE NAME may not be copied, reproduced, distributed or commercially used without prior permission.',
              'Third-party brand names, product names, logos and trademarks displayed on the website remain the property of their respective owners.',
              'The website is designed and developed by The Name Agency.',
            ],
          },
          changes: {
            heading: 'Changes to These Terms',
            blocks: [
              'THE NAME may update these Terms & Conditions from time to time to reflect changes to our services, website, operational practices or applicable legal requirements.',
              'The version applicable to your purchase will be the version in effect when your order is placed, except where a change is required by applicable law.',
            ],
          },
          law: {
            heading: 'Governing Law',
            blocks: [
              'These Terms & Conditions and purchases made through THE NAME website are governed by the applicable laws of the United Arab Emirates.',
              'Nothing in these Terms excludes or restricts rights provided to consumers under applicable UAE law. UAE consumer-protection legislation applies to goods and services in the UAE, including e-commerce transactions involving providers registered in the UAE and free zones.',
            ],
          },
        },
      },

      delivery: {
        title: 'Delivery & Returns Policy',
        intro: [
          "At THE NAME, many of our pieces are made personal especially for you. Below you'll find everything you need to know about production, delivery, cancellations, returns and refunds.",
          'This policy should be read together with the Terms & Conditions above. Nothing in this policy limits your rights under applicable UAE consumer protection laws, which apply to UAE-registered e-commerce providers including businesses operating in free zones.',
        ],
        sections: {
          production: {
            heading: 'Production Time',
            blocks: [
              'Personalized orders typically require 3–5 business days for production after your order has been reviewed and confirmed by THE NAME.',
              'Our business days are Monday to Saturday, excluding UAE public holidays.',
              'Please remember that production time and delivery time are separate.',
              'For corporate, bulk or specially produced orders, the applicable production timeframe will be confirmed separately in the relevant quotation and/or invoice.',
            ],
          },
          across: {
            heading: 'Delivery Across the UAE',
            blocks: [
              'We currently deliver within the UAE only, covering all seven Emirates.',
              'Delivery is AED 30 per order, and your order normally arrives approximately 1–2 business days after production is completed.',
              'Delivery estimates are provided in good faith and may occasionally be affected by circumstances outside our reasonable control.',
              'A minimum order value for free delivery will be confirmed and published here.',
            ],
          },
          collection: {
            heading: 'Collection from THE NAME',
            blocks: [
              'Customers may also have the option to collect their completed order free of charge from THE NAME at Dubai CommerCity, Dubai.',
              'Collection details will be provided once the order is ready.',
            ],
          },
          cancelling: {
            heading: 'Cancelling an Order',
            blocks: [
              'Changed your mind? The cancellation conditions depend on whether your order has been personalized.',
              'Non-customized orders may be cancelled before they have been dispatched. Personalized or custom-made orders may be cancelled only before production has started.',
              'Once production of a personalized item has begun, the order becomes non-cancellable and non-refundable for change of mind.',
              'To request a cancellation, contact us as soon as possible using the details at the foot of this page.',
            ],
          },
          returns: {
            heading: 'Returns — Non-Customized Products',
            blocks: [
              'Eligible non-customized products may be returned within 7 days of receipt. To qualify for a return, the product must be:',
              { list: [
                'unused and undamaged;',
                'in its original condition; and',
                'returned with its original packaging and tags intact.',
              ] },
              'Contact our team before returning an item so we can confirm the return process.',
            ],
          },
          personalized: {
            heading: 'Personalized Products',
            blocks: [
              'Because personalized products are created specifically for you, they are non-returnable and non-refundable for change of mind once produced.',
              'Please check all names, initials, dates, messages, artwork and other personalization carefully before completing your order. Where a digital customization preview is provided, proceeding to checkout confirms the personalization displayed.',
              'If the information you entered and approved contains an error, THE NAME is not responsible for that customer-entered error and a remake may be chargeable.',
              'This does not affect your rights where the item is defective, damaged, incorrect, or THE NAME has produced it differently from the customization you approved. UAE consumer-protection rules impose remedies in cases involving defective goods and prohibit terms that improperly remove statutory consumer rights.',
            ],
          },
          damaged: {
            heading: 'Damaged, Defective or Incorrect Orders',
            blocks: [
              'Please contact us within 48 hours of delivery if your item:',
              { list: [
                'arrives damaged or defective,',
                'is not the product you ordered, or',
                'has been personalized differently from what you approved.',
              ] },
              'Include your order details and clear photographs of the product and, where relevant, its packaging so our team can review the issue.',
              "Where THE NAME confirms an error or qualifying issue, we will first arrange a replacement or remake. If a replacement or remake isn't possible, we will issue a full refund.",
              'The 48-hour reporting request does not restrict any statutory consumer rights that apply under UAE law.',
            ],
          },
          refunds: {
            heading: 'Refunds',
            blocks: [
              'Approved refunds will be returned to the original payment method used for the purchase.',
              'Refunds are normally processed within 7–14 business days from approval.',
              'Please note that your bank or card provider may require additional processing time before a completed refund appears in your account.',
            ],
          },
        },
      },

      privacy: {
        title: 'Privacy Policy',
        intro: [
          'At THE NAME, we respect your privacy and are committed to handling your personal information responsibly and in accordance with applicable laws of the United Arab Emirates.',
          'This Privacy Policy explains what information we collect when you use our website or purchase from us, why we collect it, how it may be used and shared, and the choices available to you.',
        ],
        sections: {
          who: {
            heading: 'Who We Are',
            blocks: [
              'This website and online store are operated by {legalName}, of {address}, licensed by {licensedBy}.',
              'Privacy-related questions and requests go to the privacy address at the foot of this page.',
            ],
          },
          collect: {
            heading: 'Information We Collect',
            blocks: [
              'When you browse, create an account, place an order or contact us in relation to a purchase, we may collect information including:',
              { list: [
                'your full name;',
                'email address;',
                'mobile number;',
                'delivery address;',
                'account information, where you create an account;',
                'order details; and',
                'information, text, logos or artwork you provide for personalization.',
              ] },
              'We collect only information reasonably required to provide our services, fulfil your orders, communicate with you and operate our online store.',
            ],
          },
          payment: {
            heading: 'Payment Information',
            blocks: [
              'Online payments are processed through Stripe.',
              'THE NAME does not directly store your complete payment-card details. Payment information required to process your transaction is handled by the payment provider in accordance with its applicable security and privacy practices.',
            ],
          },
          use: {
            heading: 'How We Use Your Information',
            blocks: [
              'We may use your personal information to:',
              { list: [
                'create and manage your customer account;',
                'process and confirm your orders;',
                'produce personalized products;',
                'arrange delivery or collection;',
                'communicate with you about your order;',
                'manage cancellations, returns, refunds and complaints;',
                'provide customer support;',
                'maintain transaction and order records;',
                'comply with applicable accounting, tax, regulatory or legal obligations; and',
                'protect the security and integrity of our website and services.',
              ] },
              'We will not use information collected through an order to automatically subscribe you to marketing communications.',
            ],
          },
          marketing: {
            heading: 'Marketing Communications',
            blocks: [
              'Purchasing from THE NAME does not automatically subscribe you to promotional communications.',
              'We may send you promotional emails, WhatsApp messages or other marketing communications only where you have separately chosen to receive them. You may withdraw your marketing consent at any time.',
              'UAE consumer-protection legislation recognizes protection of consumer privacy and data security, and restricts the use of consumer data for promotion and marketing.',
            ],
          },
          sharing: {
            heading: 'Sharing Your Information',
            blocks: [
              'We do not sell your personal information or provide it to third parties for their own marketing purposes.',
              'We may share only the information reasonably necessary with service providers that help us operate and fulfil your purchase. This may include:',
              { list: [
                'Stripe — to process online payments.',
                'Delivery and courier providers — to deliver your order. This may include sharing information such as your name, mobile number and delivery address.',
              ] },
              'We may also disclose information where required by applicable law, regulation, court order or a competent UAE authority.',
            ],
          },
          accounts: {
            heading: 'Customer Accounts',
            blocks: [
              'You may shop through THE NAME using guest checkout or by creating a registered customer account.',
              'If you create an account, certain information may be retained so that you can access your account details and previous order history when logged in.',
              'You are responsible for maintaining the confidentiality of your account credentials.',
            ],
          },
          personalization: {
            heading: 'Personalization Information',
            blocks: [
              'Where you personalize a product, we may process the information necessary to produce your order, including names, initials, messages, logos, artwork or other customization content you submit.',
              'This information will be used for the purpose of processing and producing your order and maintaining relevant transaction records.',
              'Please do not submit personal information about another person through a customization unless you have the appropriate authority or permission to do so.',
            ],
          },
          children: {
            heading: 'Children',
            blocks: [
              'Customers must be 18 years or older to make purchases directly through our website.',
              'Any registration, purchase, submission of personal information or artwork involving a person under 18 must be completed by or through a parent or legal guardian.',
            ],
          },
          retention: {
            heading: 'How Long We Keep Information',
            blocks: [
              'We retain personal information only for as long as reasonably necessary for the purposes for which it was collected, including fulfilling orders, maintaining transaction records and meeting applicable accounting, tax, regulatory and legal requirements.',
              'Information that is no longer reasonably required will be handled in accordance with our applicable data-retention practices and legal obligations.',
            ],
          },
          security: {
            heading: 'Protecting Your Information',
            blocks: [
              'We take reasonable organizational and technical measures to protect personal information against unauthorized access, loss, misuse, alteration or disclosure.',
              'However, no method of electronic transmission or storage can be guaranteed to be completely secure.',
            ],
          },
          rights: {
            heading: 'Your Personal Data Rights',
            blocks: [
              'Subject to applicable UAE law and any lawful exceptions, you may have rights regarding your personal information, including rights relating to access, correction, deletion or restriction of certain processing.',
              'The UAE Personal Data Protection Law provides data subjects with rights concerning their personal information, subject to conditions and exceptions established by the legislation.',
              'To submit a privacy or personal-data request, use the privacy address at the foot of this page. We may need to verify your identity before completing certain requests.',
            ],
          },
          cookies: {
            heading: 'Cookies & Tracking',
            blocks: [
              'THE NAME currently does not use advertising pixels or third-party analytics tracking tools such as Meta Pixel or Google Analytics.',
              'The website may nevertheless use technical functionality necessary for the operation of the online store, such as maintaining sessions, customer login, shopping-cart functionality, security and checkout.',
              'If our use of cookies, analytics or advertising technologies changes, this Privacy Policy will be updated accordingly and any required consent mechanisms will be implemented.',
            ],
          },
          thirdParty: {
            heading: 'Third-Party Services',
            blocks: [
              'Our website may rely on third-party services necessary to provide features such as payment processing and delivery.',
              'Where you interact with those services, their handling of personal information may also be governed by their own applicable privacy terms.',
              'THE NAME takes reasonable steps to work with service providers appropriate for the services they perform.',
            ],
          },
          changes: {
            heading: 'Changes to This Privacy Policy',
            blocks: [
              'We may update this Privacy Policy from time to time to reflect changes in our website, services, business practices or applicable legal requirements.',
              'The latest version will be published on this website together with its updated effective date.',
            ],
          },
        },
      },
    },

    // The single contact block that closes the page, in place of the three
    // near-identical "Contact Us" clauses the source documents each ended with.
    contact: {
      heading: 'Contact Us',
      lede: 'For questions about an order, cancellation, delivery, return or complaint — and for privacy and personal-data enquiries.',
      ordersHeading: 'Orders, delivery & returns',
      privacyHeading: 'Privacy & personal data',
      emailLabel: 'Email',
      phoneLabel: 'Phone / WhatsApp',
      addressLabel: 'Address',
      licenceLabel: 'Licensed by',
    },
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
    body: 'Discover design-led objects from brands we love — then make them unmistakably yours. Add a name, initials, a message or something that means something to you.',
    openShop: 'Shop the Collection',
    askPersonal: 'Customize Yours →',
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
    title: 'Make Your Brand the Gift.',
    intro: 'Corporate gifting should do more than carry your logo. We create thoughtful, design-led gifts and branded collections that keep your identity visible, useful and remembered — from employee kits and client gifts to events, VIP gifting and large-scale orders.',
    ctaEnquiry: 'Start a Business Enquiry',
    offer: {
      heading: 'Made for Business',
      lede: 'From one thoughtful client gift to a full employee or event collection, we bring your brand into objects people actually want to keep.',
      items: {
        corporateGifts: {
          name: 'Corporate Gifts', moq: 'From 25',
          note: 'Client thank-yous, VIP gifting, milestones and seasonal moments — thoughtfully curated, branded and ready to give.',
          placeholder: 'Branded corporate gift boxes',
        },
        onboardingKits: {
          name: 'Employee & Onboarding Kits', moq: 'From 10 kits',
          note: 'Welcome new joiners with a collection that feels considered from day one — curated, personalized and packaged around your brand.',
          placeholder: 'A new-starter welcome kit, packed',
        },
        eventGiveaways: {
          name: 'Events & Brand Experiences', moq: 'From 50',
          note: 'From launches and conferences to activations and special occasions — branded pieces designed to keep your identity in the experience.',
          placeholder: 'Branded giveaways on an event table',
        },
      },
    },
    terms: {
      heading: 'How We Work With You',
      cta: 'Start Your Brief',
      items: [
        { term: 'Tell Us What You Need', detail: "Share your brief, quantity, occasion and timeline. We'll build the right solution around your needs and budget." },
        { term: 'Your Brand, Kept Consistent', detail: 'Once approved, your brand assets and specifications can be kept on file to make future orders simpler and consistent.' },
        { term: 'Built Around Your Quantity', detail: 'From curated quantities to large-scale requirements, pricing and production are tailored to the scope of your order.' },
      ],
    },
    catering: {
      kicker: 'Catering',
      heading: 'Catering, Wherever Business Takes You.',
      lede: 'From team lunches and meetings to corporate gatherings and off-site events, we bring THE NAME experience to your table.',
      // No `title` here on purpose: the "Catering, off-site" heading this panel
      // used to show above the table was dropped. PackagesPanel renders its
      // title only when the block has one, so the Cafe page keeps its own.
      placeholder: 'THE NAME, at your venue.',
      askFor: [
        'Date, location & preferred time',
        'Number of guests & serving style',
        'Dietary requirements',
        'One-off or recurring',
      ],
    },
  },

  about: {
    // The brand film is PARKED until the video is delivered — see the JSX
    // comment in About.jsx. Keys kept so uncommenting it is the only step.
    video: {
      kicker: 'Our story',
      title: 'Watch the story.',
      lede: 'A short film on who we are, what we make, and why a name changes an object.',
      placeholder: 'About The Name — brand video',
    },

    // — the hero —
    kicker: 'Our story',
    title: 'It Started With a Name.',
    lede: 'Our story began in 1990, long before THE NAME had a name of its own. It began with customization, corporate gifting and a belief that the most memorable things are the ones made personal.',
    heroSupport: 'More than three decades later, that belief has found a new home.',

    // — the timeline: 1990 → evolution → today. Ids match storyChapters in
    //   pages/About/data.js and the slots in data/media.js `about.story`. —
    story: {
      legacy: {
        era: '1990 — where it started',
        headline: 'Made Personal, From the Beginning.',
        body: 'The journey began in 1990 with customization and corporate gifting — creating objects for businesses, occasions and people that carried something more meaningful than the product itself: an identity.',
        placeholder: '1990 — the first customized pieces',
      },
      evolution: {
        era: 'The next chapter',
        headline: 'From Making Brands Personal to Bringing Great Brands Closer.',
        body: 'As the business evolved, so did our world. We began bringing international design and lifestyle brands to the Middle East, building relationships, discovering exceptional products and learning what makes an object worth choosing, using and remembering.',
        closing: 'Customization. Gifting. Brands. Experiences. Each chapter added something to the next.',
        placeholder: 'The design brands we brought to the region',
      },
      today: {
        era: 'Today — The Name',
        headline: 'One Place. Every Part of Our Story.',
        body: 'THE NAME brings that legacy together in one place. A destination to discover design, personalize what you love, meet, eat, collaborate, create and experience something new. Physical and digital. Personal and corporate. A store, a social hub and a platform for what comes next.',
        placeholder: 'Inside THE NAME today',
      },
    },

    // — the philosophy panel. `fromPrefix` is only the word before the
    //   brand lockup: the logo artwork supplies "THE NAME" itself, article
    //   included, exactly as it does in the Home hero. —
    tagline: {
      fromPrefix: 'From',
      to: 'To Your Name.',
      lede: 'It\'s more than our tagline. It\'s how we think.',
      body: 'When a brand walks through our doors, THE NAME can become their name. When an individual chooses something, it becomes their name. Their identity. Their moment. Their story.',
    },

    // — the takeovers: proof the space itself changes. The collaborator
    //   names are proper nouns and live in pages/About/data.js. —
    takeover: {
      headline: 'For a moment, the space isn\'t ours. It\'s theirs.',
      body: 'We build collaborations around the identity of the people and brands we work with — transforming the products, experience and sometimes the space itself around their name.',
    },

    // — who we have worked with —
    collab: {
      era: 'Built through collaboration',
      headline: 'Some Names We\'ve Made Something With.',
      body: 'Across the journey, our work has brought us together with global brands, institutions and organizations — creating customized products, gifting, experiences and collaborations built around their identity.',
    },

    // — where it goes next —
    future: {
      era: 'What\'s next',
      headline: 'A Legacy Built Here. Ready to Travel.',
      body: 'The UAE taught us to keep looking forward — to build, evolve and think beyond where we are today. THE NAME is our next chapter: bringing more than three decades of experience into a new era of digital customization, experiences and collaboration, with our sights set beyond the UAE and across the GCC.',
      closing: 'The story started in 1990. What comes next has your name on it.',
    },

    // — everything below belongs to the PARKED block in About.jsx —
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
    title: 'Little Names. Big Stories.',
    lede: 'Their name on a bottle. Their drawing on something real. Their idea turned into something they can hold. From everyday essentials to gifts, celebrations and their very first creations — we make the things that belong to their story.',
    heroPlaceholder: "A child's bottle and lunchbox with a name on them",
    ctaShop: 'Shop for Kids',
    ctaAsk: 'Make Something for Them',
    offerHeading: 'Made for Their Little Moments',
    offerLede: "For school days, new beginnings, birthdays and everything worth putting their name on. Explore some of the ways we make it personal for little people.",
    offers: {
      backToSchool: {
        name: 'Back to School',
        note: 'Bottles, lunchboxes, pencil cases and everyday favourites — made easier to spot, harder to lose and unmistakably theirs.',
        placeholder: 'Named bottle, lunchbox and pencil case',
      },
      newBaby: {
        name: 'Hello, Little One',
        note: 'A name. A date. A tiny beginning worth remembering. Keepsakes created for the moments families hold onto.',
        placeholder: 'An engraved new-baby keepsake',
      },
      birthdays: {
        name: 'Birthdays & Celebrations',
        note: 'Personalized gifts, party favours and little details made especially for the birthday child — and, if you like, the whole guest list.',
        placeholder: 'Named party favours on a table',
      },
    },
    note: {
      kicker: 'Made for them',
      heading: 'Small Details. Completely Theirs.',
      points: [
        'Names, initials, messages, drawings and little ideas — made personal in the way that suits each piece.',
        'See their personalization before you order, so every little detail feels right.',
        'One child or a whole celebration — we can make one or make many.',
        "Need something for a class, party or group? Tell us what you're planning and we'll build it with you.",
      ],
    },
    // — the activation: the kids' own creations. The gallery is the real
    //   photography now; the two films are still placeholders until the
    //   footage is cut — see data/media.js `kids.activation`. —
    activation: {
      kicker: 'The Name: Little Creators',
      heading: 'What If Their Idea Had a Name?',
      body: "We believe kids shouldn't only receive things made for them. Sometimes, they should get to make the idea. Draw it. Name it. Put it out into the world — and discover what happens when something that started in their imagination becomes real.",
      support: 'That\'s exactly what happened at our latest kids activation.',
      videoPlaceholder: 'Kids at the activation — showing their products and answering questions',
      galleryHeading: 'From the activation',
      prevShots: 'Previous photos',
      nextShots: 'More photos',
      shots: {
        showingProducts: 'The little creators behind their stand',
        theCollection: 'The collection laid out — mugs, bottles, caps and notebooks',
        mugs: 'Mugs carrying the kids\' own drawings',
        withParents: 'Parents and children around the table',
        makingTogether: 'Making at the craft table',
        onTheStand: 'The little creators\' stand',
      },
    },

    // — the featured story that came out of it —
    twoTs: {
      kicker: "Meet Two T's",
      heading: 'A Little Brand With a Big Heart.',
      body: "Created by five-year-old Teya, Two T's began with her drawings and ideas — including her Hearts collection — and became something she could proudly call her own. At our kids activation, she got to share it, talk about it and watch other children discover what she created.",
      closing: 'Her idea. Her drawings. Her name on it.',
      videoPlaceholder: 'Kids interviews from the activation',
    },
    cta: {
      heading: "What's Their Name? Let's Start There.",
      body: "Tell us who it's for, how old they are and what you're celebrating, creating or looking for. We'll help you make it theirs.",
      shop: 'Shop for Kids',
      whatsapp: 'Create With Us on WhatsApp',
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
    nudge: "Let's talk",
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
    // Shared with the (parked) Cafe page's own PackagesPanel — changing these
    // changes both.
    directLineKicker: 'Plan your catering',
    directLineTitle: "Tell Us What You're Planning",
    openWhatsapp: 'Plan It With Us',
    replyNote: 'Our team will get back to you with availability and next steps.',
  },
};
