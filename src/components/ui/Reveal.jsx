import { motion, useReducedMotion } from 'framer-motion'

const offsets = {
  up: { y: 24, x: 0 },
  down: { y: -24, x: 0 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
}

/**
 * Envoltorio de entrada al hacer scroll.
 *
 * Anima solo `opacity` y `transform`. Antes incluía una transición de
 * `filter: blur()`, que el navegador tiene que repintar en cada fotograma:
 * multiplicado por las decenas de elementos que revela la página, era una de
 * las causas principales del consumo de CPU al desplazarse.
 *
 * Respeta `prefers-reduced-motion`: en ese caso el contenido solo aparece.
 */
export default function Reveal({
  children,
  delay = 0,
  from = 'up',
  duration = 0.55,
  className = '',
  as = 'div',
  ...rest
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] ?? motion.div
  const offset = offsets[from] ?? offsets.up

  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, ...offset }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.21, 0.68, 0.35, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
