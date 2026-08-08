import { Search, X } from 'lucide-react'
import { CLASIFICACIONES, ESTADOS, TONOS } from '../lib/constants'

function Chip({ activo, onClick, children, tono }) {
  const estilo = activo
    ? `${tono?.bg ?? 'bg-white/12'} ${tono?.text ?? 'text-mist-100'} ring-1 ${tono?.ring ?? 'ring-white/20'}`
    : 'text-mist-500 ring-1 ring-white/[0.07] hover:text-mist-300 hover:ring-white/15'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${estilo}`}
    >
      {children}
    </button>
  )
}

export default function Filters({
  busqueda,
  onBusqueda,
  clasificacion,
  onClasificacion,
  estado,
  onEstado,
  orden,
  onOrden,
  total,
  visibles,
}) {
  const hayFiltro = busqueda || clasificacion !== 'todas' || estado !== 'todos'

  const limpiar = () => {
    onBusqueda('')
    onClasificacion('todas')
    onEstado('todos')
  }

  return (
    <div className="card rounded-xl p-4">
      <div className="flex flex-col gap-4">
        {/* Búsqueda y orden */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-mist-500" />
            <input
              type="search"
              value={busqueda}
              onChange={(evento) => onBusqueda(evento.target.value)}
              placeholder="Buscar por nombre, empresa, email o mensaje…"
              className="field pl-9"
              aria-label="Buscar leads"
            />
          </div>

          <select
            value={orden}
            onChange={(evento) => onOrden(evento.target.value)}
            className="field sm:w-52"
            aria-label="Ordenar leads"
          >
            <option value="fecha" className="bg-ink-800">Más recientes primero</option>
            <option value="score" className="bg-ink-800">Mayor puntuación</option>
            <option value="plazo" className="bg-ink-800">Plazo más próximo</option>
          </select>
        </div>

        {/* Clasificación */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[10px] tracking-[0.16em] text-mist-500 uppercase">
            Nivel
          </span>
          <Chip activo={clasificacion === 'todas'} onClick={() => onClasificacion('todas')}>
            Todos
          </Chip>
          {CLASIFICACIONES.map((item) => (
            <Chip
              key={item.value}
              activo={clasificacion === item.value}
              onClick={() => onClasificacion(item.value)}
              tono={TONOS[item.color]}
            >
              {item.value} · {item.label}
            </Chip>
          ))}
        </div>

        {/* Estado */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[10px] tracking-[0.16em] text-mist-500 uppercase">
            Estado
          </span>
          <Chip activo={estado === 'todos'} onClick={() => onEstado('todos')}>
            Todos
          </Chip>
          {ESTADOS.map((item) => (
            <Chip
              key={item.value}
              activo={estado === item.value}
              onClick={() => onEstado(item.value)}
              tono={TONOS[item.color]}
            >
              {item.short}
            </Chip>
          ))}
        </div>

        {/* Resumen del filtro */}
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
          <p className="text-xs text-mist-500">
            {visibles === total ? (
              <>{total} leads</>
            ) : (
              <>
                <span className="font-semibold text-mist-300">{visibles}</span> de {total} leads
              </>
            )}
          </p>
          {hayFiltro && (
            <button
              type="button"
              onClick={limpiar}
              className="inline-flex items-center gap-1 text-xs text-mist-500 transition-colors hover:text-neon-cyan"
            >
              <X className="size-3.5" />
              Limpiar filtros
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
