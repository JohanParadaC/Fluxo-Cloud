import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, FlaskConical } from 'lucide-react'
import { demoCategories, demos } from '../data/site'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import ProjectMockup from './ProjectMockup'

export default function Demos() {
  const [filter, setFilter] = useState('Todas')

  const visible = filter === 'Todas' ? demos : demos.filter((demo) => demo.category === filter)

  return (
    <section id="demos" className="relative py-20 lg:py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Demos"
          title="Todavía no tenemos casos de cliente."
          highlight="Tenemos esto."
          description="Somos un estudio nuevo, así que en lugar de enseñarte proyectos ajenos te enseñamos exactamente lo que construimos y con qué. Cuando entreguemos los primeros proyectos, aquí estarán con sus números reales."
        />

        {/* Filtros */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {demoCategories.map((category) => {
              const isActive = filter === category
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive ? 'text-ink-950' : 'text-mist-300/75 hover:text-mist-100'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="demo-filter"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-neon-cyan to-neon-green"
                      transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                    />
                  )}
                  {!isActive && (
                    <span className="absolute inset-0 -z-10 rounded-full ring-1 ring-white/[0.09]" />
                  )}
                  {category}
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Rejilla */}
        <motion.div layout className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((demo) => (
              <motion.article
                key={demo.title}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.38, ease: [0.21, 0.68, 0.35, 1] }}
                className="glass glow-border group relative flex flex-col overflow-hidden rounded-2xl p-4 transition-transform duration-500 hover:-translate-y-1.5"
              >
                <div className="relative">
                  <ProjectMockup variant={demo.visual} />
                  {/* Etiqueta explícita: nadie debe confundir esto con un caso real. */}
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-ink-950/80 px-2 py-1 font-mono text-[10px] tracking-wide text-neon-cyan ring-1 ring-neon-cyan/25">
                    <FlaskConical className="size-3" />
                    DEMO
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-2 pt-5">
                  <span className="font-mono text-[10px] tracking-[0.16em] text-neon-cyan uppercase">
                    {demo.category}
                  </span>
                  <h3 className="mt-1.5 font-display text-lg font-bold text-mist-100">
                    {demo.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-mist-300/75">{demo.text}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {demo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] text-mist-500 ring-1 ring-white/[0.06]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="mt-5 flex items-start gap-2 border-t border-white/[0.07] pt-4 text-sm text-mist-300">
                    <Check className="mt-0.5 size-4 shrink-0 text-neon-green" strokeWidth={2.4} />
                    {demo.includes}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal delay={0.1}>
          <p className="mt-10 text-center text-sm text-mist-500">
            ¿Quieres ver alguna funcionando en directo?{' '}
            <a
              href="#contacto"
              className="font-semibold text-neon-cyan underline-offset-4 transition-colors hover:text-neon-green hover:underline"
            >
              Te la enseñamos en una videollamada
            </a>
            <ArrowUpRight className="ml-1 inline size-3.5 text-neon-cyan" />
          </p>
        </Reveal>
      </div>
    </section>
  )
}
