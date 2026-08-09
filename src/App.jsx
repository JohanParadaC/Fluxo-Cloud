import { Suspense, lazy, useCallback, useEffect, useMemo, useRef } from 'react'
import { navLinks } from './data/site'
import useHashRoute from './hooks/useHashRoute'
import { iniciarAnalitica, registrarVista } from './lib/analytics'
import Aurora from './components/ui/Aurora'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingActions from './components/FloatingActions'
import { BookingProvider } from './components/BookingModal'
import Home from './views/Home'

/**
 * Carga diferida por vista.
 *
 * Inicio se importa de forma normal: es la puerta de entrada y hacerla
 * diferida añadiría una petición extra justo en la primera impresión.
 * El resto se descarga al pedirlo, o antes si el visitante pasa el ratón
 * por encima de su enlace del menú.
 */
const cargadores = {
  automatizacion: () => import('./views/AutomationView'),
  demos: () => import('./views/Work'),
  faq: () => import('./components/Faq'),
  contacto: () => import('./components/Contact'),
}

const views = {
  inicio: Home,
  automatizacion: lazy(cargadores.automatizacion),
  demos: lazy(cargadores.demos),
  faq: lazy(cargadores.faq),
  contacto: lazy(cargadores.contacto),
}

/** Hueco mientras llega el código de la vista. Ocupa alto para que el pie
 *  no dé un salto hacia arriba durante la carga. */
function Cargando() {
  return (
    <div className="shell flex min-h-[70vh] items-center justify-center py-24">
      <span className="size-6 animate-spin rounded-full border-2 border-white/10 border-t-neon-cyan" />
    </div>
  )
}

export default function App() {
  const routes = useMemo(() => navLinks.map((link) => link.href.slice(1)), [])
  const route = useHashRoute(routes, 'inicio')
  const precargadas = useRef(new Set())

  const View = views[route] ?? Home

  /** Empieza a descargar una vista antes de que la pidan. */
  const precargar = useCallback((destino) => {
    if (precargadas.current.has(destino)) return
    precargadas.current.add(destino)
    cargadores[destino]?.()
  }, [])

  useEffect(() => {
    iniciarAnalitica()
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })

    const actual = navLinks.find((link) => link.href === `#${route}`)
    document.title = actual
      ? `${actual.label} | Fluxo Cloud`
      : 'Fluxo Cloud | Diseño web e inteligencia artificial para tu negocio'

    // La vista ya tiene su título antes de contabilizarla.
    registrarVista(route)
  }, [route])

  return (
    <BookingProvider>
      <Aurora />

      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-lg focus:bg-neon-cyan focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-950"
      >
        Saltar al contenido
      </a>

      <Navbar route={route} onPrefetch={precargar} />

      <main id="contenido" tabIndex={-1} className="min-h-screen focus:outline-none">
        {/* La clave fuerza el remontaje al cambiar de ruta, y con él la
            animación de entrada definida en CSS. */}
        <div key={route} className="view-enter">
          <Suspense fallback={<Cargando />}>
            <View />
          </Suspense>
        </div>
      </main>

      <Footer />
      <FloatingActions />
    </BookingProvider>
  )
}
