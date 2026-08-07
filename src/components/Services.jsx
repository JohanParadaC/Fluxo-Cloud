import { ArrowUpRight, Check } from 'lucide-react'
import { services } from '../data/site'
import { accents, getIcon } from '../lib/icons'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import SpotlightCard from './ui/SpotlightCard'

export default function Services() {
  return (
    <section id="servicios" className="relative py-20 lg:py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Servicios"
          title="Todo lo que tu negocio necesita para"
          highlight="crecer en digital"
          description="Diseño, desarrollo y automatización bajo un mismo techo. Sin proveedores dispersos ni responsabilidades difusas."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = getIcon(service.icon)
            const accent = accents[service.accent]

            return (
              <Reveal key={service.id} delay={index * 0.08} className="h-full">
                <SpotlightCard glow={accent.glow} className="h-full p-6 sm:p-8">
                  <div className="flex h-full flex-col">
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <span
                        className={`relative grid size-13 place-items-center rounded-2xl border ${accent.border} ${accent.bg} ${accent.text} transition-transform duration-500 group-hover:scale-110`}
                      >
                        <Icon className="size-6" strokeWidth={1.7} />
                        <span
                          className={`absolute inset-0 rounded-2xl ${accent.bg} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100`}
                        />
                      </span>
                      <ArrowUpRight className="size-5 text-mist-500 opacity-0 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neon-cyan group-hover:opacity-100" />
                    </div>

                    <h3 className="font-display text-xl font-bold sm:text-[1.35rem]">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-mist-300/80">
                      {service.summary}
                    </p>

                    <ul className="mt-6 grid gap-2.5 border-t border-white/[0.07] pt-6 sm:grid-cols-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-mist-300">
                          <Check
                            className={`mt-0.5 size-4 shrink-0 ${accent.text}`}
                            strokeWidth={2.4}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#contacto"
                      className="mt-7 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-mist-100 transition-colors hover:text-neon-cyan"
                    >
                      Cotizar este servicio
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
