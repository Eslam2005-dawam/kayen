import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { heroSlides } from '../../data/heroSlides'
import { useHeroCarousel } from '../../hooks/useHeroCarousel'
import { useInView } from '../../hooks/useInView'
import { CampaignBanner } from '../ui/CampaignBanner'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'

export function HeroCarousel() {
  const { ref: visibilityRef, inView: carouselVisible } = useInView<HTMLElement>({
    threshold: 0.25,
    once: false,
  })
  const [hoverPaused, setHoverPaused] = useState(false)
  const [focusPaused, setFocusPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const [pageHidden, setPageHidden] = useState(
    () => typeof document !== 'undefined' && document.hidden,
  )

  useEffect(() => {
    const onVis = () => setPageHidden(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const isPaused =
    hoverPaused || focusPaused || pageHidden || !carouselVisible

  const { index, goTo, goNext, goPrev, reducedMotion } = useHeroCarousel({
    slideCount: heroSlides.length,
    isVisible: carouselVisible && !pageHidden,
    isPaused,
  })

  useEffect(() => {
    const next = heroSlides[(index + 1) % heroSlides.length]
    if (!next?.imageReady) return
    const href = window.matchMedia('(max-width: 768px)').matches
      ? (next.image.mobile ?? next.image.desktop)
      : next.image.desktop
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = href
    document.head.appendChild(link)
    return () => {
      link.remove()
    }
  }, [index])

  const onPointerDown = (e: ReactPointerEvent) => {
    touchStartX.current = e.clientX
  }

  const onPointerUp = (e: ReactPointerEvent) => {
    if (touchStartX.current === null) return
    const delta = e.clientX - touchStartX.current
    if (Math.abs(delta) > 48) {
      if (delta > 0) goPrev()
      else goNext()
    }
    touchStartX.current = null
  }

  const activeSlide = heroSlides[index]
  const darkControls = activeSlide.id === 'slide-3' || !activeSlide.textInImage

  return (
    <section
      ref={visibilityRef}
      id="hero"
      className="hero-carousel bg-charcoal/5"
      aria-roledescription="carousel"
      aria-label="بانر كيان الرئيسي"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocusCapture={() => setFocusPaused(true)}
      onBlurCapture={() => setFocusPaused(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        touchStartX.current = null
      }}
    >
      <div className="hero-carousel__media">
        {heroSlides.map((slide, i) => {
          const active = i === index
          const showPlaceholder = !slide.imageReady
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out motion-reduce:transition-none ${
                active ? 'opacity-100' : 'pointer-events-none opacity-0'
              } ${slide.textInImage ? 'hero-carousel__baked' : 'hero-carousel__lifestyle'} ${slide.id === 'slide-3' ? 'hero-carousel__campaign' : ''}`}
              aria-hidden={!active}
            >
              {showPlaceholder ? (
                <ImagePlaceholder
                  label="صورة الشريحة قيد الإعداد — استبدل المسار في imageManifest"
                  aspectRatio="1920 / 800"
                  className="h-full w-full rounded-none"
                />
              ) : (
                <CampaignBanner
                  desktop={slide.image.desktop}
                  mobile={slide.image.mobile}
                  width={slide.image.width}
                  height={slide.image.height}
                  widthMobile={slide.image.mobileWidth}
                  heightMobile={slide.image.mobileHeight}
                  alt={slide.image.alt}
                  ready
                  loading={i === 0 ? 'eager' : 'lazy'}
                  fetchPriority={slide.image.fetchPriority}
                  fit="cover"
                  objectPosition="center"
                />
              )}
              {slide.textInImage ? (
                <a href={slide.primaryCta.href} tabIndex={active ? 0 : -1} className={`hero-carousel__baked-link absolute z-10 ${slide.id === 'slide-3' ? 'hero-carousel__campaign-link' : ''}`} aria-label={slide.primaryCta.label} />
              ) : (
                <div className="hero-carousel__lifestyle-shade pointer-events-none absolute inset-0" aria-hidden />
              )}
            </div>
          )
        })}
      </div>

      {activeSlide.textInImage && <h1 className="sr-only">{activeSlide.image.alt}</h1>}

      {!activeSlide.textInImage && <div className="hero-carousel__lifestyle-copy absolute inset-0 z-10 mx-auto flex w-full max-w-6xl flex-col justify-end px-6 pb-11 pt-24 sm:pb-10 sm:pt-28 md:justify-center md:pb-14 md:pt-32 lg:pb-16 lg:pt-36">
        <div className="max-w-xl md:ml-0 md:mr-auto md:max-w-lg md:text-left lg:max-w-xl">
          <span className="mb-4 block h-0.5 w-12 bg-gold-deep md:bg-gold-light" aria-hidden />
          <h1 className="text-balance text-2xl font-semibold leading-tight text-burgundy md:text-white sm:text-3xl md:text-4xl lg:text-5xl">
            {activeSlide.headline}
          </h1>
          <p className="mt-2 max-w-md text-pretty text-sm leading-relaxed text-charcoal/85 md:text-white/90 sm:mt-3 sm:text-base">
            {activeSlide.subtitle}
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5 sm:mt-6 sm:gap-3">
            <a
              href={activeSlide.primaryCta.href}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-burgundy px-5 text-sm font-medium text-white transition hover:bg-burgundy-deep sm:px-6"
            >
              {activeSlide.primaryCta.label}
            </a>
            <a
              href={activeSlide.secondaryCta.href}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-burgundy/50 bg-white/20 px-5 text-sm font-medium text-burgundy transition hover:bg-white/40 md:border-white/70 md:bg-white/10 md:text-white md:backdrop-blur-sm md:hover:bg-white/20 sm:px-6"
            >
              {activeSlide.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>}

      <div className="absolute bottom-3 start-1/2 z-10 flex -translate-x-1/2 gap-1.5 sm:bottom-4 sm:gap-2 rtl:translate-x-1/2">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            className={`h-2 rounded-full transition-all sm:h-2.5 ${
              i === index
                ? `w-7 sm:w-8 ${darkControls ? 'bg-burgundy' : 'bg-white'}`
                : `w-2 sm:w-2.5 ${darkControls ? 'bg-burgundy/35 hover:bg-burgundy/70' : 'bg-white/50 hover:bg-white/80'}`
            }`}
            aria-label={`الانتقال إلى الشريحة ${i + 1}`}
            aria-current={i === index}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <button
        type="button"
        className={`absolute top-1/2 end-2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm transition sm:end-3 sm:h-11 sm:w-11 md:flex ${darkControls ? 'border-burgundy/30 bg-white/55 text-burgundy hover:bg-white/80' : 'border-white/30 bg-white/15 text-white hover:bg-white/25'}`}
        aria-label="الشريحة السابقة"
        onClick={goPrev}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      <button
        type="button"
        className={`absolute top-1/2 start-2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm transition sm:start-3 sm:h-11 sm:w-11 md:flex ${darkControls ? 'border-burgundy/30 bg-white/55 text-burgundy hover:bg-white/80' : 'border-white/30 bg-white/15 text-white hover:bg-white/25'}`}
        aria-label="الشريحة التالية"
        onClick={goNext}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {!reducedMotion && (
        <span className="sr-only" aria-live="polite">
          الشريحة {index + 1} من {heroSlides.length}
        </span>
      )}
    </section>
  )
}
