import { motion } from 'framer-motion'
import { Activity, Bot, Cpu, MessageCircle, TrendingUp, Workflow, Zap } from 'lucide-react'

const bars = [38, 55, 44, 72, 61, 88, 96]

const flow = [
  { icon: MessageCircle, label: 'Lead entrante' },
  { icon: Cpu, label: 'IA califica' },
  { icon: Workflow, label: 'Flujo n8n' },
  { icon: TrendingUp, label: 'Venta' },
]

/**
 * Composición visual del hero: panel de control futurista flotante,
 * con gráfico animado, flujo de automatización y elementos orbitando.
 * Todo construido con CSS/SVG — sin imágenes que descargar.
 */
export default function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[36rem]">
      {/* Resplandor trasero */}
      <div className="absolute inset-0 -z-10 scale-110 rounded-[3rem] bg-gradient-to-tr from-neon-blue/25 via-neon-cyan/15 to-neon-green/20 blur-3xl" />

      {/* Anillo orbital */}
      <div
        aria-hidden
        className="animate-spin-slow absolute -inset-8 -z-10 rounded-full border border-dashed border-neon-cyan/15 sm:-inset-12"
      >
        <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-neon-cyan shadow-[0_0_14px_3px_var(--color-neon-cyan)]" />
        <span className="absolute -bottom-1 left-1/3 size-1.5 rounded-full bg-neon-green shadow-[0_0_12px_3px_var(--color-neon-green)]" />
      </div>

      {/* Panel principal */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.21, 0.68, 0.35, 1] }}
        className="glass relative overflow-hidden rounded-2xl p-4 shadow-[0_40px_120px_-40px_rgba(34,211,238,0.45)] sm:rounded-3xl sm:p-5"
      >
        {/* Línea de escaneo */}
        <span
          aria-hidden
          className="animate-scan pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-neon-cyan/25 to-transparent"
        />

        {/* Barra de ventana */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-400/60" />
            <span className="size-2.5 rounded-full bg-amber-300/60" />
            <span className="size-2.5 rounded-full bg-neon-green/70" />
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-white/[0.05] px-2.5 py-1 font-mono text-[10px] text-mist-500">
            <span className="size-1.5 animate-pulse rounded-full bg-neon-green" />
            panel.fluxocloudlabs.net
          </div>
        </div>

        {/* Métricas */}
        <div className="mb-4 grid grid-cols-3 gap-2 sm:gap-3">
          {[
            { icon: Activity, value: '1.284', label: 'Visitas hoy', tint: 'text-neon-cyan' },
            { icon: Bot, value: '347', label: 'Chats IA', tint: 'text-neon-green' },
            { icon: Zap, value: '62', label: 'Leads', tint: 'text-neon-blue' },
          ].map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-2.5 sm:p-3"
            >
              <metric.icon className={`mb-1.5 size-3.5 ${metric.tint}`} />
              <p className="font-display text-base font-bold text-mist-100 sm:text-lg">
                {metric.value}
              </p>
              <p className="text-[10px] text-mist-500 sm:text-[11px]">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Gráfico */}
        <div className="mb-4 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] font-medium text-mist-300">Conversión semanal</p>
            <span className="flex items-center gap-1 rounded-full bg-neon-green/12 px-2 py-0.5 font-mono text-[10px] text-neon-green">
              <TrendingUp className="size-3" /> +38%
            </span>
          </div>
          <div className="flex h-20 items-end gap-1.5 sm:h-24 sm:gap-2">
            {bars.map((height, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.9, delay: 0.7 + index * 0.08, ease: 'easeOut' }}
                className="flex-1 rounded-t-md bg-gradient-to-t from-neon-blue/30 via-neon-cyan/70 to-neon-green"
              />
            ))}
          </div>
        </div>

        {/* Flujo de automatización */}
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3 sm:p-4">
          <p className="mb-3 font-mono text-[10px] tracking-[0.16em] text-mist-500 uppercase">
            Flujo activo
          </p>
          <div className="flex items-center justify-between">
            {flow.map((node, index) => (
              <div key={node.label} className="flex flex-1 items-center last:flex-none">
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.1 + index * 0.16, duration: 0.4 }}
                  className="flex flex-col items-center gap-1.5"
                >
                  <span className="grid size-8 place-items-center rounded-lg border border-neon-cyan/25 bg-neon-cyan/8 text-neon-cyan sm:size-9">
                    <node.icon className="size-3.5 sm:size-4" />
                  </span>
                  <span className="max-w-14 text-center text-[9px] leading-tight text-mist-500 sm:text-[10px]">
                    {node.label}
                  </span>
                </motion.div>

                {index < flow.length - 1 && (
                  <svg className="mx-1 h-px flex-1" preserveAspectRatio="none" viewBox="0 0 100 1">
                    <line
                      x1="0"
                      y1="0.5"
                      x2="100"
                      y2="0.5"
                      stroke="url(#flowGrad)"
                      strokeWidth="1"
                      strokeDasharray="6 5"
                      className="animate-dash"
                    />
                    <defs>
                      <linearGradient id="flowGrad">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#3ff294" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tarjetas flotantes */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="animate-float glass absolute -top-5 -left-3 hidden items-center gap-2 rounded-xl px-3 py-2 shadow-xl sm:flex md:-left-10"
      >
        <span className="grid size-8 place-items-center rounded-lg bg-[#25D366]/15 text-[#25D366]">
          <MessageCircle className="size-4" />
        </span>
        <div>
          <p className="text-xs font-semibold text-mist-100">WhatsApp</p>
          <p className="font-mono text-[10px] text-neon-green">respuesta en 12s</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="animate-float-slow glass absolute -right-3 -bottom-6 hidden items-center gap-2 rounded-xl px-3 py-2 shadow-xl sm:flex md:-right-10"
      >
        <span className="grid size-8 place-items-center rounded-lg bg-neon-violet/15 text-neon-violet">
          <Cpu className="size-4" />
        </span>
        <div>
          <p className="text-xs font-semibold text-mist-100">Agente IA</p>
          <p className="font-mono text-[10px] text-neon-cyan">entrenado y activo</p>
        </div>
      </motion.div>
    </div>
  )
}
