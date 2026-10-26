import { siteConfig } from '../../data/siteConfig'

const productLinks = [
  { label: 'المراتب', href: '#categories' },
  { label: 'المخدات', href: '#categories' },
  { label: 'واقيات المراتب', href: '#categories' },
  { label: 'اللبادات', href: '#categories' },
  { label: 'اللحف', href: '#categories' },
]

const companyLinks = [
  { label: 'صناعة كيان', href: '#craft' },
  { label: 'الأسئلة الشائعة', href: '#faq' },
]

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-beige/80 bg-charcoal text-ivory/90">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-white">{siteConfig.brandNameEn}</p>
          <p className="text-sm text-ivory/70">{siteConfig.brandNameAr}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory/65">
            مراتب ومفروشات تمنح غرفتك تفاصيل أكثر راحة.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">المنتجات</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {productLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="transition hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">الشركة</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {companyLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="transition hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-ivory/55">
        © {year} {siteConfig.brandNameAr}. جميع الحقوق محفوظة.
      </div>
    </footer>
  )
}
