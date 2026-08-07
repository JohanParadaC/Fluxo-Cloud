import { motion, useReducedMotion } from 'framer-motion'

const offsets = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
}

/**
 * Envoltorio de entrada al hacer scroll.
 * Respeta `prefers-reduced-motion`: si está activo, el contenido aparece sin desplazamiento.
 */
export default function Reveal({
  children,
  delay = 0,
  from = 'up',
  duration = 0.65,
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
      initial={reduce ? { opacity: 0 } : { opacity: 0, ...offset, filter: 'blur(6px)' }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration, delay, ease: [0.21, 0.68, 0.35, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
