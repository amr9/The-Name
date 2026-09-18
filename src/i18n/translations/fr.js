export default {
  // `cafe` est conservé pour la page café mise de côté ; `contact` pour le
  // formulaire, désormais au bas de la page À propos.
  nav: { home: 'Accueil', cafe: 'Café', kids: 'Enfants', shop: 'Boutique The Name', business: 'Entreprises', about: 'À propos', contact: 'Nous contacter', menu: 'Menu' },

  common: { whatsapp: 'WhatsApp', chatOnWhatsapp: 'Discuter sur WhatsApp' },

  contact: {
    kicker: 'Contact',
    title: 'Dites-nous ce qu’il vous faut.',
    body: 'Réservations à partir de huit personnes, devis traiteur, soirées privées, presse et demandes professionnelles — écrivez-nous ici et le bureau des opérations s’en occupe.',
    emailHeading: 'E-mail',
    phoneHeading: 'Téléphone et WhatsApp',
    optional: 'facultatif',
    send: 'Envoyer le message',
    sending: 'Envoi…',
    privacy: 'Vos coordonnées servent uniquement à répondre à cette demande.',
    sentTitle: 'Merci — c’est bien reçu.',
    sentBody: 'Le bureau des opérations répond sous un jour ouvré. Pour une urgence pendant le service, WhatsApp est plus rapide.',
    sendAnother: 'Envoyer un autre message',
    fields: {
      name: { label: 'Nom', placeholder: 'Votre nom' },
      email: { label: 'E-mail', placeholder: 'vous@exemple.com' },
      phone: { label: 'Téléphone', placeholder: '+971 …' },
      message: { label: 'Message', placeholder: 'Dates, nombre de personnes, et tout ce qu’il faut savoir.' },
    },
    errors: {
      required: 'Ce champ est requis.',
      email: 'Cette adresse e-mail semble incorrecte.',
      tooLong: 'C’est plus long que ce que nous pouvons accepter.',
      emailUndeliverable: 'Ce domaine ne peut pas recevoir d’e-mails — vérifiez la saisie.',
      emailDisposable: 'Merci d’utiliser une adresse à laquelle nous pouvons répondre.',
      rateLimited: 'Cela fait beaucoup de messages en peu de temps. Réessayez bientôt, ou écrivez-nous sur WhatsApp.',
      send: 'L’envoi a échoué. Réessayez, ou écrivez-nous sur WhatsApp.',
    },
  },

  footer: {
    rights: 'Tous droits réservés.',
  },

  home: {
    hero: {
      titleLeadPrefix: 'De',
      titleScript: 'À votre nom.',
      body: 'Nous sélectionnons des objets au design affirmé et les rendons personnels — avec votre nom, votre message, votre histoire ou votre marque. D\'un cadeau unique à toute une collection d\'entreprise, chaque pièce est faite pour porter une identité.',
      mediaLabel: 'Vidéo ou photo de personnalisation — gravure, impression, cadeaux finis',
      ctaTour: 'Vue virtuelle des produits',
      ctaShop: 'Rendez-le personnel',
    },
    whatWeDo: {
      kicker: 'Ce que nous faisons',
      heading: 'Des objets qui racontent votre histoire',
      body: 'Nous trouvons des objets qui méritent d\'être gardés — puis nous leur donnons plus de sens. Un nom. Une initiale. Un message. Une marque. Une histoire qui transforme un bel objet en quelque chose d\'incontestablement vôtre.',
    },
    services: {
      personalGifts: {
        kicker: 'Pour vous', title: 'Rendez-le personnel',
        placeholder: 'Un cadeau personnalisé en cours d\'emballage',
        body: 'Pour les anniversaires, les grandes étapes, les remerciements, les petites célébrations — ou simplement parce que cela devrait porter votre nom. Choisissez dans notre collection et rendez-la vôtre avec un nom, des initiales, une date ou un message.',
        points: ['Une seule pièce ? Bien sûr.', 'Personnalisez-le à votre façon', 'Magnifiquement fini et prêt à offrir.'],
        cta: 'Acheter et personnaliser',
      },
      businessBranding: {
        kicker: 'Pour votre entreprise', title: 'Faites de votre marque le cadeau',
        placeholder: 'Coffrets cadeaux d\'entreprise personnalisés',
        body: 'Un cadeau d\'entreprise doit faire plus que porter votre logo. Nous créons des cadeaux et des collections au design soigné qui gardent votre identité visible, utile et mémorable — des kits collaborateurs aux cadeaux clients, en passant par les événements, les cadeaux VIP et les commandes à grande échelle.',
        points: ['Une personnalisation individuelle à grande échelle', 'Produits sélectionnés, coffrets sur mesure et emballage premium', 'Commandes entreprises, administrations et événements', 'Des concepts créatifs pensés autour de votre marque'],
        cta: 'Démarrer une demande entreprise',
      },
    },
    howItWorks: {
      kicker: 'Comment ça marche',
      heading: 'Quatre étapes, du produit vierge au colis.',
      lede: 'Une pièce ou mille, nous rendons la personnalisation simple.',
      methodsKicker: 'Techniques de personnalisation',
      suits: 'Idéal sur',
      minimum: 'Minimum',
      leadTime: 'Délai',
      ctaShop: 'Rendez-le personnel',
      footnote: 'Les quantités professionnelles font l\'objet d\'un devis — parlons-en',
      methods: {
        engraving: {
          name: 'Gravure', suits: 'Métal, bois, verre, cuir', minimum: '1 pièce', lead: '3 – 5 jours',
          note: 'Creusée dans la surface au laser. Permanente, sans couleur, et elle ne s\'efface jamais.',
          placeholder: 'Gros plan d\'une surface gravée',
        },
        print: {
          name: 'Impression', suits: 'Céramique, papier, plastique, textiles', minimum: '1 pièce', lead: '2 – 4 jours',
          note: 'Quadrichromie, détail photographique. La technique à choisir quand un logo dépasse deux couleurs ou comporte un dégradé.',
          placeholder: 'Gros plan d\'un produit imprimé',
        },
        embroidery: {
          name: 'Broderie', suits: 'Casquettes, textile, sacs, tabliers', minimum: '10 pièces', lead: '7 – 10 jours',
          note: 'Cousue au fil. Plus épaisse et plus texturée que l\'impression, et elle résiste au lavage.',
          placeholder: 'Gros plan d\'un logo brodé',
        },
        emboss: {
          name: 'Gaufrage', suits: 'Cuir, carte, couvertures toilées', minimum: '25 pièces', lead: '7 – 10 jours',
          note: 'Pressé dans la matière, en relief ou en creux. Discret et tactile — sans aucune encre.',
          placeholder: 'Gros plan d\'une couverture gaufrée',
        },
      },
    },
  },

  cafe: {
    kicker: 'Le café',
    title: 'Des saveurs fraîches chaque jour',
    partners: {
      heading: 'Nos partenaires',
      items: {
        talabat: { name: 'talabat' },
        noon: { name: 'noon' },
      },
    },
    askAboutDish: (dish) => `Demander à propos de ${dish} sur WhatsApp`,
    viewList: 'Liste',
    viewCards: 'Cartes',
    updated: 'Mis à jour mer. 02 sept.',
    askAllergens: 'Question sur les allergènes',
    shopLink: 'Personnaliser un cadeau →',
    prevDishes: 'Plats précédents',
    nextDishes: 'Plus de plats',
    sections: {
      counter: {
        name: 'Comptoir', time: '08h00 – 16h00',
        items: {
          breadConservaOil: { dish: 'Pain, conserva, huile', note: 'La miche du vendredi, deuxième jour, sur l\'assiette Orbit.', tag: 'Toute la journée', price: '£6' },
          anchovyToast: { dish: 'Toast à l\'anchois', note: 'Deux tranches, beurre, piment.', tag: 'Toute la journée', price: '£7' },
          oliveOilCake: { dish: 'Gâteau à l\'huile d\'olive', note: 'Gâteaux entiers sur commande — demandez-nous.', tag: 'Pâtisserie', price: '£5' },
        },
      },
      kitchen: {
        name: 'Cuisine', time: '11h30 – 15h00',
        items: {
          whiteBeans: { dish: 'Haricots blancs, légumes verts, huile pimentée', note: 'Mijotés longuement, finis à la minute.', tag: 'Végane', price: '£11' },
          roastCarrot: { dish: 'Carotte rôtie, yaourt, dukkah', note: 'Carottes entières, bien grillées.', tag: 'Végétarien', price: '£10' },
          porkSandwich: { dish: 'Sandwich à l\'épaule de porc', note: 'Jusqu\'à épuisement, généralement vers 14h.', tag: 'Déjeuner', price: '£13' },
        },
      },
      drinks: {
        name: 'Boissons', time: 'Toute la journée',
        items: {
          houseFilter: { dish: 'Filtre maison', note: 'Infusé par litre, recharge à moitié prix.', tag: 'Café', price: '£3,20' },
          flatWhite: { dish: 'Flat white', note: 'Aussi espresso, macchiato, cortado.', tag: 'Café', price: '£3,40' },
          citrusSoda: { dish: 'Soda aux agrumes', note: 'Fait maison, change chaque semaine.', tag: 'Frais', price: '£4' },
        },
      },
    },
    intro: 'Du petit-déjeuner au déjeuner tardif sept jours sur sept, un souper à quatre plats le vendredi soir, et la salle elle-même disponible pour vos soirées privées. Tout ce qui est cuisiné pour votre adresse relève du traiteur — c\'est sur la page entreprises.',
    events: {
      kicker: 'Événements',
      heading: 'Soirées privées, organisées ici',
      lede: 'Chaque événement se déroule dans le café lui-même — la salle après le service, ou avant l\'ouverture. Nous pouvons personnaliser les cadeaux pour qu\'ils s\'accordent à la soirée.',
      title: 'Événements, au café',
      colOne: 'Formule',
      intro: 'Chaque événement se déroule dans le café lui-même — la salle après le service, ou avant l\'ouverture. Même cuisine et même équipe que pour le souper du vendredi, et la salle peut être redécorée pour s’accorder à la soirée. Tout ce qui a lieu à votre adresse relève du traiteur.',
      placeholder: 'La salle installée pour une soirée privée',
      askFor: [
        'La date et l\'heure de fin',
        'Le nombre de personnes et si c\'est assis — la salle accueille 40 personnes',
        'La formule — souper-club, soirée de lancement, dégustation, salle seule',
        'Ce que la salle doit accueillir : AV, un discours, un gâteau',
      ],
      packages: {
        roomHire: { name: 'Location de la salle, soirée', note: 'Toute la salle à partir de six personnes, bar avec personnel.', covers: '40 assis', notice: '3 semaines', from: '£900 la salle' },
        supperClub: { name: 'Souper-club', note: 'Quatre plats fixes, un seul service, notre menu.', covers: '28 assis', notice: '4 semaines', from: '£46' },
        launchNight: { name: 'Soirée de lancement', note: 'La salle redécorée autour de ce que vous lancez.', covers: '20–60 debout', notice: '5 semaines', from: '£38' },
        privateBreakfast: { name: 'Petit-déjeuner privé', note: 'La salle avant l\'ouverture, portes closes jusqu\'à dix heures.', covers: '20–30 assis', notice: '2 semaines', from: '£24' },
      },
    },
  },

  shop: {
    badge: 'Marques choisies · personnalisées par nous',
    title: 'Rendez-le personnel',
    body: "Découvrez des objets design de marques que nous aimons — puis faites-en des pièces qui n'appartiennent qu'à vous. Ajoutez un nom, des initiales, un message ou ce qui compte pour vous.",
    openShop: 'Découvrir la collection ↗',
    askPersonal: 'Personnalisez la vôtre →',
    filters: { all: 'Tout', drinkware: 'Gourdes & tasses', tech: 'Tech', desk: 'Bureau', travel: 'Voyage', giftSets: 'Coffrets' },
    viewList: 'Liste',
    viewCards: 'Cartes',
    resultPiece: (n) => `${n} pièce`,
    resultPieces: (n) => `${n} pièces`,
    prevPieces: 'Pièces précédentes',
    nextPieces: 'Plus de pièces',
    viewLink: 'Voir ↗',
    personaliseItem: (name) => `Personnaliser ${name}`,
    giftSets: {
      kicker: 'Coffrets',
      heading: 'Emballés et prêts à offrir',
      lede: 'Des pièces sélectionnées réunies en un seul coffret, personnalisées et présentées dans un emballage à votre nom ou à votre marque. La façon la plus simple d\'offrir quelque chose de pensé sans avoir à le composer soi-même.',
    },
    items: {
      'TN-101': {
        name: 'Gourde Skittle, 500 ml', finish: 'Acier inoxydable double paroi', lead: '3 – 5 jours',
        note: "Garde les boissons fraîches toute la journée. Un nom sur le côté, ou un logo sur l'épaule.",
        placeholder: 'Gourde Skittle Lund London avec un nom gravé',
      },
      'TN-102': {
        name: 'Tasse à café isotherme', finish: 'Acier inoxydable, fini mat', lead: '3 – 5 jours',
        note: 'Le café du quotidien, dans une tasse qui porte leurs initiales.',
        placeholder: 'Tasse Lund London avec des initiales imprimées',
      },
      'TN-201': {
        name: 'Enceinte Fine', finish: 'Aluminium, sans fil', lead: '5 – 7 jours',
        note: "Une enceinte de poche qui se grave nettement — un classique des cadeaux d'équipe et clients.",
        placeholder: 'Enceinte Lexon Fine avec un logo gravé',
      },
      'TN-202': {
        name: 'Chargeur sans fil Oblio', finish: 'Station de recharge sans fil', lead: '5 – 7 jours',
        note: 'Il reste sur le bureau toute la journée — et la marque imprimée dessus aussi.',
        placeholder: 'Chargeur Lexon Oblio avec un logo imprimé',
      },
      'TN-301': {
        name: 'Lampe Mina', finish: 'LED rechargeable', lead: '3 – 5 jours',
        note: 'Une petite lampe qui va partout. Gravée à leurs initiales, elle devient la leur.',
        placeholder: 'Lampe Lexon Mina gravée aux initiales',
      },
      'TN-302': {
        name: 'Set de bureau en cuir', finish: 'Carnet, stylo et porte-cartes', lead: '7 – 10 jours',
        note: "Un accessoire de bureau qui porte le nom de chaque membre de l'équipe, sur chaque pièce.",
        placeholder: 'Set de bureau en cuir embossé à un nom',
      },
      'TN-401': {
        name: 'Protège-passeport en cuir', finish: 'Cuir pleine fleur', lead: '7 – 10 jours',
        note: "Des initiales pressées dans la couverture. Discret, tactile, et trop personnel pour être offert à quelqu'un d'autre.",
        placeholder: 'Protège-passeport en cuir aux initiales embossées',
      },
      'TN-501': {
        name: 'Coffret signature', finish: 'Pièces sélectionnées, emballage complet', lead: '7 – 10 jours',
        note: 'Des pièces Lexon et Lund London, personnalisées et présentées dans un emballage à votre nom ou à votre marque.',
        placeholder: 'Un coffret cadeau personnalisé, ouvert',
      },
      'TN-502': {
        name: 'Set de bureau, première journée', finish: 'Carnet, stylo et étui en cuir', lead: '7 – 10 jours',
        note: 'Un set pour le premier jour d\'un nouvel arrivant — le carnet gaufré, le stylo gravé, le tout dans un seul coffret.',
        placeholder: 'Un set de bureau en coffret',
      },
      'TN-503': {
        name: 'Coffret amateur de café', finish: 'Tasse, café en grains et cafetière en céramique', lead: '7 – 10 jours',
        note: 'Tout pour un matin à la maison, la tasse imprimée et le coffret à votre nom.',
        placeholder: 'Un coffret café ouvert',
      },
      'TN-504': {
        name: 'Grand kit de bienvenue', finish: 'Gourde, carnet, tote bag et tech', lead: '10 – 14 jours',
        note: 'Notre plus grand coffret — quatre pièces personnalisées ensemble pour l\'accueil, les cadeaux VIP ou un lancement.',
        placeholder: 'Un grand kit de bienvenue personnalisé',
      },
      'TN-103': {
        name: 'Mug Pantone', finish: 'Porcelaine, couleur au choix', lead: '2 – 4 jours',
        note: 'Choisissez leur couleur Pantone, puis ajoutez le prénom. Un mug deux fois à eux.',
        placeholder: 'Mug Pantone avec un prénom imprimé',
      },
      'TN-203': {
        name: 'Enceinte aGO', finish: 'Portable, sans fil', lead: '5 – 7 jours',
        note: 'Un son au design danois, assez petit pour un bureau ou un sac, avec un logo en façade.',
        placeholder: 'Enceinte Kreafunk aGO avec un logo imprimé',
      },
      'TN-303': {
        name: 'Réveil Click', finish: 'Bois naturel, affichage LED', lead: '3 – 5 jours',
        note: "Touchez le dessus et l'heure s'allume à travers le bois. Gravé, il les réveille avec leur nom.",
        placeholder: 'Réveil Gingko Click gravé à un nom',
      },
      'TN-402': {
        name: 'Sac à dos ClickPack', finish: 'Antivol, déperlant', lead: '7 – 10 jours',
        note: "Fermetures cachées, poche fine pour ordinateur, et de la place devant pour un logo d'équipe.",
        placeholder: 'Korin ClickPack avec un logo brodé',
      },
    },
  },

  business: {
    kicker: 'Pour les entreprises',
    title: 'Votre marque, fabriquée et livrée.',
    intro: 'Des articles personnalisés pour les entreprises — cadeaux, kits d\'accueil, événements et tenues — ainsi que le traiteur à votre adresse. Un seul contact, une seule facture, et vos visuels conservés pour que chaque réassort soit identique au précédent.',
    offer: {
      heading: 'Ce que nous personnalisons',
      lede: 'Envoyez le logo une fois. Nous conservons le visuel, l\'emplacement et les couleurs, pour qu\'un réassort dans six mois revienne identique.',
      items: {
        corporateGifts: {
          name: 'Cadeaux d\'affaires', moq: 'Dès 25',
          note: 'Remerciements clients, cadeaux d\'étape et envois saisonniers, emballés et prêts à offrir.',
          placeholder: 'Coffrets cadeaux d\'entreprise personnalisés',
        },
        onboardingKits: {
          name: 'Kits d\'accueil', moq: 'Dès 10 kits',
          note: 'Tout ce qu\'un nouvel arrivant reçoit le premier jour, réuni en un kit et stocké pour vous.',
          placeholder: 'Un kit d\'accueil pour nouvel arrivant',
        },
        eventGiveaways: {
          name: 'Goodies événementiels', moq: 'Dès 50',
          note: 'Objets pour conférences et lancements, la série calibrée sur votre liste d\'invités et livrée sur place.',
          placeholder: 'Goodies personnalisés sur une table événementielle',
        },
      },
    },
    terms: {
      heading: 'Comment fonctionne un compte',
      cta: 'Demander un devis sur WhatsApp',
      items: [
        { term: 'Sur devis', detail: 'Indiquez le produit, la quantité et la date limite. Un devis écrit revient le jour ouvré même.' },
        { term: 'Visuels conservés', detail: 'Validés une fois, puis archivés sur votre compte. Les réassorts passent directement en production.' },
        { term: 'Tarifs dégressifs', detail: 'Le prix unitaire baisse à 25, 100 et 500 pièces. Votre devis affiche chaque palier.' },
      ],
    },
    catering: {
      kicker: 'Traiteur',
      heading: 'Traiteur, à votre adresse',
      lede: 'La cuisine loin du comptoir. Tout ce qui se tient dans notre propre salle est un événement — c\'est sur la page du café.',
      title: 'Traiteur, hors-site',
      colOne: 'Formule',
      intro: 'Tout ce que nous cuisinons pour vous en dehors du café : déjeuners, buffets et événements complets hors-site, cuisinés dans la cuisine du café et livrés dans des caisses réutilisables. Le menu tourne avec les arrivages, il change donc au fil de l\'année.',
      placeholder: 'Installation hors-site chez un client',
      askFor: [
        'L\'adresse et l\'heure de livraison',
        'Le nombre de couverts et comment ils mangent — boîtes individuelles ou plateaux',
        'Les régimes alimentaires à prévoir',
        'Si cela se répète chaque semaine',
      ],
      packages: {
        deskLunch: { name: 'Déjeuner au bureau', note: 'En boîtes individuelles, livré à votre accueil.', covers: '10–60', notice: '48 heures', from: '£11' },
        standingBuffet: { name: 'Buffet debout', note: 'Plateaux installés avec personnel sur place pendant quatre-vingt-dix minutes.', covers: '25–120', notice: '5 jours', from: '£19' },
        breakfastTrolley: { name: 'Chariot petit-déjeuner', note: 'Viennoiseries, fruits, urnes de filtre maison, livrés.', covers: '10–80', notice: '48 heures', from: '£8' },
      },
    },
  },

  about: {
    video: {
      kicker: 'À propos',
      title: 'Regardez notre histoire.',
      lede: 'Un court film sur qui nous sommes, ce que nous fabriquons et pourquoi un nom change un objet.',
      placeholder: 'À propos de The Name — vidéo de marque',
    },
    kicker: 'À propos',
    title: 'Qu\'y a-t-il dans un nom ? Tout.',
    lede: 'Un nom, c\'est une identité, une histoire, un lien — votre signature et votre récit. The Name est né d\'une conviction : un objet prend du sens quand il porte votre nom, vos initiales, votre message ou votre marque. Nous sélectionnons des pièces au design soigné, puis nous les rendons uniques.',
    servicesHeading: 'Ce que nous proposons',
    servicesLede: 'Un seul studio pour les particuliers et pour les marques — d\'un cadeau gravé à tout un programme de cadeaux d\'entreprise.',
    services: {
      personalGifts: {
        title: 'Cadeaux personnalisés',
        body: 'Anniversaires, mariages, naissances et remerciements. Choisissez une pièce, ajoutez un prénom, des initiales ou un message, et nous la rendons unique — une seule pièce est une commande tout à fait normale.',
        cta: 'Voir la boutique',
      },
      corporateGifting: {
        title: 'Cadeaux d\'entreprise',
        body: 'Cadeaux clients, délégations VIP, goodies de conférence, prix d\'excellence et kits d\'accueil — à votre logo, livrés en volume à date fixe.',
        cta: 'Pour les entreprises',
      },
      curatedBrands: {
        title: 'Marques de design sélectionnées',
        body: 'Nous travaillons avec des marques que l\'on aime déjà, pour que chaque cadeau parte d\'un objet qui mérite d\'être gardé.',
        cta: 'Voir les produits',
      },
      packaging: {
        title: 'Coffrets et emballages',
        body: 'Coffrets sur mesure, emballages signature et habillage complet des objets, à votre nom ou à votre marque, de la boîte jusqu\'à l\'objet.',
        cta: 'Composer un coffret',
      },
      creative: {
        title: 'Concepts créatifs',
        body: 'Nous sommes nés agence de création : concept, narration et design sont faits en interne — un vrai service 360, pas une simple impression.',
        cta: 'Parlons-en',
      },
      cafe: {
        title: 'Le café et le traiteur',
        body: 'L\'autre moitié de l\'adresse : du petit-déjeuner au déjeuner tardif, des soirées privées dans notre salle et un service traiteur chez vous.',
        cta: 'Voir le café',
      },
    },
    howHeading: 'Comment nous travaillons',
    howLede: 'Les mêmes quatre étapes, qu\'il s\'agisse d\'un souvenir gravé ou de cinq cents kits à votre marque.',
    methodsLabel: 'Nous personnalisons par',
    mission: {
      kicker: 'Notre mission',
      statement: 'Transformer les objets du quotidien en objets qui comptent — sélectionner des pièces pensées et bien dessinées, puis les personnaliser pour que chaque cadeau porte un nom, une histoire ou une marque.',
    },
    vision: {
      kicker: 'Notre vision',
      statement: 'Être la référence de la région pour le design centré sur l\'identité : là où l\'on vient offrir quelque chose de vraiment personnel, et où les marques viennent se rendre mémorables.',
    },
    cta: {
      heading: 'Mettons-y un nom.',
      body: 'Dites-nous à qui c\'est destiné et ce que cela doit dire — nous nous occupons du reste.',
      contact: 'Nous contacter',
      whatsapp: 'Discuter sur WhatsApp',
    },
  },

  kids: {
    kicker: 'Pour les enfants',
    title: 'Leur prénom dessus, dès le premier jour.',
    lede: 'Gourdes, boîtes à goûter, sacs à dos et souvenirs au prénom de l\'enfant — moins d\'objets perdus, et ce qui rentre à la maison est bien le sien. Les mêmes techniques de gravure, d\'impression et de broderie que pour le reste, à la taille des petites mains.',
    heroPlaceholder: 'Une gourde et une boîte à goûter d\'enfant portant un prénom',
    ctaShop: 'Voir les produits',
    ctaAsk: 'Demander un cadeau enfant',
    offerHeading: 'Ce que nous réalisons pour les enfants',
    offerLede: 'Les trois demandes les plus fréquentes. Tout article de la boutique peut être personnalisé pour un enfant — voici simplement ceux qui reviennent chaque semaine.',
    offers: {
      backToSchool: {
        name: 'Rentrée des classes',
        note: 'Gourdes, boîtes à goûter, trousses et étiquettes de sac, chacune avec un prénom ou des initiales, pour qu\'une classe de trente cesse de les perdre.',
        placeholder: 'Gourde, boîte à goûter et trousse au prénom',
      },
      newBaby: {
        name: 'Naissance',
        note: 'Des souvenirs pour une naissance ou un baptême — un prénom, une date et un poids, gravés ou gaufrés, à garder plutôt qu\'à utiliser.',
        placeholder: 'Un souvenir de naissance gravé',
      },
      birthdays: {
        name: 'Anniversaires et fêtes',
        note: 'Des cadeaux d\'invités au prénom et un cadeau principal personnalisé, assortis, d\'une seule pièce à toute la liste d\'invités.',
        placeholder: 'Cadeaux d\'invités au prénom sur une table',
      },
    },
    note: {
      kicker: 'Comment nous les fabriquons',
      heading: 'Faits pour servir, pas seulement pour être regardés.',
      points: [
        'Gravés et imprimés avec les mêmes finitions alimentaires que dans toute la boutique',
        'Un bon à tirer numérique du prénom et de son emplacement avant toute fabrication',
        'Une seule pièce est une commande tout à fait normale — aucun minimum pour un seul enfant',
        'Les quantités pour une classe entière ou une fête sont chiffrées, généralement sous un jour ouvré',
      ],
    },
    cta: {
      heading: 'Mettons-y leur prénom.',
      body: 'Dites-nous le prénom, l\'âge et l\'occasion, et nous revenons vers vous avec des propositions.',
      shop: 'Voir les produits',
      whatsapp: 'Discuter sur WhatsApp',
    },
  },

  process: {
    steps: {
      pick: { title: 'Choisissez-le', body: 'Trouvez votre pièce dans notre collection — des objets de vie et de bureau aux gourdes, accessoires, cadeaux et bien plus.' },
      artwork: { title: 'Nommez-le', body: 'Ajoutez un nom, des initiales, un message, un visuel ou une identité de marque.' },
      proof: { title: 'Voyez-le', body: 'Nous préparons votre visuel ou votre maquette lorsque c\'est nécessaire, pour que vous sachiez à quoi ressemblera votre personnalisation avant la production.' },
      produce: { title: 'Rendez-le vôtre', body: 'Nous produisons, finissons et préparons votre commande pour le retrait ou la livraison.' },
    },
  },

  chat: {
    open: 'Discuter avec nous',
    nudge: 'Discutons !',
    close: 'Fermer',
    menuTitle: 'Comment souhaitez-vous échanger ?',
    botTitle: 'Parler à notre assistant',
    botNote: 'Des réponses immédiates, à toute heure',
    whatsappTitle: 'Discuter sur WhatsApp',
    whatsappNote: 'Une personne de notre équipe',
    assistantName: 'L\'assistant The Name',
    assistantStatus: 'Réponses automatiques',
    typing: 'L\'assistant écrit…',
    greeting: 'Bonjour ! Je peux répondre à vos questions sur nos produits, la personnalisation, les commandes d\'entreprise et le café. Choisissez un sujet ou écrivez votre question.',
    placeholder: 'Écrivez votre question…',
    send: 'Envoyer',
    back: 'Retour',
    fallback: 'Je ne suis pas sûr de pouvoir répondre à cela. Choisissez un sujet ci-dessous, ou continuez sur WhatsApp et notre équipe vous aidera.',
    openPage: 'Ouvrir la page',
    continueWhatsapp: 'Continuer sur WhatsApp',
    topics: {
      products: {
        label: 'Que vendez-vous ?',
        answer: 'Des objets design de marques comme Lexon, Lund London, Pantone, Korin, Kreafunk et Gingko — gourdes et tasses, tech, bureau, voyage et coffrets — ainsi que nos propres pièces. Tous peuvent être personnalisés.',
        keywords: ['produit', 'vend', 'boutique', 'marque', 'acheter', 'gourde', 'enceinte', 'lampe', 'sac'],
      },
      personalise: {
        label: 'Comment fonctionne la personnalisation ?',
        answer: 'Choisissez un produit, envoyez-nous un prénom, des initiales, un message ou un logo, validez la maquette numérique, et nous fabriquons puis expédions. Rien n\'est produit sans votre accord.',
        keywords: ['personnal', 'grav', 'impri', 'embos', 'brod', 'prénom', 'logo'],
      },
      leadTimes: {
        label: 'Quels sont les délais ?',
        answer: 'Cela dépend de la technique :',
        keywords: ['délai', 'combien de temps', 'jours', 'livr', 'expédi', 'quand', 'minimum'],
      },
      business: {
        label: 'Commandes d\'entreprise',
        answer: 'Nous gérons cadeaux d\'entreprise, kits d\'accueil, goodies d\'événement et tenues, avec des prix dégressifs dès 25 pièces et vos fichiers conservés pour les recommandes.',
        keywords: ['entreprise', 'société', 'volume', 'équipe', 'devis'],
      },
      cafe: {
        label: 'Le café',
        answer: 'Le café est ouvert de 08h00 à 16h00 tous les jours, avec un souper de quatre plats le vendredi soir. Sans réservation ; la salle peut être privatisée.',
        keywords: ['café', 'manger', 'menu', 'horaire', 'ouvert', 'repas'],
      },
      human: {
        label: 'Parler à une personne',
        answer: 'Bien sûr — notre équipe répond sur WhatsApp dans l\'heure pendant les horaires d\'ouverture.',
        keywords: ['personne', 'humain', 'conseiller', 'whatsapp', 'appeler', 'téléphone'],
      },
    },
  },

  packages: {
    coversHeader: 'Couverts',
    noticeHeader: 'Préavis',
    fromHeader: 'À partir de',
    footnote: 'Prix par personne, hors TVA et livraison. Les commandes récurrentes de quatre semaines ou plus bénéficient de 10 % de remise.',
    directLineKicker: 'Ligne directe',
    directLineTitle: 'Envoyez-nous la date et le nombre de couverts',
    openWhatsapp: 'Ouvrir WhatsApp',
    replyNote: 'Réponse sous un jour ouvré · Lun–Ven 08h00–18h00',
  },
};
