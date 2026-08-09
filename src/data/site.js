/**
 * Fuente única de contenido del sitio.
 * Cambiar marca, textos, servicios o datos de contacto se hace aquí,
 * sin tocar los componentes.
 */

export const brand = {
  name: 'Fluxo',
  suffix: 'Cloud',
  domain: 'fluxocloudlabs.net',
  tagline: 'Web · IA · Automatización',
  email: 'fluxo_j_s@fluxocloudlabs.net',
  phone: '+57 316 974 8529',
  // Solo dígitos y CON prefijo de país: wa.me lo exige. Sin el 57 delante,
  // WhatsApp no reconoce el número y el enlace no abre ninguna conversación.
  whatsapp: '573169748529',
  location: 'Trabajamos en remoto con clientes de toda Latinoamérica y España',
  // TODO: "Lunes a viernes" y "24 Horas" se contradicen. Decidid cuál es:
  // o el horario de oficina, o atención continua (que la IA sí puede sostener).
  schedule: 'Lunes a viernes, 24 Horas (GMT-5 / CET)',
  // TODO: sustituir por los perfiles reales. Hoy apuntan a las portadas de cada
  // red, que da peor impresión que no tener el icono.
  socials: [
    { label: 'LinkedIn', icon: 'Linkedin', href: 'https://www.linkedin.com/' },
    { label: 'Instagram', icon: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'X', icon: 'X', href: 'https://x.com/' },
    { label: 'GitHub', icon: 'Github', href: 'https://github.com/' },
  ],
}

/** Reglas de trabajo. Son compromisos propios, así que se pueden afirmar. */
export const workPrinciples = [
  'Presupuesto cerrado por escrito',
  '50% al inicio, 50% al entregar',
  'Avances visibles cada semana',
  'El código es tuyo',
  '30 días de soporte incluidos',
]

/** Enlaces legales del pie. Apuntan a páginas que aún hay que crear. */
export const legalLinks = [
  { label: 'Aviso legal', href: '#contacto' },
  { label: 'Política de privacidad', href: '#contacto' },
  { label: 'Cookies', href: '#contacto' },
]

/**
 * Cada entrada es una vista de la SPA: el `href` es la ruta (hash) que la
 * muestra. Cada vista agrupa varias secciones para que ninguna quede corta;
 * el reparto exacto está en `views` (App.jsx).
 */
export const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Automatización', href: '#automatizacion' },
  { label: 'Demos', href: '#demos' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
]

/**
 * Datos verificables únicamente: son compromisos que dependen de nosotros, no
 * resultados de clientes que todavía no existen.
 */
export const heroStats = [
  { value: '3', label: 'Ingenieros de sistemas en el equipo' },
  { value: '< 24 h', label: 'Respuesta a tu solicitud' },
  { value: '100%', label: 'Desarrollo a medida, sin plantillas' },
  { value: 'Gratis', label: 'Primer diagnóstico, sin compromiso' },
]

export const services = [
  {
    id: 'web',
    icon: 'Layout',
    title: 'Diseño de páginas web',
    summary:
      'Sitios que se ven caros, cargan rápido y están construidos para convertir visitas en clientes.',
    accent: 'cyan',
    features: [
      'Páginas corporativas',
      'Landing pages de alta conversión',
      'Tiendas online',
      'Portafolios profesionales',
      'Diseño responsive real',
    ],
  },
  {
    id: 'soluciones',
    icon: 'Boxes',
    title: 'Soluciones web a medida',
    summary:
      'Cuando una plantilla se queda corta, desarrollamos exactamente la herramienta que tu operación necesita.',
    accent: 'blue',
    features: [
      'Desarrollo a medida',
      'Optimización de sitios existentes',
      'Integración de herramientas',
      'Formularios inteligentes',
      'Paneles de administración',
    ],
  },
  {
    id: 'ia',
    icon: 'Bot',
    title: 'Automatización con IA',
    summary:
      'Tu negocio respondiendo, calificando y haciendo seguimiento a clientes las 24 horas, sin sumar personal.',
    accent: 'green',
    features: [
      'Chatbots inteligentes',
      'Automatización de procesos',
      'Integración con WhatsApp',
      'Flujos con n8n y Make',
      'Captación automática de leads',
      'Generación de contenido y respuestas',
    ],
  },
  {
    id: 'optimizacion',
    icon: 'Gauge',
    title: 'Optimización digital',
    summary:
      'Afinamos lo que ya tienes: más velocidad, mejor posicionamiento y una experiencia que no pierde ventas.',
    accent: 'violet',
    features: [
      'Velocidad y Core Web Vitals',
      'SEO técnico y on-page',
      'Experiencia de usuario',
      'Optimización de conversión',
      'Mantenimiento y soporte',
    ],
  },
]

export const benefits = [
  {
    icon: 'Sparkles',
    title: 'Diseño premium, no plantillas',
    text: 'Cada proyecto se diseña desde cero para tu marca. Nada de temas genéricos reciclados.',
  },
  {
    icon: 'Target',
    title: 'Enfoque en ventas',
    text: 'Diseñamos pensando en el recorrido del cliente: cada bloque tiene una razón comercial.',
  },
  {
    icon: 'Timer',
    title: 'Automatización que ahorra horas',
    text: 'Liberamos a tu equipo de tareas repetitivas y las convertimos en flujos que corren solos.',
  },
  {
    icon: 'TrendingUp',
    title: 'Soluciones escalables',
    text: 'Arquitectura limpia y modular: tu web crece contigo sin necesidad de rehacerla.',
  },
  {
    icon: 'MessagesSquare',
    title: 'Atención personalizada',
    text: 'Un interlocutor directo durante todo el proyecto. Sin cadenas de tickets ni respuestas tipo.',
  },
  {
    icon: 'Rocket',
    title: 'Implementación rápida',
    text: 'Sprints cortos y entregas visibles cada semana. Ves avances reales, no promesas.',
  },
  {
    icon: 'Plug',
    title: 'Integración con tus herramientas',
    text: 'WhatsApp, CRM, Google Sheets, Notion, Stripe, n8n... conectamos lo que ya usas.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Soporte post-lanzamiento',
    text: 'No desaparecemos al entregar. Acompañamos, medimos y optimizamos después del launch.',
  },
]

export const processSteps = [
  {
    step: '01',
    icon: 'Search',
    title: 'Analizamos tu necesidad',
    text: 'Sesión de diagnóstico para entender tu negocio, tu cliente ideal y dónde se está perdiendo dinero hoy.',
    deliverable: 'Diagnóstico + objetivos medibles',
  },
  {
    step: '02',
    icon: 'PenTool',
    title: 'Diseñamos la solución',
    text: 'Definimos arquitectura, mensajes y diseño visual. Apruebas el prototipo antes de escribir una línea de código.',
    deliverable: 'Prototipo navegable',
  },
  {
    step: '03',
    icon: 'Code2',
    title: 'Desarrollamos tu web',
    text: 'Construimos con código limpio, optimizado para velocidad, SEO y todos los dispositivos.',
    deliverable: 'Sitio en entorno de pruebas',
  },
  {
    step: '04',
    icon: 'Workflow',
    title: 'Automatizamos procesos clave',
    text: 'Conectamos formularios, WhatsApp, CRM e IA para que los leads se gestionen sin intervención manual.',
    deliverable: 'Flujos activos y documentados',
  },
  {
    step: '05',
    icon: 'LineChart',
    title: 'Lanzamos y optimizamos',
    text: 'Publicamos, medimos comportamiento real y ajustamos para mejorar conversión mes a mes.',
    deliverable: 'Panel de métricas + soporte',
  },
]

/**
 * Demos construidas por el equipo, no trabajos de cliente.
 * Describen lo que sabemos montar y con qué, sin atribuirse resultados ajenos.
 * Cuando haya proyectos reales entregados, se sustituyen por casos con números
 * medidos y el permiso del cliente para publicarlos.
 */
export const demos = [
  {
    title: 'Web corporativa',
    category: 'Corporativa',
    tags: ['React', 'Gestor de contenidos', 'SEO'],
    includes: 'Blog editable, formularios conectados y estructura pensada para posicionar',
    text: 'Sitio institucional para empresas de servicios: quiénes somos, qué hacemos y una vía clara de contacto.',
    visual: 'corporate',
  },
  {
    title: 'Landing de captación',
    category: 'Landing',
    tags: ['Conversión', 'Meta / Google Ads', 'Analítica'],
    includes: 'Seguimiento de eventos, píxel configurado y variantes para comparar',
    text: 'Página única orientada a campañas de pago, con un solo objetivo: que el visitante deje sus datos.',
    visual: 'landing',
  },
  {
    title: 'Tienda online',
    category: 'E-commerce',
    tags: ['Catálogo', 'Pasarela de pago', 'Checkout'],
    includes: 'Gestión de productos, pagos con Stripe o Mercado Pago y envío de pedidos',
    text: 'Comercio electrónico con un proceso de compra corto, pensado para que el carrito no se abandone.',
    visual: 'ecommerce',
  },
  {
    title: 'Automatización de citas',
    category: 'Automatización',
    tags: ['n8n', 'WhatsApp', 'Calendario'],
    includes: 'Confirmación automática, recordatorio previo y aviso al equipo',
    text: 'Flujo que agenda, confirma y recuerda citas por WhatsApp sin que nadie tenga que escribir el mensaje.',
    visual: 'automation',
  },
  {
    title: 'Panel de control',
    category: 'Dashboard',
    tags: ['React', 'APIs', 'Datos en vivo'],
    includes: 'Conexión con tus herramientas y métricas actualizadas al momento',
    text: 'Cuadro de mando que reúne en una sola pantalla datos que hoy viven repartidos en varias apps.',
    visual: 'dashboard',
  },
  {
    title: 'Asistente con IA',
    category: 'Automatización',
    tags: ['Chatbot', 'CRM', 'Calificación'],
    includes: 'Entrenado con tu información, escala a una persona cuando hace falta',
    text: 'Agente que atiende consultas, las clasifica y deriva al responsable adecuado con el contexto ya resumido.',
    visual: 'chatbot',
  },
]

export const demoCategories = [
  'Todas',
  'Corporativa',
  'Landing',
  'E-commerce',
  'Automatización',
  'Dashboard',
]

export const automationFeatures = [
  {
    icon: 'MessageCircle',
    title: 'Respuesta automática a clientes',
    text: 'Un asistente entrenado con tu información responde en segundos, a cualquier hora y en tu tono de marca.',
  },
  {
    icon: 'UserPlus',
    title: 'Captura y calificación de leads',
    text: 'Cada contacto se registra, se puntúa y se clasifica solo. Tu equipo solo habla con quien vale la pena.',
  },
  {
    icon: 'FileInput',
    title: 'Formularios conectados',
    text: 'Del formulario al CRM, al correo y al WhatsApp del comercial. Sin copiar y pegar nunca más.',
  },
  {
    icon: 'RefreshCw',
    title: 'Tareas repetitivas eliminadas',
    text: 'Informes, altas, facturas, recordatorios: si se repite y sigue reglas, se puede automatizar.',
  },
  {
    icon: 'Share2',
    title: 'Conexión entre aplicaciones',
    text: 'Tus herramientas dejan de ser islas. Los datos fluyen entre ellas de forma continua.',
  },
  {
    icon: 'PhoneCall',
    title: 'Seguimiento comercial',
    text: 'Secuencias que reactivan contactos fríos y avisan al equipo en el momento exacto.',
  },
]

/** Propiedades del sistema, no resultados prometidos. */
export const automationMetrics = [
  { value: '24/7', label: 'Disponible sin descanso' },
  { value: '< 30 s', label: 'Primera respuesta al cliente' },
  { value: 'Ilimitadas', label: 'Conversaciones en paralelo' },
]

/**
 * El equipo sustituye a los testimonios mientras no haya clientes reales.
 * Para un estudio que empieza, tres personas con nombre y cara generan más
 * confianza que unas reseñas que nadie puede comprobar.
 *
 * TODO: nombres, roles y enlaces reales de los tres fundadores.
 */
export const team = [
  {
    name: 'Nombre Apellido',
    initials: 'NA',
    role: 'Producto y frontend',
    focus: 'Diseña la experiencia y construye la interfaz. Es quien traduce lo que necesita tu negocio a algo que se pueda usar.',
    skills: ['React', 'Diseño de interfaz', 'Conversión'],
    linkedin: 'https://www.linkedin.com/',
  },
  {
    name: 'Nombre Apellido',
    initials: 'NA',
    role: 'Backend e integraciones',
    focus: 'Levanta la infraestructura y conecta tus herramientas: base de datos, APIs, pagos y paneles internos.',
    skills: ['Node.js', 'Bases de datos', 'APIs'],
    linkedin: 'https://www.linkedin.com/',
  },
  {
    name: 'Nombre Apellido',
    initials: 'NA',
    role: 'Automatización e IA',
    focus: 'Diseña los flujos que trabajan solos: chatbots, captación de leads y todo lo repetitivo que hoy hace una persona.',
    skills: ['n8n', 'Agentes con IA', 'WhatsApp API'],
    linkedin: 'https://www.linkedin.com/',
  },
]

/** Argumentos honestos para contratar a un equipo que acaba de empezar. */
export const teamPitch = [
  {
    title: 'Hablas con quien programa',
    text: 'No hay capas intermedias ni gestores de cuenta. Tu proyecto lo desarrolla la misma persona que te responde.',
  },
  {
    title: 'Precio de entrada',
    text: 'Estamos construyendo nuestro portafolio, y eso se refleja en lo que cobramos. Tú ganas precio, nosotros ganamos un caso real.',
  },
  {
    title: 'Formación de ingeniería',
    text: 'Somos ingenieros de sistemas, no montadores de plantillas. Lo que entregamos está pensado para mantenerse y crecer.',
  },
]

export const faqs = [
  {
    q: '¿Cuánto tarda una página web?',
    a: 'Una landing page suele estar lista en 7 a 10 días. Una web corporativa completa, entre 2 y 4 semanas. Un e-commerce o un proyecto a medida, de 4 a 8 semanas. El plazo exacto te lo damos por escrito en la propuesta, junto con las fechas de cada entrega.',
  },
  {
    q: '¿Qué incluye el servicio?',
    a: 'Estrategia y estructura, diseño original, desarrollo, textos orientados a conversión, optimización de velocidad, SEO técnico básico, adaptación a móvil, formularios funcionando, configuración de dominio y hosting, y capacitación para que puedas gestionarla. Todo queda detallado en la propuesta antes de empezar.',
  },
  {
    q: '¿También hacen automatizaciones?',
    a: 'Sí, es una de nuestras especialidades. Diseñamos flujos con n8n, Make o desarrollo propio: chatbots con IA, captación y calificación de leads, recordatorios, sincronización entre aplicaciones y generación automática de reportes. Puede ser parte del proyecto web o un servicio independiente.',
  },
  {
    q: '¿Pueden integrar WhatsApp o formularios?',
    a: 'Sí. Conectamos WhatsApp Business API, formularios inteligentes, CRM (HubSpot, Pipedrive, Zoho), Google Sheets, Notion, Stripe, calendarios y pasarelas de pago. Si tu herramienta tiene API o webhook, se puede integrar.',
  },
  {
    q: '¿La página será adaptable a celular?',
    a: 'Siempre. Diseñamos primero para móvil, porque ahí llega la mayor parte del tráfico. Probamos cada proyecto en móvil, tablet y escritorio antes de entregar, y cuidamos que la velocidad se mantenga en conexiones lentas.',
  },
  {
    q: '¿Ofrecen soporte después del lanzamiento?',
    a: 'Todos los proyectos incluyen 30 días de soporte sin coste tras el lanzamiento. Después puedes contratar un plan de mantenimiento mensual que cubre actualizaciones, copias de seguridad, monitorización, cambios de contenido y optimización continua.',
  },
  {
    q: '¿Cuánto cuesta un proyecto?',
    a: 'Depende del alcance real, no de una lista de precios cerrada. Las landing pages parten de un rango accesible y los proyectos a medida se cotizan por módulos. Tras la sesión de diagnóstico recibes una propuesta con precio cerrado, sin costes ocultos.',
  },
  {
    q: '¿Trabajan con negocios fuera de mi país?',
    a: 'Sí. Trabajamos 100% en remoto con clientes de España y Latinoamérica. Las reuniones se hacen por videollamada y la comunicación diaria por WhatsApp o el canal que prefieras.',
  },
  {
    q: '¿Cuánto tiempo llevan trabajando juntos?',
    a: 'Somos un estudio nuevo: tres ingenieros de sistemas que decidieron montar esto juntos. Todavía estamos construyendo nuestro portafolio, y eso tiene dos consecuencias para ti. La primera es el precio: cobramos por debajo de lo que costará dentro de un año. La segunda es la atención: cada proyecto nos importa porque es nuestra carta de presentación. Si prefieres una agencia con cien casos a sus espaldas, es una decisión razonable y lo entendemos.',
  },
]

/**
 * El `value` viaja al flujo de n8n y el `label` se muestra al usuario.
 * Se envían códigos y no textos para que la puntuación del lead no dependa de
 * cómo esté escrita una etiqueta con tildes o símbolos de moneda.
 */
export const serviceOptions = [
  { value: 'web', label: 'Diseño de página web' },
  { value: 'landing', label: 'Landing page' },
  { value: 'tienda', label: 'Tienda online' },
  { value: 'automatizacion', label: 'Automatización con IA' },
  { value: 'chatbot', label: 'Chatbot / WhatsApp' },
  { value: 'optimizacion', label: 'Optimización de sitio existente' },
  { value: 'otro', label: 'Otro / no estoy seguro' },
]

export const budgetOptions = [
  { value: 'lt1k', label: 'Menos de 1.000 €' },
  { value: '1k-3k', label: '1.000 € - 3.000 €' },
  { value: '3k-7k', label: '3.000 € - 7.000 €' },
  { value: 'gt7k', label: 'Más de 7.000 €' },
  { value: 'unknown', label: 'Aún no lo tengo definido' },
]
