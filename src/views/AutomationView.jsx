import Automation from '../components/Automation'
import Benefits from '../components/Benefits'

/**
 * Vista de automatización: primero qué se automatiza y cómo funciona el flujo,
 * después por qué conviene hacerlo con nosotros.
 */
export default function AutomationView() {
  return (
    <>
      <Automation />
      <Benefits />
    </>
  )
}
