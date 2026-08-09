import useInView from '../../hooks/useInView'

/**
 * Envoltorio de entrada al hacer scroll.
 *
 * El desplazamiento y el desvanecido los define CSS (`[data-reveal]` en
 * index.css); este componente solo marca el elemento y le pone
 * `data-visible` cuando entra en pantalla.
 *
 * `prefers-reduced-motion` se respeta desde el propio CSS, así que aquí no
 * hace falta comprobarlo.
 */
export default function Reveal({
  children,
  delay = 0,
  from = 'up',
  className = '',
  as: Tag = 'div',
  style,
  ...rest
}) {
  const [ref, visible] = useInView()

  return (
    <Tag
      ref={ref}
      data-reveal={from}
      data-visible={visible ? '' : undefined}
      style={delay ? { transitionDelay: `${delay}s`, ...style } : style}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}
