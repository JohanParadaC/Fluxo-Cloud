import { Linkedin } from 'lucide-react'
import { team, teamPitch } from '../data/site'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function Team() {
  return (
    <section id="equipo" className="relative py-20 lg:py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Equipo"
          title="Tres ingenieros de sistemas,"
          highlight="sin intermediarios"
          description="No somos una agencia con veinte personas y un gestor de cuentas. Somos los tres que van a diseñar, programar y mantener tu proyecto."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {team.map((member, index) => (
            <Reveal key={`${member.role}-${index}`} delay={index * 0.08} className="h-full">
              <article className="glass glow-border group h-full rounded-2xl p-7 transition-transform duration-500 hover:-translate-y-1.5">
                <div className="flex items-center gap-4">
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-neon-cyan/25 to-neon-blue/20 font-display text-lg font-bold text-mist-100 ring-1 ring-white/10">
                    {member.initials}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-bold text-mist-100">{member.name}</h3>
                    <p className="mt-0.5 text-xs text-neon-cyan">{member.role}</p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-mist-300/75">{member.focus}</p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] text-mist-500 ring-1 ring-white/[0.06]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 border-t border-white/[0.07] pt-5 text-sm text-mist-300/75 transition-colors hover:text-neon-cyan"
                  >
                    <Linkedin className="size-4" />
                    Ver perfil
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        {/* Por qué contratar a un equipo que empieza */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {teamPitch.map((item, index) => (
            <Reveal key={item.title} delay={0.1 + index * 0.07} className="h-full">
              <div className="glass h-full rounded-2xl p-6">
                <h3 className="font-display text-sm font-semibold text-neon-green">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist-300/75">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
