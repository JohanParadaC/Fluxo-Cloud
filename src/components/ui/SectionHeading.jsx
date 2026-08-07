import Reveal from './Reveal'

/**
 * Encabezado estándar de sección: etiqueta, título y bajada.
 */
export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
  className = '',
}) {
  const isCenter = align === 'center'

  return (
    <div
      className={`flex flex-col gap-5 ${isCenter ? 'items-center text-center' : 'items-start text-left'} ${className}`}
    >
      {eyebrow && (
        <Reveal from="down">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] tracking-[0.22em] text-neon-cyan uppercase">
            <span className="size-1.5 rounded-full bg-neon-green shadow-[0_0_10px_2px_var(--color-neon-green)]" />
            {eyebrow}
          </span>
        </Reveal>
      )}

      <Reveal delay={0.06}>
        <h2 className="max-w-3xl text-3xl leading-[1.12] font-bold sm:text-4xl lg:text-[2.9rem]">
          {title}{' '}
          {highlight && <span className="text-gradient">{highlight}</span>}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.12}>
          <p
            className={`max-w-2xl text-base leading-relaxed text-mist-300/80 sm:text-lg ${isCenter ? 'mx-auto' : ''}`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
