import { motion } from 'framer-motion'
import {
  Bell,
  BrainCircuit,
  ClipboardList,
  Globe,
  Instagram,
  Mail,
  MessageCircle,
  Send,
  Users,
} from 'lucide-react'

const inputs = [
  { icon: MessageCircle, label: 'WhatsApp', note: 'mensajes entrantes' },
  { icon: Globe, label: 'Formulario web', note: 'leads del sitio' },
  { icon: Mail, label: 'Email', note: 'consultas y respuestas' },
  { icon: Instagram, label: 'Redes sociales', note: 'DMs y comentarios' },
]

const outputs = [
  { icon: Send, label: 'Respuesta inmediata', note: 'en el canal del cliente' },
  { icon: Users, label: 'CRM actualizado', note: 'ficha creada y puntuada' },
  { icon: Bell, label: 'Aviso al equipo', note: 'solo si vale la pena' },
  { icon: ClipboardList, label: 'Reporte automático', note: 'métricas cada semana' },
]

/** Posiciones verticales (en %) de los nodos laterales. */
const rows = [12, 37, 63, 88]

function Node({ icon: Icon, label, note, tone = 'cyan', align = 'left' }) {
  const tones = {
    cyan: 'text-neon-cyan ring-neon-cyan/25 bg-neon-cyan/8',
    green: 'text-neon-green ring-neon-green/25 bg-neon-green/8',
  }

  return (
    <div
      className={`glass flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-500 hover:ring-1 hover:ring-white/20 ${
        align === 'right' ? 'flex-row-reverse text-right' : ''
      }`}
    >
      <span className={`grid size-9 shrink-0 place-items-center rounded-lg ring-1 ${tones[tone]}`}>
        <Icon className="size-4" strokeWidth={1.8} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[13px] font-semibold text-mist-100">{label}</span>
        <span className="block truncate text-[11px] text-mist-500">{note}</span>
      </span>
    </div>
  )
}

function Core() {
  return (
    <div className="glass relative overflow-hidden rounded-2xl p-4 text-center ring-1 ring-neon-cyan/25">
      <span
        aria-hidden
        className="animate-pulse-glow absolute inset-0 -z-10 bg-gradient-to-br from-neon-cyan/25 via-neon-blue/15 to-neon-green/25 blur-xl"
      />
      <span className="mx-auto mb-3 grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-neon-cyan via-neon-blue to-neon-green text-ink-950 shadow-[0_0_38px_-6px_var(--color-neon-cyan)]">
        <BrainCircuit className="size-7" strokeWidth={1.8} />
      </span>
      <p className="font-display text-[15px] font-bold text-mist-100">Motor de automatización</p>
      <p className="mt-1 text-[11px] leading-snug text-mist-300/80">
        Entiende, clasifica, responde y decide el siguiente paso
      </p>
      <div className="mt-3 flex flex-wrap justify-center gap-1">
        {['IA', 'n8n', 'Reglas', 'API'].map((chip) => (
          <span
            key={chip}
            className="rounded-md bg-white/[0.07] px-2 py-0.5 font-mono text-[9px] text-neon-cyan"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function AutomationFlow() {
  return (
    <>
      {/* ---------- Escritorio: diagrama con conectores ---------- */}
      <div className="relative hidden aspect-16/7 w-full lg:block">
        {/* Conectores. viewBox en porcentajes para que casen con la posición de los nodos. */}
        <svg
          aria-hidden
          className="absolute inset-0 size-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="wireIn" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="wireOut" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3ff294" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#3ff294" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {rows.map((y, index) => (
            <motion.path
              key={`in-${y}`}
              d={`M 24 ${y} C 31 ${y}, 30 50, 37 50`}
              fill="none"
              stroke="url(#wireIn)"
              strokeWidth="1.6"
              strokeDasharray="5 4"
              vectorEffect="non-scaling-stroke"
              className="animate-dash"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.2 + index * 0.1 }}
            />
          ))}

          {rows.map((y, index) => (
            <motion.path
              key={`out-${y}`}
              d={`M 63 50 C 70 50, 69 ${y}, 76 ${y}`}
              fill="none"
              stroke="url(#wireOut)"
              strokeWidth="1.6"
              strokeDasharray="5 4"
              vectorEffect="non-scaling-stroke"
              className="animate-dash"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.6 + index * 0.1 }}
            />
          ))}
        </svg>

        {/* Entradas */}
        {inputs.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.09 }}
            className="absolute left-0 w-[24%] -translate-y-1/2"
            style={{ top: `${rows[index]}%` }}
          >
            <Node {...item} tone="cyan" />
          </motion.div>
        ))}

        {/* Núcleo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="absolute top-1/2 left-1/2 w-[26%] -translate-x-1/2 -translate-y-1/2"
        >
          <Core />
        </motion.div>

        {/* Salidas */}
        {outputs.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.09 }}
            className="absolute right-0 w-[24%] -translate-y-1/2"
            style={{ top: `${rows[index]}%` }}
          >
            <Node {...item} tone="green" align="right" />
          </motion.div>
        ))}
      </div>

      {/* ---------- Móvil y tablet: flujo apilado ---------- */}
      <div className="lg:hidden">
        <div className="relative space-y-2.5 pl-6">
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-2 w-px bg-gradient-to-b from-neon-cyan/60 via-neon-blue/40 to-neon-green/60"
          />
          <p className="-ml-6 mb-3 font-mono text-[10px] tracking-[0.2em] text-mist-500 uppercase">
            Entradas
          </p>
          {inputs.map((item) => (
            <div key={item.label} className="relative">
              <span className="absolute top-1/2 -left-4 size-1.5 -translate-y-1/2 rounded-full bg-neon-cyan shadow-[0_0_8px_2px_var(--color-neon-cyan)]" />
              <Node {...item} tone="cyan" />
            </div>
          ))}

          <div className="py-4">
            <Core />
          </div>

          <p className="-ml-6 mb-3 font-mono text-[10px] tracking-[0.2em] text-mist-500 uppercase">
            Resultados
          </p>
          {outputs.map((item) => (
            <div key={item.label} className="relative">
              <span className="absolute top-1/2 -left-4 size-1.5 -translate-y-1/2 rounded-full bg-neon-green shadow-[0_0_8px_2px_var(--color-neon-green)]" />
              <Node {...item} tone="green" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
