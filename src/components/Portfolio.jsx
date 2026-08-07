import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, TrendingUp } from 'lucide-react'
import { projectCategories, projects } from '../data/site'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import ProjectMockup from './ProjectMockup'

export default function Portfolio() {
  const [filter, setFilter] = useState('Todos')

  const visible =
    filter === 'Todos' ? projects : projects.filter((project) => project.category === filter)

  return (
    <section id="portafolio" className="relative py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Portafolio"
          title="Proyectos que ya están"
          highlight="generando resultados"
          description="Una muestra del tipo de trabajo que entregamos: webs, tiendas, paneles y automatizaciones en producción."
        />

        {/* Filtros */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {projectCategories.map((category) => {
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
                      layoutId="portfolio-filter"
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
            {visible.map((project) => (
              <motion.article
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.38, ease: [0.21, 0.68, 0.35, 1] }}
                className="glass glow-border group relative flex flex-col overflow-hidden rounded-2xl p-4 transition-transform duration-500 hover:-translate-y-1.5"
              >
                <ProjectMockup variant={project.visual} />

                <div className="flex flex-1 flex-col p-2 pt-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="font-mono text-[10px] tracking-[0.16em] text-neon-cyan uppercase">
                        {project.category}
                      </span>
                      <h3 className="mt-1.5 font-display text-lg font-bold text-mist-100">
                        {project.title}
                      </h3>
                    </div>
                    <ArrowUpRight className="mt-1 size-4.5 shrink-0 text-mist-500 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neon-green" />
                  </div>

                  <p className="mt-2.5 text-sm leading-relaxed text-mist-300/75">{project.text}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] text-mist-500 ring-1 ring-white/[0.06]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="mt-5 flex items-center gap-2 border-t border-white/[0.07] pt-4 text-sm font-semibold text-neon-green">
                    <TrendingUp className="size-4 shrink-0" />
                    {project.result}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal delay={0.1}>
          <p className="mt-10 text-center text-sm text-mist-500">
            ¿Quieres ver casos parecidos al tuyo?{' '}
            <a
              href="#contacto"
              className="font-semibold text-neon-cyan underline-offset-4 transition-colors hover:text-neon-green hover:underline"
            >
              Pídenos ejemplos de tu sector
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
