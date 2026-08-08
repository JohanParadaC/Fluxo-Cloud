import { Loader2 } from 'lucide-react'
import { ESTADOS, tonoEstado } from '../lib/constants'

/** Desplegable para mover el lead de etapa. Se colorea según el estado actual. */
export default function EstadoSelect({ valor, onChange, guardando, size = 'sm' }) {
  const tono = tonoEstado(valor)

  return (
    <div className="relative inline-flex items-center">
      <select
        value={valor}
        disabled={guardando}
        onChange={(evento) => onChange(evento.target.value)}
        onClick={(evento) => evento.stopPropagation()}
        aria-label="Cambiar estado del lead"
        className={`appearance-none rounded-lg border-0 pr-7 font-medium ring-1 transition-opacity disabled:opacity-50 ${tono.bg} ${tono.text} ${tono.ring} ${
          size === 'sm' ? 'py-1.5 pl-2.5 text-xs' : 'py-2 pl-3 text-sm'
        }`}
      >
        {ESTADOS.map((estado) => (
          <option key={estado.value} value={estado.value} className="bg-ink-800 text-mist-100">
            {estado.value}
          </option>
        ))}
      </select>

      <span className="pointer-events-none absolute right-2 flex items-center">
        {guardando ? (
          <Loader2 className={`size-3 animate-spin ${tono.text}`} />
        ) : (
          <svg viewBox="0 0 10 6" className={`w-2.5 ${tono.text}`} fill="none" aria-hidden>
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )}
      </span>
    </div>
  )
}
