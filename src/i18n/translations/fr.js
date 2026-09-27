export default {
  // `cafe` est conservé pour la page café mise de côté ; `contact` pour le
  // formulaire, désormais au bas de la page À propos.
  nav: { home: 'Accueil', cafe: 'Café', kids: 'Enfants', shop: 'Boutique The Name', business: 'Entreprises', about: 'À propos', policies: 'Politiques', contact: 'Nous contacter', customize: "Personnalisez", menu: 'Menu',
         policyTabs: { terms: 'Conditions générales', delivery: 'Livraison et retours', privacy: 'Politique de confidentialité' } },

  common: { whatsapp: 'WhatsApp', chatOnWhatsapp: 'Discuter sur WhatsApp', backToTop: 'Haut de page' },

  contact: {
    kicker: 'Contact',
    title: 'Dites-nous ce qu’il vous faut.',
    body: 'Réservations à partir de huit personnes, devis traiteur, soirées privées, presse et demandes professionnelles — écrivez-nous ici et le bureau des opérations s’en occupe.',
    emailHeading: 'E-mail',
    phoneHeading: 'Téléphone et WhatsApp',
    privacyHeading: 'Confidentialité et données personnelles',
    locationHeading: 'Nous trouver',
    directions: 'Itinéraire',
    licenceLabel: 'Sous licence de',
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

  // The catch-all page (pages/NotFound/). `tryInstead` heads a list built
  // from `navLinks`, so the page names themselves come from `nav` above.
  notFound: {
    kicker: "Page introuvable",
    title: "Cette page n’existe plus.",
    lede: "Le lien que vous avez suivi ne mène nulle part : il est peut-être mal saisi, ou il s’agit d’une page que nous avons depuis intégrée à une autre.",
    home: "Retour à l’accueil",
    tryInstead: "Essayez plutôt",
  },

  // The Customize Yours page (pages/Customize/). WHICH products it lists is
  // in data/storeCustomizable.js; the step ids are `customizeSteps` there.
  customize: {
    kicker: "Personnalisez",
    title: "À vous de choisir et de créer",
    lede: "Partez d’une pièce qui vous plaît, décidez de chaque détail, et nous fabriquons celle que vous avez conçue.",
    steps: {
      base: { title: "Choisissez votre base", body: "Le style, le modèle ou la matière de départ — votre toile." },
      detail: { title: "Personnalisez chaque détail", body: "Couleurs, gravure, matières et finitions, réglées comme vous l’entendez." },
      life: { title: "Donnez-lui vie", body: "Passez commande et nos artisans la fabriquent selon vos spécifications." },
    },
    gridHeading: "Pièces personnalisables",
    count: (n) => (n === 1 ? "1 pièce" : `${n} pièces`),
    ctaBody: "Vous ne savez pas par où commencer ? Dites-nous à quoi elle servira et nous vous orienterons.",
    ctaShop: "Commencer à créer",
  },

  footer: {
    rights: 'Tous droits réservés.',
  },
  // ───────────────────────────────────────────────────────────────────────────
  // Les trois documents juridiques de /policies. La STRUCTURE (quels documents,
  // quelles sections, dans quel ordre) est dans pages/Policies/data.js ; ici,
  // uniquement le texte. Les clés doivent rester identiques à celles de en.js,
  // sinon la section retombe en anglais via le deepMerge de LanguageContext.
  //
  // {legalName}, {licensedBy} et {address} sont remplis depuis data/site.js au
  // rendu — ne jamais y réécrire les mentions légales.
  //
  // Traduction de confort : la version de référence reste l'anglais, et c'est
  // ce que dit `translationNote`, affiché en tête de page dans toutes les
  // langues sauf l'anglais.
  // ───────────────────────────────────────────────────────────────────────────
  policies: {
    kicker: 'Mentions légales',
    title: 'Politiques',
    lede: "Nos conditions de vente, le fonctionnement de la livraison et des retours, et ce que nous faisons de vos informations. Tout ce qui suit s'applique aux achats effectués sur ce site.",
    updated: 'Dernière mise à jour : septembre 2026',
    tocHeading: 'Sur cette page',
    translationNote: "Cette traduction est fournie pour votre confort. En cas de divergence, la version anglaise de ces documents prévaut.",
    contactNote: "Pour nos mentions légales et tous les moyens de nous joindre — commandes, livraisons, retours, demandes relatives à vos données et notre adresse —",
    contactNoteLink: 'voir la section contact de notre page À propos',

    docs: {
      terms: {
        title: 'Conditions générales',
        intro: [
          'Bienvenue chez THE NAME.',
          "Ce site et sa boutique en ligne sont exploités par {legalName}, titulaire d'une licence délivrée par {licensedBy} et établie à {address}.",
          "Les présentes Conditions générales s'appliquent aux achats effectués sur le site THE NAME. En passant une commande, vous acceptez ces Conditions générales.",
          "Rien dans les présentes Conditions ne vise à limiter les droits qui vous sont reconnus par la législation applicable des Émirats arabes unis en matière de protection des consommateurs.",
        ],
        sections: {
          orders: {
            heading: 'Commandes en ligne',
            blocks: [
              'Les produits présentés sur notre site sont proposés sous réserve de disponibilité.',
              "Le paiement est effectué intégralement lors du passage en caisse. Une fois le paiement reçu, votre commande est examinée par THE NAME afin de confirmer la disponibilité du produit, la quantité demandée et, le cas échéant, les exigences de personnalisation.",
              "La confirmation de votre paiement ne signifie pas à elle seule que votre commande a été acceptée pour production. Votre commande est confirmée une fois qu'elle a été examinée et acceptée par THE NAME.",
              "S'il nous est impossible d'exécuter votre commande, nous pouvons vous proposer une alternative adaptée. Si vous choisissez de ne pas l'accepter, le montant payé pour la commande indisponible est remboursé sur votre moyen de paiement d'origine.",
            ],
          },
          prices: {
            heading: 'Prix et paiement',
            blocks: [
              "Tous les prix affichés sur le site sont indiqués en dirhams des Émirats arabes unis (AED), sauf mention contraire.",
              "La TVA applicable est calculée et affichée avant le passage en caisse et fait partie du montant final dû.",
              "Les paiements en ligne sont traités de manière sécurisée par Stripe. THE NAME ne conserve pas directement l'intégralité des données de votre carte bancaire.",
            ],
          },
          personalization: {
            heading: 'Personnalisation et commandes sur mesure',
            blocks: [
              "THE NAME permet de personnaliser certains produits avec des éléments tels que des noms, des initiales, des dates, des messages, des logos ou des illustrations.",
              "Lorsque l'outil de personnalisation en ligne est disponible, un aperçu numérique de votre personnalisation vous est présenté avant le passage en caisse.",
              "Veuillez vérifier attentivement votre personnalisation avant de passer commande. Il vous appartient de contrôler l'exactitude de toutes les informations que vous transmettez, y compris l'orthographe, les noms, les initiales, les dates, les messages et les visuels envoyés.",
              "Si un article est produit conformément à la personnalisation que vous avez transmise et approuvée, THE NAME n'est pas responsable des erreurs contenues dans les informations que vous avez fournies. Toute refabrication demandée dans ces circonstances peut faire l'objet de frais supplémentaires.",
              "Si THE NAME produit un article de manière incorrecte ou différente de la personnalisation que vous avez approuvée, contactez-nous : nous organiserons un remplacement, une refabrication ou une autre solution appropriée.",
              "Les demandes de modification de la personnalisation après l'envoi d'une commande ne peuvent être satisfaites que si la production n'a pas encore commencé. Une fois la production lancée, les modifications ne sont plus nécessairement possibles.",
            ],
          },
          artwork: {
            heading: 'Visuels et contenus fournis par le client',
            blocks: [
              "En transmettant un logo, une image, une illustration, une marque ou tout autre élément destiné à la personnalisation, vous confirmez que vous en êtes le titulaire ou que vous disposez des autorisations ou droits nécessaires pour l'utiliser aux fins demandées.",
              "THE NAME se réserve le droit de refuser une personnalisation comportant un contenu illicite, offensant, inapproprié ou raisonnablement suspecté de porter atteinte aux droits d'une autre personne ou organisation.",
            ],
          },
          production: {
            heading: 'Délai de production',
            blocks: [
              "Les commandes B2C personnalisées standard nécessitent normalement environ 3 à 5 jours ouvrés de production après examen et confirmation de la commande.",
              "À cet effet, les jours ouvrés de THE NAME vont du lundi au samedi, hors jours fériés des Émirats arabes unis.",
              'Le délai de production et le délai de livraison sont distincts.',
              "Les commandes de grand volume, les commandes entreprises, en gros ou à production spéciale peuvent exiger des délais de production différents. Les délais et conditions commerciales applicables à ces commandes sont indiqués dans le devis et/ou la facture correspondants.",
            ],
          },
          delivery: {
            heading: 'Livraison',
            blocks: [
              "THE NAME livre actuellement uniquement au sein des Émirats arabes unis, dans les sept émirats.",
              "Les frais de livraison standard aux Émirats arabes unis sont de 30 AED par commande. Les commandes sont normalement livrées 1 à 2 jours ouvrés après la fin de la production.",
              "Les estimations de livraison sont fournies de bonne foi et peuvent être affectées par des circonstances échappant au contrôle raisonnable de THE NAME.",
              "Un montant minimum de commande donnant droit à la livraison gratuite sera confirmé et publié ici.",
              "Les clients peuvent avoir la possibilité de retirer gratuitement leur commande terminée auprès de THE NAME à Dubai CommerCity, Dubaï.",
              "L'ensemble des informations de livraison figure dans la Politique de livraison et de retours ci-dessous.",
            ],
          },
          cancellations: {
            heading: 'Annulations',
            blocks: [
              "Pour les produits non personnalisés, une commande peut être annulée avant son expédition.",
              "Pour les produits personnalisés ou fabriqués sur mesure, l'annulation n'est possible qu'avant le début de la production. Une fois la production d'un article personnalisé lancée, la commande n'est plus annulable ni remboursable en cas de changement d'avis.",
              "Cela n'affecte pas vos droits lorsqu'un produit est défectueux, endommagé, non conforme ou a été produit différemment de la personnalisation que vous avez approuvée.",
            ],
          },
          returns: {
            heading: 'Retours et échanges',
            blocks: [
              "Les produits non personnalisés éligibles peuvent être retournés dans les 7 jours suivant leur réception, à condition qu'ils soient non utilisés, non endommagés, dans leur état d'origine et renvoyés avec leur emballage et leurs étiquettes d'origine intacts.",
              "Les produits personnalisés ou fabriqués sur mesure ne sont ni retournables ni remboursables en cas de changement d'avis dès lors qu'ils ont été produits spécifiquement pour vous. Cela ne s'applique pas lorsqu'un article est défectueux, endommagé, non conforme ou a été mal personnalisé par THE NAME.",
              "Les présentes conditions n'excluent ni ne limitent les droits ou recours qui ne peuvent légalement être écartés en vertu de la législation applicable des Émirats arabes unis en matière de protection des consommateurs. La réglementation émirienne impose aux prestataires de commerce électronique de communiquer les conditions de retour et d'échange et encadre les clauses contractuelles qui priveraient indûment le consommateur de ses droits.",
            ],
          },
          damaged: {
            heading: 'Commandes endommagées, défectueuses ou non conformes',
            blocks: [
              "Si votre commande arrive endommagée ou défectueuse, si vous recevez le mauvais produit, ou si THE NAME a réalisé la personnalisation différemment de ce que vous avez approuvé, contactez-nous dans les 48 heures suivant la livraison.",
              "Nous pourrons vous demander des photographies nettes du produit et, le cas échéant, de son emballage afin d'examiner le problème.",
              "Lorsque THE NAME confirme une erreur ou un problème éligible, nous organisons d'abord un remplacement ou une refabrication appropriés. Lorsque ni l'un ni l'autre n'est possible, un remboursement intégral est effectué.",
              "Le délai de signalement de 48 heures ne limite aucun droit légal dont vous pourriez disposer en vertu du droit applicable des Émirats arabes unis.",
            ],
          },
          refunds: {
            heading: 'Remboursements',
            blocks: [
              "Les remboursements approuvés sont effectués sur le moyen de paiement utilisé lors de l'achat.",
              "Les remboursements sont normalement traités dans un délai de 7 à 14 jours ouvrés à compter de leur approbation.",
              "Votre banque ou votre prestataire de paiement peut nécessiter un délai supplémentaire avant qu'un remboursement traité apparaisse sur votre compte.",
            ],
          },
          corporate: {
            heading: 'Commandes entreprises et en gros',
            blocks: [
              "Les commandes entreprises, publiques, événementielles, en gros et autres commandes B2B peuvent être soumises à des conditions commerciales distinctes.",
              "Le cas échéant, les conditions de paiement, les calendriers de production, les quantités, les exigences de livraison et les autres conditions propres au projet sont indiqués dans le devis et/ou la facture correspondants.",
              "Lorsque des conditions propres à un projet ont été convenues séparément, elles s'appliquent à cette commande dans la mesure précisée.",
            ],
          },
          warranty: {
            heading: 'Garantie des produits',
            blocks: [
              "Lorsqu'un produit de marque tierce bénéficie d'une garantie du fabricant, les conditions de cette garantie sont fixées par le fabricant. Contactez-nous et nous vous indiquerons la couverture applicable à votre article et la manière de faire valoir la garantie.",
              'Les garanties légales et les droits des consommateurs applicables demeurent inchangés.',
            ],
          },
          accounts: {
            heading: 'Comptes clients',
            blocks: [
              "Vous pouvez acheter chez THE NAME en tant qu'invité ou en créant un compte client.",
              "Les clients enregistrés peuvent consulter les informations de leur compte et l'historique de leurs commandes une fois connectés.",
              "Il vous appartient de préserver la sécurité de vos identifiants et de nous avertir si vous estimez que votre compte a été utilisé sans autorisation.",
            ],
          },
          privacy: {
            heading: 'Confidentialité',
            blocks: [
              "Lorsque vous achetez chez THE NAME ou créez un compte, nous pouvons recueillir les informations nécessaires au traitement et à l'exécution de votre commande, notamment vos nom et prénom, adresse e-mail, numéro de mobile, adresse de livraison et les informations relatives à la commande ou à la personnalisation.",
              'Notre traitement des données personnelles est expliqué dans la Politique de confidentialité ci-dessous.',
              "Un achat chez THE NAME ne vous abonne pas automatiquement aux communications marketing. Les communications promotionnelles ne sont envoyées que si vous y avez consenti séparément.",
            ],
          },
          age: {
            heading: "Conditions d'âge",
            blocks: [
              "Vous devez être âgé de 18 ans ou plus pour effectuer un achat directement sur ce site.",
              "Tout achat, toute inscription ou tout envoi impliquant une personne de moins de 18 ans doit être effectué par ou via son parent ou son représentant légal.",
            ],
          },
          ip: {
            heading: 'Propriété intellectuelle',
            blocks: [
              "Sauf mention contraire, la conception du site, les textes, les photographies, les graphismes, les créations et les contenus originaux associés à THE NAME ne peuvent être copiés, reproduits, distribués ni exploités commercialement sans autorisation préalable.",
              'Les noms de marques, noms de produits, logos et marques de tiers présentés sur le site restent la propriété de leurs titulaires respectifs.',
              'Le site est conçu et développé par The Name Agency.',
            ],
          },
          changes: {
            heading: 'Modifications des présentes conditions',
            blocks: [
              "THE NAME peut mettre à jour ces Conditions générales de temps à autre afin de refléter les évolutions de nos services, du site, de nos pratiques opérationnelles ou des exigences légales applicables.",
              "La version applicable à votre achat est celle en vigueur au moment où votre commande est passée, sauf si une modification est imposée par la loi applicable.",
            ],
          },
          law: {
            heading: 'Droit applicable',
            blocks: [
              "Les présentes Conditions générales et les achats effectués sur le site THE NAME sont régis par le droit applicable des Émirats arabes unis.",
              "Rien dans les présentes Conditions n'exclut ni ne restreint les droits reconnus aux consommateurs par le droit applicable des Émirats arabes unis. La législation émirienne de protection des consommateurs s'applique aux biens et services aux Émirats arabes unis, y compris aux transactions de commerce électronique réalisées par des prestataires enregistrés dans le pays et dans ses zones franches.",
            ],
          },
        },
      },

      delivery: {
        title: 'Politique de livraison et de retours',
        intro: [
          "Chez THE NAME, beaucoup de nos pièces sont personnalisées spécialement pour vous. Vous trouverez ci-dessous tout ce qu'il faut savoir sur la production, la livraison, les annulations, les retours et les remboursements.",
          "Cette politique doit être lue avec les Conditions générales ci-dessus. Rien dans cette politique ne limite vos droits au titre de la législation applicable des Émirats arabes unis en matière de protection des consommateurs, qui s'applique aux prestataires de commerce électronique enregistrés dans le pays, y compris ceux établis en zone franche.",
        ],
        sections: {
          production: {
            heading: 'Délai de production',
            blocks: [
              "Les commandes personnalisées nécessitent généralement 3 à 5 jours ouvrés de production après examen et confirmation de votre commande par THE NAME.",
              'Nos jours ouvrés vont du lundi au samedi, hors jours fériés des Émirats arabes unis.',
              "N'oubliez pas que le délai de production et le délai de livraison sont distincts.",
              "Pour les commandes entreprises, en gros ou à production spéciale, le délai de production applicable est confirmé séparément dans le devis et/ou la facture correspondants.",
            ],
          },
          across: {
            heading: 'Livraison dans tous les Émirats',
            blocks: [
              "Nous livrons actuellement uniquement aux Émirats arabes unis, dans les sept émirats.",
              "La livraison coûte 30 AED par commande et votre commande arrive normalement 1 à 2 jours ouvrés environ après la fin de la production.",
              "Les estimations de livraison sont fournies de bonne foi et peuvent occasionnellement être affectées par des circonstances échappant à notre contrôle raisonnable.",
              "Un montant minimum de commande donnant droit à la livraison gratuite sera confirmé et publié ici.",
            ],
          },
          collection: {
            heading: 'Retrait chez THE NAME',
            blocks: [
              "Les clients peuvent également avoir la possibilité de retirer gratuitement leur commande terminée auprès de THE NAME à Dubai CommerCity, Dubaï.",
              'Les modalités de retrait sont communiquées dès que la commande est prête.',
            ],
          },
          cancelling: {
            heading: 'Annuler une commande',
            blocks: [
              "Vous avez changé d'avis ? Les conditions d'annulation dépendent du caractère personnalisé ou non de votre commande.",
              "Les commandes non personnalisées peuvent être annulées avant leur expédition. Les commandes personnalisées ou fabriquées sur mesure ne peuvent être annulées qu'avant le début de la production.",
              "Une fois la production d'un article personnalisé lancée, la commande n'est plus annulable ni remboursable en cas de changement d'avis.",
              "Pour demander une annulation, contactez-nous dès que possible en utilisant les coordonnées figurant sur notre page À propos.",
            ],
          },
          returns: {
            heading: 'Retours — produits non personnalisés',
            blocks: [
              "Les produits non personnalisés éligibles peuvent être retournés dans les 7 jours suivant leur réception. Pour être éligible à un retour, le produit doit être :",
              { list: [
                'non utilisé et non endommagé ;',
                "dans son état d'origine ; et",
                "renvoyé avec son emballage et ses étiquettes d'origine intacts.",
              ] },
              "Contactez notre équipe avant de renvoyer un article afin que nous puissions confirmer la procédure de retour.",
            ],
          },
          personalized: {
            heading: 'Produits personnalisés',
            blocks: [
              "Parce que les produits personnalisés sont créés spécialement pour vous, ils ne sont ni retournables ni remboursables en cas de changement d'avis une fois produits.",
              "Veuillez vérifier soigneusement tous les noms, initiales, dates, messages, visuels et autres éléments de personnalisation avant de finaliser votre commande. Lorsqu'un aperçu numérique de personnalisation est proposé, le passage en caisse confirme la personnalisation affichée.",
              "Si les informations que vous avez saisies et approuvées contiennent une erreur, THE NAME n'est pas responsable de cette erreur du client et une refabrication peut être facturée.",
              "Cela n'affecte pas vos droits lorsque l'article est défectueux, endommagé, non conforme, ou lorsque THE NAME l'a produit différemment de la personnalisation que vous avez approuvée. La réglementation émirienne de protection des consommateurs impose des recours en cas de produits défectueux et interdit les clauses qui priveraient indûment le consommateur de ses droits légaux.",
            ],
          },
          damaged: {
            heading: 'Commandes endommagées, défectueuses ou non conformes',
            blocks: [
              'Contactez-nous dans les 48 heures suivant la livraison si votre article :',
              { list: [
                'arrive endommagé ou défectueux,',
                "n'est pas le produit que vous avez commandé, ou",
                "a été personnalisé différemment de ce que vous avez approuvé.",
              ] },
              "Indiquez les détails de votre commande et joignez des photographies nettes du produit et, le cas échéant, de son emballage afin que notre équipe puisse examiner le problème.",
              "Lorsque THE NAME confirme une erreur ou un problème éligible, nous organisons d'abord un remplacement ou une refabrication. Si aucun des deux n'est possible, nous procédons à un remboursement intégral.",
              "Le délai de signalement de 48 heures ne restreint aucun droit légal du consommateur applicable en vertu du droit des Émirats arabes unis.",
            ],
          },
          refunds: {
            heading: 'Remboursements',
            blocks: [
              "Les remboursements approuvés sont reversés sur le moyen de paiement utilisé lors de l'achat.",
              "Les remboursements sont normalement traités dans un délai de 7 à 14 jours ouvrés à compter de leur approbation.",
              "Notez que votre banque ou l'émetteur de votre carte peut nécessiter un délai de traitement supplémentaire avant qu'un remboursement finalisé apparaisse sur votre compte.",
            ],
          },
        },
      },

      privacy: {
        title: 'Politique de confidentialité',
        intro: [
          "Chez THE NAME, nous respectons votre vie privée et nous nous engageons à traiter vos données personnelles de manière responsable et conformément au droit applicable des Émirats arabes unis.",
          "La présente Politique de confidentialité explique quelles informations nous recueillons lorsque vous utilisez notre site ou achetez chez nous, pourquoi nous les recueillons, comment elles peuvent être utilisées et partagées, et les choix dont vous disposez.",
        ],
        sections: {
          who: {
            heading: 'Qui nous sommes',
            blocks: [
              "Ce site et sa boutique en ligne sont exploités par {legalName}, établie à {address}, titulaire d'une licence délivrée par {licensedBy}.",
              "Les questions et demandes relatives à la confidentialité sont à adresser à l'adresse dédiée indiquée sur notre page À propos.",
            ],
          },
          collect: {
            heading: 'Informations que nous recueillons',
            blocks: [
              "Lorsque vous naviguez, créez un compte, passez une commande ou nous contactez au sujet d'un achat, nous pouvons recueillir des informations telles que :",
              { list: [
                'vos nom et prénom ;',
                'votre adresse e-mail ;',
                'votre numéro de mobile ;',
                'votre adresse de livraison ;',
                'les informations de compte, si vous en créez un ;',
                'les détails de la commande ; et',
                "les informations, textes, logos ou visuels que vous fournissez pour la personnalisation.",
              ] },
              "Nous ne recueillons que les informations raisonnablement nécessaires pour fournir nos services, exécuter vos commandes, communiquer avec vous et faire fonctionner notre boutique en ligne.",
            ],
          },
          payment: {
            heading: 'Informations de paiement',
            blocks: [
              'Les paiements en ligne sont traités par Stripe.',
              "THE NAME ne conserve pas directement l'intégralité des données de votre carte bancaire. Les informations de paiement nécessaires au traitement de votre transaction sont gérées par le prestataire de paiement conformément à ses propres pratiques de sécurité et de confidentialité.",
            ],
          },
          use: {
            heading: 'Comment nous utilisons vos informations',
            blocks: [
              'Nous pouvons utiliser vos données personnelles pour :',
              { list: [
                'créer et gérer votre compte client ;',
                'traiter et confirmer vos commandes ;',
                'produire des produits personnalisés ;',
                'organiser la livraison ou le retrait ;',
                'communiquer avec vous au sujet de votre commande ;',
                'gérer les annulations, retours, remboursements et réclamations ;',
                'assurer le service client ;',
                'conserver les registres de transactions et de commandes ;',
                'respecter les obligations comptables, fiscales, réglementaires ou légales applicables ; et',
                "protéger la sécurité et l'intégrité de notre site et de nos services.",
              ] },
              "Nous n'utiliserons pas les informations recueillies dans le cadre d'une commande pour vous abonner automatiquement à des communications marketing.",
            ],
          },
          marketing: {
            heading: 'Communications marketing',
            blocks: [
              "Un achat chez THE NAME ne vous abonne pas automatiquement aux communications promotionnelles.",
              "Nous ne vous envoyons d'e-mails promotionnels, de messages WhatsApp ou d'autres communications marketing que si vous avez choisi séparément de les recevoir. Vous pouvez retirer votre consentement marketing à tout moment.",
              "La législation émirienne de protection des consommateurs reconnaît la protection de la vie privée et la sécurité des données des consommateurs, et encadre l'utilisation de leurs données à des fins de promotion et de marketing.",
            ],
          },
          sharing: {
            heading: 'Partage de vos informations',
            blocks: [
              "Nous ne vendons pas vos données personnelles et ne les transmettons pas à des tiers pour leurs propres finalités marketing.",
              "Nous ne partageons que les informations raisonnablement nécessaires avec les prestataires qui nous aident à exploiter la boutique et à exécuter votre achat, notamment :",
              { list: [
                'Stripe — pour traiter les paiements en ligne.',
                "Les transporteurs et prestataires de livraison — pour vous livrer. Cela peut impliquer le partage d'informations telles que votre nom, votre numéro de mobile et votre adresse de livraison.",
              ] },
              "Nous pouvons également divulguer des informations lorsque la loi applicable, la réglementation, une décision de justice ou une autorité compétente des Émirats arabes unis l'exige.",
            ],
          },
          accounts: {
            heading: 'Comptes clients',
            blocks: [
              "Vous pouvez acheter chez THE NAME en tant qu'invité ou en créant un compte client enregistré.",
              "Si vous créez un compte, certaines informations peuvent être conservées afin que vous puissiez accéder aux détails de votre compte et à l'historique de vos commandes une fois connecté.",
              "Il vous appartient de préserver la confidentialité de vos identifiants de compte.",
            ],
          },
          personalization: {
            heading: 'Informations de personnalisation',
            blocks: [
              "Lorsque vous personnalisez un produit, nous pouvons traiter les informations nécessaires à la production de votre commande, notamment les noms, initiales, messages, logos, visuels ou autres contenus de personnalisation que vous transmettez.",
              "Ces informations sont utilisées pour traiter et produire votre commande et pour conserver les registres de transaction correspondants.",
              "Merci de ne pas transmettre de données personnelles concernant une autre personne via une personnalisation, sauf si vous disposez de l'autorisation ou du pouvoir nécessaires.",
            ],
          },
          children: {
            heading: 'Mineurs',
            blocks: [
              "Les clients doivent être âgés de 18 ans ou plus pour effectuer des achats directement sur notre site.",
              "Toute inscription, tout achat, toute transmission de données personnelles ou de visuels impliquant une personne de moins de 18 ans doit être effectué par ou via un parent ou un représentant légal.",
            ],
          },
          retention: {
            heading: 'Durée de conservation',
            blocks: [
              "Nous ne conservons les données personnelles que le temps raisonnablement nécessaire aux finalités pour lesquelles elles ont été recueillies, y compris l'exécution des commandes, la tenue des registres de transactions et le respect des exigences comptables, fiscales, réglementaires et légales applicables.",
              "Les informations qui ne sont plus raisonnablement nécessaires sont traitées conformément à nos pratiques de conservation des données et à nos obligations légales.",
            ],
          },
          security: {
            heading: 'Protection de vos informations',
            blocks: [
              "Nous prenons des mesures organisationnelles et techniques raisonnables pour protéger les données personnelles contre tout accès non autorisé, perte, usage abusif, altération ou divulgation.",
              "Aucun mode de transmission ou de stockage électronique ne peut toutefois être garanti comme totalement sûr.",
            ],
          },
          rights: {
            heading: 'Vos droits sur vos données personnelles',
            blocks: [
              "Sous réserve du droit applicable des Émirats arabes unis et des exceptions légales, vous pouvez disposer de droits sur vos données personnelles, notamment des droits d'accès, de rectification, de suppression ou de limitation de certains traitements.",
              "La loi émirienne sur la protection des données personnelles confère aux personnes concernées des droits sur leurs données, dans les conditions et sous les exceptions qu'elle prévoit.",
              "Pour adresser une demande relative à la confidentialité ou à vos données personnelles, utilisez l'adresse dédiée indiquée sur notre page À propos. Nous pourrons avoir besoin de vérifier votre identité avant de traiter certaines demandes.",
            ],
          },
          cookies: {
            heading: 'Cookies et traceurs',
            blocks: [
              "THE NAME n'utilise actuellement pas de pixels publicitaires ni d'outils d'analyse tiers tels que Meta Pixel ou Google Analytics.",
              "Le site peut néanmoins recourir aux fonctionnalités techniques nécessaires au fonctionnement de la boutique en ligne : maintien des sessions, connexion client, panier, sécurité et paiement.",
              "Si notre utilisation des cookies, de l'analyse d'audience ou des technologies publicitaires évolue, la présente Politique de confidentialité sera mise à jour en conséquence et les mécanismes de consentement requis seront mis en place.",
            ],
          },
          thirdParty: {
            heading: 'Services tiers',
            blocks: [
              "Notre site peut s'appuyer sur des services tiers nécessaires à des fonctionnalités telles que le traitement des paiements et la livraison.",
              "Lorsque vous interagissez avec ces services, leur traitement des données personnelles peut également être régi par leurs propres conditions de confidentialité.",
              "THE NAME prend des mesures raisonnables pour travailler avec des prestataires adaptés aux services qu'ils réalisent.",
            ],
          },
          changes: {
            heading: 'Modifications de la présente politique',
            blocks: [
              "Nous pouvons mettre à jour la présente Politique de confidentialité de temps à autre afin de refléter les évolutions de notre site, de nos services, de nos pratiques ou des exigences légales applicables.",
              "La dernière version est publiée sur ce site avec sa date d'effet actualisée.",
            ],
          },
        },
      },
    },
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
    openShop: 'Découvrir la collection',
    askPersonal: 'Personnalisez la vôtre',
    // The store's shelves. Keys and order come from `storeCategories` in
    // data/storeProducts.js; only the wording lives here.
    filters: {
      all: 'Tous les produits',
      bagsTravel: 'Sacs et voyage',
      deskStationery: 'Bureau et papeterie',
      drinkware: 'Boissons',
      games: 'Jeux',
      homeAccessories: 'Accessoires maison',
      kids: 'Enfants',
      photoFrames: 'Photo et cadres',
      giftSets: 'Coffrets personnalisés',
      technology: 'Technologie',
    },
    emptyCategory: 'Rien dans cette catégorie pour le moment.',
    price: (n) => `${n} AED`,
    // The button across the foot of a product card. The store says "Add to
    // Cart"; this site has no cart, so it sends you there instead.
    viewProduct: 'Voir le produit',
    // The catalogue loads 24 at a time; these label the control under it.
    loadMore: (n) => `Afficher ${n} de plus`,
    showing: (a, b) => `${a} sur ${b} affichés`,
    // Corner ribbons on the Shop cards. WHICH products get one is in
    // data/storeBadges.js; only the wording lives here, keyed by badge.
    badges: { bestSeller: 'Meilleure vente' },
    // The search field under the category filters. `noResults` takes the
    // query so the visitor can see what was actually searched for.
    searchLabel: 'Rechercher des produits',
    searchPlaceholder: 'Rechercher par nom…',
    noResults: (q) => `Aucun résultat pour “${q}”.`,
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
    ctaEnquiry: 'Lancer une demande entreprise',
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
      placeholder: 'Installation hors-site chez un client',
      askFor: [
        'L\'adresse et l\'heure de livraison',
        'Le nombre de couverts et comment ils mangent — boîtes individuelles ou plateaux',
        'Les régimes alimentaires à prévoir',
        'Si cela se répète chaque semaine',
      ],
    },
  },

  about: {
    // Le film de marque est EN PAUSE jusqu'à sa livraison — voir About.jsx.
    video: {
      kicker: 'Notre histoire',
      title: 'Regardez notre histoire.',
      lede: 'Un court film sur qui nous sommes, ce que nous fabriquons et pourquoi un nom change un objet.',
      placeholder: 'À propos de The Name — vidéo de marque',
    },

    kicker: 'Notre histoire',
    title: 'Tout a commencé par un nom.',
    lede: 'Notre histoire a commencé en 1990, bien avant que THE NAME ait un nom à lui. Elle a commencé par la personnalisation, les cadeaux d\'entreprise et la conviction que les choses les plus mémorables sont celles que l\'on rend personnelles.',
    heroSupport: 'Plus de trois décennies plus tard, cette conviction a trouvé une nouvelle maison.',

    story: {
      legacy: {
        era: '1990 — là où tout a commencé',
        headline: 'Personnel dès le premier jour.',
        body: 'Le parcours a commencé en 1990 avec la personnalisation et les cadeaux d\'entreprise — créer pour des entreprises, des occasions et des personnes des objets qui portaient plus que le produit lui-même : une identité.',
        placeholder: '1990 — les premières pièces personnalisées',
      },
      evolution: {
        era: 'Le chapitre suivant',
        headline: 'De la personnalisation des marques à l\'arrivée des plus belles marques.',
        body: 'À mesure que l\'entreprise a évolué, notre monde aussi. Nous avons commencé à faire venir au Moyen-Orient des marques internationales de design et de lifestyle, en nouant des relations, en découvrant des produits d\'exception et en apprenant ce qui rend un objet digne d\'être choisi, utilisé et retenu.',
        closing: 'Personnalisation. Cadeaux. Marques. Expériences. Chaque chapitre a nourri le suivant.',
        placeholder: 'Les marques de design amenées dans la région',
      },
      today: {
        era: 'Aujourd\'hui — The Name',
        headline: 'Un seul lieu. Toute notre histoire.',
        body: 'THE NAME réunit cet héritage en un seul lieu. Une destination pour découvrir le design, personnaliser ce que vous aimez, se retrouver, manger, collaborer, créer et vivre autre chose. Physique et numérique. Personnel et professionnel. Une boutique, un lieu de vie et une plateforme pour la suite.',
        placeholder: 'À l\'intérieur de THE NAME aujourd\'hui',
      },
    },

    tagline: {
      fromPrefix: 'De',
      to: 'À votre nom.',
      lede: 'C\'est plus qu\'une signature. C\'est notre façon de penser.',
      body: 'Quand une marque franchit nos portes, THE NAME peut devenir son nom. Quand quelqu\'un choisit un objet, il devient le sien. Son identité. Son moment. Son histoire.',
    },

    takeover: {
      headline: 'Le temps d\'un moment, le lieu n\'est plus le nôtre. Il est le leur.',
      body: 'Nous construisons nos collaborations autour de l\'identité des personnes et des marques avec qui nous travaillons — en transformant les produits, l\'expérience et parfois le lieu lui-même autour de leur nom.',
    },

    collab: {
      era: 'Construit par la collaboration',
      headline: 'Quelques noms avec qui nous avons créé.',
      body: 'Tout au long du parcours, notre travail nous a réunis avec des marques, des institutions et des organisations du monde entier — produits personnalisés, cadeaux, expériences et collaborations construits autour de leur identité.',
    },

    future: {
      era: 'La suite',
      headline: 'Un héritage bâti ici. Prêt à voyager.',
      body: 'Les Émirats nous ont appris à toujours regarder devant — construire, évoluer et penser au-delà d\'aujourd\'hui. THE NAME est notre prochain chapitre : porter plus de trois décennies d\'expérience dans une nouvelle ère de personnalisation numérique, d\'expériences et de collaboration, avec le regard tourné au-delà des Émirats, vers tout le Golfe.',
      closing: 'L\'histoire a commencé en 1990. La suite portera votre nom.',
    },

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
    activation: {
      kicker: 'The Name : petits créateurs',
      heading: 'Et si leur idée avait un nom ?',
      body: 'Nous croyons que les enfants ne devraient pas seulement recevoir ce que l\'on fait pour eux. Parfois, ils devraient pouvoir créer l\'idée. La dessiner. La nommer. La faire exister — et découvrir ce qui arrive quand ce qui a commencé dans leur imagination devient réel.',
      support: 'C\'est exactement ce qui s\'est passé lors de notre dernière activation enfants.',
      videoPlaceholder: 'Des enfants à l\'activation, présentant leurs produits et répondant aux questions',
      galleryHeading: 'De l\'activation',
      prevShots: 'Photos précédentes',
      nextShots: 'Plus de photos',
      shots: {
        showingProducts: 'Les petites créatrices derrière leur stand',
        theCollection: 'La collection installée — mugs, gourdes, casquettes et carnets',
        mugs: 'Des mugs portant les dessins des enfants',
        withParents: 'Parents et enfants autour de la table',
        makingTogether: 'À l\'atelier, en pleine création',
        onTheStand: 'Le stand des petits créateurs',
      },
    },

    twoTs: {
      kicker: 'Découvrez Two T\'s',
      heading: 'Une petite marque au grand cœur.',
      body: 'Créée par Teya, cinq ans, Two T\'s est née de ses dessins et de ses idées — dont sa collection Hearts — pour devenir quelque chose qu\'elle peut fièrement appeler sien. Lors de notre activation enfants, elle a pu la partager, en parler et voir d\'autres enfants découvrir ce qu\'elle avait créé.',
      closing: 'Son idée. Ses dessins. Son nom dessus.',
      videoPlaceholder: 'Interviews des enfants à l\'activation',
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
