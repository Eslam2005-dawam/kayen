import type { ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type Props = {
  children: ReactNode
  className?: string
  delayMs?: number
  direction?: 'up' | 'left' | 'right'
}

export function Reveal({ children, className = '', delayMs = 0, direction = 'up' }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()

  const visible = reduced || inView
  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className}`}
      data-direction={direction}
      data-visible={visible}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  )
}
