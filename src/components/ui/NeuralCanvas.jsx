import { useEffect, useRef } from 'react'

/**
 * Red neuronal animada sobre <canvas>: nodos que flotan y se enlazan entre sí.
 *
 * Optimizaciones aplicadas:
 *  - densidad de nodos calculada por área y limitada a 70
 *  - la animación se detiene cuando el canvas sale del viewport
 *  - se desactiva por completo con `prefers-reduced-motion`
 */
export default function NeuralCanvas({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d')
    let nodes = []
    let frame = null
    let visible = true
    let width = 0
    let height = 0

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const LINK_DISTANCE = 130

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(70, Math.max(24, Math.round((width * height) / 16000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        r: Math.random() * 1.6 + 0.9,
        hue: Math.random() > 0.65 ? '63, 242, 148' : '34, 211, 238',
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Enlaces
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.hypot(dx, dy)
          if (dist >= LINK_DISTANCE) continue

          ctx.beginPath()
          ctx.strokeStyle = `rgba(90, 170, 240, ${(1 - dist / LINK_DISTANCE) * 0.32})`
          ctx.lineWidth = 0.7
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.stroke()
        }
      }

      // Nodos
      for (const node of nodes) {
        ctx.beginPath()
        ctx.fillStyle = `rgba(${node.hue}, 0.85)`
        ctx.shadowBlur = 9
        ctx.shadowColor = `rgba(${node.hue}, 0.9)`
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    const tick = () => {
      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1
      }
      draw()
      frame = requestAnimationFrame(tick)
    }

    build()

    if (reduce) {
      draw()
      return () => {}
    }

    tick()

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          visible = true
          frame = requestAnimationFrame(tick)
        } else if (!entry.isIntersecting && visible) {
          visible = false
          if (frame) cancelAnimationFrame(frame)
        }
      },
      { threshold: 0 }
    )
    observer.observe(canvas)

    let resizeTimer = null
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(build, 180)
    }
    window.addEventListener('resize', onResize)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      clearTimeout(resizeTimer)
      observer.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className={`size-full ${className}`} />
}
