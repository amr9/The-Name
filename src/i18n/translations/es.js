export default {
  // `cafe` se conserva para la página de la cafetería aparcada; `contact`
  // para el formulario, ahora al pie de la página Acerca de.
  nav: { home: 'Inicio', cafe: 'Cafetería', kids: 'Niños', shop: 'Tienda The Name', business: 'Empresas', about: 'Acerca de', contact: 'Contáctanos' },

  common: { whatsapp: 'WhatsApp', chatOnWhatsapp: 'Chatear por WhatsApp' },

  contact: {
    kicker: 'Contacto',
    title: 'Cuéntanos qué necesitas.',
    body: 'Reservas de ocho personas o más, presupuestos de catering, noches privadas, prensa y consultas profesionales — escríbenos aquí y el equipo de operaciones lo atiende.',
    emailHeading: 'Correo',
    phoneHeading: 'Teléfono y WhatsApp',
    optional: 'opcional',
    send: 'Enviar mensaje',
    sending: 'Enviando…',
    privacy: 'Usamos tus datos solo para responder a esta consulta.',
    sentTitle: 'Gracias — ya lo tenemos.',
    sentBody: 'El equipo de operaciones responde en un día laborable. Si es urgente durante el servicio, WhatsApp es más rápido.',
    sendAnother: 'Enviar otro mensaje',
    fields: {
      name: { label: 'Nombre', placeholder: 'Tu nombre' },
      email: { label: 'Correo', placeholder: 'tu@ejemplo.com' },
      phone: { label: 'Teléfono', placeholder: '+971 …' },
      message: { label: 'Mensaje', placeholder: 'Fechas, número de personas y todo lo que debamos saber.' },
    },
    errors: {
      required: 'Este campo es necesario.',
      email: 'Esa dirección de correo no parece correcta.',
      tooLong: 'Es más largo de lo que podemos aceptar.',
      emailUndeliverable: 'Ese dominio no puede recibir correo — revisa si hay una errata.',
      emailDisposable: 'Usa una dirección a la que podamos responder, por favor.',
      rateLimited: 'Son muchos mensajes en poco tiempo. Inténtalo en un rato o escríbenos por WhatsApp.',
      send: 'No se pudo enviar. Inténtalo de nuevo o escríbenos por WhatsApp.',
    },
  },

  footer: {
    rights: 'Todos los derechos reservados.',
  },

  home: {
    hero: {
      titleLead: 'Del Nombre.',
      titleScript: 'A tu nombre.',
      body: 'Seleccionamos objetos de diseño y los hacemos personales — con tu nombre, tu mensaje, tu historia o tu marca. Desde un único regalo con significado hasta una colección corporativa completa, cada pieza está hecha para llevar una identidad.',
      mediaLabel: 'Vídeo o foto de personalización — grabado, impresión, regalos terminados',
      ctaTour: 'Vista virtual de los productos',
      ctaShop: 'Hazlo personal',
    },
    whatWeDo: {
      kicker: 'Qué hacemos',
      heading: 'Objetos con tu historia',
      body: 'Encontramos objetos que merece la pena conservar — y luego hacemos que signifiquen algo más. Un nombre. Una inicial. Un mensaje. Una marca. Una historia que convierte algo bien diseñado en algo inconfundiblemente tuyo.',
    },
    services: {
      personalGifts: {
        kicker: 'Para ti', title: 'Hazlo personal',
        placeholder: 'Un regalo personalizado siendo envuelto',
        body: 'Para cumpleaños, grandes momentos, agradecimientos, pequeñas celebraciones — o simplemente porque debería llevar tu nombre. Elige de nuestra colección y hazla tuya con un nombre, unas iniciales, una fecha o un mensaje.',
        points: ['¿Una sola pieza? Por supuesto.', 'Personalízalo a tu manera', 'Perfectamente acabado y listo para regalar.'],
        cta: 'Compra y personaliza',
      },
      businessBranding: {
        kicker: 'Para tu empresa', title: 'Haz de tu marca el regalo',
        placeholder: 'Cajas de regalo corporativas personalizadas',
        body: 'El regalo corporativo debería hacer más que llevar tu logo. Creamos regalos y colecciones de diseño que mantienen tu identidad visible, útil y memorable — desde kits para empleados y regalos para clientes hasta eventos, regalos VIP y pedidos a gran escala.',
        points: ['Personalización individual a gran escala', 'Productos seleccionados, kits a medida y embalaje premium', 'Pedidos corporativos, institucionales y de eventos', 'Conceptos creativos pensados para tu marca'],
        cta: 'Iniciar una consulta de empresa',
      },
    },
    howItWorks: {
      kicker: 'Cómo funciona',
      heading: 'Cuatro pasos, del producto en blanco a la caja.',
      lede: 'Una pieza o mil, hacemos que personalizar sea sencillo.',
      methodsKicker: 'Técnicas de personalización',
      suits: 'Mejor en',
      minimum: 'Mínimo',
      leadTime: 'Plazo de entrega',
      ctaShop: 'Hazlo personal',
      footnote: 'Las cantidades de empresa se presupuestan — háblanos',
      methods: {
        engraving: {
          name: 'Grabado', suits: 'Metal, madera, vidrio, cuero', minimum: '1 pieza', lead: '3 – 5 días',
          note: 'Cortado en la superficie con láser. Permanente, sin color, y no se borra nunca.',
          placeholder: 'Primer plano de una superficie grabada',
        },
        print: {
          name: 'Impresión', suits: 'Cerámica, papel, plástico, textiles', minimum: '1 pieza', lead: '2 – 4 días',
          note: 'A todo color, con detalle fotográfico. La opción cuando un logo tiene más de dos colores o un degradado.',
          placeholder: 'Primer plano de un producto impreso',
        },
        embroidery: {
          name: 'Bordado', suits: 'Gorras, ropa, bolsas, delantales', minimum: '10 piezas', lead: '7 – 10 días',
          note: 'Cosido en hilo. Más grueso y con más textura que la impresión, y aguanta los lavados.',
          placeholder: 'Primer plano de un logo bordado',
        },
        emboss: {
          name: 'Repujado', suits: 'Cuero, cartulina, tapas de tela', minimum: '25 piezas', lead: '7 – 10 días',
          note: 'Prensado en el material, en relieve o hundido. Discreto y táctil — sin nada de tinta.',
          placeholder: 'Primer plano de una tapa repujada',
        },
      },
    },
  },

  cafe: {
    kicker: 'La cafetería',
    title: 'Sabores frescos cada día',
    partners: {
      heading: 'Nuestros socios',
      items: {
        talabat: { name: 'talabat' },
        noon: { name: 'noon' },
      },
    },
    askAboutDish: (dish) => `Preguntar por ${dish} en WhatsApp`,
    viewList: 'Lista',
    viewCards: 'Tarjetas',
    updated: 'Actualizado mié. 02 sept.',
    askAllergens: 'Preguntar por alérgenos',
    shopLink: 'Personalizar un regalo →',
    prevDishes: 'Platos anteriores',
    nextDishes: 'Más platos',
    sections: {
      counter: {
        name: 'Mostrador', time: '08:00 – 16:00',
        items: {
          breadConservaOil: { dish: 'Pan, conserva, aceite', note: 'La hogaza del viernes, segundo día, en el plato Orbit.', tag: 'Todo el día', price: '£6' },
          anchovyToast: { dish: 'Tostada de anchoa', note: 'Dos rebanadas, mantequilla, guindilla.', tag: 'Todo el día', price: '£7' },
          oliveOilCake: { dish: 'Bizcocho de aceite de oliva', note: 'Tartas enteras por encargo — pregúntanos.', tag: 'Repostería', price: '£5' },
        },
      },
      kitchen: {
        name: 'Cocina', time: '11:30 – 15:00',
        items: {
          whiteBeans: { dish: 'Alubias blancas, verduras, aceite picante', note: 'Cocción lenta, terminado al pase.', tag: 'Vegano', price: '£11' },
          roastCarrot: { dish: 'Zanahoria asada, yogur, dukkah', note: 'Zanahorias enteras, bien tostadas.', tag: 'Vegetariano', price: '£10' },
          porkSandwich: { dish: 'Bocadillo de paletilla de cerdo', note: 'Hasta que se acabe, normalmente sobre las dos.', tag: 'Almuerzo', price: '£13' },
        },
      },
      drinks: {
        name: 'Bebidas', time: 'Todo el día',
        items: {
          houseFilter: { dish: 'Café de filtro de la casa', note: 'Preparado por litro, recargas a mitad de precio.', tag: 'Café', price: '£3,20' },
          flatWhite: { dish: 'Flat white', note: 'También espresso, macchiato, cortado.', tag: 'Café', price: '£3,40' },
          citrusSoda: { dish: 'Refresco de cítricos', note: 'Hecho aquí, cambia cada semana.', tag: 'Frío', price: '£4' },
        },
      },
    },
    intro: 'Desde el desayuno hasta el almuerzo tardío los siete días, una cena de cuatro platos los viernes por la noche, y la sala libre para tus noches privadas. Todo lo que cocinamos para tu propia dirección es catering — eso está en la página de empresas.',
    events: {
      kicker: 'Eventos',
      heading: 'Noches privadas, celebradas aquí',
      lede: 'Cada evento ocurre en la propia cafetería — la sala después del servicio, o antes de abrir. Podemos personalizar los detalles para que peguen con la noche.',
      title: 'Eventos, en el café',
      colOne: 'Formato',
      intro: 'Cada evento ocurre en el propio café — la sala después del servicio, o antes de abrir. El mismo equipo y la misma cocina que prepara la cena del viernes, y la sala puede redecorarse para que pegue con la noche. Todo lo que sea en tu dirección es catering.',
      placeholder: 'La sala montada para una noche privada',
      askFor: [
        'La fecha y la hora de finalización',
        'El número de personas y si es sentado — la sala tiene capacidad para 40',
        'El formato — cena club, noche de lanzamiento, cata, solo la sala',
        'Todo lo que la sala deba acoger: audiovisuales, un discurso, una tarta',
      ],
      packages: {
        roomHire: { name: 'Alquiler de la sala, noche', note: 'Toda la sala desde seis personas, barra con personal.', covers: '40 sentados', notice: '3 semanas', from: '£900 la sala' },
        supperClub: { name: 'Cena club', note: 'Cuatro platos fijos, un solo turno, nuestro menú.', covers: '28 sentados', notice: '4 semanas', from: '£46' },
        launchNight: { name: 'Noche de lanzamiento', note: 'La sala redecorada en torno a lo que estés lanzando.', covers: '20–60 de pie', notice: '5 semanas', from: '£38' },
        privateBreakfast: { name: 'Desayuno privado', note: 'La sala antes de abrir, puertas cerradas hasta las diez.', covers: '20–30 sentados', notice: '2 semanas', from: '£24' },
      },
    },
  },

  shop: {
    badge: 'Marcas seleccionadas · personalizadas por nosotros',
    title: 'Hazlo personal',
    body: 'Seleccionamos objetos de diseño de marcas como Lexon, Lund London, Pantone, Korin, Kreafunk y Gingko y los hacemos tuyos — un nombre, unas iniciales, un mensaje o un logo, grabado, impreso o en relieve. Nada de estantería. Demasiado personal para regalárselo a otro.',
    openShop: 'Ver la tienda ↗',
    askPersonal: 'Preguntar por la personalización →',
    filters: { all: 'Todo', drinkware: 'Botellas y tazas', tech: 'Tecnología', desk: 'Escritorio', travel: 'Viaje', giftSets: 'Sets de regalo' },
    viewList: 'Lista',
    viewCards: 'Tarjetas',
    resultPiece: (n) => `${n} pieza`,
    resultPieces: (n) => `${n} piezas`,
    prevPieces: 'Piezas anteriores',
    nextPieces: 'Más piezas',
    viewLink: 'Ver ↗',
    personaliseItem: (name) => `Personalizar ${name}`,
    giftSets: {
      kicker: 'Sets de regalo',
      heading: 'Encajados, envueltos y listos para regalar',
      lede: 'Piezas seleccionadas reunidas en un solo set, personalizadas y presentadas en un embalaje que lleva tu nombre o tu marca. La forma más fácil de regalar algo pensado sin tener que montarlo tú.',
    },
    items: {
      'TN-101': {
        name: 'Botella Skittle, 500 ml', finish: 'Acero inoxidable de doble pared', lead: '3 – 5 días',
        note: 'Mantiene las bebidas frías todo el día. Un nombre en el costado, o un logo en el hombro.',
        placeholder: 'Botella Skittle de Lund London con un nombre grabado',
      },
      'TN-102': {
        name: 'Taza de café térmica', finish: 'Acero inoxidable, acabado mate', lead: '3 – 5 días',
        note: 'El café de cada día, en algo que lleva sus iniciales.',
        placeholder: 'Taza de Lund London con iniciales impresas',
      },
      'TN-201': {
        name: 'Altavoz Fine', finish: 'Aluminio, inalámbrico', lead: '5 – 7 días',
        note: 'Un altavoz de bolsillo que se graba con nitidez — un favorito para regalos de equipo y clientes.',
        placeholder: 'Altavoz Lexon Fine con un logo grabado',
      },
      'TN-202': {
        name: 'Cargador inalámbrico Oblio', finish: 'Estación de carga inalámbrica', lead: '5 – 7 días',
        note: 'Pasa todo el día en el escritorio, y la marca impresa en él también.',
        placeholder: 'Cargador Lexon Oblio con un logo impreso',
      },
      'TN-301': {
        name: 'Lámpara Mina', finish: 'LED recargable', lead: '3 – 5 días',
        note: 'Una lámpara pequeña que va a todas partes. Grabada con sus iniciales, pasa a ser suya.',
        placeholder: 'Lámpara Lexon Mina grabada con iniciales',
      },
      'TN-302': {
        name: 'Set de escritorio de piel', finish: 'Libreta, bolígrafo y tarjetero', lead: '7 – 10 días',
        note: 'Un accesorio de escritorio con el nombre de cada miembro del equipo, en cada pieza.',
        placeholder: 'Set de escritorio de piel con un nombre en relieve',
      },
      'TN-401': {
        name: 'Funda de pasaporte de piel', finish: 'Piel plena flor', lead: '7 – 10 días',
        note: 'Iniciales marcadas en la tapa. Discreta, táctil y demasiado personal para regalársela a otro.',
        placeholder: 'Funda de pasaporte de piel con iniciales en relieve',
      },
      'TN-501': {
        name: 'Caja de regalo signature', finish: 'Piezas seleccionadas, envoltorio completo', lead: '7 – 10 días',
        note: 'Piezas de Lexon y Lund London, personalizadas y presentadas en un embalaje con tu nombre o tu marca.',
        placeholder: 'Una caja de regalo personalizada, abierta',
      },
      'TN-502': {
        name: 'Set de escritorio de bienvenida', finish: 'Libreta, bolígrafo y funda de piel', lead: '7 – 10 días',
        note: 'Un set para el primer día de alguien nuevo: la libreta en relieve, el bolígrafo grabado, todo en una caja.',
        placeholder: 'Un set de escritorio en caja',
      },
      'TN-503': {
        name: 'Set para amantes del café', finish: 'Taza, café en grano y goteador de cerámica', lead: '7 – 10 días',
        note: 'Todo para una mañana en casa, con la taza impresa y la caja envuelta con tu nombre.',
        placeholder: 'Un set de café abierto',
      },
      'TN-504': {
        name: 'Kit de bienvenida, grande', finish: 'Botella, libreta, tote y tecnología', lead: '10 – 14 días',
        note: 'Nuestro set más grande: cuatro piezas personalizadas juntas para bienvenidas, regalos VIP o un lanzamiento.',
        placeholder: 'Un kit de bienvenida grande personalizado',
      },
      'TN-103': {
        name: 'Taza Pantone', finish: 'Porcelana, color a elegir', lead: '2 – 4 días',
        note: 'Elige su color Pantone y añade el nombre. Una taza doblemente suya.',
        placeholder: 'Taza Pantone con un nombre impreso',
      },
      'TN-203': {
        name: 'Altavoz aGO', finish: 'Portátil, inalámbrico', lead: '5 – 7 días',
        note: 'Sonido de diseño danés, lo bastante pequeño para un escritorio o una bolsa, con un logo delante.',
        placeholder: 'Altavoz Kreafunk aGO con un logo impreso',
      },
      'TN-303': {
        name: 'Despertador Click', finish: 'Madera natural, pantalla LED', lead: '3 – 5 días',
        note: 'Tocas la parte de arriba y la hora se enciende a través de la madera. Grabado, les despierta con su nombre.',
        placeholder: 'Despertador Gingko Click grabado con un nombre',
      },
      'TN-402': {
        name: 'Mochila ClickPack', finish: 'Antirrobo, resistente al agua', lead: '7 – 10 días',
        note: 'Cremalleras ocultas, funda fina para portátil y espacio delante para el logo del equipo.',
        placeholder: 'Korin ClickPack con un logo bordado',
      },
    },
  },

  business: {
    kicker: 'Para empresas',
    title: 'Tu marca, fabricada y entregada.',
    intro: 'Artículos personalizados para empresas — regalo, bienvenida, eventos y uniforme — además de catering en tu propia dirección. Un contacto, una factura, y tus archivos guardados para que cada reposición sea igual que la anterior.',
    offer: {
      heading: 'Qué personalizamos',
      lede: 'Manda el logo una vez. Guardamos el diseño, la colocación y los colores, así una reposición dentro de seis meses vuelve idéntica.',
      items: {
        corporateGifts: {
          name: 'Regalo corporativo', moq: 'Desde 25',
          note: 'Detalles para clientes, regalos de aniversario y envíos de temporada, encajados y listos para entregar.',
          placeholder: 'Cajas de regalo corporativas personalizadas',
        },
        onboardingKits: {
          name: 'Kits de bienvenida', moq: 'Desde 10 kits',
          note: 'Todo lo que recibe alguien nuevo el primer día, empaquetado como un kit y guardado en stock para ti.',
          placeholder: 'Un kit de bienvenida montado',
        },
        eventGiveaways: {
          name: 'Obsequios de evento', moq: 'Desde 50',
          note: 'Detalles para congresos y lanzamientos, la tirada ajustada a tu lista de invitados y entregada en el sitio.',
          placeholder: 'Obsequios personalizados en una mesa de evento',
        },
      },
    },
    terms: {
      heading: 'Cómo funciona una cuenta',
      cta: 'Pedir presupuesto por WhatsApp',
      items: [
        { term: 'Presupuestado, no tarifado', detail: 'Dinos el producto, la cantidad y la fecha límite. El presupuesto por escrito vuelve el mismo día laborable.' },
        { term: 'Diseños guardados', detail: 'Aprobados una vez y archivados en tu cuenta. Las reposiciones pasan directas a producción.' },
        { term: 'Precio por volumen', detail: 'El precio unitario baja a las 25, 100 y 500 piezas. Tu presupuesto muestra cada tramo.' },
      ],
    },
    catering: {
      kicker: 'Catering',
      heading: 'Catering, en tu dirección',
      lede: 'La cocina lejos del mostrador. Lo que se celebra en nuestra propia sala es un evento — eso está en la página de la cafetería.',
      title: 'Catering, externo',
      colOne: 'Paquete',
      intro: 'Todo lo que cocinamos para ti fuera del café: almuerzos, bufés y eventos externos completos, cocinados en la cocina del café y entregados en cajas reutilizables. El menú cambia con lo que llega, así que varía a lo largo del año.',
      placeholder: 'Montaje externo en la sede de un cliente',
      askFor: [
        'La dirección y la hora de entrega',
        'Comensales y cómo comen — en cajas o en bandejas',
        'Restricciones alimentarias a cubrir',
        'Si esto se repite semanalmente',
      ],
      packages: {
        deskLunch: { name: 'Almuerzo de oficina', note: 'En cajas individuales, entregado en tu recepción.', covers: '10–60', notice: '48 horas', from: '£11' },
        standingBuffet: { name: 'Bufé de pie', note: 'Bandejas montadas con personal en tu local durante noventa minutos.', covers: '25–120', notice: '5 días', from: '£19' },
        breakfastTrolley: { name: 'Carrito de desayuno', note: 'Bollería, fruta, termos de café de filtro, entregado.', covers: '10–80', notice: '48 horas', from: '£8' },
      },
    },
  },

  about: {
    video: {
      kicker: 'Sobre nosotros',
      title: 'Mira nuestra historia.',
      lede: 'Un corto sobre quiénes somos, qué hacemos y por qué un nombre cambia un objeto.',
      placeholder: 'Sobre The Name — vídeo de marca',
    },
    kicker: 'Sobre nosotros',
    title: '¿Qué hay en un nombre? Todo.',
    lede: 'Un nombre es identidad, historia y conexión: tu firma y tu relato. The Name nació de una convicción: un objeto cobra sentido cuando lleva tu nombre, tus iniciales, tu mensaje o tu marca. Seleccionamos piezas de buen diseño y las hacemos tuyas.',
    servicesHeading: 'Lo que ofrecemos',
    servicesLede: 'Un solo estudio para personas y para marcas: desde un regalo grabado hasta un programa completo de regalos corporativos.',
    services: {
      personalGifts: {
        title: 'Regalos personalizados',
        body: 'Cumpleaños, bodas, nacimientos y agradecimientos. Elige una pieza, añade un nombre, unas iniciales o un mensaje y la hacemos suya; una sola pieza es un pedido de lo más normal.',
        cta: 'Ver la tienda',
      },
      corporateGifting: {
        title: 'Regalos corporativos',
        body: 'Regalos para clientes, delegaciones VIP, obsequios para congresos, premios a la excelencia y kits de bienvenida, con tu logo y entregados en volumen en la fecha acordada.',
        cta: 'Para empresas',
      },
      curatedBrands: {
        title: 'Marcas de diseño seleccionadas',
        body: 'Trabajamos con marcas que la gente ya adora, para que cada regalo parta de un objeto que merece conservarse.',
        cta: 'Ver los productos',
      },
      packaging: {
        title: 'Kits de regalo y embalaje',
        body: 'Kits a medida, embalaje de autor y envoltorio completo del objeto que llevan tu nombre o tu marca de la caja hacia dentro.',
        cta: 'Diseñar un kit',
      },
      creative: {
        title: 'Conceptos creativos',
        body: 'Nacimos como agencia creativa: concepto, narrativa y diseño se hacen en casa. Un servicio 360 completo, no solo una tirada de impresión.',
        cta: 'Hablemos',
      },
      cafe: {
        title: 'La cafetería y el catering',
        body: 'La otra mitad de la dirección: del desayuno a la comida tardía, noches privadas en nuestra sala y catering en la tuya.',
        cta: 'Ver la cafetería',
      },
    },
    howHeading: 'Cómo lo hacemos',
    howLede: 'Los mismos cuatro pasos, sea un recuerdo grabado o quinientos kits con tu marca.',
    methodsLabel: 'Personalizamos con',
    mission: {
      kicker: 'Nuestra misión',
      statement: 'Convertir objetos cotidianos en objetos con significado: seleccionar piezas pensadas y de buen diseño y personalizarlas para que cada regalo lleve un nombre, una historia o una marca.',
    },
    vision: {
      kicker: 'Nuestra visión',
      statement: 'Ser el referente de la región en diseño con identidad: donde la gente viene a regalar algo verdaderamente personal y las marcas vienen a hacerse inolvidables.',
    },
    cta: {
      heading: 'Pongámosle un nombre.',
      body: 'Cuéntanos para quién es y qué debe decir; nosotros nos encargamos del resto.',
      contact: 'Contáctanos',
      whatsapp: 'Chatear por WhatsApp',
    },
  },

  kids: {
    kicker: 'Para niños',
    title: 'Su nombre encima, desde el primer día.',
    lede: 'Botellas, fiambreras, mochilas y recuerdos con el nombre del niño — así se pierde menos y lo que vuelve a casa es suyo. El mismo grabado, impresión y bordado que hacemos para todo lo demás, a la medida de manos pequeñas.',
    heroPlaceholder: 'Una botella y una fiambrera de niño con un nombre',
    ctaShop: 'Ver los productos',
    ctaAsk: 'Preguntar por un regalo infantil',
    offerHeading: 'Qué hacemos para niños',
    offerLede: 'Las tres cosas que más nos piden. Cualquier artículo de la tienda se puede personalizar para un niño — estos son solo los que salen cada semana.',
    offers: {
      backToSchool: {
        name: 'Vuelta al cole',
        note: 'Botellas, fiambreras, estuches y etiquetas de mochila, cada uno con un nombre o unas iniciales, para que una clase de treinta deje de perderlos.',
        placeholder: 'Botella, fiambrera y estuche con nombre',
      },
      newBaby: {
        name: 'Recién nacido',
        note: 'Recuerdos para un nacimiento o una imposición de nombre — un nombre, una fecha y un peso, grabados o en relieve, para guardar más que para usar.',
        placeholder: 'Un recuerdo de nacimiento grabado',
      },
      birthdays: {
        name: 'Cumpleaños y fiestas',
        note: 'Detalles de fiesta con nombre y un regalo principal personalizado, a juego, desde una pieza hasta toda la lista de invitados.',
        placeholder: 'Detalles de fiesta con nombre en una mesa',
      },
    },
    note: {
      kicker: 'Cómo los hacemos',
      heading: 'Hechos para usarse, no solo para mirarse.',
      points: [
        'Grabados e impresos con los mismos acabados aptos para alimentos que usamos en toda la tienda',
        'Una prueba digital del nombre y su colocación antes de fabricar nada',
        'Una sola pieza es un pedido de lo más normal — sin mínimo para un único niño',
        'Las cantidades para una clase entera o una fiesta se presupuestan, normalmente en un día laborable',
      ],
    },
    cta: {
      heading: 'Pongámosle su nombre.',
      body: 'Cuéntanos el nombre, la edad y para qué es, y te devolvemos opciones.',
      shop: 'Ver los productos',
      whatsapp: 'Chatear por WhatsApp',
    },
  },

  process: {
    steps: {
      pick: { title: 'Elígelo', body: 'Encuentra tu pieza en nuestra colección — desde objetos de hogar y escritorio hasta botellas, accesorios, regalos y más.' },
      artwork: { title: 'Ponle nombre', body: 'Añade un nombre, unas iniciales, un mensaje, un diseño o una identidad de marca.' },
      proof: { title: 'Velo', body: 'Preparamos tu diseño o maqueta cuando hace falta, para que sepas cómo quedará tu personalización antes de producirla.' },
      produce: { title: 'Hazlo tuyo', body: 'Producimos, acabamos y preparamos tu pedido para recogida o entrega.' },
    },
  },

  chat: {
    open: 'Habla con nosotros',
    close: 'Cerrar',
    menuTitle: '¿Cómo prefieres hablar?',
    botTitle: 'Hablar con nuestro asistente',
    botNote: 'Respuestas al instante, a cualquier hora',
    whatsappTitle: 'Chatear por WhatsApp',
    whatsappNote: 'Una persona de nuestro equipo',
    assistantName: 'Asistente de The Name',
    assistantStatus: 'Respuestas automáticas',
    typing: 'El asistente está escribiendo…',
    greeting: '¡Hola! Puedo responder preguntas sobre nuestros productos, la personalización, los pedidos de empresa y la cafetería. Elige un tema o escribe tu pregunta.',
    placeholder: 'Escribe tu pregunta…',
    send: 'Enviar',
    back: 'Volver',
    fallback: 'No estoy seguro de eso. Elige un tema abajo o sigue por WhatsApp y nuestro equipo te ayudará.',
    openPage: 'Abrir la página',
    continueWhatsapp: 'Seguir por WhatsApp',
    topics: {
      products: {
        label: '¿Qué vendéis?',
        answer: 'Objetos de diseño de marcas como Lexon, Lund London, Pantone, Korin, Kreafunk y Gingko — botellas y tazas, tecnología, escritorio, viaje y sets de regalo — además de piezas propias. Todos se pueden personalizar.',
        keywords: ['producto', 'vend', 'tienda', 'marca', 'comprar', 'botella', 'altavoz', 'lámpara', 'mochila'],
      },
      personalise: {
        label: '¿Cómo funciona la personalización?',
        answer: 'Elige un producto, envíanos un nombre, iniciales, un mensaje o un logo, aprueba la prueba digital y lo fabricamos y enviamos. No se hace nada sin tu aprobación.',
        keywords: ['personaliz', 'grab', 'impres', 'relieve', 'bord', 'nombre', 'logo'],
      },
      leadTimes: {
        label: '¿Cuánto tarda?',
        answer: 'Depende de la técnica:',
        keywords: ['tarda', 'tiempo', 'días', 'entrega', 'envío', 'cuándo', 'mínimo'],
      },
      business: {
        label: 'Pedidos de empresa',
        answer: 'Gestionamos regalos corporativos, kits de bienvenida, obsequios para eventos y uniformes, con precios por volumen desde 25 piezas y tu diseño guardado para repetir pedidos.',
        keywords: ['empresa', 'corporativ', 'volumen', 'equipo', 'presupuesto'],
      },
      cafe: {
        label: 'La cafetería',
        answer: 'La cafetería abre de 08:00 a 16:00 todos los días, con una cena de cuatro platos los viernes por la noche. Sin reserva; la sala se puede reservar para eventos privados.',
        keywords: ['cafetería', 'café', 'comida', 'menú', 'horario', 'abierto'],
      },
      human: {
        label: 'Hablar con una persona',
        answer: 'Claro: nuestro equipo responde por WhatsApp en menos de una hora durante el horario de apertura.',
        keywords: ['persona', 'humano', 'agente', 'whatsapp', 'llamar', 'teléfono'],
      },
    },
  },

  packages: {
    coversHeader: 'Comensales',
    noticeHeader: 'Aviso',
    fromHeader: 'Desde',
    footnote: 'Precios por persona, sin IVA ni entrega. Los pedidos recurrentes de cuatro semanas o más tienen un 10 % de descuento.',
    directLineKicker: 'Línea directa',
    directLineTitle: 'Envíanos la fecha y el número de comensales',
    openWhatsapp: 'Abrir WhatsApp',
    replyNote: 'Respondemos en un día laborable · Lun–Vie 08:00–18:00',
  },
};
