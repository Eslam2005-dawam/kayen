import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { siteConfig } from '../../data/siteConfig'
import { publicAsset } from '../../data/publicAsset'
import { useDemoUi } from '../../context/DemoUiContext'

type Props = {
  heroOffset?: boolean
  isStore?: boolean
}

export function SiteHeader({ heroOffset = true, isStore = false }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { cartCount, wishlistCount } = useDemoUi()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuPanelRef = useRef<HTMLDivElement>(null)
  const wasMenuOpen = useRef(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchTerm, setSearchTerm] = useState('')

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

  useEffect(() => {
    if (menuOpen) menuPanelRef.current?.querySelector<HTMLElement>('a, nav button')?.focus()
    else if (wasMenuOpen.current) menuButtonRef.current?.focus()
    wasMenuOpen.current = menuOpen
  }, [menuOpen])

  useEffect(() => {
    if (!searchOpen) return
    searchInputRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSearchOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [searchOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        return
      }
      if (event.key !== 'Tab' || !menuPanelRef.current) return
      const focusable = [...menuPanelRef.current.querySelectorAll<HTMLElement>('a, nav button')]
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  useEffect(() => {
    const closeTransientUi = () => {
      setMenuOpen(false)
      setSearchOpen(false)
    }
    window.addEventListener('hashchange', closeTransientUi)
    return () => window.removeEventListener('hashchange', closeTransientUi)
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const query = searchTerm.trim()
    window.location.hash = query ? `#/store?q=${encodeURIComponent(query)}` : '#/store'
    setSearchOpen(false)
  }

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
            ref={menuButtonRef}
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
            href={publicAsset('/')}
            className="group flex shrink-0 items-center"
            aria-label={`${siteConfig.brandNameAr} — الرئيسية`}
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gold/60 bg-white p-0.5 shadow-sm sm:h-14 sm:w-14">
              <img
                src={publicAsset('/images/brand/logo.webp')}
                alt=""
                width="48"
                height="48"
                className="h-full w-full rounded-full object-contain"
              />
            </span>
          </a>

          <nav
            className="hidden flex-1 items-center justify-center gap-6 lg:flex"
            aria-label="التنقل الرئيسي"
          >
            {[...siteConfig.navLinks.slice(0, 1), { label: 'المتجر', href: '#/store' }, ...siteConfig.navLinks.slice(1)].map((link) => (
              <a
                key={link.href + link.label}
                href={isStore && link.href !== '#/store' ? publicAsset(`/${link.href}`) : link.href}
                aria-current={isStore && link.href === '#/store' ? 'page' : undefined}
                className={`text-sm font-medium transition hover:text-burgundy ${isStore && link.href === '#/store' ? 'text-burgundy underline decoration-gold decoration-2 underline-offset-8' : 'text-charcoal/85'}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="ms-auto flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-lg text-burgundy transition hover:bg-beige/50"
              aria-label={searchOpen ? 'إغلاق البحث' : 'بحث في المنتجات'}
              aria-expanded={searchOpen}
              onClick={() => { setSearchOpen((o) => !o); setMenuOpen(false) }}
            >
              {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </button>
            <a
              href="#/account"
              className="hidden h-11 w-11 items-center justify-center rounded-lg text-burgundy transition hover:bg-beige/50 sm:flex"
              aria-label="حسابي"
            >
              <User className="h-5 w-5" />
            </a>
            <a
              href="#/wishlist"
              className="relative flex h-11 w-11 items-center justify-center rounded-lg text-burgundy transition hover:bg-beige/50"
              aria-label={`المفضلة${wishlistCount > 0 ? `، ${wishlistCount} منتجات` : ''}`}
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 end-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-burgundy px-1 text-[10px] text-white">
                  {wishlistCount}
                </span>
              )}
            </a>
            <a
              href="#/cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-lg text-burgundy transition hover:bg-beige/50"
              aria-label={`السلة${cartCount > 0 ? `، عدد المنتجات ${cartCount}` : ''}`}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 end-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-burgundy px-1 text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </a>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-beige/70 bg-ivory/95 px-4 py-3">
            <form onSubmit={submitSearch} className="mx-auto flex max-w-6xl items-center gap-2">
              <label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-beige bg-white px-3">
                <span className="sr-only">بحث في المنتجات</span>
                <Search className="h-4 w-4 shrink-0 text-charcoal/50" aria-hidden />
                <input ref={searchInputRef} value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} type="search" placeholder="ابحث عن مراتب، مخدات…" className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-charcoal/45" />
              </label>
              <button className="min-h-11 rounded-xl bg-burgundy px-5 text-sm font-semibold text-white" type="submit">بحث</button>
            </form>
          </div>
        )}
      </header>

      <div
        id="mobile-nav"
        className={`fixed inset-0 z-[60] lg:hidden ${menuOpen ? '' : 'pointer-events-none'}`}
        ref={menuPanelRef}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-modal={menuOpen || undefined}
        aria-label="قائمة الموقع"
        inert={!menuOpen}
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
            {[...siteConfig.navLinks.slice(0, 1), { label: 'المتجر', href: '#/store' }, ...siteConfig.navLinks.slice(1)].map((link) => (
              <li key={link.href + link.label}>
                <a
                  href={isStore && link.href !== '#/store' ? publicAsset(`/${link.href}`) : link.href}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-charcoal hover:bg-beige/60"
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mx-4 mt-3 grid grid-cols-3 gap-2 border-t border-beige/70 pt-4">
            <a href="#/account" onClick={closeMenu} className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-beige/50 text-sm text-charcoal"><User className="h-4 w-4" /> حسابي</a>
            <a href="#/wishlist" onClick={closeMenu} className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-beige/50 text-sm text-charcoal"><Heart className="h-4 w-4" /> المفضلة</a>
            <a href="#/cart" onClick={closeMenu} className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-beige/50 text-sm text-charcoal"><ShoppingBag className="h-4 w-4" /> السلة</a>
          </div>
        </nav>
      </div>
    </>
  )
}
