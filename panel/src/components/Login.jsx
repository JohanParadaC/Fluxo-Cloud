import { useState } from 'react'
import { KeyRound, Loader2, LogIn } from 'lucide-react'

/**
 * Puerta de entrada.
 *
 * Importante: esto NO es seguridad. La comprobación real la hace n8n al
 * rechazar cualquier petición sin la clave correcta; esta pantalla solo evita
 * mostrar la interfaz. Sirve para un equipo pequeño, no para dar acceso a
 * clientes: para eso hace falta autenticación por usuario.
 */
export default function Login({ onEntrar, error }) {
  const [clave, setClave] = useState('')
  const [enviando, setEnviando] = useState(false)

  const enviar = async (evento) => {
    evento.preventDefault()
    if (!clave.trim()) return
    setEnviando(true)
    await onEntrar(clave.trim())
    setEnviando(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(36rem 30rem at 20% 0%, rgba(59,130,246,0.18), transparent 65%),' +
            'radial-gradient(30rem 26rem at 90% 90%, rgba(63,242,148,0.12), transparent 62%)',
        }}
      />

      <form onSubmit={enviar} className="card w-full max-w-sm rounded-2xl p-8">
        <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-neon-cyan to-neon-green text-ink-950">
          <KeyRound className="size-6" strokeWidth={1.9} />
        </span>

        <h1 className="mt-6 font-display text-xl font-bold">Panel de leads</h1>
        <p className="mt-2 text-sm text-mist-500">
          Introduce la clave del equipo para ver las solicitudes.
        </p>

        <label htmlFor="clave" className="mt-7 mb-2 block text-xs font-medium text-mist-300">
          Clave de acceso
        </label>
        <input
          id="clave"
          type="password"
          autoComplete="current-password"
          value={clave}
          onChange={(evento) => setClave(evento.target.value)}
          placeholder="••••••••••••"
          className="field"
          autoFocus
        />

        {error && (
          <p className="mt-3 rounded-lg bg-neon-rose/10 px-3 py-2 text-xs text-neon-rose ring-1 ring-neon-rose/25">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={enviando || !clave.trim()}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-green px-5 py-3 text-sm font-semibold text-ink-950 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {enviando ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Comprobando…
            </>
          ) : (
            <>
              <LogIn className="size-4" />
              Entrar
            </>
          )}
        </button>
      </form>
    </div>
  )
}
