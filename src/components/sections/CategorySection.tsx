import { ArrowLeft } from 'lucide-react'
import { categories } from '../../data/categories'
import { Reveal } from '../ui/Reveal'
import { ResponsivePicture } from '../ui/ResponsivePicture'

function CategoryCard({
  name,
  href,
  imageDesktop,
  imageMobile,
  width,
  height,
  alt,
  delayMs,
}: (typeof categories)[number] & { delayMs: number }) {
  return (
    <Reveal delayMs={delayMs} className="h-full">
      <a
        href={href}
        className="group flex h-full snap-start flex-col overflow-hidden rounded-2xl border border-beige/90 bg-white shadow-[0_8px_30px_rgb(42_37_35_/0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgb(42_37_35_/0.08)] motion-reduce:transition-none"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-beige/40">
          <ResponsivePicture
            src={imageDesktop}
            sources={[
              { src: imageMobile, media: '(max-width: 768px)' },
            ]}
            alt={alt}
            width={width}
            height={height}
            className="block h-full w-full"
            imgClassName="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        </div>
        <div className="flex items-center justify-between gap-2 px-4 py-3.5">
          <h3 className="text-base font-medium text-charcoal sm:text-lg">{name}</h3>
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/45 bg-gold-wash/70 text-gold-deep transition group-hover:translate-x-[-2px] motion-reduce:transition-none"
            aria-hidden
          >
            <ArrowLeft className="h-4 w-4" />
          </span>
        </div>
      </a>
    </Reveal>
  )
}

export function CategorySection() {
  return (
    <section
      id="categories"
      className="border-t border-beige/60 bg-ivory py-10 sm:py-14"
      aria-labelledby="categories-heading"
    >
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2
            id="categories-heading"
            className="brand-section-heading mb-7 text-center text-3xl font-semibold text-charcoal sm:mb-9 sm:text-4xl"
          >
            اختيارات تُكمل راحتك
          </h2>
        </Reveal>

        {/* Desktop: five in a row */}
        <div className="hidden gap-3 lg:grid lg:grid-cols-5 lg:gap-4">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} {...cat} delayMs={i * 70} />
          ))}
        </div>

        {/* Tablet: 3 + scroll hint — use horizontal on md too for 5 items */}
        <div className="hidden md:block lg:hidden">
          <div className="scrollbar-hide edge-fade-inline flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
            {categories.map((cat, i) => (
              <div
                key={cat.id}
                className="w-[min(42vw,14rem)] shrink-0 snap-start sm:w-[min(36vw,15rem)]"
              >
                <CategoryCard {...cat} delayMs={i * 60} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile carousel with peek */}
        <div className="md:hidden">
          <div className="scrollbar-hide edge-fade-inline flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 ps-0 pe-4">
            {categories.map((cat, i) => (
              <div
                key={cat.id}
                className="w-[52vw] max-w-[13rem] shrink-0 snap-start"
              >
                <CategoryCard {...cat} delayMs={i * 50} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
