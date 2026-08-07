import { useRef } from 'react'

/**
 * Tarjeta de cristal con foco de luz que sigue al cursor.
 * La posición se escribe en variables CSS para no re-renderizar React en cada movimiento.
 */
export default function SpotlightCard({
  children,
  className = '',
  glow = 'rgba(34,211,238,0.18)',
  as = 'div',
  ...rest
}) {
  const ref = useRef(null)
  const Tag = as

  const handleMove = (event) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    el.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      style={{ '--glow': glow }}
      className={`glass glow-border group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1.5 ${className}`}
      {...rest}
    >
      {/* Foco que sigue al cursor */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), var(--glow), transparent 70%)',
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </Tag>
  )
}
