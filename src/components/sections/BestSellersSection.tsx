import { Eye, ShoppingBag } from 'lucide-react'
import { useDemoUi } from '../../context/DemoUiContext'
import { demoProducts } from '../../data/products'
import { HorizontalScrollRow } from '../ui/HorizontalScrollRow'
import { Reveal } from '../ui/Reveal'
import { ResponsivePicture } from '../ui/ResponsivePicture'

function formatSar(value: number) {
  return `${value.toLocaleString('ar-SA')} ر.س`
}

export function BestSellersSection() {
  const { addToCartDemo, openQuickViewDemo } = useDemoUi()

  return (
    <section
      id="best-sellers"
      className="bg-white py-12 sm:py-16"
      aria-labelledby="best-sellers-heading"
    >
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2 id="best-sellers-heading" className="brand-section-heading text-center text-3xl font-semibold text-charcoal sm:text-4xl">
            الأكثر مبيعًا
          </h2>
        </Reveal>

        <HorizontalScrollRow ariaLabel="منتجات الأكثر مبيعًا" className="mt-8">
            {demoProducts.map((product, index) => (
              <Reveal key={product.id} delayMs={Math.min(index, 3) * 70} className="w-[min(64vw,16rem)] shrink-0 snap-start sm:w-[17rem]">
              <article
                className="h-full"
              >
                <div className="group relative overflow-hidden rounded-2xl border border-beige/90 bg-white shadow-sm">
                  {product.compareAtSar && product.compareAtSar > product.priceSar && (
                    <span className="absolute top-3 start-3 z-10 rounded-full bg-burgundy px-2.5 py-1 text-[11px] font-medium text-white">
                      خصم {Math.round((1 - product.priceSar / product.compareAtSar) * 100)}٪
                    </span>
                  )}
                  <a href={product.href} className="block">
                    <div className="aspect-[4/5] overflow-hidden bg-beige/30">
                      <ResponsivePicture
                        src={product.image}
                        alt={product.name}
                        width={product.imageWidth}
                        height={product.imageHeight}
                        className="block h-full w-full"
                        imgClassName="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
                        loading="lazy"
                      />
                    </div>
                  </a>
                  <div className="space-y-2 p-4">
                    <h3 className="line-clamp-2 text-sm font-medium leading-snug text-charcoal">
                      {product.name}
                    </h3>
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-base font-semibold text-burgundy">
                        {formatSar(product.priceSar)}
                      </span>
                      {product.compareAtSar && (
                        <span className="text-xs text-charcoal/45 line-through">
                          {formatSar(product.compareAtSar)}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-burgundy px-3 text-xs font-medium text-white transition hover:bg-burgundy-deep"
                        onClick={() => addToCartDemo(product.name)}
                      >
                        <ShoppingBag className="h-3.5 w-3.5" aria-hidden />
                        أضف للسلة
                      </button>
                      <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-beige text-burgundy transition hover:bg-beige/40"
                        aria-label={`معاينة ${product.name}`}
                        onClick={() => openQuickViewDemo(product.name)}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
              </Reveal>
            ))}
        </HorizontalScrollRow>
        <Reveal className="mt-8 text-center" delayMs={120}>
          <a href="#/store" className="inline-flex min-h-11 items-center justify-center rounded-full border border-burgundy px-6 text-sm font-medium text-burgundy transition hover:bg-burgundy hover:text-white">
           عرض المزيد
          </a>
        </Reveal>
      </div>
    </section>
  )
}
