import { processSteps } from '../data/site'
import { getIcon } from '../lib/icons'
import useInView from '../hooks/useInView'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function Process() {
  // La línea que une los pasos se dibuja cuando la sección entra en pantalla.
  const [lineaRef, lineaVisible] = useInView({ threshold: 0.35 })

  return (
    <section id="proceso" className="relative py-20 lg:py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Proceso de trabajo"
          title="Un camino claro, del primer contacto"
          highlight="al lanzamiento"
          description="Sin cajas negras. Sabes en todo momento en qué fase estamos, qué se entrega y cuándo."
        />

        <div className="relative mt-16">
          {/* Línea conectora (escritorio) */}
          <div
            ref={lineaRef}
            aria-hidden
            className="absolute top-9 right-0 left-0 hidden h-px bg-white/[0.08] lg:block"
          >
            <span
              className={`block h-px origin-left bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-green shadow-[0_0_12px_1px_rgba(34,211,238,0.6)] transition-transform duration-[1600ms] ease-in-out ${
                lineaVisible ? 'scale-x-100' : 'scale-x-0'
              }`}
            />
          </div>

          <ol className="grid gap-8 lg:grid-cols-5 lg:gap-5">
            {processSteps.map((item, index) => {
              const Icon = getIcon(item.icon)

              return (
                <li key={item.step} className="relative">
                  {/* Línea conectora (móvil) */}
                  {index < processSteps.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute top-16 bottom-[-2rem] left-9 w-px bg-gradient-to-b from-neon-cyan/40 to-transparent lg:hidden"
                    />
                  )}

                  <Reveal delay={index * 0.1} from="up">
                    <div className="group flex gap-5 lg:block">
                      <div className="relative shrink-0">
                        <span className="glass relative z-10 grid size-18 place-items-center rounded-2xl text-neon-cyan ring-1 ring-neon-cyan/20 transition-all duration-500 group-hover:-rotate-3 group-hover:scale-105 group-hover:text-neon-green group-hover:ring-neon-green/40">
                          <Icon className="size-7" strokeWidth={1.6} />
                          <span className="absolute -top-2 -right-2 grid size-7 place-items-center rounded-lg bg-gradient-to-br from-neon-cyan to-neon-blue font-mono text-[11px] font-bold text-ink-950">
                            {item.step}
                          </span>
                        </span>
                        <span
                          aria-hidden
                          className="absolute inset-0 rounded-2xl bg-neon-cyan/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                        />
                      </div>

                      <div className="pb-2 lg:mt-6">
                        <h3 className="font-display text-base font-semibold text-mist-100 lg:text-[1.05rem]">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-mist-300/75">{item.text}</p>
                        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-2.5 py-1 font-mono text-[10px] tracking-wide text-neon-green">
                          <span className="size-1 rounded-full bg-neon-green" />
                          {item.deliverable}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
