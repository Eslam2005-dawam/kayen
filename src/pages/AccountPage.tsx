import { useEffect, useState, type FormEvent } from 'react'
import { ArrowLeft, Eye, EyeOff, UserRound } from 'lucide-react'
import { publicAsset } from '../data/publicAsset'
import { siteConfig } from '../data/siteConfig'

type AccountMode = 'login' | 'register'

export function AccountPage() {
  const [mode, setMode] = useState<AccountMode>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = `حسابي | ${siteConfig.brandNameAr}`
    return () => { document.title = `${siteConfig.brandNameAr} | ${siteConfig.brandNameEn} — مراتب ومفروشات نوم` }
  }, [])

  function submitDemo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const password = String(data.get('password') ?? '')
    const confirmation = String(data.get('confirmPassword') ?? '')
    if (mode === 'register' && password !== confirmation) {
      setError('كلمتا المرور غير متطابقتين. راجعهما ثم حاول مرة أخرى.')
      setNotice('')
      return
    }
    setError('')
    setNotice(mode === 'register'
      ? 'اكتمل التحقق من نموذج التسجيل. هذه نسخة تجريبية: لم نرسل بياناتك أو نحفظها ولم يُنشأ حساب فعلي.'
      : 'اكتمل التحقق من نموذج الدخول. تسجيل الدخول غير متاح حتى ربط الموقع بخادم الحسابات.')
    form.reset()
  }

  function changeMode(nextMode: AccountMode) {
    setMode(nextMode)
    setNotice('')
    setError('')
  }

  return (
    <main id="main-content" className="account-page">
      <div className="store-container">
        <nav className="cart-breadcrumb" aria-label="مسار الصفحة"><a href={publicAsset('/')}>الرئيسية</a><span aria-hidden="true">›</span><span aria-current="page">حسابي</span></nav>
        <section className="account-panel" aria-labelledby="account-title">
          <div className="account-mark"><UserRound size={25} aria-hidden="true" /></div>
          <p className="account-eyebrow">مساحتك في كيان</p><h1 id="account-title">{mode === 'login' ? 'مرحبًا بعودتك' : 'أنشئ حسابك'}</h1><p className="account-intro">هذه واجهة الحساب التجريبية لمتجر كيان.</p>
          <div className="account-tabs" role="group" aria-label="نوع الحساب"><button type="button" aria-pressed={mode === 'login'} className={mode === 'login' ? 'is-active' : ''} onClick={() => changeMode('login')}>تسجيل الدخول</button><button type="button" aria-pressed={mode === 'register'} className={mode === 'register' ? 'is-active' : ''} onClick={() => changeMode('register')}>إنشاء حساب</button></div>
          <form className="account-form" onSubmit={submitDemo}>
            {mode === 'register' && <label><span>الاسم بالكامل <b>*</b></span><input name="name" type="text" autoComplete="name" required maxLength={80} placeholder="اكتب اسمك" /></label>}
            <label><span>البريد الإلكتروني <b>*</b></span><input name="email" type="email" autoComplete="email" required maxLength={120} placeholder="name@example.com" dir="ltr" /></label>
            {mode === 'register' && <label><span>رقم الجوال <small>اختياري</small></span><input name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={24} placeholder="05xxxxxxxx" dir="ltr" /></label>}
            <label><span>كلمة المرور <b>*</b></span><span className="account-password"><input name="password" type={showPassword ? 'text' : 'password'} autoComplete={mode === 'register' ? 'new-password' : 'current-password'} required minLength={8} maxLength={128} placeholder="٨ أحرف على الأقل" dir="ltr" /><button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></span></label>
            {mode === 'register' && <label><span>تأكيد كلمة المرور <b>*</b></span><input name="confirmPassword" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required minLength={8} maxLength={128} placeholder="أعد كتابة كلمة المرور" dir="ltr" /></label>}
            {error && <p className="account-message is-error" role="alert">{error}</p>}
            {notice && <p className="account-message" role="status" aria-live="polite">{notice}</p>}
            <button className="account-submit" type="submit">{mode === 'login' ? 'تسجيل الدخول' : 'إنشاء الحساب'} <ArrowLeft size={17} aria-hidden="true" /></button>
          </form>
          <p className="account-demo-notice">واجهة تجريبية للعرض فقط. لا تدخل كلمة مرور تستخدمها في حساب حقيقي؛ لا يوجد خادم للحسابات في هذه النسخة.</p>
        </section>
      </div>
    </main>
  )
}
