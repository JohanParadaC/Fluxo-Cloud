import { AlarmClock, Mail, Phone } from 'lucide-react'
import {
  estaVencido,
  formatearFecha,
  tiempoRelativo,
  tonoClasificacion,
} from '../lib/constants'
import EstadoSelect from './EstadoSelect'

function Nivel({ clasificacion, score }) {
  const tono = tonoClasificacion(clasificacion)
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-1 ring-1 ${tono.bg} ${tono.ring}`}>
      <span className={`font-display text-xs font-bold ${tono.text}`}>{clasificacion}</span>
      <span className="font-mono text-[10px] text-mist-500">{score}</span>
    </span>
  )
}

function Plazo({ lead }) {
  const vencido = estaVencido(lead)
  if (!lead.responderAntesDe) return <span className="text-mist-500">—</span>

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs ${vencido ? 'font-semibold text-neon-rose' : 'text-mist-500'}`}
    >
      {vencido && <AlarmClock className="size-3.5" />}
      {tiempoRelativo(lead.responderAntesDe)}
    </span>
  )
}

export default function LeadTable({ leads, onSeleccionar, onCambiarEstado, guardando }) {
  return (
    <>
      {/* Escritorio */}
      <div className="card hidden overflow-hidden rounded-xl lg:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/[0.07] text-[11px] tracking-wide text-mist-500 uppercase">
                <th className="px-4 py-3 font-medium">Lead</th>
                <th className="px-4 py-3 font-medium">Contacto</th>
                <th className="px-4 py-3 font-medium">Solicita</th>
                <th className="px-4 py-3 font-medium">Nivel</th>
                <th className="px-4 py-3 font-medium">Plazo</th>
                <th className="px-4 py-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => onSeleccionar(lead)}
                  className={`cursor-pointer border-b border-white/[0.04] transition-colors last:border-0 hover:bg-white/[0.03] ${
                    estaVencido(lead) ? 'bg-neon-rose/[0.04]' : ''
                  }`}
                >
                  <td className="px-4 py-3">
                    <p className="text-sm font-semibold text-mist-100">{lead.nombre}</p>
                    <p className="text-xs text-mist-500">
                      {lead.empresa || 'Particular'} · {formatearFecha(lead.fecha)}
                    </p>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <a
                        href={`mailto:${lead.email}`}
                        onClick={(evento) => evento.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-xs text-mist-300 transition-colors hover:text-neon-cyan"
                      >
                        <Mail className="size-3.5 shrink-0 text-mist-500" />
                        <span className="max-w-48 truncate">{lead.email}</span>
                      </a>
                      {lead.telefono && (
                        <a
                          href={`tel:${lead.telefono.replace(/\s/g, '')}`}
                          onClick={(evento) => evento.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs text-mist-300 transition-colors hover:text-neon-cyan"
                        >
                          <Phone className="size-3.5 shrink-0 text-mist-500" />
                          {lead.telefono}
                        </a>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <p className="text-xs text-mist-300">{lead.servicio}</p>
                    <p className="text-[11px] text-mist-500">{lead.presupuesto}</p>
                  </td>

                  <td className="px-4 py-3">
                    <Nivel clasificacion={lead.clasificacion} score={lead.score} />
                  </td>

                  <td className="px-4 py-3">
                    <Plazo lead={lead} />
                  </td>

                  <td className="px-4 py-3">
                    <EstadoSelect
                      valor={lead.estado}
                      guardando={guardando === lead.id}
                      onChange={(estado) => onCambiarEstado(lead.id, estado)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Móvil y tablet */}
      <div className="flex flex-col gap-3 lg:hidden">
        {leads.map((lead) => (
          <article
            key={lead.id}
            onClick={() => onSeleccionar(lead)}
            className={`card cursor-pointer rounded-xl p-4 ${
              estaVencido(lead) ? 'ring-1 ring-neon-rose/25' : ''
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-mist-100">{lead.nombre}</p>
                <p className="truncate text-xs text-mist-500">
                  {lead.empresa || 'Particular'} · {formatearFecha(lead.fecha)}
                </p>
              </div>
              <Nivel clasificacion={lead.clasificacion} score={lead.score} />
            </div>

            <p className="mt-3 text-xs text-mist-300">
              {lead.servicio} · <span className="text-mist-500">{lead.presupuesto}</span>
            </p>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-3">
              <Plazo lead={lead} />
              <EstadoSelect
                valor={lead.estado}
                guardando={guardando === lead.id}
                onChange={(estado) => onCambiarEstado(lead.id, estado)}
              />
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
