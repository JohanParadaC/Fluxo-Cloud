import { actualizarEstadoDemo, leadsDemo } from './demo'

const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')

/** Sin URL de n8n configurada, el panel funciona con datos de ejemplo. */
export const MODO_DEMO = !API_URL

const CLAVE = 'panel.clave'

export const leerClave = () => localStorage.getItem(CLAVE) ?? ''
export const guardarClave = (valor) => localStorage.setItem(CLAVE, valor)
export const borrarClave = () => localStorage.removeItem(CLAVE)

/** Error con el código HTTP, para distinguir "clave incorrecta" de "n8n caído". */
export class ErrorApi extends Error {
  constructor(mensaje, status) {
    super(mensaje)
    this.status = status
  }
}

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Descarga los leads.
 *
 * La clave viaja en la URL y no en una cabecera a propósito: una petición GET
 * sin cabeceras propias es una "petición simple" y el navegador no lanza la
 * comprobación previa de CORS. Eso evita depender de que n8n responda bien a
 * OPTIONS, que es la causa más común de que este tipo de paneles no funcione.
 */
export async function obtenerLeads(clave) {
  if (MODO_DEMO) {
    await esperar(400) // pequeño retardo para ver los estados de carga
    return leadsDemo()
  }

  const respuesta = await fetch(API_URL + '/panel-leads?key=' + encodeURIComponent(clave), {
    method: 'GET',
  })

  if (respuesta.status === 401 || respuesta.status === 403) {
    throw new ErrorApi('Clave incorrecta', respuesta.status)
  }
  if (!respuesta.ok) {
    throw new ErrorApi('n8n respondió ' + respuesta.status, respuesta.status)
  }

  const datos = await respuesta.json()
  const leads = Array.isArray(datos) ? datos : (datos.leads ?? [])
  return leads.map(normalizar)
}

/**
 * Cambia el estado de un lead.
 *
 * Se envía como `text/plain` con un JSON dentro por el mismo motivo que arriba:
 * `application/json` obligaría al navegador a hacer la comprobación previa.
 * En n8n se lee el cuerpo y se parsea en el primer nodo.
 */
export async function actualizarEstado(clave, id, estado) {
  if (MODO_DEMO) {
    await esperar(250)
    actualizarEstadoDemo(id, estado)
    return true
  }

  const respuesta = await fetch(API_URL + '/panel-estado', {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    body: JSON.stringify({ key: clave, id, estado }),
  })

  if (respuesta.status === 401 || respuesta.status === 403) {
    throw new ErrorApi('Clave incorrecta', respuesta.status)
  }
  if (!respuesta.ok) {
    throw new ErrorApi('No se pudo guardar el estado', respuesta.status)
  }
  return true
}

/** Tolera que la hoja devuelva números como texto o columnas ausentes. */
function normalizar(fila) {
  const texto = (valor) => String(valor ?? '').trim()
  return {
    id: texto(fila.id ?? fila.ID),
    fecha: texto(fila.fecha ?? fila.Fecha),
    nombre: texto(fila.nombre ?? fila.Nombre),
    email: texto(fila.email ?? fila.Email),
    telefono: texto(fila.telefono ?? fila.Telefono),
    empresa: texto(fila.empresa ?? fila.Empresa),
    servicio: texto(fila.servicio ?? fila.Servicio),
    presupuesto: texto(fila.presupuesto ?? fila.Presupuesto),
    mensaje: texto(fila.mensaje ?? fila.Mensaje),
    score: Number(fila.score ?? fila.Score ?? 0) || 0,
    clasificacion: texto(fila.clasificacion ?? fila.Clasificacion) || 'D',
    estado: texto(fila.estado ?? fila.Estado) || 'Nuevo',
    accion: texto(fila.accion ?? fila.Accion),
    responderAntesDe: texto(fila.responderAntesDe ?? fila.ResponderAntesDe),
    motivos: texto(fila.motivos ?? fila.Motivos),
    origen: texto(fila.origen ?? fila.Origen),
    pagina: texto(fila.pagina ?? fila.Pagina),
    cliente: texto(fila.cliente ?? fila.Cliente),
  }
}
