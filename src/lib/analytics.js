/**
 * Analítica, sin atarse a un proveedor.
 *
 * Soporta Umami y Plausible: los dos son cookieless, no piden banner de
 * consentimiento en la UE y pesan una fracción de lo que pesa GA4.
 * Se configura por variables de entorno; si no hay ninguna, no se carga nada
 * y las llamadas a `track` no hacen ni ruido.
 *
 * Recomendación: Umami autoalojado en vuestro VPS. Gratis para siempre y los
 * datos de vuestros visitantes no salen de vuestra máquina.
 */

const PROVEEDOR = (import.meta.env.VITE_ANALYTICS_PROVIDER ?? '').toLowerCase()
const SRC = import.meta.env.VITE_ANALYTICS_SRC ?? ''
const ID = import.meta.env.VITE_ANALYTICS_ID ?? ''

let cargado = false

/** Inyecta el script del proveedor. Se llama una sola vez, al arrancar. */
export function iniciarAnalitica() {
  if (cargado || !PROVEEDOR || !SRC || typeof document === 'undefined') return
  cargado = true

  const script = document.createElement('script')
  script.src = SRC
  script.defer = true

  if (PROVEEDOR === 'umami') {
    script.setAttribute('data-website-id', ID)
    // Las vistas se envían a mano: con rutas por hash el seguimiento
    // automático contaría una sola página para todo el sitio.
    script.setAttribute('data-auto-track', 'false')
  } else if (PROVEEDOR === 'plausible') {
    script.setAttribute('data-domain', ID)
  }

  document.head.appendChild(script)
}

/** Registra una vista. Hay que llamarlo en cada cambio de ruta. */
export function registrarVista(ruta) {
  if (!cargado) return
  const url = `/#${ruta}`

  try {
    if (PROVEEDOR === 'umami' && window.umami) {
      window.umami.track((props) => ({ ...props, url, title: document.title }))
    } else if (PROVEEDOR === 'plausible' && window.plausible) {
      window.plausible('pageview', { u: window.location.origin + url })
    }
  } catch {
    // La analítica nunca debe romper la web.
  }
}

/**
 * Registra un evento de conversión.
 * @param {string} nombre  Identificador corto y estable, p. ej. 'whatsapp_click'
 * @param {object} datos   Propiedades adicionales
 */
export function registrarEvento(nombre, datos = {}) {
  if (!cargado) return

  try {
    if (PROVEEDOR === 'umami' && window.umami) {
      window.umami.track(nombre, datos)
    } else if (PROVEEDOR === 'plausible' && window.plausible) {
      window.plausible(nombre, { props: datos })
    }
  } catch {
    // Igual que arriba.
  }
}

/** Los eventos que importan. Nombrarlos aquí evita erratas sueltas. */
export const EVENTOS = {
  whatsapp: 'whatsapp_click',
  agendaAbierta: 'agenda_abierta',
  formularioEnviado: 'formulario_enviado',
  formularioError: 'formulario_error',
  emailClick: 'email_click',
  telefonoClick: 'telefono_click',
  cotizacionClick: 'cta_cotizacion',
}

export const ANALITICA_ACTIVA = Boolean(PROVEEDOR && SRC)
