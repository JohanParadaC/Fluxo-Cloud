import { useEffect, useRef } from 'react'

/**
 * Red neuronal animada sobre <canvas>: nodos que flotan y se enlazan entre sí.
 *
 * Optimizaciones que mantienen el coste de CPU bajo:
 *  - sin `shadowBlur`: dibujar un halo por nodo y fotograma era, con diferencia,
 *    la operación más cara del lienzo. El resplandor se simula con un segundo
 *    círculo semitransparente, que es prácticamente gratis.
 *  - 34 nodos como máximo: el cálculo de enlaces es cuadrático, así que reducir
 *    de 70 a 34 nodos baja las comparaciones de ~2.400 a ~560 por fotograma.
 *  - 30 fps en lugar de 60: a esta velocidad de movimiento no se nota, y
 *    reduce a la mitad el trabajo.
 *  - se detiene fuera del viewport y con la pestaña en segundo plano.
 *  - no se ejecuta con `prefers-reduced-motion`.
 */
export default function NeuralCanvas({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d', { alpha: true })
    let nodes = []
    let frame = null
    let running = false
    let onScreen = true
    let lastPaint = 0
    let width = 0
    let height = 0

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const LINK_DISTANCE = 140
    const FRAME_MS = 1000 / 30

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(34, Math.max(12, Math.round((width * height) / 34000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.26,
        vy: (Math.random() - 0.5) * 0.26,
        r: Math.random() * 1.4 + 1,
        green: Math.random() > 0.65,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Enlaces: un solo trazo para todos, cambiando solo la opacidad por tramo.
      ctx.lineWidth = 0.7
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const squared = dx * dx + dy * dy
          if (squared >= LINK_DISTANCE * LINK_DISTANCE) continue

          const strength = 1 - Math.sqrt(squared) / LINK_DISTANCE
          ctx.strokeStyle = `rgba(90, 170, 240, ${strength * 0.3})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      // Nodos: círculo sólido más un halo plano que sustituye a `shadowBlur`.
      for (const node of nodes) {
        const rgb = node.green ? '63, 242, 148' : '34, 211, 238'
        ctx.fillStyle = `rgba(${rgb}, 0.14)`
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.r * 2.6, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `rgba(${rgb}, 0.9)`
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const tick = (now) => {
      frame = requestAnimationFrame(tick)
      if (now - lastPaint < FRAME_MS) return
      lastPaint = now

      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1
      }
      draw()
    }

    const start = () => {
      if (running || reduce) return
      running = true
      lastPaint = 0
      frame = requestAnimationFrame(tick)
    }

    const stop = () => {
      running = false
      if (frame) cancelAnimationFrame(frame)
      frame = null
    }

    const sync = () => {
      if (onScreen && !document.hidden) start()
      else stop()
    }

    build()

    if (reduce) {
      draw()
      return () => {}
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        sync()
      },
      { threshold: 0 }
    )
    observer.observe(canvas)

    document.addEventListener('visibilitychange', sync)

    let resizeTimer = null
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        build()
        draw()
      }, 200)
    }
    window.addEventListener('resize', onResize)

    sync()

    return () => {
      stop()
      clearTimeout(resizeTimer)
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className={`size-full ${className}`} />
}
