/**
 * Capa de fondo global: retícula tecnológica y halos de luz difusa.
 *
 * Es totalmente estática. Antes los halos animaban `opacity` y `scale` sobre
 * elementos de 600 px con `blur(140px)`, lo que obligaba al navegador a
 * rasterizar de nuevo cuatro desenfoques enormes en cada fotograma, de forma
 * permanente. Ahora se pinta una sola vez y el resultado visual es el mismo.
 */
export default function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      {/* Retícula */}
      <div className="tech-grid absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,#000_10%,transparent_75%)]" />

      {/* Halos, resueltos como un único degradado: un solo elemento que pintar
          en lugar de cuatro capas desenfocadas superpuestas. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            'radial-gradient(38rem 32rem at 8% -6%, rgba(59, 130, 246, 0.22), transparent 65%)',
            'radial-gradient(34rem 30rem at 104% 22%, rgba(34, 211, 238, 0.16), transparent 62%)',
            'radial-gradient(30rem 28rem at 18% 88%, rgba(63, 242, 148, 0.13), transparent 62%)',
            'radial-gradient(28rem 26rem at 62% 52%, rgba(139, 92, 246, 0.12), transparent 60%)',
          ].join(','),
        }}
      />

      {/* Viñeta */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(4,6,12,0.85)_100%)]" />
    </div>
  )
}
