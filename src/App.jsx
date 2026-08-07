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

export default function App() {
  return (
    <>
      <Aurora />

      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-lg focus:bg-neon-cyan focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-950"
      >
        Saltar al contenido
      </a>

      <Navbar />

      <main>
        <Hero />
        <Services />
        <Process />
        <Portfolio />
        <Automation />
        <Benefits />
        <Testimonials />
        <Faq />
        <Contact />
      </main>

      <Footer />
      <FloatingActions />
    </>
  )
}
