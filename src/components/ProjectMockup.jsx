/**
 * Mockups de interfaz generados con CSS puro.
 * Se usan como vista previa de los proyectos del portafolio: cero imágenes,
 * cero peticiones extra y siempre nítidos en cualquier pantalla.
 */

const Bar = ({ w = 'w-full', h = 'h-1.5', tone = 'bg-white/12' }) => (
  <span className={`block rounded-full ${w} ${h} ${tone}`} />
)

function Corporate() {
  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <div className="flex items-center justify-between">
        <Bar w="w-12" h="h-2" tone="bg-neon-cyan/70" />
        <div className="flex gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <Bar key={i} w="w-5" h="h-1" />
          ))}
        </div>
      </div>
      <div className="mt-2 flex flex-1 gap-3">
        <div className="flex flex-1 flex-col justify-center gap-2">
          <Bar w="w-4/5" h="h-2.5" tone="bg-white/25" />
          <Bar w="w-3/5" h="h-2.5" tone="bg-white/25" />
          <Bar w="w-full" />
          <Bar w="w-2/3" />
          <span className="mt-1 block h-4 w-16 rounded-md bg-gradient-to-r from-neon-cyan to-neon-blue" />
        </div>
        <div className="w-2/5 rounded-lg bg-gradient-to-br from-neon-blue/25 to-neon-cyan/10 ring-1 ring-white/10" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-7 rounded-md bg-white/[0.05] ring-1 ring-white/[0.07]" />
        ))}
      </div>
    </div>
  )
}

function Landing() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2.5 p-4 text-center">
      <span className="rounded-full bg-neon-green/15 px-2 py-0.5 font-mono text-[8px] text-neon-green">
        OFERTA LIMITADA
      </span>
      <Bar w="w-3/4" h="h-3" tone="bg-white/30" />
      <Bar w="w-1/2" h="h-3" tone="bg-white/30" />
      <Bar w="w-4/5" />
      <span className="mt-1 block h-6 w-28 rounded-lg bg-gradient-to-r from-neon-green to-neon-cyan shadow-[0_0_20px_-4px_var(--color-neon-green)]" />
      <div className="mt-2 flex gap-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="size-1.5 rounded-full bg-neon-green/70" />
        ))}
      </div>
    </div>
  )
}

function Ecommerce() {
  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <div className="flex items-center justify-between">
        <Bar w="w-10" h="h-2" tone="bg-neon-violet/70" />
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-sm bg-white/12" />
          <span className="relative size-3 rounded-sm bg-white/12">
            <span className="absolute -top-1 -right-1 size-1.5 rounded-full bg-neon-green" />
          </span>
        </div>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2">
        {[
          'from-neon-violet/30 to-neon-blue/10',
          'from-neon-cyan/25 to-neon-green/10',
          'from-neon-blue/25 to-neon-violet/10',
          'from-neon-green/20 to-neon-cyan/10',
          'from-neon-blue/20 to-neon-cyan/10',
          'from-neon-violet/25 to-neon-green/10',
        ].map((tone, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className={`flex-1 rounded-md bg-gradient-to-br ${tone} ring-1 ring-white/[0.08]`} />
            <Bar w="w-3/4" h="h-1" />
            <Bar w="w-1/2" h="h-1" tone="bg-neon-green/60" />
          </div>
        ))}
      </div>
    </div>
  )
}

function Automation() {
  const nodes = ['bg-neon-cyan', 'bg-neon-blue', 'bg-neon-green', 'bg-neon-violet']
  return (
    <div className="relative flex h-full items-center justify-center p-4">
      <svg className="absolute inset-0 size-full" viewBox="0 0 200 120" fill="none">
        <path
          d="M32 60 C 70 60, 70 30, 100 30 C 130 30, 130 60, 168 60"
          stroke="rgba(34,211,238,0.5)"
          strokeWidth="1.4"
          strokeDasharray="5 4"
          className="animate-dash"
        />
        <path
          d="M32 60 C 70 60, 70 92, 100 92 C 130 92, 130 60, 168 60"
          stroke="rgba(63,242,148,0.5)"
          strokeWidth="1.4"
          strokeDasharray="5 4"
          className="animate-dash"
        />
      </svg>
      <div className="relative flex w-full items-center justify-between">
        {nodes.map((tone, i) => (
          <span
            key={i}
            className={`grid size-7 shrink-0 place-items-center rounded-lg ${tone}/20 ring-1 ring-white/15`}
          >
            <span className={`size-2 rounded-full ${tone}`} />
          </span>
        ))}
      </div>
      <span className="absolute bottom-3 left-4 rounded-full bg-white/[0.06] px-2 py-0.5 font-mono text-[8px] text-neon-green">
        ● 4 flujos activos
      </span>
    </div>
  )
}

function Dashboard() {
  const heights = ['h-4', 'h-7', 'h-5', 'h-9', 'h-6', 'h-11', 'h-8']
  return (
    <div className="flex h-full gap-2 p-4">
      <div className="flex w-8 flex-col gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`h-4 rounded-sm ${i === 0 ? 'bg-neon-cyan/50' : 'bg-white/[0.07]'}`}
          />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="grid grid-cols-3 gap-1.5">
          {['bg-neon-cyan/60', 'bg-neon-green/60', 'bg-neon-blue/60'].map((tone, i) => (
            <div key={i} className="rounded-md bg-white/[0.05] p-1.5 ring-1 ring-white/[0.07]">
              <Bar w="w-2/3" h="h-1" tone={tone} />
              <span className="mt-1 block h-1.5 w-4/5 rounded-full bg-white/20" />
            </div>
          ))}
        </div>
        <div className="flex flex-1 items-end gap-1 rounded-md bg-white/[0.04] p-2 ring-1 ring-white/[0.07]">
          {heights.map((h, i) => (
            <span
              key={i}
              className={`flex-1 rounded-t-sm bg-gradient-to-t from-neon-blue/40 to-neon-cyan ${h}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function Chatbot() {
  return (
    <div className="flex h-full flex-col justify-end gap-2 p-4">
      <div className="mb-auto flex items-center gap-2">
        <span className="grid size-5 place-items-center rounded-full bg-gradient-to-br from-neon-cyan to-neon-green text-[8px] font-bold text-ink-950">
          IA
        </span>
        <Bar w="w-16" h="h-1.5" tone="bg-white/20" />
      </div>
      <span className="max-w-[75%] rounded-xl rounded-bl-sm bg-white/[0.07] px-2.5 py-2 ring-1 ring-white/[0.07]">
        <Bar w="w-24" h="h-1" />
        <span className="mt-1 block">
          <Bar w="w-16" h="h-1" />
        </span>
      </span>
      <span className="ml-auto max-w-[70%] rounded-xl rounded-br-sm bg-neon-cyan/15 px-2.5 py-2 ring-1 ring-neon-cyan/25">
        <Bar w="w-20" h="h-1" tone="bg-neon-cyan/60" />
      </span>
      <span className="max-w-[80%] rounded-xl rounded-bl-sm bg-white/[0.07] px-2.5 py-2 ring-1 ring-white/[0.07]">
        <Bar w="w-28" h="h-1" />
        <span className="mt-1 block">
          <Bar w="w-20" h="h-1" tone="bg-neon-green/50" />
        </span>
      </span>
      <div className="mt-1 flex items-center gap-2 rounded-full bg-white/[0.05] px-2.5 py-1.5 ring-1 ring-white/[0.07]">
        <Bar w="w-20" h="h-1" />
        <span className="ml-auto size-3.5 rounded-full bg-gradient-to-br from-neon-cyan to-neon-blue" />
      </div>
    </div>
  )
}

const variants = {
  corporate: Corporate,
  landing: Landing,
  ecommerce: Ecommerce,
  automation: Automation,
  dashboard: Dashboard,
  chatbot: Chatbot,
}

export default function ProjectMockup({ variant }) {
  const View = variants[variant] ?? Corporate

  return (
    <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl bg-ink-900 ring-1 ring-white/[0.08]">
      {/* Fondo técnico */}
      <div aria-hidden className="tech-grid absolute inset-0 opacity-40" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 via-transparent to-neon-green/10"
      />
      <div className="relative size-full">
        <View />
      </div>
      {/* Brillo diagonal al hacer hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-x-1/2 -top-1/2 h-[200%] w-1/3 -translate-x-full rotate-12 bg-gradient-to-r from-transparent via-white/8 to-transparent transition-transform duration-1000 group-hover:translate-x-[420%]"
      />
    </div>
  )
}
