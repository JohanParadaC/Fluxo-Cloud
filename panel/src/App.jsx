import { useEffect, useMemo, useState } from 'react'
import { AlertTriangle, FlaskConical, Inbox, LogOut, RefreshCw, Zap } from 'lucide-react'
import { borrarClave, guardarClave, leerClave, MODO_DEMO, obtenerLeads } from './lib/api'
import { estaVencido, ESTADOS_ABIERTOS } from './lib/constants'
import useLeads from './hooks/useLeads'
import Login from './components/Login'
import StatsBar from './components/StatsBar'
import Filters from './components/Filters'
import LeadTable from './components/LeadTable'
import LeadDetail from './components/LeadDetail'

export default function App() {
  // En modo demo no hay clave que comprobar: se entra directo.
  const [clave, setClave] = useState(() => (MODO_DEMO ? 'demo' : leerClave()))
  const [errorLogin, setErrorLogin] = useState('')

  if (!clave) {
    return (
      <Login
        error={errorLogin}
        onEntrar={async (valor) => {
          setErrorLogin('')
          try {
            // Se valida contra n8n antes de guardar nada.
            await obtenerLeads(valor)
            guardarClave(valor)
            setClave(valor)
          } catch (fallo) {
            setErrorLogin(
              fallo.status === 401 || fallo.status === 403
                ? 'Clave incorrecta.'
                : 'No se pudo conectar con n8n. Revisa que el flujo esté activo.'
            )
          }
        }}
      />
    )
  }

  return (
    <Panel
      clave={clave}
      onSalir={() => {
        borrarClave()
        setClave('')
      }}
    />
  )
}

function Panel({ clave, onSalir }) {
  const { leads, cargando, error, guardando, ultimaCarga, recargar, cambiarEstado } =
    useLeads(clave)

  const [busqueda, setBusqueda] = useState('')
  const [clasificacion, setClasificacion] = useState('todas')
  const [estado, setEstado] = useState('todos')
  const [orden, setOrden] = useState('fecha')
  const [seleccionado, setSeleccionado] = useState(null)

  // Si la clave deja de ser válida, se vuelve a la pantalla de entrada.
  useEffect(() => {
    if (error && (error.status === 401 || error.status === 403)) onSalir()
  }, [error, onSalir])

  const visibles = useMemo(() => {
    const texto = busqueda.trim().toLowerCase()

    const filtrados = leads.filter((lead) => {
      if (clasificacion !== 'todas' && lead.clasificacion !== clasificacion) return false
      if (estado !== 'todos' && lead.estado !== estado) return false
      if (!texto) return true
      return [lead.nombre, lead.empresa, lead.email, lead.mensaje, lead.servicio]
        .join(' ')
        .toLowerCase()
        .includes(texto)
    })

    const ordenados = [...filtrados]
    if (orden === 'score') {
      ordenados.sort((a, b) => b.score - a.score)
    } else if (orden === 'plazo') {
      // Los cerrados van al final: su plazo ya no importa.
      ordenados.sort((a, b) => {
        const abiertoA = ESTADOS_ABIERTOS.includes(a.estado)
        const abiertoB = ESTADOS_ABIERTOS.includes(b.estado)
        if (abiertoA !== abiertoB) return abiertoA ? -1 : 1
        return new Date(a.responderAntesDe || 0) - new Date(b.responderAntesDe || 0)
      })
    } else {
      ordenados.sort((a, b) => new Date(b.fecha || 0) - new Date(a.fecha || 0))
    }
    return ordenados
  }, [leads, busqueda, clasificacion, estado, orden])

  // El detalle debe reflejar los cambios de estado hechos desde la tabla.
  const detalle = seleccionado ? (leads.find((lead) => lead.id === seleccionado.id) ?? null) : null

  const urgentes = leads.filter(estaVencido).length

  return (
    <div className="min-h-screen">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(40rem 26rem at 12% -8%, rgba(59,130,246,0.14), transparent 62%),' +
            'radial-gradient(34rem 24rem at 95% 4%, rgba(63,242,148,0.09), transparent 60%)',
        }}
      />

      {/* Cabecera */}
      <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-ink-950/85 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-neon-cyan to-neon-green">
              <Zap className="size-4 text-ink-950" strokeWidth={2.6} />
            </span>
            <div>
              <h1 className="font-display text-sm font-bold text-mist-100">Panel de leads</h1>
              <p className="font-mono text-[10px] text-mist-500">
                {ultimaCarga
                  ? 'actualizado ' + ultimaCarga.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
                  : 'cargando…'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => recargar(true)}
              disabled={cargando}
              aria-label="Recargar"
              className="grid size-9 place-items-center rounded-lg text-mist-500 ring-1 ring-white/[0.08] transition-colors hover:text-neon-cyan disabled:opacity-50"
            >
              <RefreshCw className={`size-4 ${cargando ? 'animate-spin' : ''}`} />
            </button>
            {!MODO_DEMO && (
              <button
                type="button"
                onClick={onSalir}
                aria-label="Salir"
                className="grid size-9 place-items-center rounded-lg text-mist-500 ring-1 ring-white/[0.08] transition-colors hover:text-neon-rose"
              >
                <LogOut className="size-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 lg:px-8">
        {MODO_DEMO && (
          <div className="flex items-start gap-3 rounded-xl bg-neon-amber/[0.08] p-4 ring-1 ring-neon-amber/25">
            <FlaskConical className="mt-0.5 size-4 shrink-0 text-neon-amber" />
            <p className="text-xs leading-relaxed text-neon-amber">
              <strong className="font-semibold">Modo demo.</strong> Estos leads son inventados y no
              hay conexión con n8n. Configura <code className="font-mono">VITE_API_URL</code> en el
              archivo <code className="font-mono">.env</code> para ver los reales.
            </p>
          </div>
        )}

        {error && error.status !== 401 && error.status !== 403 && (
          <div className="flex items-start gap-3 rounded-xl bg-neon-rose/[0.08] p-4 ring-1 ring-neon-rose/25">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-neon-rose" />
            <div className="text-xs leading-relaxed text-neon-rose">
              <strong className="font-semibold">{error.message}</strong>
              <p className="mt-0.5 opacity-80">
                Comprueba que el flujo <code className="font-mono">panel-api</code> esté activo en
                n8n.
              </p>
            </div>
          </div>
        )}

        {urgentes > 0 && (
          <div className="flex items-center gap-3 rounded-xl bg-neon-rose/[0.06] px-4 py-3 ring-1 ring-neon-rose/20">
            <AlertTriangle className="size-4 shrink-0 text-neon-rose" />
            <p className="text-xs text-mist-300">
              <strong className="font-semibold text-neon-rose">
                {urgentes} {urgentes === 1 ? 'lead está' : 'leads están'} fuera de plazo.
              </strong>{' '}
              Ordena por “Plazo más próximo” para verlos primero.
            </p>
          </div>
        )}

        <StatsBar leads={leads} />

        <Filters
          busqueda={busqueda}
          onBusqueda={setBusqueda}
          clasificacion={clasificacion}
          onClasificacion={setClasificacion}
          estado={estado}
          onEstado={setEstado}
          orden={orden}
          onOrden={setOrden}
          total={leads.length}
          visibles={visibles.length}
        />

        {cargando && leads.length === 0 ? (
          <div className="flex flex-col gap-2">
            {[0, 1, 2, 3, 4].map((fila) => (
              <div key={fila} className="card h-16 animate-pulse rounded-xl opacity-60" />
            ))}
          </div>
        ) : visibles.length === 0 ? (
          <div className="card flex flex-col items-center gap-3 rounded-xl px-6 py-16 text-center">
            <span className="grid size-12 place-items-center rounded-xl bg-white/[0.04] text-mist-500">
              <Inbox className="size-6" />
            </span>
            <p className="font-display text-base font-semibold text-mist-100">
              {leads.length === 0 ? 'Todavía no hay leads' : 'Ningún lead coincide con el filtro'}
            </p>
            <p className="max-w-sm text-sm text-mist-500">
              {leads.length === 0
                ? 'Cuando alguien rellene el formulario de la web, aparecerá aquí en segundos.'
                : 'Prueba a quitar algún filtro o a buscar otra cosa.'}
            </p>
          </div>
        ) : (
          <LeadTable
            leads={visibles}
            guardando={guardando}
            onSeleccionar={setSeleccionado}
            onCambiarEstado={cambiarEstado}
          />
        )}
      </main>

      {detalle && (
        <LeadDetail
          lead={detalle}
          guardando={guardando}
          onCerrar={() => setSeleccionado(null)}
          onCambiarEstado={cambiarEstado}
        />
      )}
    </div>
  )
}
