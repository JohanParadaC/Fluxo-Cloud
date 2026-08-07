import { ArrowUp, Zap } from 'lucide-react'
import { brand, navLinks, services } from '../data/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/[0.07] pt-16 pb-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/45 to-transparent"
      />

      <div className="shell">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          {/* Marca */}
          <div>
            <a href="#inicio" className="group inline-flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-neon-cyan via-neon-blue to-neon-green">
                <Zap className="size-4.5 text-ink-950" strokeWidth={2.6} />
              </span>
              <span className="font-display text-lg font-bold text-mist-100">
                {brand.name}
                <span className="text-gradient"> {brand.suffix}</span>
              </span>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist-300/75">
              Agencia digital especializada en diseño web, soluciones a medida y automatización de
              procesos con inteligencia artificial. Construimos activos digitales que trabajan para
              tu negocio todos los días.
            </p>

            <p className="mt-5 font-mono text-[11px] tracking-[0.18em] text-neon-cyan uppercase">
              {brand.tagline}
            </p>
          </div>

          {/* Navegación */}
          <nav aria-label="Enlaces rápidos">
            <h3 className="font-display text-sm font-semibold text-mist-100">Navegación</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-mist-300/75 transition-colors hover:text-neon-cyan"
                  >
                    <span className="h-px w-0 bg-neon-cyan transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Servicios */}
          <nav aria-label="Servicios">
            <h3 className="font-display text-sm font-semibold text-mist-100">Servicios</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href="#servicios"
                    className="group inline-flex items-center gap-1.5 text-sm text-mist-300/75 transition-colors hover:text-neon-cyan"
                  >
                    <span className="h-px w-0 bg-neon-cyan transition-all duration-300 group-hover:w-3" />
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto y redes */}
          <div>
            <h3 className="font-display text-sm font-semibold text-mist-100">Hablemos</h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${brand.email}`}
                  className="text-mist-300/75 transition-colors hover:text-neon-cyan"
                >
                  {brand.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${brand.phone.replace(/\s/g, '')}`}
                  className="text-mist-300/75 transition-colors hover:text-neon-cyan"
                >
                  {brand.phone}
                </a>
              </li>
            </ul>

            <ul className="mt-6 flex flex-wrap gap-2">
              {brand.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass glow-border inline-flex rounded-lg px-3 py-1.5 text-xs font-medium text-mist-300 transition-colors hover:text-neon-cyan"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-7 sm:flex-row">
          <p className="text-center text-xs text-mist-500 sm:text-left">
            © {year} {brand.name} {brand.suffix}. Todos los derechos reservados. · Diseñado y
            construido para convertir.
          </p>

          <a
            href="#inicio"
            className="glass glow-border group inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-mist-300 transition-colors hover:text-neon-cyan"
          >
            Volver arriba
            <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
