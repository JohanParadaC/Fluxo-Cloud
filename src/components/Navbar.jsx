import { useEffect, useRef, useState } from 'react'
import { Menu, X, Zap } from 'lucide-react'
import { brand, navLinks } from '../data/site'
import { registrarEvento, EVENTOS } from '../lib/analytics'
import Button from './ui/Button'

/** `route` es la vista activa; `onPrefetch` precarga su código al pasar el ratón. */
export default function Navbar({ route, onPrefetch }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const barraRef = useRef(null)

  // Barra de progreso y fondo de la cabecera.
  // Se escribe directamente en el estilo del nodo en lugar de guardar el
  // porcentaje en el estado: así el scroll no provoca renders de React.
  useEffect(() => {
    let pendiente = false

    const alScrollear = () => {
      if (pendiente) return
      pendiente = true

      requestAnimationFrame(() => {
        pendiente = false
        const alto = document.documentElement.scrollHeight - window.innerHeight
        const avance = alto > 0 ? window.scrollY / alto : 0
        if (barraRef.current) {
          barraRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, avance))})`
        }
        setScrolled((previo) => {
          const ahora = window.scrollY > 24
          return previo === ahora ? previo : ahora
        })
      })
    }

    alScrollear()
    window.addEventListener('scroll', alScrollear, { passive: true })
    return () => window.removeEventListener('scroll', alScrollear)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Cierra el menú al cambiar de vista, también con el botón atrás.
  useEffect(() => setOpen(false), [route])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/[0.07] bg-ink-950/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="shell flex h-18 items-center justify-between gap-6 py-3">
          <a href="#inicio" className="group flex items-center gap-2.5" aria-label="Ir al inicio">
            <span className="relative grid size-9 place-items-center rounded-xl bg-gradient-to-br from-neon-cyan via-neon-blue to-neon-green">
              <Zap className="size-4.5 text-ink-950" strokeWidth={2.6} />
              <span className="absolute inset-0 rounded-xl bg-neon-cyan/50 blur-lg transition-opacity duration-500 group-hover:opacity-100 md:opacity-60" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight whitespace-nowrap text-mist-100">
              {brand.name}
              <span className="text-gradient"> {brand.suffix}</span>
            </span>
          </a>

          {/* Enlaces (escritorio) */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => {
              const destino = link.href.slice(1)
              const isActive = route === destino
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onMouseEnter={() => onPrefetch?.(destino)}
                    onFocus={() => onPrefetch?.(destino)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                      isActive ? 'text-mist-100' : 'text-mist-300/75 hover:text-mist-100'
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-2 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent shadow-[0_0_10px_1px_var(--color-neon-cyan)] transition-opacity duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            {/* Envuelto en un contenedor: ocultarlo desde la clase del botón
                chocaría con el `inline-flex` de su estilo base. */}
            <span className="hidden sm:block">
              <Button
                href="#contacto"
                variant="primary"
                size="md"
                onClick={() => registrarEvento(EVENTOS.cotizacionClick, { origen: 'navbar' })}
              >
                Solicitar cotización
              </Button>
            </span>

            <button
              type="button"
              onClick={() => setOpen((valor) => !valor)}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              className="glass-blur grid size-10 place-items-center rounded-xl text-mist-100 transition-colors hover:text-neon-cyan lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {/* Barra de progreso de lectura */}
        <div
          ref={barraRef}
          aria-hidden
          className="h-px origin-left scale-x-0 bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-green"
        />
      </header>

      {/* Menú móvil.
          Se mantiene siempre montado y se muestra con transiciones CSS: así hay
          animación de entrada y de salida sin necesidad de AnimatePresence.

          `inert` se pasa como booleano, no como cadena vacía: React 19
          interpreta `inert=""` como falso. Cerrado, el menú queda fuera del
          recorrido de teclado y del árbol de accesibilidad aunque siga montado. */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        inert={open ? undefined : true}
      >
        <div className="absolute inset-0 bg-ink-950/92 backdrop-blur-xl" onClick={() => setOpen(false)} />

        <nav
          className={`relative flex h-full flex-col justify-center overflow-y-auto px-7 pt-20 pb-10 transition-transform duration-300 ${
            open ? 'translate-y-0' : '-translate-y-4'
          }`}
        >
          <ul className="flex flex-col">
            {navLinks.map((link, index) => {
              const destino = link.href.slice(1)
              const isActive = route === destino
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-baseline gap-3 border-b border-white/[0.06] py-3 font-display text-xl font-semibold transition-colors ${
                      isActive ? 'text-neon-cyan' : 'text-mist-100 hover:text-neon-cyan'
                    }`}
                  >
                    <span
                      className={`font-mono text-xs ${isActive ? 'text-neon-green' : 'text-neon-cyan/60'}`}
                    >
                      0{index + 1}
                    </span>
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <Button
            href="#contacto"
            onClick={() => {
              setOpen(false)
              registrarEvento(EVENTOS.cotizacionClick, { origen: 'menu_movil' })
            }}
            variant="primary"
            size="lg"
            className="mt-8 w-full"
          >
            Hablemos de tu proyecto
          </Button>
        </nav>
      </div>
    </>
  )
}
