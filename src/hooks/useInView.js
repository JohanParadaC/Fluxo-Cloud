import { useEffect, useRef, useState } from 'react'

/**
 * Detecta cuándo un elemento entra en pantalla.
 *
 * Sustituye al `whileInView` de Framer Motion. La animación en sí la hace CSS
 * (ver `[data-reveal]` en index.css); aquí solo se decide cuándo activarla.
 *
 * Por defecto se dispara una vez y deja de observar: reaparecer al volver a
 * subir distrae y obliga a mantener vivo el observador.
 */
export default function useInView({ threshold = 0.2, once = true, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Sin IntersectionObserver (navegadores muy antiguos) se muestra sin más:
    // más vale contenido visible que una animación que no llega nunca.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once, rootMargin])

  return [ref, inView]
}
