import Hero from '../components/Hero'
import Services from '../components/Services'
import Process from '../components/Process'

/**
 * Vista de inicio: presentación, qué hacemos y cómo trabajamos.
 * Es el recorrido completo que necesita alguien que llega por primera vez.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
    </>
  )
}
