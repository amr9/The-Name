export default {
  // `cafe` se conserva para la página de la cafetería aparcada; `contact`
  // para el formulario, ahora al pie de la página Acerca de.
  nav: { home: 'Inicio', cafe: 'Cafetería', events: 'Eventos', shop: 'Tienda', brands: 'Marcas', business: 'Regalos corporativos', agency: 'Agencia', about: 'Acerca de', policies: 'Políticas', contact: 'Contáctanos', customize: "Personalízalo", menu: 'Menú',
         policyTabs: { terms: 'Términos y condiciones', delivery: 'Envíos y devoluciones', privacy: 'Política de privacidad' } },

  common: { whatsapp: 'WhatsApp', chatOnWhatsapp: 'Chatear por WhatsApp', backToTop: 'Volver arriba' },

  contact: {
    kicker: 'Contacto',
    title: 'Cuéntanos qué necesitas.',
    body: 'Reservas de ocho personas o más, presupuestos de catering, noches privadas, prensa y consultas profesionales — escríbenos aquí y el equipo de operaciones lo atiende.',
    emailHeading: 'Correo',
    phoneHeading: 'Teléfono y WhatsApp',
    privacyHeading: 'Privacidad y datos personales',
    locationHeading: 'Dónde estamos',
    directions: 'Cómo llegar',
    licenceLabel: 'Con licencia de',
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

  // The catch-all page (pages/NotFound/). `tryInstead` heads a list built
  // from `navLinks`, so the page names themselves come from `nav` above.
  // The Brands page (pages/Brands/). The brand names themselves are proper
  // nouns and live in data/brands.js, not here.
  brandsPage: {
    kicker: "Nuestras marcas",
    title: "Las marcas que seleccionamos.",
    lede: "Creadores con diseño propio que ofrecemos, personalizamos y regalamos — cada uno elegido por piezas que merecen guardarse.",
    visit: "Visitar",
  },

  // The Agency page (pages/Agency/).
  agency: {
    kicker: "Agencia",
    title: "Ideas hechas para llevar tu nombre.",
    lede: "Campañas, activaciones y piezas de marca — planificadas, diseñadas y producidas por The Name para las marcas con las que trabajamos.",
    cta: "Hablemos",
  },

  notFound: {
    kicker: "Página no encontrada",
    title: "Esa página ya no está aquí.",
    lede: "El enlace que seguiste no lleva a ninguna parte: puede estar mal escrito, o ser una página que desde entonces hemos integrado en otra.",
    home: "Volver al inicio",
    tryInstead: "Prueba con una de estas",
  },

  // The Customize Yours section on Home (pages/Home/CustomizeSection.jsx). WHICH products it lists is
  // in data/storeCustomizable.js; the step ids are `customizeSteps` there.
  customize: {
    kicker: "Personalízalo",
    title: "Tú eliges y diseñas",
    lede: "Empieza por una pieza que te guste, decide cada detalle y fabricamos la que has diseñado.",
    steps: {
      base: { title: "Elige tu base", body: "El estilo, el modelo o el material de partida: tu lienzo." },
      detail: { title: "Personaliza cada detalle", body: "Colores, grabado, materiales y acabados, a tu manera." },
      life: { title: "Dale vida", body: "Haz el pedido y nuestros artesanos la fabrican según tus especificaciones." },
    },
    gridHeading: "Piezas personalizables",
    prevPieces: "Piezas anteriores",
    nextPieces: "Más piezas",
    count: (n) => (n === 1 ? "1 pieza" : `${n} piezas`),
    ctaBody: "¿No sabes por dónde empezar? Dinos para qué es y te orientamos.",
    ctaShop: "Empezar a diseñar",
  },

  footer: {
    rights: 'Todos los derechos reservados.',
    linksHeading: 'Enlaces útiles', addressHeading: 'Dirección', helloHeading: 'Contacto',
  },
  // ───────────────────────────────────────────────────────────────────────────
  // Los tres documentos legales de /policies. La ESTRUCTURA (qué documentos,
  // qué secciones y en qué orden) está en pages/Policies/data.js; aquí solo
  // está el texto. Las claves deben coincidir exactamente con las de en.js: si
  // falta una, esa sección vuelve al inglés por el deepMerge de
  // LanguageContext.
  //
  // {legalName}, {licensedBy} y {address} se rellenan desde data/site.js al
  // renderizar — nunca se reescriben los datos registrados aquí.
  //
  // Traducción de cortesía: la versión de referencia sigue siendo la inglesa,
  // y eso es lo que dice `translationNote`, que se muestra al principio de la
  // página en todos los idiomas salvo el inglés.
  // ───────────────────────────────────────────────────────────────────────────
  policies: {
    kicker: 'Aviso legal',
    title: 'Políticas',
    lede: 'Nuestras condiciones de venta, cómo funcionan el envío y las devoluciones, y qué hacemos con tu información. Todo lo siguiente se aplica a las compras realizadas a través de esta web.',
    updated: 'Última actualización: septiembre de 2026',
    tocHeading: 'En esta página',
    translationNote: 'Esta traducción se ofrece por comodidad. En caso de discrepancia, prevalece la versión inglesa de estos documentos.',
    contactNote: 'Para consultar nuestros datos registrados y todas las formas de contactarnos — pedidos, envíos, devoluciones, solicitudes de privacidad y dónde encontrarnos —',
    contactNoteLink: 'consulta la sección de contacto de nuestra página Acerca de',

    docs: {
      terms: {
        title: 'Términos y condiciones',
        intro: [
          'Te damos la bienvenida a THE NAME.',
          'Esta web y su tienda online están gestionadas por {legalName}, con licencia de {licensedBy} y domicilio en {address}.',
          'Estos Términos y condiciones se aplican a las compras realizadas a través de la web de THE NAME. Al realizar un pedido, aceptas estos Términos y condiciones.',
          'Nada en estos Términos pretende limitar los derechos que te reconoce la legislación de protección del consumidor aplicable en los Emiratos Árabes Unidos.',
        ],
        sections: {
          orders: {
            heading: 'Pedidos online',
            blocks: [
              'Los productos que se muestran en nuestra web están sujetos a disponibilidad.',
              'El pago se realiza íntegramente al finalizar la compra. Una vez recibido el pago, THE NAME revisa tu pedido para confirmar la disponibilidad del producto, la cantidad solicitada y, en su caso, los requisitos de personalización.',
              'La confirmación del pago no significa por sí sola que tu pedido haya sido aceptado para producción. Tu pedido queda confirmado una vez que THE NAME lo ha revisado y aceptado.',
              'Si no podemos atender tu pedido, podremos ofrecerte una alternativa adecuada. Si decides no aceptarla, el importe pagado por el pedido no disponible se reembolsará en tu método de pago original.',
            ],
          },
          prices: {
            heading: 'Precios y pago',
            blocks: [
              'Todos los precios de la web se muestran en dírhams de los Emiratos Árabes Unidos (AED), salvo que se indique lo contrario.',
              'El IVA aplicable se calcula y se muestra antes de finalizar la compra y forma parte del importe final a pagar.',
              'Los pagos online se procesan de forma segura a través de Stripe. THE NAME no almacena directamente los datos completos de tu tarjeta de pago.',
            ],
          },
          personalization: {
            heading: 'Personalización y pedidos a medida',
            blocks: [
              'THE NAME permite personalizar determinados productos con elementos como nombres, iniciales, fechas, mensajes, logotipos o ilustraciones.',
              'Cuando la herramienta de personalización online está disponible, verás una simulación digital de tu personalización antes de finalizar la compra.',
              'Revisa tu personalización con atención antes de realizar el pedido. Es tu responsabilidad comprobar la exactitud de toda la información que envías, incluidas la ortografía, los nombres, las iniciales, las fechas, los mensajes y las imágenes cargadas.',
              'Si un artículo se produce correctamente conforme a la personalización enviada y aprobada por ti, THE NAME no es responsable de los errores contenidos en la información que facilitaste. Cualquier repetición solicitada en esas circunstancias puede conllevar cargos adicionales.',
              'Si THE NAME produce un artículo de forma incorrecta o distinta de la personalización que aprobaste, contáctanos y gestionaremos la sustitución, la repetición u otra solución adecuada.',
              'Cambios después del pago: cualquier cambio debe recibirse dentro de las 24 horas siguientes a la recepción del pedido o al pago.',
            ],
          },
          artwork: {
            heading: 'Imágenes y contenidos aportados por el cliente',
            blocks: [
              'Al enviar un logotipo, una imagen, una ilustración, una marca u otro material para su personalización, confirmas que eres su titular o que cuentas con el permiso o los derechos necesarios para usarlo con la finalidad solicitada.',
              'THE NAME se reserva el derecho de rechazar personalizaciones con contenido ilícito, ofensivo, inapropiado o del que razonablemente se sospeche que infringe los derechos de otra persona u organización.',
            ],
          },
          production: {
            heading: 'Plazo de producción',
            blocks: [
              'Los pedidos B2C personalizados estándar requieren normalmente entre 3 y 5 días laborables de producción una vez revisado y confirmado el pedido.',
              'A estos efectos, los días laborables de THE NAME son de lunes a sábado, excepto los festivos de los Emiratos Árabes Unidos.',
              'El plazo de producción y el plazo de entrega son independientes.',
              'Los pedidos de gran volumen, corporativos, al por mayor o de producción especial pueden requerir plazos de producción distintos. Los plazos y las condiciones comerciales aplicables a esos pedidos se indicarán en el presupuesto y/o la factura correspondientes.',
            ],
          },
          delivery: {
            heading: 'Envíos',
            blocks: [
              'Actualmente THE NAME solo realiza envíos dentro de los Emiratos Árabes Unidos, cubriendo los siete emiratos.',
              'Tarifa de envío estándar en los EAU: 30 AED. Para pedidos de más de 200 AED, el envío es gratuito.',
              'Plazo de entrega estimado: entre 1 y 2 días laborables después de finalizada la producción. Para los productos personalizados, el plazo es de 3 a 4 días.',
              'Las estimaciones de entrega se facilitan de buena fe y pueden verse afectadas por circunstancias ajenas al control razonable de THE NAME.',
              'Recogida: los clientes pueden tener la opción de recoger gratuitamente su pedido terminado en THE NAME, en Dubai CommerCity, Dubái.',
              'Toda la información de envío está en la Política de envíos y devoluciones que figura más abajo.',
            ],
          },
          cancellations: {
            heading: 'Cancelaciones',
            blocks: [
              'En los productos no personalizados, un pedido puede cancelarse antes de su expedición.',
              'En los productos personalizados o hechos a medida, la cancelación solo es posible antes de que comience la producción. Una vez iniciada la producción de un artículo personalizado, el pedido deja de ser cancelable y reembolsable por cambio de opinión.',
              'Esto no afecta a tus derechos cuando un producto sea defectuoso, llegue dañado, sea incorrecto o se haya producido de forma distinta a la personalización que aprobaste.',
            ],
          },
          returns: {
            heading: 'Devoluciones y cambios',
            blocks: [
              'Los productos no personalizados que cumplan los requisitos pueden devolverse en un plazo de 7 días desde su recepción, siempre que estén sin usar, sin daños, en su estado original y se devuelvan con su embalaje y etiquetas originales intactos.',
              'Los productos personalizados o hechos a medida no admiten devolución ni reembolso por cambio de opinión una vez producidos específicamente para ti. Esto no se aplica cuando un artículo sea defectuoso, llegue dañado, sea incorrecto o haya sido personalizado erróneamente por THE NAME.',
              'Estas condiciones no excluyen ni limitan derechos o acciones que no puedan excluirse legalmente conforme a la legislación de protección del consumidor aplicable en los EAU. La normativa emiratí exige a los proveedores de comercio electrónico informar de las condiciones de devolución y cambio y restringe las cláusulas contractuales que renuncien indebidamente a los derechos del consumidor.',
            ],
          },
          damaged: {
            heading: 'Pedidos dañados, defectuosos o incorrectos',
            blocks: [
              'Si tu pedido llega dañado o defectuoso, recibes un producto equivocado o THE NAME ha realizado la personalización de forma distinta a lo que aprobaste, contáctanos en las 48 horas siguientes a la entrega.',
              'Podremos pedirte fotografías nítidas del producto y, cuando proceda, de su embalaje para poder revisar la incidencia.',
              'Cuando THE NAME confirme un error o una incidencia cubierta, gestionaremos en primer lugar una sustitución o repetición adecuada. Cuando ninguna de las dos sea posible, se emitirá un reembolso íntegro.',
              'El plazo de 48 horas para comunicar la incidencia no limita los derechos legales que puedan corresponderte conforme a la legislación aplicable de los EAU.',
            ],
          },
          refunds: {
            heading: 'Reembolsos',
            blocks: [
              'Los reembolsos aprobados se emiten en el método de pago original utilizado en la compra.',
              'Los reembolsos se tramitan normalmente en un plazo de 7 a 14 días laborables desde su aprobación.',
              'Tu banco o proveedor de pago puede necesitar tiempo adicional para que un reembolso ya tramitado aparezca en tu cuenta.',
            ],
          },
          corporate: {
            heading: 'Pedidos corporativos y al por mayor',
            blocks: [
              'Los pedidos corporativos, institucionales, para eventos, al por mayor y otros pedidos B2B pueden estar sujetos a condiciones comerciales independientes.',
              'Cuando proceda, las condiciones de pago, los calendarios de producción, las cantidades, los requisitos de entrega y otras condiciones propias del proyecto se indicarán en el presupuesto y/o la factura correspondientes.',
              'Cuando se hayan acordado por separado condiciones propias de un proyecto, esas condiciones se aplicarán a ese pedido en la medida que se especifique.',
            ],
          },
          warranty: {
            heading: 'Garantía del producto',
            blocks: [
              'Cuando un producto de una marca de terceros cuente con garantía del fabricante, las condiciones de esa garantía las fija el fabricante. Contáctanos y te indicaremos qué cobertura se aplica a tu artículo y cómo reclamarla.',
              'Las garantías legales y los derechos del consumidor aplicables no se ven afectados.',
            ],
          },
          accounts: {
            heading: 'Cuentas de cliente',
            blocks: [
              'Puedes comprar en THE NAME como invitado o creando una cuenta de cliente.',
              'Los clientes registrados pueden consultar la información de su cuenta y su historial de pedidos al iniciar sesión.',
              'Eres responsable de mantener seguras tus credenciales de acceso y de avisarnos si crees que se ha accedido a tu cuenta sin autorización.',
            ],
          },
          privacy: {
            heading: 'Privacidad',
            blocks: [
              'Cuando compras en THE NAME o creas una cuenta, podemos recopilar la información necesaria para tramitar y completar tu pedido, incluidos tu nombre, correo electrónico, número de móvil, dirección de entrega e información del pedido o de la personalización.',
              'El tratamiento de tus datos personales se explica en la Política de privacidad que figura más abajo.',
              'Comprar en THE NAME no te suscribe automáticamente a comunicaciones comerciales. Solo enviaremos comunicaciones promocionales si has dado tu consentimiento por separado.',
            ],
          },
          age: {
            heading: 'Requisitos de edad',
            blocks: [
              'Debes tener 18 años o más para comprar directamente a través de esta web.',
              'Cualquier compra, registro o envío de información que implique a una persona menor de 18 años debe realizarlo o tramitarlo su madre, padre o tutor legal.',
            ],
          },
          ip: {
            heading: 'Propiedad intelectual',
            blocks: [
              'Salvo que se indique lo contrario, el diseño de la web, los textos, la fotografía, los gráficos, los materiales creativos y el contenido original asociado a THE NAME no pueden copiarse, reproducirse, distribuirse ni utilizarse comercialmente sin autorización previa.',
              'Los nombres de marcas, nombres de productos, logotipos y marcas registradas de terceros que aparecen en la web siguen siendo propiedad de sus respectivos titulares.',
              'La web está diseñada y desarrollada por The Name Agency.',
            ],
          },
          changes: {
            heading: 'Cambios en estos términos',
            blocks: [
              'THE NAME puede actualizar estos Términos y condiciones cada cierto tiempo para reflejar cambios en nuestros servicios, en la web, en nuestras prácticas operativas o en los requisitos legales aplicables.',
              'La versión aplicable a tu compra será la vigente en el momento en que realices el pedido, salvo que la legislación aplicable exija un cambio.',
            ],
          },
          law: {
            heading: 'Legislación aplicable',
            blocks: [
              'Estos Términos y condiciones y las compras realizadas a través de la web de THE NAME se rigen por la legislación aplicable de los Emiratos Árabes Unidos.',
              'Nada en estos Términos excluye ni restringe los derechos reconocidos a los consumidores por la legislación aplicable de los EAU. La legislación emiratí de protección del consumidor se aplica a los bienes y servicios en los EAU, incluidas las transacciones de comercio electrónico de proveedores registrados en el país y en sus zonas francas.',
            ],
          },
        },
      },

      delivery: {
        title: 'Política de envíos y devoluciones',
        intro: [
          'En THE NAME, muchas de nuestras piezas se personalizan especialmente para ti. A continuación encontrarás todo lo que necesitas saber sobre producción, envíos, cancelaciones, devoluciones y reembolsos.',
          'Esta política debe leerse junto con los Términos y condiciones anteriores. Nada en ella limita tus derechos conforme a la legislación de protección del consumidor aplicable en los EAU, que alcanza a los proveedores de comercio electrónico registrados en el país, incluidas las empresas que operan en zonas francas.',
        ],
        sections: {
          production: {
            heading: 'Plazo de producción',
            blocks: [
              'Los pedidos personalizados requieren normalmente entre 3 y 5 días laborables de producción después de que THE NAME haya revisado y confirmado tu pedido.',
              'Nuestros días laborables son de lunes a sábado, excepto los festivos de los Emiratos Árabes Unidos.',
              'Recuerda que el plazo de producción y el plazo de entrega son independientes.',
              'En los pedidos corporativos, al por mayor o de producción especial, el plazo de producción aplicable se confirmará por separado en el presupuesto y/o la factura correspondientes.',
            ],
          },
          across: {
            heading: 'Envíos a todos los Emiratos',
            blocks: [
              'Actualmente enviamos solo dentro de los EAU, cubriendo los siete emiratos.',
              'Tarifa de envío: 30 AED por pedido.',
              'Plazo de entrega:',
              { list: [
                'Aproximadamente entre 1 y 2 días laborables después de finalizada la producción.',
                'De 3 a 4 días para los productos personalizados.',
              ] },
              'Las estimaciones de entrega se facilitan de buena fe y en ocasiones pueden verse afectadas por circunstancias ajenas a nuestro control razonable.',
              'Envío gratuito: los pedidos de 200 AED o más tienen envío gratuito.',
            ],
          },
          collection: {
            heading: 'Recogida en THE NAME',
            blocks: [
              'Los clientes también pueden tener la opción de recoger gratuitamente su pedido terminado en THE NAME, en Dubai CommerCity, Dubái.',
              'Los detalles de la recogida se facilitarán en cuanto el pedido esté listo.',
            ],
          },
          cancelling: {
            heading: 'Cancelar un pedido',
            blocks: [
              '¿Has cambiado de opinión? Las condiciones de cancelación dependen de si tu pedido está personalizado.',
              'Los pedidos no personalizados pueden cancelarse antes de su expedición. Los pedidos personalizados o hechos a medida solo pueden cancelarse antes de que comience la producción.',
              'Una vez iniciada la producción de un artículo personalizado, el pedido deja de ser cancelable y reembolsable por cambio de opinión.',
              'Para solicitar una cancelación, contáctanos lo antes posible con los datos de contacto de nuestra página Acerca de.',
            ],
          },
          returns: {
            heading: 'Devoluciones — productos no personalizados',
            blocks: [
              'Los productos no personalizados que cumplan los requisitos pueden devolverse en un plazo de 7 días desde su recepción. Para poder devolverlo, el producto debe estar:',
              { list: [
                'sin usar y sin daños;',
                'en su estado original; y',
                'devuelto con su embalaje y etiquetas originales intactos.',
              ] },
              'Contacta con nuestro equipo antes de devolver un artículo para que podamos confirmarte el proceso de devolución.',
            ],
          },
          personalized: {
            heading: 'Productos personalizados',
            blocks: [
              'Como los productos personalizados se crean específicamente para ti, no admiten devolución ni reembolso por cambio de opinión una vez producidos.',
              'Revisa con atención todos los nombres, iniciales, fechas, mensajes, ilustraciones y demás elementos de personalización antes de completar tu pedido. Cuando se ofrezca una vista previa digital de la personalización, continuar con la compra confirma la personalización mostrada.',
              'Si la información que introdujiste y aprobaste contiene un error, THE NAME no es responsable de ese error del cliente y la repetición del artículo puede ser facturable.',
              'Esto no afecta a tus derechos cuando el artículo sea defectuoso, llegue dañado, sea incorrecto o THE NAME lo haya producido de forma distinta a la personalización que aprobaste. La normativa emiratí de protección del consumidor impone remedios en casos de productos defectuosos y prohíbe las cláusulas que supriman indebidamente derechos legales del consumidor.',
            ],
          },
          damaged: {
            heading: 'Pedidos dañados, defectuosos o incorrectos',
            blocks: [
              'Contáctanos en las 48 horas siguientes a la entrega si tu artículo:',
              { list: [
                'llega dañado o defectuoso,',
                'no es el producto que pediste, o',
                'se ha personalizado de forma distinta a lo que aprobaste.',
              ] },
              'Incluye los datos de tu pedido y fotografías nítidas del producto y, cuando proceda, de su embalaje, para que nuestro equipo pueda revisar la incidencia.',
              'Cuando THE NAME confirme un error o una incidencia cubierta, gestionaremos primero una sustitución o repetición. Si ninguna es posible, emitiremos un reembolso íntegro.',
              'El plazo de 48 horas para comunicar la incidencia no restringe los derechos legales del consumidor aplicables conforme a la legislación de los EAU.',
            ],
          },
          refunds: {
            heading: 'Reembolsos',
            blocks: [
              'Los reembolsos aprobados se devuelven al método de pago original utilizado en la compra.',
              'Los reembolsos se tramitan normalmente en un plazo de 7 a 14 días laborables desde su aprobación.',
              'Ten en cuenta que tu banco o el emisor de tu tarjeta puede necesitar tiempo de procesamiento adicional antes de que un reembolso completado aparezca en tu cuenta.',
            ],
          },
        },
      },

      privacy: {
        title: 'Política de privacidad',
        intro: [
          'En THE NAME respetamos tu privacidad y nos comprometemos a tratar tus datos personales de forma responsable y conforme a la legislación aplicable de los Emiratos Árabes Unidos.',
          'Esta Política de privacidad explica qué información recopilamos cuando usas nuestra web o nos compras, por qué la recopilamos, cómo puede usarse y compartirse, y las opciones de que dispones.',
        ],
        sections: {
          who: {
            heading: 'Quiénes somos',
            blocks: [
              'Esta web y su tienda online están gestionadas por {legalName}, con domicilio en {address} y licencia de {licensedBy}.',
              'Las preguntas y solicitudes relacionadas con la privacidad deben dirigirse a la dirección de privacidad indicada en nuestra página Acerca de.',
            ],
          },
          collect: {
            heading: 'Información que recopilamos',
            blocks: [
              'Cuando navegas, creas una cuenta, realizas un pedido o nos contactas en relación con una compra, podemos recopilar información como:',
              { list: [
                'tu nombre completo;',
                'tu correo electrónico;',
                'tu número de móvil;',
                'tu dirección de entrega;',
                'los datos de la cuenta, si creas una;',
                'los detalles del pedido; y',
                'la información, los textos, los logotipos o las ilustraciones que facilitas para la personalización.',
              ] },
              'Solo recopilamos la información razonablemente necesaria para prestar nuestros servicios, completar tus pedidos, comunicarnos contigo y operar nuestra tienda online.',
            ],
          },
          payment: {
            heading: 'Información de pago',
            blocks: [
              'Los pagos online se procesan a través de Stripe.',
              'THE NAME no almacena directamente los datos completos de tu tarjeta de pago. La información de pago necesaria para tramitar tu transacción la gestiona el proveedor de pago conforme a sus propias prácticas de seguridad y privacidad.',
            ],
          },
          use: {
            heading: 'Cómo usamos tu información',
            blocks: [
              'Podemos usar tus datos personales para:',
              { list: [
                'crear y gestionar tu cuenta de cliente;',
                'tramitar y confirmar tus pedidos;',
                'producir productos personalizados;',
                'organizar la entrega o la recogida;',
                'comunicarnos contigo sobre tu pedido;',
                'gestionar cancelaciones, devoluciones, reembolsos y reclamaciones;',
                'prestar atención al cliente;',
                'mantener los registros de transacciones y pedidos;',
                'cumplir las obligaciones contables, fiscales, regulatorias o legales aplicables; y',
                'proteger la seguridad y la integridad de nuestra web y nuestros servicios.',
              ] },
              'No usaremos la información recopilada en un pedido para suscribirte automáticamente a comunicaciones comerciales.',
            ],
          },
          marketing: {
            heading: 'Comunicaciones comerciales',
            blocks: [
              'Comprar en THE NAME no te suscribe automáticamente a comunicaciones promocionales.',
              'Solo te enviaremos correos promocionales, mensajes de WhatsApp u otras comunicaciones comerciales si has elegido recibirlos por separado. Puedes retirar tu consentimiento en cualquier momento.',
              'La legislación emiratí de protección del consumidor reconoce la protección de la privacidad y la seguridad de los datos del consumidor, y restringe el uso de sus datos con fines de promoción y marketing.',
            ],
          },
          sharing: {
            heading: 'Con quién compartimos tu información',
            blocks: [
              'No vendemos tus datos personales ni los facilitamos a terceros para sus propios fines de marketing.',
              'Solo compartimos la información razonablemente necesaria con los proveedores de servicios que nos ayudan a operar y completar tu compra, entre ellos:',
              { list: [
                'Stripe — para procesar los pagos online.',
                'Empresas de reparto y mensajería — para entregar tu pedido. Esto puede incluir compartir información como tu nombre, tu número de móvil y tu dirección de entrega.',
              ] },
              'También podemos revelar información cuando lo exija la legislación aplicable, la normativa, una resolución judicial o una autoridad competente de los EAU.',
            ],
          },
          accounts: {
            heading: 'Cuentas de cliente',
            blocks: [
              'Puedes comprar en THE NAME como invitado o creando una cuenta de cliente registrada.',
              'Si creas una cuenta, es posible que conservemos determinada información para que puedas acceder a los datos de tu cuenta y a tu historial de pedidos al iniciar sesión.',
              'Eres responsable de mantener la confidencialidad de tus credenciales de acceso.',
            ],
          },
          personalization: {
            heading: 'Información de personalización',
            blocks: [
              'Cuando personalizas un producto, podemos tratar la información necesaria para producir tu pedido, incluidos nombres, iniciales, mensajes, logotipos, ilustraciones u otro contenido de personalización que envíes.',
              'Esta información se usará para tramitar y producir tu pedido y para mantener los registros de la transacción correspondientes.',
              'No envíes datos personales de otra persona a través de una personalización salvo que cuentes con la autorización o el permiso adecuados.',
            ],
          },
          children: {
            heading: 'Menores',
            blocks: [
              'Los clientes deben tener 18 años o más para comprar directamente a través de nuestra web.',
              'Cualquier registro, compra o envío de datos personales o ilustraciones que implique a una persona menor de 18 años debe realizarlo o tramitarlo su madre, padre o tutor legal.',
            ],
          },
          retention: {
            heading: 'Cuánto tiempo conservamos la información',
            blocks: [
              'Conservamos los datos personales solo durante el tiempo razonablemente necesario para los fines para los que se recopilaron, incluidos completar pedidos, mantener los registros de transacciones y cumplir los requisitos contables, fiscales, regulatorios y legales aplicables.',
              'La información que deje de ser razonablemente necesaria se tratará conforme a nuestras prácticas de conservación de datos y a nuestras obligaciones legales.',
            ],
          },
          security: {
            heading: 'Cómo protegemos tu información',
            blocks: [
              'Adoptamos medidas organizativas y técnicas razonables para proteger los datos personales frente a accesos no autorizados, pérdida, uso indebido, alteración o divulgación.',
              'No obstante, ningún método de transmisión o almacenamiento electrónico puede garantizarse como completamente seguro.',
            ],
          },
          rights: {
            heading: 'Tus derechos sobre tus datos personales',
            blocks: [
              'Con sujeción a la legislación aplicable de los EAU y a las excepciones legales, puedes tener derechos sobre tus datos personales, incluidos los relativos al acceso, la rectificación, la supresión o la limitación de determinados tratamientos.',
              'La Ley de Protección de Datos Personales de los EAU reconoce a los interesados derechos sobre sus datos personales, con las condiciones y excepciones que establece la propia norma.',
              'Para presentar una solicitud de privacidad o sobre tus datos personales, usa la dirección de privacidad indicada en nuestra página Acerca de. Es posible que necesitemos verificar tu identidad antes de atender determinadas solicitudes.',
            ],
          },
          cookies: {
            heading: 'Cookies y rastreo',
            blocks: [
              'Actualmente THE NAME no utiliza píxeles publicitarios ni herramientas de analítica de terceros como Meta Pixel o Google Analytics.',
              'Aun así, la web puede emplear funciones técnicas necesarias para el funcionamiento de la tienda online, como el mantenimiento de sesiones, el inicio de sesión de clientes, el carrito, la seguridad y el pago.',
              'Si cambia nuestro uso de cookies, analítica o tecnologías publicitarias, esta Política de privacidad se actualizará en consecuencia y se implantarán los mecanismos de consentimiento que sean necesarios.',
            ],
          },
          thirdParty: {
            heading: 'Servicios de terceros',
            blocks: [
              'Nuestra web puede apoyarse en servicios de terceros necesarios para ofrecer funciones como el procesamiento de pagos y la entrega.',
              'Cuando interactúas con esos servicios, su tratamiento de los datos personales también puede regirse por sus propias condiciones de privacidad.',
              'THE NAME adopta medidas razonables para trabajar con proveedores adecuados a los servicios que prestan.',
            ],
          },
          changes: {
            heading: 'Cambios en esta Política de privacidad',
            blocks: [
              'Podemos actualizar esta Política de privacidad cada cierto tiempo para reflejar cambios en nuestra web, nuestros servicios, nuestras prácticas comerciales o los requisitos legales aplicables.',
              'La última versión se publicará en esta web junto con su fecha de entrada en vigor actualizada.',
            ],
          },
        },
      },
    },
  },

  home: {
    hero: {
      titleLeadPrefix: 'De',
      titleScript: 'A tu nombre.',
      body: 'Seleccionamos objetos de diseño y los hacemos personales — con tu nombre, tu mensaje, tu historia o tu marca. Desde un único regalo con significado hasta una colección corporativa completa, cada pieza está hecha para llevar una identidad.',
      mediaLabel: 'Vídeo o foto de personalización — grabado, impresión, regalos terminados',
      ctaTour: 'Tienda virtual',
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
    body: 'Descubre objetos de diseño de marcas que nos encantan — y luego hazlos inconfundiblemente tuyos. Añade un nombre, unas iniciales, un mensaje o algo que signifique algo para ti.',
    openShop: 'Ver la colección',
    askPersonal: 'Personaliza el tuyo',
    // The store's shelves. Keys and order come from `storeCategories` in
    // data/storeProducts.js; only the wording lives here.
    filters: {
      all: 'Todos los productos',
      bagsTravel: 'Bolsos y viaje',
      deskStationery: 'Escritorio y papelería',
      drinkware: 'Bebidas',
      games: 'Juegos',
      homeAccessories: 'Accesorios de hogar',
      kids: 'Niños',
      photoFrames: 'Foto y marcos',
      giftSets: 'Sets de regalo personalizados',
      technology: 'Tecnología',
    },
    emptyCategory: 'Nada en esta categoría todavía.',
    price: (n) => `${n} AED`,
    // The button across the foot of a product card. The store says "Add to
    // Cart"; this site has no cart, so it sends you there instead.
    viewProduct: 'Ver producto',
    shopCategory: (cat) => `Ver todo: ${cat}`,
    // The catalogue loads 24 at a time; these label the control under it.
    loadMore: (n) => `Ver ${n} más`,
    showing: (a, b) => `Mostrando ${a} de ${b}`,
    // Corner ribbons on the Shop cards. WHICH products get one is in
    // data/storeBadges.js; only the wording lives here, keyed by badge.
    badges: { bestSeller: 'Más vendido' },
    // The search field under the category filters. `noResults` takes the
    // query so the visitor can see what was actually searched for.
    searchLabel: 'Buscar productos',
    searchPlaceholder: 'Buscar por nombre…',
    noResults: (q) => `Sin resultados para “${q}”.`,
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
    ctaEnquiry: 'Iniciar una consulta de empresa',
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
      placeholder: 'Montaje externo en la sede de un cliente',
      askFor: [
        'La dirección y la hora de entrega',
        'Comensales y cómo comen — en cajas o en bandejas',
        'Restricciones alimentarias a cubrir',
        'Si esto se repite semanalmente',
      ],
    },
  },

  about: {
    // El vídeo de marca está APARCADO hasta que esté listo — ver About.jsx.
    video: {
      kicker: 'Nuestra historia',
      title: 'Mira nuestra historia.',
      lede: 'Un cortometraje sobre quiénes somos, qué hacemos y por qué un nombre cambia un objeto.',
      placeholder: 'Sobre The Name — vídeo de marca',
    },

    kicker: 'Nuestra historia',
    title: 'Todo empezó con un nombre.',
    lede: 'Nuestra historia empezó en 1990, mucho antes de que THE NAME tuviera un nombre propio. Empezó con la personalización, los regalos corporativos y la convicción de que lo más memorable es aquello hecho personal.',
    heroSupport: 'Más de tres décadas después, esa convicción ha encontrado un nuevo hogar.',

    story: {
      legacy: {
        era: '1990 — donde empezó',
        headline: 'Personal desde el primer día.',
        body: 'El camino comenzó en 1990 con la personalización y los regalos corporativos: crear para empresas, ocasiones y personas objetos que llevaban algo más significativo que el propio producto: una identidad.',
        placeholder: '1990 — las primeras piezas personalizadas',
      },
      evolution: {
        era: 'El siguiente capítulo',
        headline: 'De personalizar marcas a acercar grandes marcas.',
        body: 'A medida que el negocio evolucionó, también lo hizo nuestro mundo. Empezamos a traer marcas internacionales de diseño y lifestyle a Oriente Medio, construyendo relaciones, descubriendo productos excepcionales y aprendiendo qué hace que un objeto merezca ser elegido, usado y recordado.',
        closing: 'Personalización. Regalos. Marcas. Experiencias. Cada capítulo aportó algo al siguiente.',
        placeholder: 'Las marcas de diseño que trajimos a la región',
      },
      today: {
        era: 'Hoy — The Name',
        headline: 'Un solo lugar. Toda nuestra historia.',
        body: 'THE NAME reúne ese legado en un solo lugar. Un destino para descubrir diseño, personalizar lo que te gusta, reunirte, comer, colaborar, crear y vivir algo nuevo. Físico y digital. Personal y corporativo. Una tienda, un punto de encuentro y una plataforma para lo que viene.',
        placeholder: 'Por dentro de THE NAME hoy',
      },
    },

    tagline: {
      fromPrefix: 'De',
      to: 'A tu nombre.',
      lede: 'Es más que un lema. Es nuestra forma de pensar.',
      body: 'Cuando una marca cruza nuestra puerta, THE NAME puede convertirse en su nombre. Cuando alguien elige algo, pasa a ser su nombre. Su identidad. Su momento. Su historia.',
    },

    takeover: {
      headline: 'Por un momento, el espacio no es nuestro. Es suyo.',
      body: 'Construimos cada colaboración alrededor de la identidad de las personas y marcas con las que trabajamos, transformando los productos, la experiencia y a veces el propio espacio en torno a su nombre.',
    },

    collab: {
      era: 'Construido en colaboración',
      headline: 'Algunos nombres con los que hemos creado algo.',
      body: 'A lo largo del camino, nuestro trabajo nos ha unido a marcas, instituciones y organizaciones de todo el mundo, creando productos personalizados, regalos, experiencias y colaboraciones construidas en torno a su identidad.',
    },

    future: {
      era: 'Lo que viene',
      headline: 'Un legado construido aquí. Listo para viajar.',
      body: 'Los EAU nos enseñaron a mirar siempre hacia delante: construir, evolucionar y pensar más allá de donde estamos hoy. THE NAME es nuestro siguiente capítulo: llevar más de tres décadas de experiencia a una nueva era de personalización digital, experiencias y colaboración, con la mirada puesta más allá de los EAU y en todo el Golfo.',
      closing: 'La historia empezó en 1990. Lo que viene lleva tu nombre.',
    },

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
    activation: {
      kicker: 'The Name: pequeños creadores',
      heading: '¿Y si su idea tuviera nombre?',
      body: 'Creemos que los niños no deberían solo recibir cosas hechas para ellos. A veces, deberían poder crear la idea. Dibujarla. Ponerle nombre. Lanzarla al mundo — y descubrir qué pasa cuando algo que empezó en su imaginación se hace realidad.',
      support: 'Eso es exactamente lo que ocurrió en nuestra última activación infantil.',
      videoPlaceholder: 'Niños en la activación, mostrando sus productos y respondiendo preguntas',
      galleryHeading: 'De la activación',
      prevShots: 'Fotos anteriores',
      nextShots: 'Más fotos',
      shots: {
        showingProducts: 'Las pequeñas creadoras detrás de su puesto',
        theCollection: 'La colección expuesta — tazas, botellas, gorras y cuadernos',
        mugs: 'Tazas con los dibujos de los niños',
        withParents: 'Padres y niños alrededor de la mesa',
        makingTogether: 'Creando en la mesa de manualidades',
        onTheStand: 'El puesto de los pequeños creadores',
      },
    },

    twoTs: {
      kicker: 'Conoce Two T\'s',
      heading: 'Una marca pequeña con un gran corazón.',
      body: 'Creada por Teya, de cinco años, Two T\'s empezó con sus dibujos y sus ideas — incluida su colección Hearts — y se convirtió en algo que puede llamar suyo con orgullo. En nuestra activación infantil pudo compartirla, hablar de ella y ver a otros niños descubrir lo que había creado.',
      closing: 'Su idea. Sus dibujos. Su nombre en ella.',
      videoPlaceholder: 'Entrevistas a los niños en la activación',
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
    nudge: '¡Hablamos!',
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
