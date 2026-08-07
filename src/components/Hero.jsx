import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react'
import { heroStats } from '../data/site'
import Button from './ui/Button'
import NeuralCanvas from './ui/NeuralCanvas'
import HeroVisual from './HeroVisual'

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 },
}

export default function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 lg:pt-32">
      {/* Red neuronal de fondo */}
      <div className="mask-fade-y pointer-events-none absolute inset-0 -z-10 opacity-70">
        <NeuralCanvas />
      </div>

      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          {/* Columna de texto */}
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.1 }}
            className="min-w-0 text-center lg:text-left"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-mist-300">
                <Sparkles className="size-3.5 text-neon-green" />
                Agencia digital · Web, IA y automatización
                <span className="ml-1 hidden size-1.5 rounded-full bg-neon-green shadow-[0_0_10px_2px_var(--color-neon-green)] sm:block" />
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mt-6 text-4xl leading-[1.08] font-extrabold sm:text-5xl lg:text-[3.6rem]"
            >
              Diseñamos páginas web{' '}
              <span className="text-gradient">inteligentes</span> y automatizamos tu negocio con{' '}
              <span className="relative inline-block text-gradient">
                IA
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.7, ease: 'easeOut' }}
                  className="absolute -bottom-1 left-0 h-0.5 w-full origin-left rounded-full bg-gradient-to-r from-neon-cyan to-neon-green shadow-[0_0_12px_1px_var(--color-neon-cyan)]"
                />
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-mist-300/85 sm:text-lg lg:mx-0"
            >
              Creamos sitios web modernos, soluciones digitales y automatizaciones que aumentan tu
              presencia, optimizan procesos y generan resultados reales.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start"
            >
              <Button href="#contacto" variant="primary" size="lg">
                Solicitar cotización
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button href="#servicios" variant="ghost" size="lg">
                Ver servicios
                <ChevronDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </Button>
            </motion.div>

            {/* Métricas de confianza */}
            <motion.dl
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/[0.07] pt-8 sm:grid-cols-4"
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
            </motion.dl>
          </motion.div>

          {/* Columna visual */}
          <div className="relative min-w-0">
            <HeroVisual />
          </div>
        </div>
      </div>

      {/* Pista de navegación: en la SPA no hay scroll hacia la siguiente sección,
          se cambia de vista desde el menú. */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-mist-500 uppercase lg:flex"
      >
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-neon-cyan/60" />
        Explora cada sección desde el menú
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-neon-cyan/60" />
      </motion.p>
    </section>
  )
}
