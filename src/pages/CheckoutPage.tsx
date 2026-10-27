import { ArrowRight, MessageCircle, ShieldCheck, Truck } from 'lucide-react'
import { useEffect, useMemo, type FormEvent } from 'react'
import { useDemoUi } from '../context/DemoUiContext'
import { demoStoreProducts, priceForSize } from '../data/demoStoreProducts'
import { publicAsset } from '../data/publicAsset'
import { siteConfig } from '../data/siteConfig'

const formatSar = (value: number) => new Intl.NumberFormat('ar-SA').format(value)

export function CheckoutPage() {
  const { cartItems } = useDemoUi()
  useEffect(() => {
    document.title = `إتمام الطلب | ${siteConfig.brandNameAr}`
    return () => { document.title = `${siteConfig.brandNameAr} | ${siteConfig.brandNameEn} — مراتب ومفروشات نوم` }
  }, [])
  const lines = useMemo(() => cartItems.flatMap((item) => {
    const product = demoStoreProducts.find((candidate) => candidate.id === item.productId)
    return product ? [{ ...item, product, unitPrice: priceForSize(product, item.size), total: priceForSize(product, item.size) * item.quantity }] : []
  }), [cartItems])
  const subtotal = lines.reduce((sum, item) => sum + item.total, 0)

  function sendInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const customer = {
      name: String(data.get('name') ?? '').trim(),
      phone: String(data.get('phone') ?? '').trim(),
      city: String(data.get('city') ?? '').trim(),
      address: String(data.get('address') ?? '').trim(),
      notes: String(data.get('notes') ?? '').trim(),
    }
    const message = [
      'مرحبًا كيان، أرغب في الاستفسار عن الطلب التالي وتأكيد السعر والتوفر والتوصيل:',
      `الاسم: ${customer.name}`,
      `رقم التواصل: ${customer.phone}`,
      `المدينة: ${customer.city}`,
      `العنوان: ${customer.address}`,
      ...(customer.notes ? [`ملاحظات التوصيل: ${customer.notes}`] : []),
      'المنتجات:',
      ...lines.map(({ product, size, quantity, total, isSuggested }) => `• ${product.name}${isSuggested ? ' (إضافة اختيارية)' : ''} — المقاس ${size} — الكمية ${quantity} — ${formatSar(total)} ر.س`),
      `الإجمالي التقديري للمعاينة: ${formatSar(subtotal)} ر.س (قبل التوصيل)`,
      'أرجو تأكيد السعر النهائي والتوفر ورسوم وموعد التوصيل وطرق الدفع قبل اعتماد الطلب.',
    ].join('\n')
    window.open(`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <main id="main-content" className="checkout-page">
      <div className="store-container">
        <nav className="cart-breadcrumb" aria-label="مسار الصفحة">
          <a href={publicAsset('/')}>الرئيسية</a><span aria-hidden="true">›</span><a href="#/cart">سلة التسوق</a><span aria-hidden="true">›</span><span aria-current="page">إتمام الطلب</span>
        </nav>
        <header className="checkout-heading"><p>خطوة أخيرة لمراجعة طلبك</p><h1>بيانات التوصيل</h1><span>الطلب هنا استفسار مبدئي؛ كيان يؤكد التفاصيل قبل اعتماد أي طلب.</span></header>

        {lines.length === 0 ? (
          <section className="cart-empty"><span className="cart-empty-icon"><MessageCircle size={26} aria-hidden="true" /></span><h2>سلتك فارغة</h2><p>أضف المنتجات التي ترغب بها أولًا، ثم أكمل بيانات التوصيل.</p><a href="#/store" className="cart-primary-button">تصفح المتجر <ArrowRight size={17} /></a></section>
        ) : (
          <div className="checkout-layout">
            <form className="checkout-form" onSubmit={sendInquiry}>
              <section className="checkout-fields" aria-labelledby="checkout-contact-title">
                <div className="checkout-section-title"><span>١</span><div><h2 id="checkout-contact-title">معلومات التواصل</h2><p>سنضعها في رسالة واتساب التي تراجعها قبل إرسالها.</p></div></div>
                <div className="checkout-field-grid">
                  <label className="checkout-field"><span>الاسم الكامل <b>*</b></span><input name="name" autoComplete="name" required maxLength={80} placeholder="الاسم الذي نتواصل معه" /></label>
                  <label className="checkout-field"><span>رقم الجوال <b>*</b></span><input name="phone" type="tel" autoComplete="tel" inputMode="tel" dir="ltr" required maxLength={24} placeholder="05xxxxxxxx أو رمز الدولة" /></label>
                </div>
              </section>
              <section className="checkout-fields" aria-labelledby="checkout-address-title">
                <div className="checkout-section-title"><span>٢</span><div><h2 id="checkout-address-title">عنوان التوصيل</h2><p>شارك المدينة والعنوان لتأكيد إمكانية ورسوم التوصيل.</p></div></div>
                <div className="checkout-field-grid">
                  <label className="checkout-field"><span>المدينة <b>*</b></span><input name="city" autoComplete="address-level2" required maxLength={60} placeholder="مثال: الرياض" /></label>
                  <label className="checkout-field checkout-field-wide"><span>الحي والشارع ورقم المبنى <b>*</b></span><textarea name="address" autoComplete="street-address" required rows={3} maxLength={240} placeholder="اكتب وصفًا واضحًا للعنوان" /></label>
                  <label className="checkout-field checkout-field-wide"><span>ملاحظات إضافية <small>اختياري</small></span><textarea name="notes" rows={2} maxLength={180} placeholder="علامة مميزة أو وقت مناسب للتواصل" /></label>
                </div>
              </section>
              <div className="checkout-reassurance"><ShieldCheck size={19} aria-hidden="true" /><p>لن تُرسل البيانات تلقائيًا؛ ستفتح رسالة واتساب لتراجعها وترسلها بنفسك.</p></div>
              <button className="checkout-submit" type="submit"><MessageCircle size={19} aria-hidden="true" />مراجعة الطلب عبر واتساب</button>
            </form>

            <aside className="checkout-summary" aria-labelledby="checkout-summary-title">
              <h2 id="checkout-summary-title">ملخص السلة</h2>
              <div className="checkout-lines">{lines.map(({ product, size, quantity, unitPrice, total, isSuggested }) => <article className="checkout-line" key={`${product.id}:${size}`}><img src={product.image} alt="" width="64" height="64" /><div><strong>{product.name}{isSuggested && <small>إضافة اختيارية</small>}</strong><span dir="rtl">{size} · الكمية {formatSar(quantity)} × {formatSar(unitPrice)} ر.س</span></div><b>{formatSar(total)} <small>ر.س</small></b></article>)}</div>
              <div className="checkout-summary-row"><span>المجموع الفرعي</span><strong>{formatSar(subtotal)} ر.س</strong></div>
              <div className="checkout-summary-row"><span><Truck size={16} aria-hidden="true" /> التوصيل</span><span>يؤكد مع كيان</span></div>
              <div className="checkout-summary-total"><span>الإجمالي التقديري</span><strong>{formatSar(subtotal)} <small>ر.س</small></strong></div>
              <p className="checkout-estimate-note">أسعار المعاينة تقديرية وغير معتمدة من كيان. السعر النهائي والتوفر والتوصيل والدفع يُؤكَّدون مع كيان قبل اعتماد الطلب.</p>
              <a href="#/cart" className="checkout-edit-link">العودة لتعديل السلة</a>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}
