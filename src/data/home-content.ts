/**
 * Textos de la página de inicio (ES / EN).
 * Edita aquí kicker, CTAs, trust strip, promo, testimonios, “Conócenos” y copys del catálogo.
 * Las frases grandes del hero por slide siguen en `hero-slides.ts` (line1 / line2).
 */
export const HOME_CONTENT = {
  es: {
    hero: {
      kicker: "Catálogo temporada 24/25",
      cta: "Ver camisetas",
      /** Línea secundaria bajo el titular (estilo subtítulo / pasión). */
      tagline: "Viste la pasión con nuestras camisetas — calidad y diseño para cada fan.",
    },
    trust: [
      {
        title: "Entregas 8–12 días",
        desc: "Preparación y envío con seguimiento; te avisamos en cada paso.",
      },
      {
        title: "Atención al cliente",
        desc: "Resolvemos tallas, equipos y disponibilidad por WhatsApp o teléfono.",
      },
      {
        title: "Pago por transferencia",
        desc: "Formas de pago acordadas contigo de forma segura y transparente.",
      },
    ],
    promo: {
      headline: "Más de 6.000 referencias en catálogo",
      sub:
        "Clubes, selecciones y temporadas: organizamos el stock por ligas y filtros para que encuentres rápido. En la web ves una selección representativa; el catálogo completo lo gestionamos contigo por WhatsApp.",
    },
    featured: {
      title: "Selección destacada",
      subtitle: "Un vistazo a modelos recientes. Explora el grid completo con filtros o escríbenos para el resto del catálogo.",
    },
    products: {
      heading: "Camisetas",
      subtitle:
        "Filtra por competición, ordena por precio y abre la ficha para tallas y pedido. Trabajamos con miles de referencias: si no ves tu equipo, pregunta y lo localizamos.",
      from: "Desde",
      sort: "Ordenar por",
      sortDefault: "Recomendado",
      sortPriceLow: "Precio: menor a mayor",
      sortPriceHigh: "Precio: mayor a menor",
      hideFilters: "Ocultar filtros",
      showFilters: "Mostrar filtros",
      mobileFilters: "Categorías y ligas",
      league: "Liga / competición",
      item: "artículo",
      items: "artículos",
    },
    about: {
      label: "Conócenos",
      title: "Más que camisetas",
      body:
        "Te invitamos a conocer nuestra historia y los proyectos que vienen. Nuestras aspiraciones van más allá del fútbol: comunidad, pasión y un servicio cercano.",
      cta: "Contactar",
    },
    /** Sustituye citas por opiniones reales con permiso del cliente (evita testimonios falsos). */
    testimonialsSection: {
      title: "Clientes satisfechos",
      subtitle: "Reseñas y comentarios de quienes ya recibieron su pedido.",
    },
    testimonials: [
      {
        quote: "Camiseta impecable, talla perfecta y envío en la fecha que dijeron. Repetiré sin duda.",
        author: "María G.",
        place: "Madrid",
      },
      {
        quote: "Me asesoraron por WhatsApp con paciencia; el acabado superó lo que esperaba por el precio.",
        author: "Carlos R.",
        place: "Sevilla",
      },
      {
        quote: "Pedido internacional sin problemas. Comunicación clara en todo momento.",
        author: "Laura M.",
        place: "Valencia",
      },
      {
        quote: "Varias temporadas comprando aquí. Seriedad y buen trato.",
        author: "Javier P.",
        place: "Bilbao",
      },
    ],
  },
  en: {
    hero: {
      kicker: "24/25 season catalog",
      cta: "See jerseys",
      tagline: "Wear the passion — quality jerseys built for every supporter.",
    },
    trust: [
      {
        title: "8–12 day delivery",
        desc: "Dispatch with tracking; we keep you posted at every step.",
      },
      {
        title: "Customer care",
        desc: "Sizes, teams, and stock — reach us on WhatsApp or phone.",
      },
      {
        title: "Bank transfer",
        desc: "Secure, agreed payment options with full transparency.",
      },
    ],
    promo: {
      headline: "6,000+ SKUs in our catalog",
      sub:
        "National teams, clubs, and seasons — we structure stock by league and filters so you find what you need fast. The site highlights a selection; the full range is handled with you via WhatsApp.",
    },
    featured: {
      title: "Featured picks",
      subtitle: "A snapshot of recent styles. Use the full grid below or message us for the complete catalog.",
    },
    products: {
      heading: "Jerseys",
      subtitle:
        "Filter by competition, sort by price, and open a product for sizes and ordering. We work with thousands of SKUs — if you don’t see your team, ask and we’ll source it.",
      from: "From",
      sort: "Sort by",
      sortDefault: "Featured",
      sortPriceLow: "Price: low to high",
      sortPriceHigh: "Price: high to low",
      hideFilters: "Hide filters",
      showFilters: "Show filters",
      mobileFilters: "Leagues & categories",
      league: "League / competition",
      item: "item",
      items: "items",
    },
    about: {
      label: "About us",
      title: "More than jerseys",
      body:
        "Discover our story and what’s next. We care about community, passion, and service — football is just where we start.",
      cta: "Get in touch",
    },
    testimonialsSection: {
      title: "Happy customers",
      subtitle: "Feedback from people who already received their order.",
    },
    testimonials: [
      {
        quote: "Jersey was spotless, sizing was right, and delivery landed when promised. I’ll order again.",
        author: "María G.",
        place: "Madrid",
      },
      {
        quote: "They walked me through everything on WhatsApp; the finish exceeded my expectations.",
        author: "Carlos R.",
        place: "Seville",
      },
      {
        quote: "International order went smoothly. Clear updates the whole way.",
        author: "Laura M.",
        place: "Valencia",
      },
      {
        quote: "Several seasons shopping here — reliable and friendly.",
        author: "Javier P.",
        place: "Bilbao",
      },
    ],
  },
} as const;
