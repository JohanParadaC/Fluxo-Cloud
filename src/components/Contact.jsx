import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { brand } from '../data/site'
import Button from './ui/Button'
import Reveal from './ui/Reveal'
import ContactForm from './ContactForm'

const guarantees = [
  'Respuesta en menos de 24 h laborables',
  'Propuesta con precio cerrado, sin sorpresas',
  'Primera llamada de diagnóstico sin coste',
]

export default function Contact() {
  const whatsappHref = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
    'Hola, me gustaría recibir información sobre sus servicios.'
  )}`

  return (
    <section id="contacto" className="relative py-24 lg:py-32">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* Columna de mensaje */}
          <div>
            <Reveal from="down">
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] tracking-[0.22em] text-neon-cyan uppercase">
                <span className="size-1.5 rounded-full bg-neon-green shadow-[0_0_10px_2px_var(--color-neon-green)]" />
                Contacto
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-6 text-3xl leading-[1.1] font-bold sm:text-4xl lg:text-[2.8rem]">
                Lleva tu negocio al <span className="text-gradient">siguiente nivel</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-mist-300/85">
                Hablemos y construyamos tu presencia digital. Cuéntanos dónde estás hoy y te
                decimos con claridad qué haríamos, cuánto cuesta y cuánto tarda.
              </p>
            </Reveal>

            {/* Garantías */}
            <Reveal delay={0.18}>
              <ul className="mt-8 flex flex-col gap-3">
                {guarantees.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-mist-300">
                    <span className="grid size-6 shrink-0 place-items-center rounded-md bg-neon-green/12 text-neon-green">
                      <Clock className="size-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Canales directos */}
            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-col gap-3">
                <Button
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <MessageCircle className="size-4.5" />
                  Escribir por WhatsApp
                </Button>

                <div className="mt-2 grid gap-3 sm:grid-cols-2">
                  <a
                    href={`mailto:${brand.email}`}
                    className="glass glow-border group flex items-center gap-3 rounded-xl px-4 py-3.5 transition-transform duration-400 hover:-translate-y-0.5"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-neon-cyan/12 text-neon-cyan">
                      <Mail className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] text-mist-500">Correo</span>
                      <span className="block truncate text-sm font-medium text-mist-100 transition-colors group-hover:text-neon-cyan">
                        {brand.email}
                      </span>
                    </span>
                  </a>

                  <a
                    href={`tel:${brand.phone.replace(/\s/g, '')}`}
                    className="glass glow-border group flex items-center gap-3 rounded-xl px-4 py-3.5 transition-transform duration-400 hover:-translate-y-0.5"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-neon-blue/12 text-neon-blue">
                      <Phone className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] text-mist-500">Teléfono</span>
                      <span className="block truncate text-sm font-medium text-mist-100 transition-colors group-hover:text-neon-cyan">
                        {brand.phone}
                      </span>
                    </span>
                  </a>
                </div>

                <p className="mt-2 flex items-start gap-2 text-xs text-mist-500">
                  <MapPin className="mt-0.5 size-3.5 shrink-0 text-neon-green" />
                  {brand.location}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Formulario */}
          <Reveal from="left" delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
