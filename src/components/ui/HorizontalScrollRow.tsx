import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  useCallback,
  useRef,
  type ReactNode,
  type KeyboardEvent,
} from 'react'

type Props = {
  ariaLabel: string
  children: ReactNode
  className?: string
  showControls?: boolean
  edgeFade?: boolean
}

export function HorizontalScrollRow({
  ariaLabel,
  children,
  className = '',
  showControls = true,
  edgeFade = true,
}: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollByPage = useCallback((direction: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    const amount = Math.max(el.clientWidth * 0.85, 280)
    el.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }, [])

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') scrollByPage(1)
    if (e.key === 'ArrowRight') scrollByPage(-1)
  }

  return (
    <div className={`relative ${className}`}>
      {showControls && (
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden items-center ps-1 md:flex">
          <button
            type="button"
            className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-beige/90 bg-white/90 text-burgundy shadow-sm transition hover:bg-white"
            aria-label="التمرير للمنتج التالي"
            onClick={() => scrollByPage(1)}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
        </div>
      )}
      {showControls && (
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden items-center pe-1 md:flex">
          <button
            type="button"
            className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-beige/90 bg-white/90 text-burgundy shadow-sm transition hover:bg-white"
            aria-label="التمرير للمنتج السابق"
            onClick={() => scrollByPage(-1)}
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      )}
      <div
        ref={scrollerRef}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className={`horizontal-touch-rail scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain pb-2 pt-1 ${
          edgeFade ? 'edge-fade-inline md:edge-fade-inline' : ''
        }`}
      >
        {children}
      </div>
    </div>
  )
}
