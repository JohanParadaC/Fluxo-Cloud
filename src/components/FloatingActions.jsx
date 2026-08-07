import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, MessageCircle } from 'lucide-react'
import { brand } from '../data/site'

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const whatsappHref = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
    'Hola, vengo desde la web y quiero información sobre sus servicios.'
  )}`

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Volver arriba"
            className="glass grid size-11 place-items-center rounded-full text-mist-300 transition-colors hover:text-neon-cyan"
          >
            <ArrowUp className="size-4.5" />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp"
        className="group relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_36px_-8px_rgba(37,211,102,0.75)] transition-transform duration-300 hover:scale-105"
      >
        <span
          aria-hidden
          className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.6s]"
        />
        <MessageCircle className="relative size-6" strokeWidth={2} />

        {/* Etiqueta en escritorio */}
        <span className="pointer-events-none absolute right-full mr-3 hidden translate-x-2 rounded-lg bg-ink-800 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-mist-100 opacity-0 ring-1 ring-white/10 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 lg:block">
          ¿Hablamos de tu proyecto?
        </span>
      </a>
    </div>
  )
}
