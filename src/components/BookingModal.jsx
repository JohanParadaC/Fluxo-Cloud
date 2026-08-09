import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { CalendarCheck, ExternalLink, Loader2, X } from 'lucide-react'
import { registrarEvento, EVENTOS } from '../lib/analytics'

const CAL_LINK = import.meta.env.VITE_CAL_LINK ?? ''

/** Hay agenda configurada; si no, los botones vuelven al formulario. */
export const AGENDA_ACTIVA = Boolean(CAL_LINK)

const BookingContext = createContext({ abrirAgenda: null })

/** `abrirAgenda` es null cuando no hay agenda: así el CTA sabe que debe
 *  comportarse como un enlace normal a #contacto. */
export const useBooking = () => useContext(BookingContext)

export function BookingProvider({ children }) {
  const [abierto, setAbierto] = useState(false)

  const abrirAgenda = useCallback((origen = 'desconocido') => {
    registrarEvento(EVENTOS.agendaAbierta, { origen })
    setAbierto(true)
  }, [])

  return (
    <BookingContext.Provider value={{ abrirAgenda: AGENDA_ACTIVA ? abrirAgenda : null }}>
      {children}
      {abierto && <BookingModal onCerrar={() => setAbierto(false)} />}
    </BookingContext.Provider>
  )
}

/**
 * Agenda de Cal.com dentro de un modal.
 *
 * Se usa un iframe en lugar del script de incrustación oficial para no cargar
 * JavaScript de terceros en todas las visitas: aquí solo se descarga cuando
 * alguien pulsa el botón. A cambio no hay ajuste automático de altura, así que
 * el modal la fija.
 */
function BookingModal({ onCerrar }) {
  const [cargando, setCargando] = useState(true)

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

  const url = CAL_LINK.includes('?')
    ? `${CAL_LINK}&embed=true&theme=dark`
    : `${CAL_LINK}?embed=true&theme=dark`

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6">
      <div className="anim-fade absolute inset-0 bg-ink-950/85" onClick={onCerrar} aria-hidden />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Agendar diagnóstico"
        className="anim-zoom glass relative flex h-full max-h-[46rem] w-full max-w-3xl flex-col overflow-hidden rounded-2xl"
      >
        <header className="flex items-center justify-between gap-4 border-b border-white/[0.07] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-neon-cyan to-neon-green text-ink-950">
              <CalendarCheck className="size-4.5" strokeWidth={2} />
            </span>
            <div>
              <h2 className="font-display text-sm font-bold text-mist-100">Agenda tu diagnóstico</h2>
              <p className="text-[11px] text-mist-500">20 minutos · sin coste · sin compromiso</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar"
            className="grid size-9 shrink-0 place-items-center rounded-lg text-mist-500 ring-1 ring-white/[0.08] transition-colors hover:text-mist-100"
          >
            <X className="size-4" />
          </button>
        </header>

        <div className="relative flex-1 bg-ink-900">
          {cargando && (
            <div className="absolute inset-0 grid place-items-center gap-3">
              <Loader2 className="size-6 animate-spin text-neon-cyan" />
            </div>
          )}

          <iframe
            src={url}
            title="Calendario de reservas"
            onLoad={() => setCargando(false)}
            className="size-full border-0"
          />
        </div>

        {/* Salida de emergencia: si el calendario no carga dentro del iframe,
            desde aquí siempre se puede abrir en una pestaña. */}
        <footer className="border-t border-white/[0.07] px-5 py-3 text-center">
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-mist-500 transition-colors hover:text-neon-cyan"
          >
            ¿No se ve bien? Abrir el calendario en una pestaña nueva
            <ExternalLink className="size-3.5" />
          </a>
        </footer>
      </div>
    </div>
  )
}
