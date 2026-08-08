/**
 * Datos de ejemplo para el MODO DEMO.
 *
 * Se usan únicamente cuando `VITE_API_URL` está vacío, es decir, cuando no hay
 * n8n conectado. La interfaz muestra un aviso permanente mientras están
 * activos, para que nunca se confundan con leads reales.
 *
 * Sirven para dos cosas: desarrollar el panel sin servidor, y enseñarlo
 * funcionando en una llamada de venta.
 */

const horas = (n) => new Date(Date.now() + n * 3600000).toISOString()

const plantillas = [
  {
    nombre: 'Ana Ruiz',
    empresa: 'Clínica Dental Ruiz',
    email: 'ana.ruiz@clinicadental.es',
    telefono: '+34 611 222 333',
    servicio: 'Automatización con IA',
    presupuesto: 'Más de 7.000 €',
    mensaje:
      'Tenemos tres clínicas y perdemos pacientes porque nadie contesta el WhatsApp por la tarde. Necesito para este trimestre un sistema que responda, agende la primera visita y avise a recepción. El presupuesto ya está aprobado por dirección.',
    score: 97,
    clasificacion: 'A',
    estado: 'Nuevo',
    creado: -6,
    vence: -2,
    motivos: '+35 presupuesto | +12 servicio | +12 dejó teléfono | +8 empresa | +10 email corporativo | +12 mensaje detallado | +8 urgencia',
  },
  {
    nombre: 'Javier Ortega',
    empresa: 'Ortega Abogados',
    email: 'j.ortega@ortegabogados.com',
    telefono: '+34 655 101 202',
    servicio: 'Chatbot / WhatsApp',
    presupuesto: '3.000 € - 7.000 €',
    mensaje:
      'Recibimos muchas consultas que no son de nuestra especialidad y nos comen el día. Buscamos filtrarlas antes de que lleguen al despacho y derivar solo las relevantes.',
    score: 78,
    clasificacion: 'A',
    estado: 'Contactado',
    creado: -30,
    vence: 6,
    motivos: '+28 presupuesto | +12 servicio | +12 dejó teléfono | +8 empresa | +10 email corporativo | +8 mensaje con contexto',
  },
  {
    nombre: 'Marta Sanz',
    empresa: 'Estética Lumen',
    email: 'marta@esteticalumen.es',
    telefono: '+34 622 445 566',
    servicio: 'Diseño de página web',
    presupuesto: '3.000 € - 7.000 €',
    mensaje:
      'Nuestra web tiene ocho años y no se ve bien en el móvil. Queremos algo moderno y que permita pedir cita online.',
    score: 71,
    clasificacion: 'A',
    estado: 'Propuesta enviada',
    creado: -72,
    vence: 20,
    motivos: '+28 presupuesto | +7 servicio | +12 dejó teléfono | +8 empresa | +10 email corporativo | +8 mensaje con contexto',
  },
  {
    nombre: 'Carlos Méndez',
    empresa: '',
    email: 'carlosmendez@gmail.com',
    telefono: '600 111 222',
    servicio: 'Landing page',
    presupuesto: '1.000 € - 3.000 €',
    mensaje: 'Quiero una landing para promocionar mi taller mecánico y captar clientes.',
    score: 43,
    clasificacion: 'B',
    estado: 'Nuevo',
    creado: -14,
    vence: 10,
    motivos: '+20 presupuesto | +7 servicio | +12 dejó teléfono | +4 mensaje breve',
  },
  {
    nombre: 'Elena Prats',
    empresa: 'Academia Nord',
    email: 'elena@academianord.cat',
    telefono: '',
    servicio: 'Automatización con IA',
    presupuesto: '1.000 € - 3.000 €',
    mensaje:
      'Gestionamos matrículas por correo y se nos pierden. Nos gustaría automatizar el alta del alumno y los recordatorios de pago.',
    score: 58,
    clasificacion: 'B',
    estado: 'Contactado',
    creado: -50,
    vence: -8,
    motivos: '+20 presupuesto | +12 servicio | +8 empresa | +10 email corporativo | +8 mensaje con contexto',
  },
  {
    nombre: 'Rubén Castro',
    empresa: 'Inmobiliaria Castro',
    email: 'ruben@inmocastro.es',
    telefono: '+34 699 878 767',
    servicio: 'Tienda online',
    presupuesto: 'Más de 7.000 €',
    mensaje:
      'Queremos digitalizar el catálogo de inmuebles con visitas virtuales y un formulario que califique al comprador antes de asignarle agente. Tenemos prisa, la campaña empieza el mes que viene.',
    score: 93,
    clasificacion: 'A',
    estado: 'Ganado',
    creado: -260,
    vence: -250,
    motivos: '+35 presupuesto | +10 servicio | +12 dejó teléfono | +8 empresa | +10 email corporativo | +12 mensaje detallado | +8 urgencia',
  },
  {
    nombre: 'Lucía Ferrán',
    empresa: '',
    email: 'luciaferran@hotmail.com',
    telefono: '',
    servicio: 'Otro / no estoy seguro',
    presupuesto: 'Menos de 1.000 €',
    mensaje: '¿Cuánto cuesta una web básica?',
    score: 12,
    clasificacion: 'D',
    estado: 'Nuevo',
    creado: -3,
    vence: 69,
    motivos: '+6 presupuesto | +2 servicio | +4 mensaje breve',
  },
  {
    nombre: 'Diego Salas',
    empresa: 'Gimnasios Volt',
    email: 'diego.salas@voltgym.com',
    telefono: '+34 644 300 100',
    servicio: 'Chatbot / WhatsApp',
    presupuesto: '3.000 € - 7.000 €',
    mensaje:
      'Tres centros, mucha consulta repetida sobre horarios y tarifas. Buscamos un asistente que responda eso y capte altas nuevas.',
    score: 76,
    clasificacion: 'A',
    estado: 'Propuesta enviada',
    creado: -120,
    vence: -40,
    motivos: '+28 presupuesto | +12 servicio | +12 dejó teléfono | +8 empresa | +10 email corporativo | +8 mensaje con contexto',
  },
  {
    nombre: 'Paula Nieto',
    empresa: 'Nieto Consultores',
    email: 'paula@nietoconsultores.com',
    telefono: '+34 610 909 808',
    servicio: 'Optimización de sitio existente',
    presupuesto: '1.000 € - 3.000 €',
    mensaje: 'La web carga muy lenta y no aparecemos en Google. Nos gustaría una auditoría.',
    score: 55,
    clasificacion: 'B',
    estado: 'Perdido',
    creado: -400,
    vence: -380,
    motivos: '+20 presupuesto | +6 servicio | +12 dejó teléfono | +8 empresa | +10 email corporativo | +4 mensaje breve',
  },
  {
    nombre: 'Toni Bosch',
    empresa: '',
    email: 'tbosch@gmail.com',
    telefono: '',
    servicio: 'Diseño de página web',
    presupuesto: 'Aún no lo tengo definido',
    mensaje:
      'Busco alguien que me haga la web a cambio de visibilidad, y cuando empiece a facturar te paso un porcentaje.',
    score: 2,
    clasificacion: 'D',
    estado: 'Perdido',
    creado: -190,
    vence: -180,
    motivos: '+12 presupuesto | +7 servicio | +8 mensaje con contexto | -25 pide trabajo sin pagar',
  },
  {
    nombre: 'Sofía Marín',
    empresa: 'Veterinaria Aura',
    email: 'sofia@vetaura.es',
    telefono: '+34 677 545 232',
    servicio: 'Automatización con IA',
    presupuesto: '3.000 € - 7.000 €',
    mensaje:
      'Queremos recordatorios automáticos de vacunas y revisiones por WhatsApp. Ahora lo hacemos a mano y se nos olvida la mitad.',
    score: 82,
    clasificacion: 'A',
    estado: 'Nuevo',
    creado: -20,
    vence: -18,
    motivos: '+28 presupuesto | +12 servicio | +12 dejó teléfono | +8 empresa | +10 email corporativo | +12 mensaje detallado',
  },
  {
    nombre: 'Iván Roldán',
    empresa: 'Talleres Roldán',
    email: 'ivan.roldan@gmail.com',
    telefono: '655 232 111',
    servicio: 'Landing page',
    presupuesto: 'Menos de 1.000 €',
    mensaje: 'Necesito una página sencilla con mis servicios y un botón de WhatsApp.',
    score: 29,
    clasificacion: 'C',
    estado: 'Contactado',
    creado: -95,
    vence: -47,
    motivos: '+6 presupuesto | +7 servicio | +12 dejó teléfono | +4 mensaje breve',
  },
]

const ESTADO_INICIAL = plantillas.map((plantilla, index) => ({
  id: 'LD-DEMO-' + String(index + 1).padStart(3, '0'),
  fecha: horas(plantilla.creado),
  nombre: plantilla.nombre,
  email: plantilla.email,
  telefono: plantilla.telefono,
  empresa: plantilla.empresa,
  servicio: plantilla.servicio,
  presupuesto: plantilla.presupuesto,
  mensaje: plantilla.mensaje,
  score: plantilla.score,
  clasificacion: plantilla.clasificacion,
  estado: plantilla.estado,
  accion:
    plantilla.clasificacion === 'A'
      ? 'Llamar hoy. Si no contesta, WhatsApp y segundo intento mañana.'
      : plantilla.clasificacion === 'B'
        ? 'Enviar propuesta con precio cerrado en menos de 24 h.'
        : plantilla.clasificacion === 'C'
          ? 'Responder con preguntas para concretar alcance y presupuesto.'
          : 'Revisar a mano antes de invertir tiempo.',
  responderAntesDe: horas(plantilla.vence),
  motivos: plantilla.motivos,
  origen: 'web',
  pagina: 'https://ejemplo.com/#contacto',
  cliente: 'Interno',
}))

// Copia mutable: en demo los cambios de estado se conservan hasta recargar.
let memoria = ESTADO_INICIAL.map((lead) => ({ ...lead }))

export const leadsDemo = () => memoria.map((lead) => ({ ...lead }))

export const actualizarEstadoDemo = (id, estado) => {
  memoria = memoria.map((lead) => (lead.id === id ? { ...lead, estado } : lead))
}
