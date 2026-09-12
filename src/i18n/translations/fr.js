export default {
  nav: { home: 'Accueil', cafe: 'Café', shop: 'Boutique', business: 'Entreprises', contact: 'Nous contacter' },

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
    address: ['12 Rowan Street', 'Centre-ville'],
    contactHeading: 'Contactez-nous',
    note: 'WhatsApp — tables, allergènes, devis et commandes personnalisées. Réponse dans l\'heure pendant le service.',
    message: 'Envoyer un message',
    rights: 'Tous droits réservés.',
  },

  home: {
    hero: {
      title: 'Du Nom. À votre nom.',
      body: 'Nous sommes un atelier de personnalisation. Choisissez un produit, envoyez-nous un nom, un logo ou toute une marque, et nous l\'apposons — gravé, imprimé, brodé ou gaufré. Un seul cadeau ou deux mille. Il y a aussi un café attenant.',
      mediaLabel: 'Vidéo ou photo de personnalisation — gravure, impression, cadeaux finis',
      ctaMenu: 'La carte du café',
      ctaShop: 'Voir les produits',
    },
    partners: {
      heading: 'Nos partenaires',
      items: {
        talabat: { name: 'talabat' },
        noon: { name: 'noon' },
      },
    },
    whatWeDo: {
      kicker: 'Ce que nous faisons',
      heading: 'La personnalisation d\'abord — pour vous, puis pour votre entreprise',
      body: 'Tout commence par un produit vierge et votre visuel. Des cadeaux personnels à l\'unité, des séries aux couleurs des entreprises, et — parce que nous cuisinons aussi — un café qui fait traiteur et reçoit.',
    },
    services: {
      personalGifts: {
        kicker: 'Pour vous', title: 'Des cadeaux qui portent un nom',
        placeholder: 'Un cadeau personnalisé en cours d\'emballage',
        body: 'Anniversaires, mariages, naissances, remerciements et cadeaux de départ. Choisissez un produit, dites-nous le nom ou la date, et nous l\'apposons. Les pièces uniques sont les bienvenues — aucun minimum sur la gravure ni l\'impression.',
        points: ['Une seule pièce est une commande tout à fait normale', 'Un bon à tirer numérique avant toute fabrication', 'Emballage cadeau et carte manuscrite sur demande'],
        cta: 'Voir les produits',
      },
      businessBranding: {
        kicker: 'Pour votre entreprise', title: 'Votre logo, sur tout',
        placeholder: 'Coffrets cadeaux d\'entreprise personnalisés',
        body: 'Cadeaux d\'affaires, kits d\'accueil pour les nouveaux arrivants, remerciements clients, goodies d\'événements et tenues. Envoyez vos fichiers de marque une fois, nous les conservons : chaque réassort revient identique au précédent.',
        points: ['Tarifs dégressifs à partir de 25 pièces', 'Fichiers de marque conservés pour des réassorts identiques', 'Devis, facturation et livraison à date fixe'],
        cta: 'Demander un devis',
      },
      cafe: {
        kicker: 'Le café', title: 'Et il y a un café',
        placeholder: 'Table en plein service, plats et café',
        body: 'L\'autre moitié de l\'adresse. Du petit-déjeuner au déjeuner tardif sept jours sur sept, un souper à quatre plats le vendredi soir, et une carte courte qui suit les arrivages. Récupérez votre commande autour d\'un café.',
        points: ['08h00 – 16h00 tous les jours, souper du vendredi à 18h00', 'Quarante couverts, douze tables et un long banc', 'Sans réservation — uniquement sur place', 'La salle est disponible pour vos soirées privées'],
        cta: 'Voir le menu',
      },
      catering: {
        kicker: 'Hors-site', title: 'Traiteur, à votre adresse',
        placeholder: 'Caisses chargées pour un événement hors-site',
        body: 'La cuisine loin du comptoir. Déjeuners individuels, buffets avec personnel et événements complets hors-site, cuisinés ici et livrés dans des caisses réutilisables. Les cadeaux personnalisés peuvent être assortis.',
        points: ['De dix à deux cents couverts', 'Dès 48 heures de préavis pour les déjeuners', 'Commandes récurrentes hebdomadaires avec 10 % de remise'],
        cta: 'Offres traiteur',
      },
    },
    howItWorks: {
      kicker: 'Comment ça marche',
      heading: 'Quatre étapes, du produit vierge au colis.',
      lede: 'Le même processus, qu\'il s\'agisse d\'un souvenir gravé ou de cinq cents kits personnalisés.',
      steps: {
        pick: { title: 'Choisissez un produit', body: 'Choisissez le support dans la boutique — boissons, textile, papeterie, quel qu\'il soit. Tailles et coloris sont indiqués sur chaque article.' },
        artwork: { title: 'Envoyez votre visuel', body: 'Un nom, un logo, un monogramme ou toute une charte. Nous acceptons les fichiers vectoriels, et nous redessinons un visuel approximatif pour vous.' },
        proof: { title: 'Validez la maquette', body: 'Nous renvoyons un bon à tirer numérique montrant l\'emplacement et la taille exacts. Rien n\'est fabriqué avant votre accord.' },
        produce: { title: 'Nous fabriquons et expédions', body: 'Fabriqué sur place, contrôlé à la main, emballé cadeau si vous l\'avez demandé, puis expédié ou gardé ici pour retrait.' },
      },
      methodsKicker: 'Techniques de personnalisation',
      suits: 'Idéal sur',
      minimum: 'Minimum',
      leadTime: 'Délai',
      ctaShop: 'Voir les produits',
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
    body: "Nous sélectionnons des objets design de marques comme Lexon, Lund London, Pantone, Korin, Kreafunk et Gingko, puis nous les rendons uniques — un nom, des initiales, un message ou un logo, gravé, imprimé ou embossé. Pas un article de rayon. Trop personnel pour être offert à quelqu'un d'autre.",
    openShop: 'Voir la boutique ↗',
    askPersonal: 'Parler de personnalisation →',
    filters: { all: 'Tout', drinkware: 'Gourdes & tasses', tech: 'Tech', desk: 'Bureau', travel: 'Voyage', giftSets: 'Coffrets' },
    viewList: 'Liste',
    viewCards: 'Cartes',
    resultPiece: (n) => `${n} pièce`,
    resultPieces: (n) => `${n} pièces`,
    prevPieces: 'Pièces précédentes',
    nextPieces: 'Plus de pièces',
    viewLink: 'Voir ↗',
    personaliseItem: (name) => `Personnaliser ${name}`,
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
        uniform: {
          name: 'Tenues et vêtements de travail', moq: 'Dès 10',
          note: 'Tabliers, casquettes, t-shirts et polos, brodés et recommandés par taille au fil des arrivées.',
          placeholder: 'Tabliers et casquettes brodés',
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
        { term: 'Facturation mensuelle', detail: 'Un contact désigné, une facture, paiement à trente jours une fois le compte ouvert.' },
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
        offSiteCatering: { name: 'Traiteur événementiel hors-site', note: 'Nous amenons la cuisine et l\'équipe à votre adresse.', covers: '50–200', notice: '6 semaines', from: '£54' },
        breakfastTrolley: { name: 'Chariot petit-déjeuner', note: 'Viennoiseries, fruits, urnes de filtre maison, livrés.', covers: '10–80', notice: '48 heures', from: '£8' },
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
