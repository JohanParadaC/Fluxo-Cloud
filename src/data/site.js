/**
 * Fuente única de contenido del sitio.
 * Cambiar marca, textos, servicios o datos de contacto se hace aquí,
 * sin tocar los componentes.
 */

export const brand = {
  name: 'Nexora',
  suffix: 'Solutions',
  tagline: 'Web · IA · Automatización',
  email: 'hola@nexorasolutions.com',
  phone: '+34 600 123 456',
  // Solo dígitos, con prefijo de país (formato que exige wa.me)
  whatsapp: '34600123456',
  location: 'Trabajamos en remoto con clientes de toda Latinoamérica y España',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'X', href: 'https://x.com/' },
    { label: 'GitHub', href: 'https://github.com/' },
  ],
}

export const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Portafolio', href: '#portafolio' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
]

export const heroStats = [
  { value: '+120', label: 'Proyectos entregados' },
  { value: '3.5x', label: 'Aumento medio de leads' },
  { value: '14 días', label: 'Entrega media de una web' },
  { value: '98%', label: 'Clientes que repiten' },
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

export const projects = [
  {
    title: 'Vertex Capital',
    category: 'Corporativa',
    tags: ['Next.js', 'CMS', 'SEO'],
    result: '+180% en solicitudes de contacto',
    text: 'Web institucional para consultora financiera, con blog gestionable y captación segmentada.',
    visual: 'corporate',
  },
  {
    title: 'Lumen Fit',
    category: 'Landing',
    tags: ['Landing', 'A/B testing', 'Meta Ads'],
    result: '4.1% de conversión en tráfico frío',
    text: 'Landing de captación para campañas de pago, con test A/B y seguimiento de eventos.',
    visual: 'landing',
  },
  {
    title: 'Nordic Store',
    category: 'E-commerce',
    tags: ['Shopify', 'UX', 'Checkout'],
    result: '-38% de abandono en checkout',
    text: 'Rediseño completo de tienda online y optimización del embudo de compra.',
    visual: 'ecommerce',
  },
  {
    title: 'ClinicFlow',
    category: 'Automatización',
    tags: ['n8n', 'WhatsApp', 'IA'],
    result: '620 h/año liberadas al equipo',
    text: 'Agenda de citas automatizada con confirmaciones y recordatorios por WhatsApp.',
    visual: 'automation',
  },
  {
    title: 'Atlas Metrics',
    category: 'Dashboard',
    tags: ['React', 'API', 'Datos'],
    result: 'Reportes de 6 h a 4 min',
    text: 'Panel interno que unifica datos de ventas, marketing y soporte en tiempo real.',
    visual: 'dashboard',
  },
  {
    title: 'Solaria Legal',
    category: 'Automatización',
    tags: ['Chatbot', 'CRM', 'Leads'],
    result: '92% de consultas resueltas por IA',
    text: 'Asistente con IA que filtra consultas, califica leads y los deriva al abogado correcto.',
    visual: 'chatbot',
  },
]

export const projectCategories = ['Todos', 'Corporativa', 'Landing', 'E-commerce', 'Automatización', 'Dashboard']

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

export const automationMetrics = [
  { value: '24/7', label: 'Atención sin descanso' },
  { value: '-70%', label: 'Tiempo en tareas manuales' },
  { value: '<30s', label: 'Tiempo de primera respuesta' },
]

export const testimonials = [
  {
    quote:
      'Pasamos de responder mensajes a mano hasta las once de la noche a tener un asistente que filtra todo. En el primer mes cerramos un 40% más de citas con el mismo equipo.',
    name: 'Mariana Duarte',
    role: 'Directora',
    company: 'Clínica Aurora',
    initials: 'MD',
    rating: 5,
  },
  {
    quote:
      'La web anterior era bonita y no vendía nada. Esta se ve mejor y además explica lo que hacemos. Las solicitudes de presupuesto se triplicaron en dos meses.',
    name: 'Andrés Villalba',
    role: 'Socio fundador',
    company: 'Vertex Capital',
    initials: 'AV',
    rating: 5,
  },
  {
    quote:
      'Lo que más valoro es que entendieron el negocio antes de diseñar. Nos propusieron automatizaciones que ni sabíamos que necesitábamos y hoy nos ahorran horas cada semana.',
    name: 'Lucía Ferrer',
    role: 'Head of Growth',
    company: 'Nordic Store',
    initials: 'LF',
    rating: 5,
  },
  {
    quote:
      'Entregaron en tres semanas lo que otra agencia llevaba cuatro meses prometiendo. Comunicación clara, avances semanales y cero sorpresas en la factura.',
    name: 'Tomás Rivas',
    role: 'CEO',
    company: 'Lumen Fit',
    initials: 'TR',
    rating: 5,
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
]

export const serviceOptions = [
  'Diseño de página web',
  'Landing page',
  'Tienda online',
  'Automatización con IA',
  'Chatbot / WhatsApp',
  'Optimización de sitio existente',
  'Otro / no estoy seguro',
]
