import { useEffect, useMemo } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { navLinks } from './data/site'
import useHashRoute from './hooks/useHashRoute'
import Aurora from './components/ui/Aurora'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Process from './components/Process'
import Portfolio from './components/Portfolio'
import Automation from './components/Automation'
import Benefits from './components/Benefits'
import Testimonials from './components/Testimonials'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingActions from './components/FloatingActions'

/** Una vista por sección. La clave coincide con el hash de `navLinks`. */
const views = {
  inicio: Hero,
  servicios: Services,
  proceso: Process,
  portafolio: Portfolio,
  automatizacion: Automation,
  beneficios: Benefits,
  testimonios: Testimonials,
  faq: Faq,
  contacto: Contact,
}

export default function App() {
  const routes = useMemo(() => navLinks.map((link) => link.href.slice(1)), [])
  const route = useHashRoute(routes, 'inicio')
  const reduce = useReducedMotion()

  const View = views[route] ?? Hero

  // Cada vista empieza arriba: sin esto se heredaría el scroll de la anterior.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [route])

  // El título refleja la vista activa, para el historial y las pestañas.
  useEffect(() => {
    const current = navLinks.find((link) => link.href === `#${route}`)
    document.title = current
      ? `${current.label} | Nexora Solutions`
      : 'Nexora Solutions | Diseño web e inteligencia artificial para tu negocio'
  }, [route])

  return (
    <>
      <Aurora />

      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-lg focus:bg-neon-cyan focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-950"
      >
        Saltar al contenido
      </a>

      <Navbar route={route} />

      <main id="contenido" tabIndex={-1} className="min-h-screen focus:outline-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={route}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease: [0.21, 0.68, 0.35, 1] }}
          >
            <View />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <FloatingActions />
    </>
  )
}
