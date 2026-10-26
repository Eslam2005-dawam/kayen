import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { siteConfig } from '../../data/siteConfig'
import { useDemoUi } from '../../context/DemoUiContext'

type Props = {
  heroOffset?: boolean
}

export function SiteHeader({ heroOffset = true }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { cartCount, wishlistCount, toggleWishlistDemo } = useDemoUi()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled
            ? 'glass-nav-scrolled border-beige/80 shadow-sm'
            : heroOffset
              ? 'glass-nav border-white/20'
              : 'glass-nav-scrolled border-beige/80'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:gap-4 sm:py-3.5">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-burgundy lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <a
            href="#"
            className="group flex shrink-0 flex-col leading-none"
            aria-label={`${siteConfig.brandNameAr} — الرئيسية`}
          >
            <span className="text-lg font-semibold tracking-tight text-burgundy sm:text-xl">
              {siteConfig.brandNameEn}
            </span>
            <span className="text-[11px] text-charcoal/70 sm:text-xs">
              {siteConfig.brandNameAr}
            </span>
          </a>

          <nav
            className="hidden flex-1 items-center justify-center gap-6 lg:flex"
            aria-label="التنقل الرئيسي"
          >
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className="text-sm font-medium text-charcoal/85 transition hover:text-burgundy"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="ms-auto flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-lg text-burgundy transition hover:bg-beige/50"
              aria-label="بحث"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((o) => !o)}
            >
              <Search className="h-5 w-5" />
            </button>
            <a
              href="#account-demo"
              className="hidden h-11 w-11 items-center justify-center rounded-lg text-burgundy transition hover:bg-beige/50 sm:flex"
              aria-label="حسابي — تجريبي"
            >
              <User className="h-5 w-5" />
            </a>
            <button
              type="button"
              className="relative flex h-11 w-11 items-center justify-center rounded-lg text-burgundy transition hover:bg-beige/50"
              aria-label="المفضلة — تجريبي"
              onClick={toggleWishlistDemo}
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 end-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-burgundy px-1 text-[10px] text-white">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              type="button"
              className="relative flex h-11 w-11 items-center justify-center rounded-lg text-burgundy transition hover:bg-beige/50"
              aria-label="السلة — تجريبي"
              onClick={() => {
                /* demo only */
              }}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 end-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-burgundy px-1 text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-beige/70 bg-ivory/95 px-4 py-3">
            <label className="mx-auto flex max-w-6xl items-center gap-2">
              <span className="sr-only">بحث في المنتجات</span>
              <Search className="h-4 w-4 shrink-0 text-charcoal/50" aria-hidden />
              <input
                type="search"
                placeholder="ابحث عن مراتب، مخدات…"
                className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-charcoal/45"
              />
            </label>
          </div>
        )}
      </header>

      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 lg:hidden ${menuOpen ? '' : 'pointer-events-none'}`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-charcoal/40 transition-opacity duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="إغلاق القائمة"
          tabIndex={menuOpen ? 0 : -1}
          onClick={closeMenu}
        />
        <nav
          className={`absolute top-0 bottom-0 start-0 w-[min(100%,20rem)] border-e border-beige/80 bg-ivory shadow-xl transition-transform duration-300 ease-out ${
            menuOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full'
          }`}
          aria-label="قائمة الجوال"
        >
          <div className="flex items-center justify-between border-b border-beige/70 px-4 py-4">
            <span className="font-semibold text-burgundy">{siteConfig.brandNameAr}</span>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-lg"
              aria-label="إغلاق"
              onClick={closeMenu}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <ul className="flex flex-col gap-1 p-3">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href + link.label}>
                <a
                  href={link.href}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-charcoal hover:bg-beige/60"
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
