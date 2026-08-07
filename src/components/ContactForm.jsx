import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Loader2, Mail, Send } from 'lucide-react'
import { brand, budgetOptions, serviceOptions } from '../data/site'
import Button from './ui/Button'

/**
 * Webhook que recibe las solicitudes.
 * Se configura en el archivo `.env` con la URL de producción del flujo de n8n
 * (ver `automations/captacion-leads/`). Si no está definido, el formulario
 * recurre a WhatsApp con el mensaje ya redactado, pero entonces no queda
 * registro de la solicitud en ningún sitio.
 */
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT ?? ''

const labelOf = (options, value) =>
  options.find((option) => option.value === value)?.label ?? value

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: serviceOptions[0].value,
  budget: 'unknown',
  message: '',
  consent: false,
  // Campo trampa: está oculto, así que solo lo rellenan los bots.
  website: '',
}

const fieldClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-mist-100 placeholder:text-mist-500/70 transition-colors duration-300 focus:border-neon-cyan/50 focus:bg-white/[0.06] focus:outline-none'

const labelClass = 'mb-1.5 block text-xs font-medium tracking-wide text-mist-300'

function buildMessage(data) {
  return [
    'Hola, quiero solicitar una cotización.',
    '',
    `Nombre: ${data.name}`,
    `Email: ${data.email}`,
    data.phone && `Teléfono: ${data.phone}`,
    data.company && `Empresa: ${data.company}`,
    `Servicio: ${labelOf(serviceOptions, data.service)}`,
    `Presupuesto: ${labelOf(budgetOptions, data.budget)}`,
    '',
    `Proyecto: ${data.message}`,
  ]
    .filter(Boolean)
    .join('\n')
}

export default function ContactForm() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  // Un bot rellena y envía en menos de un segundo; una persona no.
  const openedAt = useRef(Date.now())

  const update = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setForm((previous) => ({ ...previous, [field]: value }))
    if (errors[field]) setErrors((previous) => ({ ...previous, [field]: null }))
  }

  const validate = () => {
    const found = {}
    if (form.name.trim().length < 2) found.name = 'Escribe tu nombre'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) found.email = 'Escribe un email válido'
    if (form.message.trim().length < 12)
      found.message = 'Cuéntanos un poco más (mínimo 12 caracteres)'
    if (!form.consent) found.consent = 'Necesitamos tu permiso para contactarte'
    setErrors(found)
    return Object.keys(found).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return

    setStatus('sending')

    try {
      if (FORM_ENDPOINT) {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...form,
            // Etiquetas legibles, para no tener que traducir códigos en n8n.
            serviceLabel: labelOf(serviceOptions, form.service),
            budgetLabel: labelOf(budgetOptions, form.budget),
            source: 'web',
            page: window.location.href,
            elapsedMs: Date.now() - openedAt.current,
          }),
        })
        if (!response.ok) throw new Error('Respuesta no válida del servidor')
      } else {
        // Sin backend configurado: se abre WhatsApp con la solicitud redactada.
        const url = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(buildMessage(form))}`
        window.open(url, '_blank', 'noopener,noreferrer')
      }
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const mailtoHref = `mailto:${brand.email}?subject=${encodeURIComponent(
    'Solicitud de cotización'
  )}&body=${encodeURIComponent(buildMessage(form))}`

  return (
    <div className="glass relative overflow-hidden rounded-2xl p-6 sm:p-8">
      <span
        aria-hidden
        className="animate-pulse-glow absolute -top-24 -right-24 size-56 rounded-full bg-neon-cyan/15 blur-3xl"
      />

      <AnimatePresence mode="wait">
        {status === 'sent' ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex min-h-[26rem] flex-col items-center justify-center text-center"
          >
            <span className="grid size-16 place-items-center rounded-2xl bg-neon-green/15 text-neon-green ring-1 ring-neon-green/30">
              <CheckCircle2 className="size-8" strokeWidth={1.8} />
            </span>
            <h3 className="mt-6 font-display text-2xl font-bold">Solicitud lista, {form.name.split(' ')[0]}</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist-300/80">
              {FORM_ENDPOINT
                ? 'Hemos recibido tu mensaje. Te respondemos en menos de 24 horas laborables.'
                : 'Se abrió WhatsApp con tu solicitud ya redactada. Solo tienes que pulsar enviar. ¿Prefieres correo? Usa el botón de abajo.'}
            </p>
            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
              <Button href={mailtoHref} variant="outline" size="md">
                <Mail className="size-4" />
                Enviarlo por correo
              </Button>
              <Button
                as="button"
                type="button"
                variant="ghost"
                size="md"
                onClick={() => {
                  setForm(emptyForm)
                  setStatus('idle')
                }}
              >
                Enviar otra solicitud
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex flex-col gap-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="name">
                  Nombre <span className="text-neon-cyan">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Tu nombre"
                  aria-invalid={Boolean(errors.name)}
                  className={`${fieldClass} ${errors.name ? 'border-red-400/60' : ''}`}
                />
                {errors.name && <FieldError text={errors.name} />}
              </div>

              <div>
                <label className={labelClass} htmlFor="email">
                  Email <span className="text-neon-cyan">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder="tu@empresa.com"
                  aria-invalid={Boolean(errors.email)}
                  className={`${fieldClass} ${errors.email ? 'border-red-400/60' : ''}`}
                />
                {errors.email && <FieldError text={errors.email} />}
              </div>

              <div>
                <label className={labelClass} htmlFor="phone">
                  Teléfono / WhatsApp
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={update('phone')}
                  placeholder="+34 600 000 000"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="company">
                  Empresa
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={form.company}
                  onChange={update('company')}
                  placeholder="Nombre de tu negocio"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="service">
                  ¿Qué necesitas?
                </label>
                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={update('service')}
                  className={`${fieldClass} appearance-none`}
                >
                  {serviceOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-ink-800">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="budget">
                  Presupuesto estimado
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={form.budget}
                  onChange={update('budget')}
                  className={`${fieldClass} appearance-none`}
                >
                  {budgetOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-ink-800">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="message">
                Cuéntanos tu proyecto <span className="text-neon-cyan">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={update('message')}
                placeholder="¿Qué haces, a quién vendes y qué te gustaría conseguir con este proyecto?"
                aria-invalid={Boolean(errors.message)}
                className={`${fieldClass} resize-none ${errors.message ? 'border-red-400/60' : ''}`}
              />
              {errors.message && <FieldError text={errors.message} />}
            </div>

            {/* Campo trampa. Invisible y fuera del recorrido de teclado y lectores
                de pantalla: si llega relleno, el envío es de un bot. */}
            <div aria-hidden className="pointer-events-none absolute -left-[9999px] opacity-0">
              <label htmlFor="website">No rellenar</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={update('website')}
              />
            </div>

            <div>
              <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-mist-500">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={update('consent')}
                  className="mt-0.5 size-4 shrink-0 accent-[#22d3ee]"
                />
                <span>
                  Acepto que {brand.name} {brand.suffix} use estos datos únicamente para responder a
                  mi solicitud.
                </span>
              </label>
              {errors.consent && <FieldError text={errors.consent} />}
            </div>

            {status === 'error' && (
              <p className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-xs text-red-300 ring-1 ring-red-400/25">
                <AlertCircle className="size-4 shrink-0" />
                No pudimos enviar la solicitud. Escríbenos directamente a {brand.email}.
              </p>
            )}

            <Button
              as="button"
              type="submit"
              variant="primary"
              size="lg"
              disabled={status === 'sending'}
              className="mt-1 w-full"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Enviando…
                </>
              ) : (
                <>
                  Solicitar cotización
                  <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </>
              )}
            </Button>

            <p className="text-center text-[11px] text-mist-500">
              Respuesta en menos de 24 h laborables · Sin compromiso
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

function FieldError({ text }) {
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-red-300">
      <AlertCircle className="size-3.5 shrink-0" />
      {text}
    </p>
  )
}
