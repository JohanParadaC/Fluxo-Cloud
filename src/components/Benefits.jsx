import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { benefits } from '../data/site'
import { getIcon } from '../lib/icons'
import Button from './ui/Button'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function Benefits() {
  return (
    <section id="beneficios" className="relative py-20 lg:py-24">
      {/* Trama de circuito */}
      <div
        aria-hidden
        className="tech-dots pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000,transparent)]"
      />

      <div className="shell">
        <SectionHeading
          eyebrow="¿Por qué elegirnos?"
          title="No entregamos webs bonitas."
          highlight="Entregamos resultados."
          description="Cada decisión de diseño y cada automatización tiene un objetivo comercial detrás. Esto es lo que cambia cuando trabajas con nosotros."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = getIcon(benefit.icon)

            return (
              <Reveal key={benefit.title} delay={index * 0.06} className="h-full">
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  className="glass glow-border group relative h-full overflow-hidden rounded-2xl p-6"
                >
                  {/* Halo de fondo al hover */}
                  <span
                    aria-hidden
                    className="absolute -top-16 -right-16 size-32 rounded-full bg-neon-cyan/12 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <span className="relative mb-5 grid size-11 place-items-center rounded-xl bg-gradient-to-br from-white/10 to-white/[0.02] text-neon-cyan ring-1 ring-white/10 transition-all duration-500 group-hover:text-neon-green group-hover:ring-neon-green/30">
                    <Icon className="size-5 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" strokeWidth={1.8} />
                  </span>

                  <h3 className="font-display text-base leading-snug font-semibold text-mist-100">
                    {benefit.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-mist-300/75">{benefit.text}</p>

                  {/* Línea inferior animada */}
                  <span
                    aria-hidden
                    className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-neon-cyan to-transparent transition-transform duration-500 group-hover:scale-x-100"
                  />
                </motion.article>
              </Reveal>
            )
          })}
        </div>

        {/* Cierre de sección */}
        <Reveal delay={0.15}>
          <div className="glass relative mt-10 overflow-hidden rounded-2xl p-7 sm:p-9">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-gradient-to-r from-neon-blue/12 via-transparent to-neon-green/12"
            />
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h3 className="font-display text-xl font-bold sm:text-2xl">
                  ¿Quieres saber qué se puede automatizar en tu negocio?
                </h3>
                <p className="mt-2 max-w-xl text-sm text-mist-300/80 sm:text-base">
                  Te lo decimos en una llamada de 20 minutos, sin coste y sin compromiso. Sales con
                  un diagnóstico claro, contrates o no.
                </p>
              </div>
              <Button href="#contacto" variant="primary" size="lg" className="w-full md:w-auto">
                Agendar diagnóstico
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
