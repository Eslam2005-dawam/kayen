import { useEffect } from 'react'
import { ArrowLeft, Heart, ShoppingBag, Trash2 } from 'lucide-react'
import { demoStoreProducts, priceForSize } from '../data/demoStoreProducts'
import { useDemoUi } from '../context/DemoUiContext'
import { publicAsset } from '../data/publicAsset'
import { siteConfig } from '../data/siteConfig'

const formatSar = (value: number) => new Intl.NumberFormat('ar-SA').format(value)

export function WishlistPage() {
  const { favoriteIds, toggleFavoriteDemo, addToCart } = useDemoUi()
  const favorites = favoriteIds.flatMap((id) => {
    const product = demoStoreProducts.find((item) => item.id === id)
    return product ? [product] : []
  })

  useEffect(() => {
    document.title = `المفضلة | ${siteConfig.brandNameAr}`
    return () => { document.title = `${siteConfig.brandNameAr} | ${siteConfig.brandNameEn} — مراتب ومفروشات نوم` }
  }, [])

  return (
    <main id="main-content" className="wishlist-page">
      <div className="store-container">
        <nav className="cart-breadcrumb" aria-label="مسار الصفحة"><a href={publicAsset('/')}>الرئيسية</a><span aria-hidden="true">›</span><span aria-current="page">المفضلة</span></nav>
        <header className="wishlist-heading"><div><p>احتفظ باختياراتك للرجوع إليها</p><h1>قائمة المفضلة</h1></div><span>عدد المنتجات: {formatSar(favorites.length)}</span></header>

        {favorites.length === 0 ? (
          <section className="wishlist-empty" aria-labelledby="wishlist-empty-title"><span><Heart size={27} aria-hidden="true" /></span><h2 id="wishlist-empty-title">لم تحفظ منتجات بعد</h2><p>اضغط على علامة القلب في أي منتج، وستجده هنا عند رجوعك.</p><a href="#/store" className="cart-primary-button">اكتشف المنتجات <ArrowLeft size={17} aria-hidden="true" /></a></section>
        ) : (
          <div className="wishlist-grid">{favorites.map((product) => {
            const size = product.sizes[0]
            return <article className="wishlist-card" key={product.id}>
              <a href={`#/products/${product.id}`} className="wishlist-image"><img src={product.image} alt={product.name} width="720" height="560" loading="lazy" /></a>
              <div className="wishlist-card-copy"><p>{product.category === 'mattresses' ? 'المراتب' : product.category === 'pillows' ? 'المخدات' : product.category === 'protectors' ? 'واقيات المراتب' : product.category === 'pads' ? 'اللبادات' : 'اللحف'}</p><h2><a href={`#/products/${product.id}`}>{product.name}</a></h2><span>من {formatSar(priceForSize(product, size))} <small>ر.س · سعر توضيحي</small></span></div>
              <div className="wishlist-card-actions"><button type="button" onClick={() => addToCart(product.id, size)}><ShoppingBag size={17} aria-hidden="true" /> أضف للسلة</button><button type="button" onClick={() => toggleFavoriteDemo(product.id)} aria-label={`إزالة ${product.name} من المفضلة`}><Trash2 size={17} aria-hidden="true" /><span>إزالة</span></button></div>
            </article>
          })}</div>
        )}
      </div>
    </main>
  )
}
