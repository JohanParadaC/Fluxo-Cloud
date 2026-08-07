import { ArrowUp, Clock, Mail, MapPin, MessageCircle, Phone, Zap } from 'lucide-react'
import { brand, legalLinks, services, workPrinciples } from '../data/site'
import { getIcon } from '../lib/icons'

/** Logo de X: lucide todavía expone el pájaro antiguo de Twitter. */
function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

/** Cada servicio del pie apunta a la vista donde se explica. */
const serviceRoutes = {
  web: '#inicio',
  soluciones: '#inicio',
  ia: '#automatizacion',
  optimizacion: '#automatizacion',
}

export default function Footer() {
  const year = new Date().getFullYear()
  const whatsappHref = `https://wa.me/${brand.whatsapp}`

  return (
    <footer className="relative border-t border-white/[0.07] pt-16 pb-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/45 to-transparent"
      />

      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1.7fr_1fr_1fr_1.2fr] lg:gap-10">
          {/* Marca */}
          <div>
            <a href="#inicio" className="inline-flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-neon-cyan via-neon-blue to-neon-green">
                <Zap className="size-4.5 text-ink-950" strokeWidth={2.6} />
              </span>
              <span className="font-display text-lg font-bold whitespace-nowrap text-mist-100">
                {brand.name}
                <span className="text-gradient"> {brand.suffix}</span>
              </span>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist-300/75">
              Diseñamos, desarrollamos y automatizamos activos digitales que trabajan para tu
              negocio todos los días. Estrategia, código y medición en un mismo equipo.
            </p>

            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-neon-green/10 px-3 py-1.5 text-xs font-medium text-neon-green ring-1 ring-neon-green/20">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-neon-green opacity-70 [animation-duration:2.4s]" />
                <span className="relative inline-flex size-1.5 rounded-full bg-neon-green" />
              </span>
              Disponibles para nuevos proyectos
            </p>

            <ul className="mt-7 flex gap-2">
              {brand.socials.map((social) => {
                const Icon = social.icon === 'X' ? XIcon : getIcon(social.icon)
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      title={social.label}
                      className="grid size-10 place-items-center rounded-xl text-mist-500 ring-1 ring-white/[0.08] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.05] hover:text-neon-cyan hover:ring-neon-cyan/30"
                    >
                      <Icon className="size-4.5" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Servicios */}
          <nav aria-label="Servicios">
            <h3 className="font-display text-sm font-semibold text-mist-100">Servicios</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href={serviceRoutes[service.id] ?? '#inicio'}
                    className="group inline-flex items-center gap-1.5 text-sm text-mist-300/75 transition-colors hover:text-neon-cyan"
                  >
                    <span className="h-px w-0 bg-neon-cyan transition-all duration-300 group-hover:w-3" />
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Cómo trabajamos */}
          <div>
            <h3 className="font-display text-sm font-semibold text-mist-100">Cómo trabajamos</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {workPrinciples.map((principle) => (
                <li key={principle} className="flex items-start gap-2 text-sm text-mist-300/75">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-neon-green" />
                  {principle}
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-display text-sm font-semibold text-mist-100">Contacto</h3>
            <ul className="mt-5 flex flex-col gap-4">
              <li>
                <a
                  href={`mailto:${brand.email}`}
                  className="group flex items-start gap-2.5 text-sm text-mist-300/75 transition-colors hover:text-neon-cyan"
                >
                  <Mail className="mt-0.5 size-4 shrink-0 text-neon-cyan/70" />
                  <span className="break-all">{brand.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${brand.phone.replace(/\s/g, '')}`}
                  className="group flex items-start gap-2.5 text-sm text-mist-300/75 transition-colors hover:text-neon-cyan"
                >
                  <Phone className="mt-0.5 size-4 shrink-0 text-neon-blue/70" />
                  {brand.phone}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-2.5 text-sm text-mist-300/75 transition-colors hover:text-[#25D366]"
                >
                  <MessageCircle className="mt-0.5 size-4 shrink-0 text-[#25D366]/80" />
                  Escribir por WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-mist-500">
                <Clock className="mt-0.5 size-4 shrink-0 text-mist-500" />
                {brand.schedule}
              </li>
              <li className="flex items-start gap-2.5 text-sm text-mist-500">
                <MapPin className="mt-0.5 size-4 shrink-0 text-neon-green/70" />
                {brand.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="mt-14 flex flex-col gap-5 border-t border-white/[0.07] pt-7 lg:flex-row lg:items-center lg:justify-between">
          <p className="order-2 text-xs text-mist-500 lg:order-1">
            © {year} {brand.name} {brand.suffix}. Todos los derechos reservados.
          </p>

          <ul className="order-1 flex flex-wrap items-center gap-x-5 gap-y-2 lg:order-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-xs text-mist-500 transition-colors hover:text-mist-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              {/* Botón, no enlace: "#inicio" cambiaría de vista en lugar de subir. */}
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-mist-300 ring-1 ring-white/[0.08] transition-colors hover:text-neon-cyan hover:ring-neon-cyan/30"
              >
                Volver arriba
                <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
