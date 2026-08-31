/** Etapas del embudo, en orden. El valor es literal el de la hoja de cálculo. */
export const ESTADOS = [
  { value: 'Nuevo', color: 'cyan', short: 'Nuevo' },
  { value: 'Contactado', color: 'blue', short: 'Contactado' },
  { value: 'Propuesta enviada', color: 'violet', short: 'Propuesta' },
  { value: 'Ganado', color: 'green', short: 'Ganado' },
  { value: 'Perdido', color: 'rose', short: 'Perdido' },
]

/** Estados en los que el lead sigue vivo y el plazo de respuesta cuenta. */
export const ESTADOS_ABIERTOS = ['Nuevo', 'Contactado', 'Propuesta enviada']

export const CLASIFICACIONES = [
  { value: 'A', label: 'Caliente', color: 'amber' },
  { value: 'B', label: 'Templado', color: 'cyan' },
  { value: 'C', label: 'Frío', color: 'blue' },
  { value: 'D', label: 'Revisar', color: 'slate' },
]

/** Clases de Tailwind por color, para no construirlas dinámicamente
 *  (Tailwind necesita ver la cadena completa en el código para generarla). */
export const TONOS = {
  cyan: { text: 'text-neon-cyan', bg: 'bg-neon-cyan/12', ring: 'ring-neon-cyan/30', dot: 'bg-neon-cyan' },
  blue: { text: 'text-neon-blue', bg: 'bg-neon-blue/12', ring: 'ring-neon-blue/30', dot: 'bg-neon-blue' },
  green: { text: 'text-neon-green', bg: 'bg-neon-green/12', ring: 'ring-neon-green/30', dot: 'bg-neon-green' },
  violet: { text: 'text-neon-violet', bg: 'bg-neon-violet/12', ring: 'ring-neon-violet/30', dot: 'bg-neon-violet' },
  amber: { text: 'text-neon-amber', bg: 'bg-neon-amber/12', ring: 'ring-neon-amber/30', dot: 'bg-neon-amber' },
  rose: { text: 'text-neon-rose', bg: 'bg-neon-rose/12', ring: 'ring-neon-rose/30', dot: 'bg-neon-rose' },
  slate: { text: 'text-mist-500', bg: 'bg-white/5', ring: 'ring-white/12', dot: 'bg-mist-500' },
}

export const tonoEstado = (estado) =>
  TONOS[ESTADOS.find((e) => e.value === estado)?.color ?? 'slate']

export const tonoClasificacion = (clasificacion) =>
  TONOS[CLASIFICACIONES.find((c) => c.value === clasificacion)?.color ?? 'slate']

/** Un lead está vencido si sigue abierto y se pasó el plazo de respuesta. */
export const estaVencido = (lead) => {
  if (!ESTADOS_ABIERTOS.includes(lead.estado)) return false
  if (!lead.responderAntesDe) return false
  return new Date(lead.responderAntesDe).getTime() < Date.now()
}

export const formatearFecha = (iso) => {
  if (!iso) return '—'
  const fecha = new Date(iso)
  if (Number.isNaN(fecha.getTime())) return '—'
  return fecha.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: '2-digit' })
}

export const tiempoRelativo = (iso) => {
  if (!iso) return ''
  const diff = new Date(iso).getTime() - Date.now()
  if (Number.isNaN(diff)) return ''

  const horas = Math.round(diff / 3600000)
  if (Math.abs(horas) < 24) {
    if (horas === 0) return 'ahora'
    return horas > 0 ? 'en ' + horas + ' h' : 'hace ' + Math.abs(horas) + ' h'
  }
  const dias = Math.round(horas / 24)
  return dias > 0 ? 'en ' + dias + ' d' : 'hace ' + Math.abs(dias) + ' d'
}
