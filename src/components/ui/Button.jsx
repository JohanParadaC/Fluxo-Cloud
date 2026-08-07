const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-tight transition-all duration-300 whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-60'

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-[0.95rem]',
}

const variants = {
  // Sólido con degradado neón
  primary:
    'text-ink-950 bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-green [background-size:200%_100%] [background-position:0%_50%] hover:[background-position:100%_50%] shadow-[0_10px_36px_-10px_rgba(34,211,238,0.65)] hover:shadow-[0_16px_46px_-10px_rgba(63,242,148,0.7)] hover:-translate-y-0.5',
  // Cristal con borde luminoso
  ghost:
    'glass glow-border text-mist-100 hover:text-white hover:-translate-y-0.5 hover:bg-white/[0.07]',
  // Contorno sutil
  outline:
    'border border-white/12 text-mist-300 hover:border-neon-cyan/50 hover:text-white hover:bg-white/[0.04]',
  // Verde WhatsApp
  whatsapp:
    'bg-[#25D366] text-[#04180d] hover:bg-[#1fbe5a] shadow-[0_10px_34px_-12px_rgba(37,211,102,0.8)] hover:-translate-y-0.5',
}

export default function Button({
  as = 'a',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  const Tag = as
  return (
    <Tag className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
