import { Quote, Star } from 'lucide-react'
import { testimonials } from '../data/site'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const clients = [
  'Vertex Capital',
  'Lumen Fit',
  'Nordic Store',
  'ClinicFlow',
  'Atlas Metrics',
  'Solaria Legal',
  'Kobalt Studio',
  'Meridian Group',
]

export default function Testimonials() {
  return (
    <section id="testimonios" className="relative py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Testimonios"
          title="Lo que dicen los negocios"
          highlight="que ya dieron el salto"
          description="Resultados reales de proyectos entregados. Sin promesas vagas: números, plazos y cambios concretos."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.08} className="h-full">
              <figure className="glass glow-border group relative h-full overflow-hidden rounded-2xl p-7 transition-transform duration-500 hover:-translate-y-1.5">
                <Quote
                  aria-hidden
                  className="absolute -top-2 right-4 size-20 text-white/[0.04] transition-colors duration-500 group-hover:text-neon-cyan/8"
                />

                <div className="mb-4 flex gap-0.5" aria-label={`${item.rating} de 5 estrellas`}>
                  {Array.from({ length: item.rating }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="size-4 fill-neon-green text-neon-green"
                      strokeWidth={0}
                    />
                  ))}
                </div>

                <blockquote className="relative text-[15px] leading-relaxed text-mist-300/90">
                  “{item.quote}”
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-neon-cyan/25 to-neon-blue/20 font-display text-sm font-bold text-mist-100 ring-1 ring-white/10">
                    {item.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-mist-100">{item.name}</span>
                    <span className="block text-xs text-mist-500">
                      {item.role} · {item.company}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Marquesina de clientes */}
        <Reveal delay={0.15}>
          <div className="mask-fade-x mt-14 overflow-hidden">
            <p className="mb-6 text-center font-mono text-[10px] tracking-[0.24em] text-mist-500 uppercase">
              Negocios que confían en nosotros
            </p>
            <div className="animate-marquee flex w-max gap-12">
              {[...clients, ...clients].map((client, index) => (
                <span
                  key={`${client}-${index}`}
                  aria-hidden={index >= clients.length}
                  className="font-display text-lg font-semibold whitespace-nowrap text-mist-500/60 transition-colors duration-300 hover:text-neon-cyan"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
