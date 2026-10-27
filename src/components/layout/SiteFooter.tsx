import { siteConfig } from '../../data/siteConfig'
import { publicAsset } from '../../data/publicAsset'
import { categories } from '../../data/categories'

const productLinks = categories.map(({ name, href }) => ({ label: name, href }))

const companyLinks = [
  { label: 'المتجر', href: '#/store' },
  { label: 'صناعة كيان', href: '#craft' },
  { label: 'الأسئلة الشائعة', href: '#faq' },
]

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t-2 border-gold/75 bg-burgundy-deep text-ivory/90">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-gold-light">{siteConfig.brandNameEn}</p>
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
                <a href={publicAsset(`/${l.href}`)} className="transition hover:text-gold-light">
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
                <a href={publicAsset(`/${l.href}`)} className="transition hover:text-gold-light">
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
