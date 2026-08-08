import { useCallback, useEffect, useState } from 'react'
import { actualizarEstado, ErrorApi, obtenerLeads } from '../lib/api'

/**
 * Carga los leads y gestiona el cambio de estado.
 *
 * El cambio es optimista: la fila se actualiza en pantalla al instante y, si
 * n8n falla, se revierte. Con una hoja de cálculo detrás la escritura tarda
 * un par de segundos, y esperar sin feedback se siente roto.
 */
export default function useLeads(clave) {
  const [leads, setLeads] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [guardando, setGuardando] = useState(null) // id del lead en curso
  const [ultimaCarga, setUltimaCarga] = useState(null)

  const cargar = useCallback(
    async (silencioso = false) => {
      if (!silencioso) setCargando(true)
      setError(null)
      try {
        const datos = await obtenerLeads(clave)
        setLeads(datos)
        setUltimaCarga(new Date())
      } catch (fallo) {
        setError(fallo instanceof ErrorApi ? fallo : new ErrorApi(fallo.message, 0))
      } finally {
        setCargando(false)
      }
    },
    [clave]
  )

  useEffect(() => {
    cargar()
  }, [cargar])

  const cambiarEstado = useCallback(
    async (id, estado) => {
      const anteriores = leads
      setGuardando(id)
      setLeads((actuales) =>
        actuales.map((lead) => (lead.id === id ? { ...lead, estado } : lead))
      )

      try {
        await actualizarEstado(clave, id, estado)
      } catch (fallo) {
        setLeads(anteriores) // revertir
        setError(fallo instanceof ErrorApi ? fallo : new ErrorApi(fallo.message, 0))
      } finally {
        setGuardando(null)
      }
    },
    [clave, leads]
  )

  return { leads, cargando, error, guardando, ultimaCarga, recargar: cargar, cambiarEstado }
}
