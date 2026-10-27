import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Eye, ShoppingBag, X } from 'lucide-react'
import { useDemoUi } from '../../context/DemoUiContext'
import { demoProducts } from '../../data/products'
import { demoStoreProducts, priceForSize } from '../../data/demoStoreProducts'
import { HorizontalScrollRow } from '../ui/HorizontalScrollRow'
import { Reveal } from '../ui/Reveal'
import { ResponsivePicture } from '../ui/ResponsivePicture'

function formatSar(value: number) {
  return `${value.toLocaleString('ar-SA')} ر.س`
}

export function BestSellersSection() {
  const { addToCart } = useDemoUi()
  const [quickViewId, setQuickViewId] = useState<string | null>(null)
  const [quickViewSize, setQuickViewSize] = useState('')
  const closeQuickViewRef = useRef<HTMLButtonElement>(null)
  const quickView = demoStoreProducts.find((product) => product.id === quickViewId)

  useEffect(() => {
    if (!quickView) return
    const previousFocus = document.activeElement as HTMLElement | null
    closeQuickViewRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setQuickViewId(null)
      if (event.key !== 'Tab') return
      const dialog = closeQuickViewRef.current?.closest<HTMLElement>('[role="dialog"]')
      if (!dialog) return
      const focusable = [...dialog.querySelectorAll<HTMLElement>('button, a, select')].filter((element) => !element.hasAttribute('disabled'))
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      previousFocus?.focus()
    }
  }, [quickView])

  useEffect(() => {
    if (quickView) setQuickViewSize(quickView.sizes[0])
  }, [quickView])

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
              <Reveal key={product.id} delayMs={Math.min(index, 4) * 105} direction="fade" className="w-[min(64vw,16rem)] shrink-0 snap-start sm:w-[17rem]">
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
                      {/* <small className="text-[11px] text-charcoal/55">سعر توضيحي</small> */}
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
                        onClick={() => addToCart(product.id, product.defaultSize)}
                      >
                        <ShoppingBag className="h-3.5 w-3.5" aria-hidden />
                        أضف للسلة
                      </button>
                      <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-beige text-burgundy transition hover:bg-beige/40"
                        aria-label={`معاينة ${product.name}`}
                        onClick={() => setQuickViewId(product.id)}
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
        <Reveal className="mt-8 text-center" delayMs={180}>
          <a href="#/store" className="inline-flex min-h-11 items-center justify-center rounded-full border border-burgundy px-6 text-sm font-medium text-burgundy transition hover:bg-burgundy hover:text-white">
           عرض المزيد
          </a>
        </Reveal>
      </div>
      {quickView && <div className="quick-view-overlay" role="dialog" aria-modal="true" aria-labelledby="quick-view-title">
        <button type="button" className="quick-view-backdrop" aria-label="إغلاق المعاينة" onClick={() => setQuickViewId(null)} />
        <section className="quick-view-dialog">
          <button ref={closeQuickViewRef} type="button" className="quick-view-close" aria-label="إغلاق المعاينة" onClick={() => setQuickViewId(null)}><X size={21} /></button>
          <div className="quick-view-image"><img src={quickView.image} alt={quickView.name} width="720" height="560" /></div>
          <div className="quick-view-copy"><p className="quick-view-eyebrow">معاينة سريعة</p><h2 id="quick-view-title">{quickView.name}</h2><p>{quickView.description}</p>
            <div className="quick-view-price"><strong><span>{new Intl.NumberFormat('ar-SA').format(priceForSize(quickView, quickViewSize))}</span> <small>ر.س</small></strong><span>سعر توضيحي</span></div>
            {quickView.sizes.length > 1 ? <label className="quick-view-size">المقاس<select dir="ltr" value={quickViewSize} onChange={(event) => setQuickViewSize(event.target.value)}>{quickView.sizes.map((size) => <option key={size} value={size}>{size}</option>)}</select></label> : <p className="quick-view-size-label">المقاس المعروض: <b dir="ltr">{quickViewSize}</b></p>}
            <div className="quick-view-actions"><button type="button" className="quick-view-add" onClick={() => { addToCart(quickView.id, quickViewSize); setQuickViewId(null) }}><ShoppingBag size={17} /> أضف للسلة</button><a href={`#/products/${quickView.id}`} onClick={() => setQuickViewId(null)}>تفاصيل المنتج <ArrowLeft size={16} /></a></div>
          </div>
        </section>
      </div>}
    </section>
  )
}
