import { useCallback, useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

const INITIAL_DELAY_MS = 8000
const INTERVAL_MS = 7000

type Options = {
  slideCount: number
  isVisible: boolean
  isPaused: boolean
}

export function useHeroCarousel({ slideCount, isVisible, isPaused }: Options) {
  const [index, setIndex] = useState(0)
  const reducedMotion = usePrefersReducedMotion()
  const timerRef = useRef<number | null>(null)
  const hasAdvancedOnce = useRef(false)

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const goTo = useCallback(
    (next: number) => {
      if (slideCount <= 0) return
      setIndex(((next % slideCount) + slideCount) % slideCount)
    },
    [slideCount],
  )

  const goNext = useCallback(() => goTo(index + 1), [goTo, index])
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index])

  const scheduleNext = useCallback(() => {
    clearTimer()
    if (reducedMotion || !isVisible || isPaused || slideCount <= 1) return

    const delay = hasAdvancedOnce.current ? INTERVAL_MS : INITIAL_DELAY_MS
    timerRef.current = window.setTimeout(() => {
      hasAdvancedOnce.current = true
      setIndex((i) => (i + 1) % slideCount)
    }, delay)
  }, [clearTimer, isPaused, isVisible, reducedMotion, slideCount])

  useEffect(() => {
    scheduleNext()
    return clearTimer
  }, [index, scheduleNext, clearTimer])

  useEffect(() => {
    if (!isVisible || isPaused) clearTimer()
  }, [isVisible, isPaused, clearTimer])

  return { index, goTo, goNext, goPrev, reducedMotion }
}
