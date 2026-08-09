import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react'
import { heroStats } from '../data/site'
import { registrarEvento, EVENTOS } from '../lib/analytics'
import Button from './ui/Button'
import NeuralCanvas from './ui/NeuralCanvas'
import HeroVisual from './HeroVisual'

/** El escalonado de entrada se hace con retardos CSS, no con JavaScript. */
const paso = (indice) => ({ animationDelay: `${indice * 0.1}s` })

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 lg:pt-32"
    >
      <div className="mask-fade-y pointer-events-none absolute inset-0 -z-10 opacity-70">
        <NeuralCanvas />
      </div>

      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          <div className="min-w-0 text-center lg:text-left">
            <div className="anim-rise" style={paso(0)}>
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-mist-300">
                <Sparkles className="size-3.5 text-neon-green" />
                Agencia digital · Web, IA y automatización
                <span className="ml-1 hidden size-1.5 rounded-full bg-neon-green shadow-[0_0_10px_2px_var(--color-neon-green)] sm:block" />
              </span>
            </div>

            <h1
              className="anim-rise mt-6 text-4xl leading-[1.08] font-extrabold sm:text-5xl lg:text-[3.6rem]"
              style={paso(1)}
            >
              Diseñamos páginas web <span className="text-gradient">inteligentes</span> y
              automatizamos tu negocio con{' '}
              <span className="relative inline-block text-gradient">
                IA
                <span
                  className="absolute -bottom-1 left-0 h-0.5 w-full origin-left rounded-full bg-gradient-to-r from-neon-cyan to-neon-green shadow-[0_0_12px_1px_var(--color-neon-cyan)]"
                  style={{ animation: 'grow-underline 0.7s ease-out 0.9s both' }}
                />
              </span>
            </h1>

            <p
              className="anim-rise mx-auto mt-6 max-w-xl text-base leading-relaxed text-mist-300/85 sm:text-lg lg:mx-0"
              style={paso(2)}
            >
              Creamos sitios web modernos, soluciones digitales y automatizaciones que aumentan tu
              presencia, optimizan procesos y generan resultados reales.
            </p>

            <div
              className="anim-rise mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start"
              style={paso(3)}
            >
              <Button
                href="#contacto"
                variant="primary"
                size="lg"
                onClick={() => registrarEvento(EVENTOS.cotizacionClick, { origen: 'hero' })}
              >
                Solicitar cotización
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button href="#servicios" variant="ghost" size="lg">
                Ver servicios
                <ChevronDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </Button>
            </div>

            <dl
              className="anim-rise mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/[0.07] pt-8 sm:grid-cols-4"
              style={paso(4)}
            >
              {heroStats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <dt className="font-display text-2xl font-bold text-gradient sm:text-[1.65rem]">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-[11px] leading-tight text-mist-500 sm:text-xs">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative min-w-0">
            <HeroVisual />
          </div>
        </div>
      </div>

      <a
        href="#servicios"
        aria-label="Ver los servicios"
        className="anim-fade absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-mist-500 transition-colors hover:text-neon-cyan lg:flex"
        style={{ animationDelay: '1.6s' }}
      >
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Servicios</span>
        <span className="grid h-9 w-5.5 place-items-start rounded-full border border-white/15 p-1">
          <span
            className="size-1.5 rounded-full bg-neon-cyan"
            style={{ animation: 'scroll-hint 1.8s ease-in-out infinite' }}
          />
        </span>
      </a>
    </section>
  )
}
