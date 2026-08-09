import { useState } from 'react'
import { CalendarCheck, MessageCircleQuestion, Plus } from 'lucide-react'
import { brand, faqs } from '../data/site'
import { useBooking } from './BookingModal'
import { registrarEvento, EVENTOS } from '../lib/analytics'
import Button from './ui/Button'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function Faq() {
  const [open, setOpen] = useState(0)
  const { abrirAgenda } = useBooking()

  return (
    <section id="faq" className="relative py-20 lg:py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Resolvemos las dudas"
          highlight="antes de que las tengas"
          description="Y si queda alguna en el aire, escríbenos: respondemos rápido y sin tecnicismos innecesarios."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          {/* Acordeón */}
          <div className="flex flex-col gap-3">
            {faqs.map((item, index) => {
              const isOpen = open === index
              const panelId = `faq-panel-${index}`
              const buttonId = `faq-button-${index}`

              return (
                <Reveal key={item.q} delay={index * 0.05}>
                  <div
                    className={`glass overflow-hidden rounded-2xl transition-colors duration-400 ${
                      isOpen ? 'ring-1 ring-neon-cyan/25' : ''
                    }`}
                  >
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpen(isOpen ? -1 : index)}
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                      >
                        <span
                          className={`font-display text-[15px] font-semibold transition-colors duration-300 sm:text-base ${
                            isOpen ? 'text-neon-cyan' : 'text-mist-100'
                          }`}
                        >
                          {item.q}
                        </span>
                        <span
                          className={`grid size-8 shrink-0 place-items-center rounded-lg ring-1 transition-all duration-300 ${
                            isOpen
                              ? 'rotate-[135deg] bg-neon-cyan/15 text-neon-cyan ring-neon-cyan/30'
                              : 'text-mist-500 ring-white/10'
                          }`}
                        >
                          <Plus className="size-4" />
                        </span>
                      </button>
                    </h3>

                    {/* Acordeón sin JavaScript de animación: se transiciona
                        `grid-template-rows` de 0fr a 1fr, que es la única forma
                        de animar hasta "alto automático" con CSS puro. */}
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 text-sm leading-relaxed text-mist-300/80">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          {/* Tarjeta de apoyo */}
          <Reveal from="left" delay={0.1}>
            <div className="glass sticky top-28 overflow-hidden rounded-2xl p-7">
              <span
                aria-hidden
                className="animate-pulse-glow absolute -top-20 -right-20 size-44 rounded-full bg-neon-cyan/20 blur-3xl"
              />
              <span className="relative grid size-12 place-items-center rounded-xl bg-gradient-to-br from-neon-cyan to-neon-green text-ink-950">
                <MessageCircleQuestion className="size-6" strokeWidth={1.9} />
              </span>
              <h3 className="relative mt-5 font-display text-xl font-bold">
                ¿Tienes una duda distinta?
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-mist-300/80">
                Cuéntanos qué necesitas y te respondemos con una recomendación concreta, aunque al
                final decidas no trabajar con nosotros.
              </p>
              <div className="relative mt-6 flex flex-col gap-2.5">
                {abrirAgenda && (
                  <Button
                    as="button"
                    type="button"
                    onClick={() => abrirAgenda('faq')}
                    variant="primary"
                    size="md"
                  >
                    <CalendarCheck className="size-4" />
                    Agendar una llamada
                  </Button>
                )}
                <Button
                  href="#contacto"
                  variant={abrirAgenda ? 'ghost' : 'primary'}
                  size="md"
                  onClick={() => registrarEvento(EVENTOS.cotizacionClick, { origen: 'faq' })}
                >
                  Escribir a un especialista
                </Button>
                <Button
                  href={`https://wa.me/${brand.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="md"
                  onClick={() => registrarEvento(EVENTOS.whatsapp, { origen: 'faq' })}
                >
                  Preguntar por WhatsApp
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
