import { useEffect } from 'react'
import {
  AlarmClock,
  Building2,
  Calendar,
  Globe,
  Mail,
  MessageCircle,
  Phone,
  Target,
  Wallet,
  X,
} from 'lucide-react'
import {
  estaVencido,
  ESTADOS_ABIERTOS,
  formatearFecha,
  tiempoRelativo,
  tonoClasificacion,
} from '../lib/constants'
import EstadoSelect from './EstadoSelect'

/** Solo dígitos: es lo que necesita el enlace de wa.me. */
const soloDigitos = (telefono) => String(telefono ?? '').replace(/\D/g, '')

function Dato({ icono: Icono, etiqueta, children }) {
  if (!children) return null
  return (
    <div className="flex items-start gap-2.5">
      <Icono className="mt-0.5 size-4 shrink-0 text-mist-500" />
      <div className="min-w-0">
        <p className="text-[10px] tracking-wide text-mist-500 uppercase">{etiqueta}</p>
        <div className="mt-0.5 text-sm break-words text-mist-100">{children}</div>
      </div>
    </div>
  )
}

export default function LeadDetail({ lead, onCerrar, onCambiarEstado, guardando }) {
  // Cerrar con Escape: en un panel que se usa a diario, ahorra muchos clics.
  useEffect(() => {
    const alPulsar = (evento) => {
      if (evento.key === 'Escape') onCerrar()
    }
    document.addEventListener('keydown', alPulsar)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', alPulsar)
      document.body.style.overflow = ''
    }
  }, [onCerrar])

  if (!lead) return null

  const tono = tonoClasificacion(lead.clasificacion)
  const vencido = estaVencido(lead)
  const abierto = ESTADOS_ABIERTOS.includes(lead.estado)
  const telefono = soloDigitos(lead.telefono)

  const mensajeWhatsapp = encodeURIComponent(
    'Hola ' + (lead.nombre.split(' ')[0] || '') + ', te escribimos por tu solicitud sobre ' +
      lead.servicio.toLowerCase() + '.'
  )

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-ink-950/80"
        onClick={onCerrar}
        aria-hidden
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={'Detalle del lead ' + lead.nombre}
        className="card relative flex h-full w-full max-w-lg flex-col overflow-y-auto rounded-none border-y-0 border-r-0 shadow-2xl"
      >
        {/* Cabecera */}
        <header className="sticky top-0 z-10 border-b border-white/[0.07] bg-ink-900/95 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className={`rounded-lg px-2 py-0.5 font-display text-xs font-bold ring-1 ${tono.bg} ${tono.text} ${tono.ring}`}>
                  {lead.clasificacion}
                </span>
                <span className="font-mono text-xs text-mist-500">{lead.score}/100</span>
                <span className="font-mono text-[10px] text-mist-500">· {lead.id}</span>
              </div>
              <h2 className="mt-2 truncate font-display text-xl font-bold">{lead.nombre}</h2>
              <p className="truncate text-sm text-mist-500">{lead.empresa || 'Particular'}</p>
            </div>

            <button
              type="button"
              onClick={onCerrar}
              aria-label="Cerrar"
              className="grid size-9 shrink-0 place-items-center rounded-lg text-mist-500 ring-1 ring-white/[0.08] transition-colors hover:text-mist-100"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <EstadoSelect
              valor={lead.estado}
              size="md"
              guardando={guardando === lead.id}
              onChange={(estado) => onCambiarEstado(lead.id, estado)}
            />
            {vencido && (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-neon-rose/10 px-2.5 py-1.5 text-xs font-semibold text-neon-rose ring-1 ring-neon-rose/25">
                <AlarmClock className="size-3.5" />
                Fuera de plazo
              </span>
            )}
          </div>
        </header>

        <div className="flex flex-col gap-6 px-6 py-6">
          {/* Acción recomendada. Se oculta en los leads ya cerrados: en un
              "Ganado" no tiene sentido seguir pidiendo que se le llame. */}
          {lead.accion && abierto && (
            <div className="rounded-xl bg-neon-cyan/[0.07] p-4 ring-1 ring-neon-cyan/20">
              <p className="flex items-center gap-1.5 text-[10px] tracking-wide text-neon-cyan uppercase">
                <Target className="size-3.5" />
                Siguiente paso
              </p>
              <p className="mt-1.5 text-sm text-mist-100">{lead.accion}</p>
              {lead.responderAntesDe && (
                <p className="mt-2 font-mono text-[11px] text-mist-500">
                  Plazo: {tiempoRelativo(lead.responderAntesDe)}
                </p>
              )}
            </div>
          )}

          {/* Contacto rápido */}
          <div className="grid grid-cols-2 gap-2">
            {telefono && (
              <a
                href={`https://wa.me/${telefono}?text=${mensajeWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-[#04180d] transition-opacity hover:opacity-90"
              >
                <MessageCircle className="size-4" />
                WhatsApp
              </a>
            )}
            <a
              href={`mailto:${lead.email}?subject=${encodeURIComponent('Tu solicitud ' + lead.id)}`}
              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-mist-100 ring-1 ring-white/10 transition-colors hover:bg-white/[0.05] ${
                telefono ? '' : 'col-span-2'
              }`}
            >
              <Mail className="size-4" />
              Correo
            </a>
          </div>

          {/* Datos */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Dato icono={Mail} etiqueta="Email">
              <a href={`mailto:${lead.email}`} className="transition-colors hover:text-neon-cyan">
                {lead.email}
              </a>
            </Dato>
            <Dato icono={Phone} etiqueta="Teléfono">
              {lead.telefono ? (
                <a
                  href={`tel:${lead.telefono.replace(/\s/g, '')}`}
                  className="transition-colors hover:text-neon-cyan"
                >
                  {lead.telefono}
                </a>
              ) : null}
            </Dato>
            <Dato icono={Building2} etiqueta="Empresa">
              {lead.empresa}
            </Dato>
            <Dato icono={Wallet} etiqueta="Presupuesto">
              {lead.presupuesto}
            </Dato>
            <Dato icono={Target} etiqueta="Servicio">
              {lead.servicio}
            </Dato>
            <Dato icono={Calendar} etiqueta="Recibido">
              {formatearFecha(lead.fecha)}
            </Dato>
          </div>

          {/* Mensaje */}
          <div>
            <p className="mb-2 text-[10px] tracking-wide text-mist-500 uppercase">Su mensaje</p>
            <p className="rounded-xl bg-white/[0.03] p-4 text-sm leading-relaxed whitespace-pre-wrap text-mist-300 ring-1 ring-white/[0.06]">
              {lead.mensaje}
            </p>
          </div>

          {/* Desglose de la puntuación */}
          {lead.motivos && (
            <div>
              <p className="mb-2 text-[10px] tracking-wide text-mist-500 uppercase">
                Por qué esta puntuación
              </p>
              <ul className="flex flex-col gap-1.5">
                {lead.motivos.split('|').map((motivo, indice) => {
                  const texto = motivo.trim()
                  const negativo = texto.startsWith('-')
                  return (
                    <li
                      key={indice}
                      className={`font-mono text-[11px] ${negativo ? 'text-neon-rose' : 'text-mist-500'}`}
                    >
                      {texto}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {/* Origen */}
          {(lead.origen || lead.pagina) && (
            <Dato icono={Globe} etiqueta="Origen">
              {lead.origen}
              {lead.pagina && (
                <span className="block font-mono text-[11px] break-all text-mist-500">
                  {lead.pagina}
                </span>
              )}
            </Dato>
          )}
        </div>
      </aside>
    </div>
  )
}
