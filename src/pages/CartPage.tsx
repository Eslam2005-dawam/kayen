import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useDemoUi } from '../context/DemoUiContext'
import { demoStoreProducts, priceForSize, storeCategories, type StoreCategory } from '../data/demoStoreProducts'
import { publicAsset } from '../data/publicAsset'
import { siteConfig } from '../data/siteConfig'

const formatSar = (value: number) => new Intl.NumberFormat('ar-SA').format(value)
const dismissedStorageKey = 'kayan-cart-dismissed-suggestions-v1'
const complementaryProducts: Record<StoreCategory, string[]> = {
  mattresses: ['p-01', 'pr-03'],
  pillows: ['pr-03', 'd-01'],
  protectors: ['p-01', 'd-01'],
  pads: ['p-01', 'pr-03'],
  duvets: ['p-01', 'pr-03'],
}

function readDismissedSuggestions() {
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(dismissedStorageKey) ?? '[]')
    return Array.isArray(value) ? value.filter((id): id is string => typeof id === 'string') : []
  } catch {
    return []
  }
}

export function CartPage() {
  const { cartItems, addToCart, updateCartQuantity, removeFromCart } = useDemoUi()
  const [dismissedAddOnIds, setDismissedAddOnIds] = useState<string[]>(readDismissedSuggestions)

  useEffect(() => {
    document.title = `سلة التسوق | ${siteConfig.brandNameAr}`
    return () => { document.title = `${siteConfig.brandNameAr} | ${siteConfig.brandNameEn} — مراتب ومفروشات نوم` }
  }, [])
  const lines = useMemo(() => cartItems.flatMap((item) => {
    const product = demoStoreProducts.find((candidate) => candidate.id === item.productId)
    return product ? [{ ...item, product, unitPrice: priceForSize(product, item.size), lineTotal: priceForSize(product, item.size) * item.quantity }] : []
  }), [cartItems])
  const mainLines = lines.filter((item) => !item.isSuggested)
  const mainProductsKey = mainLines.map((item) => `${item.product.id}:${item.product.category}`).join('|')
  const recommendations = useMemo(() => {
    const existingIds = new Set(mainLines.map((item) => item.product.id))
    const suggestedIds = [...new Set(mainLines.flatMap((item) => complementaryProducts[item.product.category]))]
    return suggestedIds
      .filter((id) => !existingIds.has(id))
      .map((id) => demoStoreProducts.find((product) => product.id === id))
      .filter((product): product is (typeof demoStoreProducts)[number] => Boolean(product))
      .slice(0, 2)
  }, [mainProductsKey])
  const selectedAddOns = lines.filter((item) => item.isSuggested && recommendations.some((product) => product.id === item.product.id))
  const mainSubtotal = mainLines.reduce((sum, item) => sum + item.lineTotal, 0)
  const addOnSubtotal = selectedAddOns.reduce((sum, item) => sum + item.lineTotal, 0)
  const subtotal = mainSubtotal + addOnSubtotal
  const itemCount = [...mainLines, ...selectedAddOns].reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    try { window.localStorage.setItem(dismissedStorageKey, JSON.stringify(dismissedAddOnIds)) } catch { /* storage may be unavailable */ }
  }, [dismissedAddOnIds])

  useEffect(() => {
    if (mainLines.length === 0) {
      cartItems.filter((item) => item.isSuggested).forEach((item) => removeFromCart(item.productId, item.size))
      return
    }
    const validSuggestionIds = new Set(recommendations.filter((product) => !dismissedAddOnIds.includes(product.id)).map((product) => product.id))
    cartItems.filter((item) => item.isSuggested && !validSuggestionIds.has(item.productId))
      .forEach((item) => removeFromCart(item.productId, item.size))
    recommendations.forEach((product) => {
      const alreadyInCart = cartItems.some((item) => item.productId === product.id)
      if (!dismissedAddOnIds.includes(product.id) && !alreadyInCart) {
        addToCart(product.id, product.sizes[0], 1, 'suggestion')
      }
    })
  }, [mainLines.length, recommendations, cartItems, dismissedAddOnIds, addToCart, removeFromCart])

  function toggleSuggestion(productId: string, checked: boolean) {
    const product = demoStoreProducts.find((item) => item.id === productId)
    setDismissedAddOnIds((current) => checked
      ? current.filter((id) => id !== productId)
      : [...new Set([...current, productId])])
    if (checked && product) addToCart(product.id, product.sizes[0], 1, 'suggestion', true)
    else if (!checked && product) removeFromCart(product.id, product.sizes[0])
  }

  return (
    <main id="main-content" className="cart-page">
      <div className="store-container">
        <nav className="cart-breadcrumb" aria-label="مسار الصفحة">
          <a href={publicAsset('/')}>الرئيسية</a><span aria-hidden="true">›</span><a href={publicAsset('/#/store')}>المتجر</a><span aria-hidden="true">›</span><span aria-current="page">سلة التسوق</span>
        </nav>
        <header className="cart-heading">
          <div><p>راجع اختياراتك قبل المتابعة</p><h1>سلة التسوق</h1></div>
          {itemCount > 0 && <span className="cart-item-count">عدد المنتجات: {formatSar(itemCount)}</span>}
        </header>

        {mainLines.length === 0 ? (
          <section className="cart-empty" aria-labelledby="cart-empty-title">
            <span className="cart-empty-icon"><ShoppingBag size={28} aria-hidden="true" /></span>
            <h2 id="cart-empty-title">سلتك فارغة</h2>
            <p>تصفّح المنتجات وأضف اختياراتك هنا. ستظل سلتك محفوظة على هذا الجهاز.</p>
            <a href="#/store" className="cart-primary-button">ابدأ التسوق <ArrowRight size={17} aria-hidden="true" /></a>
          </section>
        ) : (
          <div className="cart-layout">
            <section className="cart-items" aria-label="المنتجات في سلتك">
              {mainLines.map(({ product, size, quantity, lineTotal }) => {
                const category = storeCategories.find((item) => item.id === product.category)
                return (
                  <article className="cart-item" key={`${product.id}:${size}`}>
                    <a className="cart-item-image" href={`#/products/${product.id}`} aria-label={`تفاصيل ${product.name}`}>
                      <img src={product.image} alt={product.name} width="180" height="180" />
                    </a>
                    <div className="cart-item-main">
                      <div className="cart-item-copy">
                        <p>{category?.label}</p>
                        <h2><a href={`#/products/${product.id}`}>{product.name}</a></h2>
                        <span>المقاس: <strong dir="ltr">{size}</strong></span>
                      </div>
                      <div className="cart-item-price"><strong>{formatSar(priceForSize(product, size))} <small>ر.س</small></strong><span>سعر توضيحي للقطعة</span></div>
                      <div className="cart-item-actions">
                        <div className="cart-quantity" aria-label={`كمية ${product.name}`}>
                          <button type="button" aria-label={`تقليل كمية ${product.name}`} disabled={quantity <= 1} onClick={() => updateCartQuantity(product.id, size, quantity - 1)}><Minus size={15} /></button>
                          <output aria-live="polite">{quantity}</output>
                          <button type="button" aria-label={`زيادة كمية ${product.name}`} disabled={quantity >= 10} onClick={() => updateCartQuantity(product.id, size, quantity + 1)}><Plus size={15} /></button>
                        </div>
                        <button type="button" className="cart-remove" onClick={() => removeFromCart(product.id, size)}><Trash2 size={15} aria-hidden="true" /><span>حذف</span></button>
                      </div>
                      <strong className="cart-line-total">{formatSar(lineTotal)} <small>ر.س</small></strong>
                    </div>
                  </article>
                )
              })}

              {recommendations.length > 0 && <section className="cart-addons" aria-labelledby="cart-addons-title">
                <div className="cart-addons-heading"><div><h2 id="cart-addons-title">كمل تجهيز سريرك</h2></div><span>اختياري</span></div>
                <div className="cart-addons-grid">
                  {recommendations.map((product) => {
                    const isSelected = selectedAddOns.some((item) => item.product.id === product.id)
                    const category = storeCategories.find((item) => item.id === product.category)
                    return <label className={`cart-addon ${isSelected ? 'is-selected' : ''}`} key={product.id}>
                      <input type="checkbox" checked={isSelected} onChange={(event) => toggleSuggestion(product.id, event.target.checked)} aria-label={`${isSelected ? 'إزالة' : 'إضافة'} ${product.name} إلى الطلب`} />
                      <img src={product.image} alt="" width="72" height="72" loading="lazy" />
                      <span className="cart-addon-copy"><small>{category?.label}</small><strong>{product.name}</strong><span>{formatSar(priceForSize(product, product.sizes[0]))} ر.س <em>سعر توضيحي</em></span></span>
                    </label>
                  })}
                </div>
              </section>}

              <a href="#/store" className="cart-continue"><ArrowRight size={16} aria-hidden="true" /> متابعة التسوق</a>
            </section>

            <aside className="cart-summary" aria-labelledby="cart-summary-title">
              <h2 id="cart-summary-title">ملخص الطلب</h2>
              <div className="cart-summary-row"><span>المنتجات الأساسية ({formatSar(mainLines.reduce((sum, item) => sum + item.quantity, 0))})</span><strong>{formatSar(mainSubtotal)} ر.س</strong></div>
              {selectedAddOns.length > 0 && <div className="cart-summary-row"><span>الإضافات المختارة ({formatSar(selectedAddOns.reduce((sum, item) => sum + item.quantity, 0))})</span><strong>{formatSar(addOnSubtotal)} ر.س</strong></div>}
              <div className="cart-summary-row"><span>الشحن</span><span>غير محسوب</span></div>
              <div className="cart-summary-total"><span>الإجمالي</span><strong>{formatSar(subtotal)} <small>ر.س</small></strong></div>
              {/* <p className="cart-summary-note">الأسعار والمقاسات المعروضة للتوضيح. تأكد من السعر النهائي والتوفر ورسوم التوصيل مع كيان قبل اعتماد الطلب.</p> */}
              <a className="cart-primary-button cart-whatsapp-button" href="#/checkout">إتمام الطلب</a>
              {/* <p className="cart-summary-footnote">أدخل بيانات التوصيل، ثم راجع رسالة طلبك قبل إرسالها إلى كيان عبر واتساب.</p> */}
            </aside>
          </div>
        )}
      </div>

      {mainLines.length > 0 && <div className="cart-mobile-action"><div><span>الإجمالي التقديري</span><strong>{formatSar(subtotal)} <small>ر.س</small></strong></div><a href="#/checkout">إتمام الطلب</a></div>}
    </main>
  )
}
