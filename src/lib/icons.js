/**
 * Registro de iconos usados por los datos del sitio.
 * Se importa solo lo necesario para que el bundle no arrastre la librería completa.
 */
import {
  Bot,
  Boxes,
  Code2,
  FileInput,
  Gauge,
  Github,
  Instagram,
  Layout,
  Linkedin,
  LineChart,
  MessageCircle,
  MessagesSquare,
  PenTool,
  PhoneCall,
  Plug,
  RefreshCw,
  Rocket,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  UserPlus,
  Workflow,
} from 'lucide-react'

export const iconMap = {
  Bot,
  Boxes,
  Code2,
  FileInput,
  Gauge,
  Github,
  Instagram,
  Layout,
  Linkedin,
  LineChart,
  MessageCircle,
  MessagesSquare,
  PenTool,
  PhoneCall,
  Plug,
  RefreshCw,
  Rocket,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  UserPlus,
  Workflow,
}

/** Devuelve el icono por nombre, con Sparkles como respaldo. */
export const getIcon = (name) => iconMap[name] ?? Sparkles

/** Paleta por acento, para mantener consistente el color de tarjetas e iconos. */
export const accents = {
  cyan: {
    text: 'text-neon-cyan',
    bg: 'bg-neon-cyan/10',
    border: 'border-neon-cyan/25',
    glow: 'rgba(34,211,238,0.16)',
    gradient: 'from-neon-cyan to-neon-blue',
  },
  blue: {
    text: 'text-neon-blue',
    bg: 'bg-neon-blue/10',
    border: 'border-neon-blue/25',
    glow: 'rgba(59,130,246,0.16)',
    gradient: 'from-neon-blue to-neon-violet',
  },
  green: {
    text: 'text-neon-green',
    bg: 'bg-neon-green/10',
    border: 'border-neon-green/25',
    glow: 'rgba(63,242,148,0.14)',
    gradient: 'from-neon-green to-neon-cyan',
  },
  violet: {
    text: 'text-neon-violet',
    bg: 'bg-neon-violet/10',
    border: 'border-neon-violet/25',
    glow: 'rgba(139,92,246,0.16)',
    gradient: 'from-neon-violet to-neon-blue',
  },
}
