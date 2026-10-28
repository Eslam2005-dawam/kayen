import { useEffect, useMemo, useRef, useState, type TouchEvent } from 'react'
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, Maximize2, Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { useDemoUi } from '../context/DemoUiContext'
import { demoStoreProducts, priceForSize, storeCategories, type StoreProduct } from '../data/demoStoreProducts'
import { productGalleryImages } from '../data/productImages'
import { productReferences } from '../data/productReference'
import { publicAsset } from '../data/publicAsset'
import { siteConfig } from '../data/siteConfig'

const formatSar = (value: number) => new Intl.NumberFormat('ar-SA').format(value)

function RelatedProduct({ product }: { product: StoreProduct }) {
  return (
    <a className="product-related-card" href={`#/products/${product.id}`}>
      <div className="product-related-image"><img src={product.image} alt={product.name} loading="lazy" width="320" height="260" /></div>
      <div className="product-related-copy"><strong>{product.name}</strong><span>{formatSar(product.price)} ر.س</span></div>
      <ArrowLeft size={17} aria-hidden="true" />
    </a>
  )
}

export function ProductPage({ productId }: { productId: string }) {
  const product = demoStoreProducts.find((item) => item.id === productId)
  const reference = productReferences[productId]
  const gallery = useMemo(() => product ? productGalleryImages(product.id, product.image) : [], [product])
  const related = useMemo(() => product
    ? demoStoreProducts.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4)
    : [], [product])
  const [imageIndex, setImageIndex] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [size, setSize] = useState(product?.sizes[0] ?? '')
  const [quantity, setQuantity] = useState(1)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const closeLightboxRef = useRef<HTMLButtonElement>(null)
  const touchStartX = useRef<number | null>(null)
  const { addToCart, favoriteIds, toggleFavoriteDemo } = useDemoUi()

  useEffect(() => {
    document.title = product ? `${product.name} | ${siteConfig.brandNameAr}` : `المنتج غير متاح | ${siteConfig.brandNameAr}`
    return () => { document.title = `${siteConfig.brandNameAr} | ${siteConfig.brandNameEn} — مراتب ومفروشات نوم` }
  }, [product])

  useEffect(() => {
    if (!lightboxOpen) return
    closeLightboxRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxOpen(false)
      if (event.key === 'ArrowLeft' && gallery.length > 1) setImageIndex((index) => (index + 1) % gallery.length)
      if (event.key === 'ArrowRight' && gallery.length > 1) setImageIndex((index) => (index - 1 + gallery.length) % gallery.length)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [lightboxOpen, gallery.length])

  if (!product) {
    return <main id="main-content" className="store-container store-empty"><h1>المنتج غير متاح</h1><p>قد يكون الرابط قديمًا أو لم يُضف المنتج إلى الكتالوج بعد.</p><a href="#/store" className="text-burgundy underline">العودة إلى المتجر</a></main>
  }

  const category = storeCategories.find((item) => item.id === product.category)
  const productSpecs = [
    { label: 'القسم', value: category?.label },
    { label: 'المقاسات المتاحة (سم)', value: product.sizes.join('، ') },
    { label: 'الخامة', value: product.material },
    { label: 'اللون الظاهر', value: product.color },
  ].filter((spec): spec is { label: string; value: string } => Boolean(spec.value))
  const favorite = favoriteIds.includes(product.id)
  const nextImage = () => { setImageError(false); setImageIndex((index) => (index + 1) % gallery.length) }
  const previousImage = () => { setImageError(false); setImageIndex((index) => (index - 1 + gallery.length) % gallery.length) }
  const handleGalleryTouchStart = (event: TouchEvent<HTMLDivElement>) => { touchStartX.current = event.changedTouches[0]?.clientX ?? null }
  const handleGalleryTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const startX = touchStartX.current
    const endX = event.changedTouches[0]?.clientX
    touchStartX.current = null
    if (startX === null || endX === undefined || Math.abs(endX - startX) < 45 || gallery.length < 2) return
    if (endX < startX) nextImage()
    else previousImage()
  }

  return (
    <main id="main-content" className="product-page">
      <div className="store-container">
        <nav className="product-breadcrumb" aria-label="مسار الصفحة">
          <a href={publicAsset('/')}>الرئيسية</a><span aria-hidden="true">‹</span>
          <a href={publicAsset('/#/store')}>المتجر</a><span aria-hidden="true">‹</span>
          <a href={`#/categories/${product.category}`}>{category?.label}</a><span aria-hidden="true">‹</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className="product-layout">
          <section className="product-gallery" aria-label={`صور ${product.name}`}>
            <div className="product-gallery-main" onTouchStart={handleGalleryTouchStart} onTouchEnd={handleGalleryTouchEnd}>
              {imageError ? <div className="product-image-fallback">صورة المنتج غير متاحة</div> :
                <button type="button" className="product-zoom-button" onClick={() => setLightboxOpen(true)} aria-label="تكبير الصورة">
                  <img src={gallery[imageIndex]} alt={`${product.name} — الصورة ${imageIndex + 1}`} width="1122" height="1408" onError={() => setImageError(true)} />
                  <span><Maximize2 size={17} aria-hidden="true" /> تكبير الصورة</span>
                </button>}
              {gallery.length > 1 && <div className="product-gallery-arrows"><button type="button" onClick={previousImage} aria-label="الصورة السابقة"><ChevronRight size={20} /></button><button type="button" onClick={nextImage} aria-label="الصورة التالية"><ChevronLeft size={20} /></button></div>}
              {gallery.length > 1 && <span className="product-image-count">{imageIndex + 1} / {gallery.length}</span>}
            </div>
            <div className="product-thumbnails" aria-label="اختر صورة المنتج">
              {gallery.map((src, index) => <button key={src} type="button" className={index === imageIndex ? 'is-active' : ''} onClick={() => { setImageIndex(index); setImageError(false) }} aria-label={`عرض الصورة ${index + 1}`} aria-pressed={index === imageIndex}><img src={src} alt="" loading="lazy" width="90" height="90" /></button>)}
            </div>
          </section>

          <section className="product-purchase" aria-labelledby="product-title">
            <a className="product-category-link" href={`#/categories/${product.category}`}>{category?.label}<ArrowLeft size={14} aria-hidden="true" /></a>
            <h1 id="product-title">{product.name}</h1>
            {/* {reference && <p className="product-official-name">الاسم في موقع كيان الأصلي: <span dir="auto">{reference.officialName}</span></p>} */}
            <p className="product-lead">{product.description}</p>
            {/* <div className="product-price-block"><div><span className="product-field-label">سعر توضيحي للمقاس المحدد</span><strong>{formatSar(priceForSize(product, size))} <small>ر.س</small></strong></div><span className="product-stock">التوفر المعروض تجريبي</span></div> */}
            {/* <p className="product-demo-note">السعر والمقاسات والتوفر للمعاينة فقط، وتُحدَّث عند اعتماد بيانات المنتج الرسمية.</p> */}

            <fieldset className="product-size-field"><legend>اختر المقاس <span>سم</span></legend><div className="product-size-options">{product.sizes.map((option) => <button key={option} type="button" aria-pressed={size === option} className={size === option ? 'is-selected' : ''} onClick={() => setSize(option)}>{option}</button>)}</div></fieldset>
            <div className="product-order-row"><div><span className="product-field-label">الكمية</span><div className="product-quantity"><button type="button" aria-label="تقليل الكمية" disabled={quantity === 1} onClick={() => setQuantity((current) => current - 1)}><Minus size={16} /></button><output aria-live="polite">{quantity}</output><button type="button" aria-label="زيادة الكمية" disabled={quantity === 10} onClick={() => setQuantity((current) => current + 1)}><Plus size={16} /></button></div></div><div className="product-estimate"><span className="product-field-label">الإجمالي </span><strong>{formatSar(priceForSize(product, size) * quantity)} ر.س</strong></div></div>
            <div className="product-purchase-actions"><button type="button" className="product-add-button" disabled={!product.inStock} onClick={() => addToCart(product.id, size, quantity)}><ShoppingBag size={20} aria-hidden="true" />{product.inStock ? 'أضف للسلة' : 'غير متوفر'}</button><button type="button" className={`product-heart-button ${favorite ? 'is-active' : ''}`} onClick={() => toggleFavoriteDemo(product.id)} aria-pressed={favorite} aria-label={favorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}><Heart size={20} fill={favorite ? 'currentColor' : 'none'} /></button></div>
            {/* <a className="product-inquiry-link" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" />اسأل كيان عن المقاس والتوفر</a> */}
            <p className="product-help-note">قبل الاختيار، قِس مساحة السرير وطابقها مع المقاس المطلوب. تأكد من تفاصيل الطلب مع كيان قبل الشراء.</p>
          </section>
        </div>

        <div className="product-details-grid">
          {/* <section className="product-details-panel" aria-labelledby="product-description-title"><h2 id="product-description-title">تفاصيل المنتج</h2><p>{product.description}</p></section> */}
          <section className="product-details-panel" aria-labelledby="product-specs-title"><h2 id="product-specs-title">مواصفات المنتج</h2><dl>{productSpecs.map((spec) => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}</dl>{reference?.details.length ? <ul>{reference.details.map((detail) => <li key={detail}>{detail}</li>)}</ul> : null}</section>
        </div>

        {related.length > 0 && <section className="product-related" aria-labelledby="related-title"><div className="product-related-heading"><h2 id="related-title">منتجات أخرى من {category?.label}</h2><a href={`#/categories/${product.category}`}>عرض القسم <ArrowLeft size={16} aria-hidden="true" /></a></div><div className="product-related-grid">{related.map((item) => <RelatedProduct key={item.id} product={item} />)}</div></section>}
      </div>

      {lightboxOpen && <div className="product-lightbox" role="dialog" aria-modal="true" aria-label={`تكبير صورة ${product.name}`}><button type="button" className="product-lightbox-backdrop" aria-label="إغلاق معرض الصور" onClick={() => setLightboxOpen(false)} /><div className="product-lightbox-content"><button ref={closeLightboxRef} type="button" className="product-lightbox-close" onClick={() => setLightboxOpen(false)} aria-label="إغلاق"><X size={24} /></button><img src={gallery[imageIndex]} alt={`${product.name} — الصورة ${imageIndex + 1}`} />{gallery.length > 1 && <div className="product-lightbox-arrows"><button type="button" onClick={previousImage} aria-label="الصورة السابقة"><ChevronRight size={24} /></button><span>{imageIndex + 1} / {gallery.length}</span><button type="button" onClick={nextImage} aria-label="الصورة التالية"><ChevronLeft size={24} /></button></div>}</div></div>}
    </main>
  )
}
