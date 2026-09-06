export default {
  nav: { home: 'Inicio', menu: 'Menú', vertex: 'Tienda Vertex', catering: 'Catering y eventos' },

  common: { whatsapp: 'WhatsApp', chatOnWhatsapp: 'Chatear por WhatsApp' },

  chat: {
    kicker: 'WhatsApp',
    title: 'Abre un chat con el mostrador',
    body: 'En el sitio en vivo, esto abre WhatsApp directamente con el número del restaurante ya escrito. Añade el número real y quedará listo.',
    gotIt: 'Entendido',
  },

  footer: {
    address: ['12 Rowan Street', 'Centro de la ciudad'],
    contactHeading: 'Contáctanos',
    note: 'Solo por WhatsApp — mesas, alérgenos, presupuestos y piezas. Respondemos en menos de una hora durante el servicio.',
    message: 'Escríbenos',
    rights: 'Todos los derechos reservados.',
  },

  home: {
    hero: {
      title: 'Un restaurante que puedes llevarte a casa.',
      body: 'Cada silla, lámpara, plato y panel de esta sala es una pieza Vertex — y todas están a la venta. Primero come. Toca lo que te guste y te mostraremos qué es y cuánto cuesta.',
      mediaLabel: 'Vídeo en bucle o foto del restaurante — colócalo aquí',
      ctaMenu: 'Ver el menú',
      ctaShop: 'Explorar la sala',
    },
    partners: {
      kicker: 'Pide a domicilio',
      lede: 'La carta completa está en nuestros socios de reparto, caliente en toda la ciudad.',
      items: {
        talabat: { name: 'talabat' },
        noon: { name: 'noon' },
      },
    },
    whatWeDo: {
      kicker: 'Qué hacemos',
      heading: 'Cuatro servicios, una sola sala',
      body: 'La cocina alimenta la sala, la sala muestra la gama Vertex, y el mismo equipo cocina fuera y organiza noches privadas aquí. Descúbrelos.',
    },
    services: {
      dineIn: {
        kicker: 'En sala', title: 'El restaurante',
        placeholder: 'Mesa en pleno servicio, comida y cristalería',
        body: 'Desde el desayuno hasta el almuerzo tardío los siete días, y una cena de cuatro platos los viernes por la noche. La carta es corta porque sigue lo que llega, y cada plato aparece fotografiado en la página del menú.',
        points: ['08:00 – 16:00 a diario, cena del viernes a las 18:00', 'Cuarenta cubiertos, doce mesas y un banco largo', 'Solo sin reserva — no se reserva en línea'],
        cta: 'Ver el menú',
      },
      vertexShowroom: {
        kicker: 'Showroom Vertex', title: 'Todo aquí está a la venta',
        placeholder: 'Iluminación y asientos Vertex en la sala',
        body: 'Vertex es una tienda de interiores en línea, y esta sala es su showroom. Sillas, lámparas colgantes, mesas, vajilla y sistemas de pared son todos productos disponibles. Toca una pieza y verás la ficha y el precio; el pago se hace en el sitio de Vertex.',
        points: ['Seis piezas marcadas en la foto de la sala', 'Precios, acabados y plazos de entrega en cada pieza', 'Novedades en sala cada viernes'],
        cta: 'Explorar la sala',
      },
      catering: {
        kicker: 'Fuera del local', title: 'Catering, en tu dirección',
        placeholder: 'Cajas siendo cargadas, montaje externo',
        body: 'Todo lo que cocinamos para ti fuera del café: almuerzos individuales, bufés con personal y eventos externos completos. La misma cocina, entregado en cajas reutilizables, facturado mensualmente a un contacto fijo.',
        points: ['De diez a doscientos comensales', 'Desde 48 horas de aviso para almuerzos', 'Pedidos semanales recurrentes con 10 % de descuento'],
        cta: 'Paquetes de catering',
      },
      events: {
        kicker: 'En el café', title: 'Eventos, aquí mismo',
        placeholder: 'Sala montada para una noche privada',
        body: 'Las noches privadas ocurren en esta sala y en ningún otro lugar — el local después del servicio, o antes de abrir. Cenas club, noches de lanzamiento para nuevas piezas Vertex, catas y desayunos privados.',
        points: ['Cuarenta sentados, sesenta de pie', 'La sala puede redecorarse con tu marca', 'Aviso de tres a cinco semanas'],
        cta: 'Formatos de eventos',
      },
    },
    shopRoom: {
      kicker: 'Explorar la sala',
      heading: 'Toca una pieza. Descubre qué es.',
      lede: 'Seis piezas numeradas en esta foto. Cada una tiene una ficha en la tienda Vertex con todos los detalles y el precio.',
      roomPhoto: 'Vista amplia del comedor',
      pieceOf: (n, total) => `pieza ${n} de ${total}`,
      category: 'Categoría',
      finish: 'Acabado',
      leadTime: 'Plazo de entrega',
      openShop: 'Ver en la tienda Vertex ↗',
      checkoutNote: 'El pago se realiza en el sitio de Vertex',
    },
    friday: {
      kicker: 'CADA VIERNES',
      title: 'La sala se redecora',
      body: 'Nuevas piezas Vertex llegan a la sala cada viernes y la cocina prepara una cena de cuatro platos en torno a ellas. Descubres el catálogo de la próxima semana antes que nadie.',
      cta: 'Preguntar por el viernes',
    },
    closing: {
      title: 'Estamos deseando conocerte.',
      body: 'Mesas, una pieza que viste, un presupuesto de catering, alérgenos — un solo hilo de WhatsApp con alguien del local.',
    },
  },

  menu: {
    kicker: 'El menú',
    title: 'Sabores frescos cada día',
    viewList: 'Lista',
    viewCards: 'Tarjetas',
    updated: 'Actualizado mié. 02 sept.',
    askAllergens: 'Preguntar por alérgenos',
    tableware: 'La vajilla →',
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
  },

  vertex: {
    badge: 'Vertex · las piezas de esta sala',
    title: 'Todo lo que necesitas, aquí mismo',
    body: 'Vertex es una tienda de interiores en línea — iluminación, asientos, vajilla y sistemas de pared. Este restaurante es su showroom: todo en lo que te sientas, comes y miras está a la venta.',
    openShop: 'Ver la tienda Vertex ↗',
    askFloor: 'Preguntar qué hay en la sala →',
    filters: { all: 'Todo', lighting: 'Iluminación', seating: 'Asientos', tables: 'Mesas', tabletop: 'Vajilla', systems: 'Sistemas' },
    viewList: 'Lista',
    viewCards: 'Tarjetas',
    resultPiece: (n) => `${n} pieza`,
    resultPieces: (n) => `${n} piezas`,
    prevPieces: 'Piezas anteriores',
    nextPieces: 'Más piezas',
    viewLink: 'Ver ↗',
    viewOnVertex: 'Ver en Vertex ↗',
    inTheRoom: 'En la sala',
    items: {
      'VX-101': {
        name: 'Lámpara colgante Halo, 600mm', finish: 'Latón cepillado, vidrio ópalo', lead: '2 semanas', where: 'Sobre cada mesa',
        note: 'Un único anillo de luz en un cable fino — lo que da a la sala su brillo.',
        placeholder: 'Lámpara colgante Halo sobre una mesa', price: '£420',
      },
      'VX-204': {
        name: 'Silla de comedor Arc', finish: 'Fresno curvado, lana terracota', lead: 'En stock', where: 'Los 40 cubiertos',
        note: 'Una curva continua para el respaldo y los brazos. Apilable hasta cuatro.',
        placeholder: 'Silla de comedor Arc', price: '£240',
      },
      'VX-318': {
        name: 'Mesa Monolith, 2,4m', finish: 'Piedra fundida, base lacada', lead: '4 semanas', where: 'El banco largo',
        note: 'Una losa, una base. La mesa donde se sirve la cena del viernes.',
        placeholder: 'Mesa de comedor Monolith', price: '£1.850',
      },
      'VX-422': {
        name: 'Vajilla Orbit', finish: 'Gres mate, seis piezas', lead: 'En stock', where: 'Cada plato en el que comes',
        note: 'Los platos, cuencos y guarniciones sobre los que la cocina emplata.',
        placeholder: 'Vajilla de gres Orbit', price: '£96',
      },
      'VX-530': {
        name: 'Sistema de pared Grid, módulo de 1,2m', finish: 'Aluminio anodizado', lead: '3 semanas', where: 'La pared del fondo',
        note: 'Módulos que sostienen estantes, plantas o luces. Añade módulos según lo necesites.',
        placeholder: 'Sistema de estanterías de pared Grid', price: '£310',
      },
      'VX-611': {
        name: 'Lámpara de pie Signal', finish: 'Acero, pantalla de lino', lead: '2 semanas', where: 'Junto a los asientos de ventana',
        note: 'Alta, fina, regulable hasta casi apagarse. La que más preguntan los clientes.',
        placeholder: 'Lámpara de pie Signal junto a una ventana', price: '£380',
      },
    },
  },

  catering: {
    kicker: 'Catering',
    title: 'Catering y eventos',
    intro: 'Los eventos ocurren aquí, en el café. Todo lo que sea en tu dirección es catering. Los presupuestos se acuerdan por mensaje, no con un formulario — envía la fecha y el número de comensales y te respondemos con un precio el mismo día.',
    tabs: { Events: 'Eventos (en el café)', Catering: 'Catering (externo)' },
    coversHeader: 'Comensales',
    noticeHeader: 'Aviso',
    fromHeader: 'Desde',
    footnote: 'Precios por persona, sin IVA ni entrega. Los pedidos recurrentes de cuatro semanas o más tienen un 10 % de descuento.',
    directLineKicker: 'Línea directa',
    directLineTitle: 'Envíanos la fecha y el número de comensales',
    openWhatsapp: 'Abrir WhatsApp',
    replyNote: 'Respondemos en un día laborable · Lun–Vie 08:00–18:00',
    Events: {
      title: 'Eventos, en el café',
      colOne: 'Formato',
      intro: 'Cada evento ocurre en el propio café — la sala después del servicio, o antes de abrir. El mismo equipo y la misma cocina que prepara la cena del viernes, y la sala puede redecorarse con las piezas Vertex que convengan a la noche. Todo lo que sea en tu dirección es catering.',
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
        launchNight: { name: 'Noche de lanzamiento', note: 'La sala redecorada con las piezas que estás lanzando.', covers: '20–60 de pie', notice: '5 semanas', from: '£38' },
        privateBreakfast: { name: 'Desayuno privado', note: 'La sala antes de abrir, puertas cerradas hasta las diez.', covers: '20–30 sentados', notice: '2 semanas', from: '£24' },
      },
    },
    Catering: {
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
};
