/**
 * Capa de fondo global: retícula tecnológica + halos de luz difusa.
 * Puramente decorativa, sin coste de JS.
 */
export default function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-ink-950" />

      {/* Retícula */}
      <div className="tech-grid absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,#000_10%,transparent_75%)]" />

      {/* Halos */}
      <div className="animate-pulse-glow absolute -top-40 -left-32 size-[38rem] rounded-full bg-neon-blue/20 blur-[130px]" />
      <div
        className="animate-pulse-glow absolute top-[18%] -right-40 size-[34rem] rounded-full bg-neon-cyan/16 blur-[140px]"
        style={{ animationDelay: '1.4s' }}
      />
      <div
        className="animate-pulse-glow absolute bottom-[8%] left-[12%] size-[30rem] rounded-full bg-neon-green/12 blur-[150px]"
        style={{ animationDelay: '2.8s' }}
      />
      <div
        className="animate-pulse-glow absolute top-[52%] left-[45%] size-[26rem] rounded-full bg-neon-violet/12 blur-[150px]"
        style={{ animationDelay: '3.6s' }}
      />

      {/* Viñeta */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(4,6,12,0.85)_100%)]" />
    </div>
  )
}
