import { useCallback, useEffect, useState } from 'react'

/**
 * Enrutado por hash, sin dependencias externas.
 *
 * Se eligió `#hash` en lugar de rutas reales porque el sitio se publica como
 * estático: así funcionan los enlaces profundos, el botón atrás del navegador y
 * el refresco de página sin necesidad de configurar redirecciones en el hosting.
 *
 * Si el hash no corresponde a ninguna vista (por ejemplo `#contenido`, que usa
 * el enlace de salto de accesibilidad) la vista actual se mantiene y el
 * navegador simplemente hace su desplazamiento nativo.
 */
export default function useHashRoute(routes, fallback = routes[0]) {
  const read = useCallback(
    (current) => {
      const id = decodeURIComponent(window.location.hash.replace('#', ''))
      if (!id) return fallback
      return routes.includes(id) ? id : current
    },
    [routes, fallback]
  )

  const [route, setRoute] = useState(() => read(fallback))

  useEffect(() => {
    const onHashChange = () => setRoute((current) => read(current))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [read])

  return route
}
