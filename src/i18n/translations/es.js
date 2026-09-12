export default {
  nav: { home: 'Inicio', cafe: 'Cafetería', shop: 'Tienda', business: 'Empresas', contact: 'Contáctanos' },

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
    address: ['12 Rowan Street', 'Centro de la ciudad'],
    contactHeading: 'Contáctanos',
    note: 'WhatsApp — mesas, alérgenos, presupuestos y pedidos personalizados. Respondemos en menos de una hora durante el servicio.',
    message: 'Escríbenos',
    rights: 'Todos los derechos reservados.',
  },

  home: {
    hero: {
      title: 'Del Nombre. A tu nombre.',
      body: 'Somos un taller de personalización. Elige un producto, mándanos un nombre, un logo o toda una marca, y lo aplicamos — grabado, impreso, bordado o repujado. Un solo regalo o dos mil. Y además hay una cafetería al lado.',
      mediaLabel: 'Vídeo o foto de personalización — grabado, impresión, regalos terminados',
      ctaMenu: 'La carta de la cafetería',
      ctaShop: 'Ver los productos',
    },
    partners: {
      heading: 'Nuestros socios',
      items: {
        talabat: { name: 'talabat' },
        noon: { name: 'noon' },
      },
    },
    whatWeDo: {
      kicker: 'Qué hacemos',
      heading: 'Primero la personalización — para ti, y luego para tu empresa',
      body: 'Todo empieza con un producto en blanco y tu diseño. Regalos personales de uno en uno, tiradas con la marca de cada empresa y — porque también cocinamos — una cafetería que hace catering y acoge eventos.',
    },
    services: {
      personalGifts: {
        kicker: 'Para ti', title: 'Regalos con un nombre encima',
        placeholder: 'Un regalo personalizado siendo envuelto',
        body: 'Cumpleaños, bodas, nacimientos, agradecimientos y regalos de despedida. Elige un producto, dinos el nombre o la fecha, y lo aplicamos. Las piezas sueltas son bienvenidas — no hay mínimo en grabado ni impresión.',
        points: ['Una sola pieza es un pedido perfectamente normal', 'Una prueba digital antes de fabricar nada', 'Envoltorio de regalo y tarjeta manuscrita si lo pides'],
        cta: 'Ver los productos',
      },
      businessBranding: {
        kicker: 'Para tu empresa', title: 'Tu logo, en todo',
        placeholder: 'Cajas de regalo corporativas personalizadas',
        body: 'Regalo corporativo, kits de bienvenida para el equipo, detalles para clientes, obsequios de evento y uniformes. Envía tus archivos de marca una vez y los guardamos, así cada reposición vuelve idéntica a la anterior.',
        points: ['Precio por volumen a partir de 25 piezas', 'Archivos de marca guardados para reposiciones idénticas', 'Presupuestado, facturado y entregado en fecha fija'],
        cta: 'Pedir presupuesto',
      },
      cafe: {
        kicker: 'La cafetería', title: 'Y hay una cafetería',
        placeholder: 'Mesa en pleno servicio, comida y café',
        body: 'La otra mitad de la dirección. Desde el desayuno hasta el almuerzo tardío los siete días, una cena de cuatro platos los viernes por la noche, y una carta corta que sigue lo que llega. Recoge tu pedido con un café delante.',
        points: ['08:00 – 16:00 a diario, cena del viernes a las 18:00', 'Cuarenta cubiertos, doce mesas y un banco largo', 'Solo sin reserva — no se reserva en línea', 'La sala está disponible para noches privadas'],
        cta: 'Ver el menú',
      },
      catering: {
        kicker: 'Fuera del local', title: 'Catering, en tu dirección',
        placeholder: 'Cajas cargándose para un evento externo',
        body: 'La cocina lejos del mostrador. Almuerzos individuales, bufés con personal y eventos externos completos, cocinados aquí y entregados en cajas reutilizables. Los detalles personalizados pueden ir a juego.',
        points: ['De diez a doscientos comensales', 'Desde 48 horas de aviso para almuerzos', 'Pedidos semanales recurrentes con 10 % de descuento'],
        cta: 'Paquetes de catering',
      },
    },
    howItWorks: {
      kicker: 'Cómo funciona',
      heading: 'Cuatro pasos, del producto en blanco a la caja.',
      lede: 'El mismo proceso tanto si es un recuerdo grabado como quinientos kits con tu marca.',
      steps: {
        pick: { title: 'Elige un producto', body: 'Escoge la base en la tienda — vasos y botellas, ropa, papelería, lo que sea. Las tallas y los colores están en cada artículo.' },
        artwork: { title: 'Manda tu diseño', body: 'Un nombre, un logo, un monograma o todo un manual de marca. Aceptamos archivos vectoriales, y te redibujamos uno que venga en mal estado.' },
        proof: { title: 'Aprueba la maqueta', body: 'Te devolvemos una prueba digital con la colocación y el tamaño exactos. No se fabrica nada hasta que le das el visto bueno.' },
        produce: { title: 'Lo hacemos y lo enviamos', body: 'Producido aquí mismo, revisado a mano, envuelto para regalo si lo pediste, y enviado o guardado para que lo recojas.' },
      },
      methodsKicker: 'Técnicas de personalización',
      suits: 'Mejor en',
      minimum: 'Mínimo',
      leadTime: 'Plazo de entrega',
      ctaShop: 'Ver los productos',
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
        uniform: {
          name: 'Uniforme y ropa de trabajo', moq: 'Desde 10',
          note: 'Delantales, gorras, camisetas y polos, bordados y repuestos por tallas según cambie tu equipo.',
          placeholder: 'Delantales y gorras bordados',
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
        { term: 'Facturación mensual', detail: 'Un contacto fijo, una factura, y pago a treinta días una vez abierta la cuenta.' },
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
        offSiteCatering: { name: 'Catering de eventos externos', note: 'Llevamos la cocina y el equipo a tu dirección.', covers: '50–200', notice: '6 semanas', from: '£54' },
        breakfastTrolley: { name: 'Carrito de desayuno', note: 'Bollería, fruta, termos de café de filtro, entregado.', covers: '10–80', notice: '48 horas', from: '£8' },
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
