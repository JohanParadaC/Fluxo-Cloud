import { automationFeatures, automationMetrics } from '../data/site'
import { getIcon } from '../lib/icons'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import AutomationFlow from './AutomationFlow'

export default function Automation() {
  return (
    <section id="automatizacion" className="relative overflow-hidden py-20 lg:py-24">
      {/* Fondo específico de la sección */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-neon-blue/[0.04] to-transparent"
      />

      <div className="shell">
        <SectionHeading
          eyebrow="Automatización e IA"
          title="Tu negocio trabajando"
          highlight="también cuando tú no estás"
          description="La automatización no reemplaza a tu equipo: le quita de encima todo lo repetitivo para que se dedique a vender y atender bien."
        />

        {/* Diagrama de flujo */}
        <Reveal delay={0.1} className="mt-14">
          <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-10">
            <div aria-hidden className="tech-dots absolute inset-0 -z-10 opacity-50" />
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-[11px] tracking-[0.2em] text-neon-cyan uppercase">
                Cómo funciona un flujo real
              </p>
              <span className="flex items-center gap-2 rounded-full bg-neon-green/10 px-3 py-1 text-[11px] font-medium text-neon-green">
                <span className="size-1.5 animate-pulse rounded-full bg-neon-green" />
                Ejecutándose en tiempo real
              </span>
            </div>

            <AutomationFlow />
          </div>
        </Reveal>

        {/* Métricas */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {automationMetrics.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 0.08}>
              <div className="glass rounded-2xl p-6 text-center">
                <p className="font-display text-3xl font-extrabold text-gradient sm:text-4xl">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm text-mist-300/80">{metric.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Capacidades */}
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {automationFeatures.map((feature, index) => {
            const Icon = getIcon(feature.icon)

            return (
              <Reveal key={feature.title} delay={index * 0.07} className="h-full">
                <div className="glass glow-border group h-full rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1">
                  <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-neon-cyan/15 to-neon-green/10 text-neon-cyan ring-1 ring-white/10 transition-colors duration-500 group-hover:text-neon-green">
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-display text-base font-semibold text-mist-100">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist-300/75">{feature.text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

      </div>
    </section>
  )
}
