import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
import { brand, navLinks } from '../data/site'
import Button from './ui/Button'

/** `route` es la vista activa de la SPA; marca el enlace correspondiente. */
export default function Navbar({ route }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // Sin muelle: `useSpring` mantiene un bucle de animación vivo después de cada
  // scroll. El valor directo se actualiza igual de bien y no cuesta nada.
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Bloquea el scroll del body mientras el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Cierra el menú al cambiar de vista, también con el botón atrás del navegador.
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
          {/* Marca */}
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
              const isActive = route === link.href.slice(1)
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                      isActive ? 'text-mist-100' : 'text-mist-300/75 hover:text-mist-100'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-2 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent shadow-[0_0_10px_1px_var(--color-neon-cyan)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Acciones */}
          <div className="flex items-center gap-2">
            {/* Envuelto en un contenedor: ocultarlo desde la propia clase del botón
                chocaría con el `inline-flex` de su estilo base. */}
            <span className="hidden sm:block">
              <Button href="#contacto" variant="primary" size="md">
                Solicitar cotización
              </Button>
            </span>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              className="glass-blur grid size-10 place-items-center rounded-xl text-mist-100 transition-colors hover:text-neon-cyan lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {/* Barra de progreso de lectura */}
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="h-px origin-left bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-green"
        />
      </header>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-ink-950/92 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />

            <motion.nav
              initial={{ y: -18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.21, 0.68, 0.35, 1] }}
              className="relative flex h-full flex-col justify-center overflow-y-auto px-7 pt-20 pb-10"
            >
              <ul className="flex flex-col">
                {navLinks.map((link, index) => {
                  const isActive = route === link.href.slice(1)
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + index * 0.04, duration: 0.35 }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`flex items-baseline gap-3 border-b border-white/[0.06] py-3 font-display text-xl font-semibold transition-colors ${
                          isActive ? 'text-neon-cyan' : 'text-mist-100 hover:text-neon-cyan'
                        }`}
                      >
                        <span
                          className={`font-mono text-xs ${
                            isActive ? 'text-neon-green' : 'text-neon-cyan/60'
                          }`}
                        >
                          0{index + 1}
                        </span>
                        {link.label}
                      </a>
                    </motion.li>
                  )
                })}
              </ul>

              <Button
                href="#contacto"
                onClick={() => setOpen(false)}
                variant="primary"
                size="lg"
                className="mt-8 w-full"
              >
                Hablemos de tu proyecto
              </Button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
