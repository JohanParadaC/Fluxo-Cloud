import { AlarmClock, Flame, Inbox, Trophy } from 'lucide-react'
import { estaVencido, ESTADOS_ABIERTOS } from '../lib/constants'

/**
 * Las cuatro cifras que importan al abrir el panel por la mañana.
 * "Vencidos" y "A sin contactar" son las accionables: si están en cero,
 * no hay nada urgente que hacer.
 */
export default function StatsBar({ leads }) {
  const ahora = new Date()
  const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1).getTime()

  const delMes = leads.filter((lead) => new Date(lead.fecha).getTime() >= inicioMes).length
  const calientesSinContactar = leads.filter(
    (lead) => lead.clasificacion === 'A' && lead.estado === 'Nuevo'
  ).length
  const vencidos = leads.filter(estaVencido).length

  const cerrados = leads.filter((lead) => !ESTADOS_ABIERTOS.includes(lead.estado))
  const ganados = cerrados.filter((lead) => lead.estado === 'Ganado').length
  const tasa = cerrados.length ? Math.round((ganados / cerrados.length) * 100) : null

  const tarjetas = [
    {
      icono: Inbox,
      valor: delMes,
      etiqueta: 'Leads este mes',
      tono: 'text-neon-cyan',
      fondo: 'bg-neon-cyan/10',
    },
    {
      icono: Flame,
      valor: calientesSinContactar,
      etiqueta: 'Nivel A sin contactar',
      tono: calientesSinContactar > 0 ? 'text-neon-amber' : 'text-mist-500',
      fondo: calientesSinContactar > 0 ? 'bg-neon-amber/10' : 'bg-white/5',
      alerta: calientesSinContactar > 0,
    },
    {
      icono: AlarmClock,
      valor: vencidos,
      etiqueta: 'Fuera de plazo',
      tono: vencidos > 0 ? 'text-neon-rose' : 'text-mist-500',
      fondo: vencidos > 0 ? 'bg-neon-rose/10' : 'bg-white/5',
      alerta: vencidos > 0,
    },
    {
      icono: Trophy,
      valor: tasa === null ? '—' : tasa + '%',
      etiqueta: 'Tasa de cierre',
      tono: 'text-neon-green',
      fondo: 'bg-neon-green/10',
      nota: cerrados.length ? ganados + ' de ' + cerrados.length + ' cerrados' : 'sin cerrar aún',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {tarjetas.map((tarjeta) => (
        <div
          key={tarjeta.etiqueta}
          className={`card rounded-xl p-4 ${tarjeta.alerta ? 'ring-1 ring-inset ring-white/15' : ''}`}
        >
          <span className={`mb-3 grid size-8 place-items-center rounded-lg ${tarjeta.fondo} ${tarjeta.tono}`}>
            <tarjeta.icono className="size-4" strokeWidth={1.9} />
          </span>
          <p className={`font-display text-2xl font-bold ${tarjeta.tono}`}>{tarjeta.valor}</p>
          <p className="mt-0.5 text-xs text-mist-500">{tarjeta.etiqueta}</p>
          {tarjeta.nota && <p className="mt-1 font-mono text-[10px] text-mist-500/70">{tarjeta.nota}</p>}
        </div>
      ))}
    </div>
  )
}
