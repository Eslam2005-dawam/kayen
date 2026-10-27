import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { ChevronDown, Heart, Search, ShoppingBag, SlidersHorizontal, X } from 'lucide-react'
import { useDemoUi } from '../context/DemoUiContext'
import { demoStoreProducts, priceForSize, storeCategories, type StoreCategory, type StoreProduct } from '../data/demoStoreProducts'
import { publicAsset } from '../data/publicAsset'
import { categories } from '../data/categories'
import { siteConfig } from '../data/siteConfig'

type Filters = {
  category: string
  size: string
  material: string
  color: string
  comfort: string
  stock: string
  minPrice: string
  maxPrice: string
}

const emptyFilters: Filters = {
  category: '', size: '', material: '', color: '', comfort: '', stock: '', minPrice: '', maxPrice: '',
}

function buildFilterOptions(products: StoreProduct[], showCategory: boolean) {
  const sizes = [...new Set(products.flatMap((product) => product.sizes))].sort()
  const materials = [...new Set(products.map((product) => product.material))]
  const colors = [...new Set(products.map((product) => product.color))]
  const comforts = [...new Set(products.flatMap((product) => product.comfort ? [product.comfort] : []))]
  const fields = [
    { key: 'size' as const, label: 'المقاس', options: sizes.map((size) => ({ value: size, label: size })) },
    { key: 'material' as const, label: 'الخامة', options: materials.map((material) => ({ value: material, label: material })) },
    { key: 'color' as const, label: 'اللون', options: colors.map((color) => ({ value: color, label: color })) },
    ...(comforts.length ? [{ key: 'comfort' as const, label: 'الراحة', options: comforts.map((comfort) => ({ value: comfort, label: comfort })) }] : []),
    { key: 'stock' as const, label: 'التوفر', options: [{ value: 'available', label: 'متوفر' }, { value: 'unavailable', label: 'غير متوفر' }] },
  ]
  return showCategory
    ? [{ key: 'category' as const, label: 'القسم', options: storeCategories.map((category) => ({ value: category.id, label: category.label })) }, ...fields]
    : fields
}

type FilterOption = ReturnType<typeof buildFilterOptions>[number]

function formatPrice(price: number) {
  return new Intl.NumberFormat('ar-SA').format(price)
}

function FiltersFields({ value, onChange, options }: { value: Filters; onChange: (filters: Filters) => void; options: FilterOption[] }) {
  return (
    <div className="store-filter-fields">
      {options.map((field) => (
        <label key={field.key} className="store-select-wrap">
          <span className="sr-only">{field.label}</span>
          <select
            aria-label={field.label}
            value={value[field.key]}
            onChange={(event) => onChange({ ...value, [field.key]: event.target.value })}
            className="store-select"
          >
            <option value="">{field.label}</option>
            {field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
          <ChevronDown size={14} aria-hidden="true" />
        </label>
      ))}
      <div className="store-price-range" role="group" aria-label="نطاق السعر بالريال السعودي">
        <span className="store-price-label">السعر</span>
        <input aria-label="السعر من" type="number" min="0" inputMode="numeric" placeholder="من" value={value.minPrice} onChange={(event) => onChange({ ...value, minPrice: event.target.value })} />
        <span aria-hidden="true">–</span>
        <input aria-label="السعر إلى" type="number" min="0" inputMode="numeric" placeholder="إلى" value={value.maxPrice} onChange={(event) => onChange({ ...value, maxPrice: event.target.value })} />
      </div>
    </div>
  )
}

function StoreProductCard({ product, index }: { product: StoreProduct; index: number }) {
  const { addToCart, favoriteIds, toggleFavoriteDemo } = useDemoUi()
  const [size, setSize] = useState(product.sizes[0])
  const [imageFailed, setImageFailed] = useState(false)
  const favorite = favoriteIds.includes(product.id)
  const discount = product.previousPrice ? Math.round((1 - product.price / product.previousPrice) * 100) : 0

  return (
    <article className="store-product-card">
      <div className="store-product-media">
        <a className="store-product-image-link" href={`#/products/${product.id}`} aria-label={`عرض تفاصيل ${product.name}`}>
          {imageFailed ? (
            <div className="flex h-full items-center justify-center bg-beige/30 px-4 text-center text-sm text-charcoal/55">صورة المنتج غير متاحة</div>
          ) : (
            <img src={product.image} alt={`صورة توضيحية: ${product.name}`} loading={index < 4 ? 'eager' : 'lazy'} width="800" height="600" style={{ objectPosition: product.imagePosition ?? 'center 50%' }} onError={() => setImageFailed(true)} />
          )}
        </a>
        <div className="store-card-badges">
          {discount > 0 && <span className="store-badge store-badge-sale">خصم {discount}٪</span>}
          {product.badge === 'new' && <span className="store-badge">جديد</span>}
          {product.badge === 'bestseller' && <span className="store-badge">مميز</span>}
        </div>
        <button type="button" className={`store-favorite ${favorite ? 'is-active' : ''}`} onClick={() => toggleFavoriteDemo(product.id)} aria-label={`${favorite ? 'إزالة من' : 'إضافة إلى'} المفضلة: ${product.name}`} aria-pressed={favorite}>
          <Heart size={18} fill={favorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="store-card-content">
        <p className="store-card-category">{storeCategories.find((category) => category.id === product.category)?.label}</p>
        <h2 className="store-card-title"><a href={`#/products/${product.id}`}>{product.name}</a></h2>
        <p className="store-card-description">{product.description}</p>
        <div className="store-card-prices">
          <strong>{formatPrice(priceForSize(product, size))} <small>ر.س</small></strong>
          {product.previousPrice && <del>{formatPrice(product.previousPrice)} ر.س</del>}
        </div>
        <div className="store-card-actions">
          <label className="store-size-select">
            <span className="sr-only">مقاس {product.name}</span>
            <select value={size} onChange={(event) => setSize(event.target.value)} aria-label={`مقاس ${product.name}`}>
              {product.sizes.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
            <ChevronDown size={13} aria-hidden="true" />
          </label>
          <button type="button" className="store-add-button" disabled={!product.inStock} onClick={() => addToCart(product.id, size)}>
            <ShoppingBag size={15} aria-hidden="true" />
            <span>{product.inStock ? 'أضف للسلة' : 'غير متوفر'}</span>
          </button>
        </div>
      </div>
    </article>
  )
}

export function StorePage({ categoryId }: { categoryId?: StoreCategory }) {
  const category = storeCategories.find((item) => item.id === categoryId)
  const categoryImage = categories.find((item) => item.id === categoryId)
  const categoryProducts = useMemo(() => categoryId
    ? demoStoreProducts.filter((product) => product.category === categoryId)
    : demoStoreProducts, [categoryId])
  const filterOptions = useMemo(() => buildFilterOptions(categoryProducts, !categoryId), [categoryProducts, categoryId])
  const [search, setSearch] = useState(() => new URLSearchParams(window.location.hash.split('?')[1] ?? '').get('q') ?? '')
  const [sort, setSort] = useState('relevant')
  const [filters, setFilters] = useState<Filters>(emptyFilters)
  const [draft, setDraft] = useState<Filters>(emptyFilters)
  const [filterOpen, setFilterOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(8)
  const filterButtonRef = useRef<HTMLButtonElement>(null)
  const filterSheetRef = useRef<HTMLElement>(null)

  useEffect(() => {
    document.title = `${category ? category.label : 'المتجر'} | ${siteConfig.brandNameAr}`
    return () => { document.title = `${siteConfig.brandNameAr} | ${siteConfig.brandNameEn} — مراتب ومفروشات نوم` }
  }, [category])

  useEffect(() => {
    const syncSearchFromUrl = () => {
      const hash = window.location.hash
      if (!hash.startsWith('#/store') && !hash.startsWith('#/categories/')) return
      updateSearch(new URLSearchParams(hash.split('?')[1] ?? '').get('q') ?? '')
    }
    window.addEventListener('hashchange', syncSearchFromUrl)
    return () => window.removeEventListener('hashchange', syncSearchFromUrl)
  }, [])

  useEffect(() => {
    if (!filterOpen) return
    filterSheetRef.current?.querySelector('button')?.focus()
    const onDialogKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFilterOpen(false)
      if (event.key !== 'Tab' || !filterSheetRef.current) return
      const focusable = [...filterSheetRef.current.querySelectorAll<HTMLElement>('button, input, select')].filter((element) => !element.hasAttribute('disabled'))
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }
    document.addEventListener('keydown', onDialogKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onDialogKey); document.body.style.overflow = ''; filterButtonRef.current?.focus() }
  }, [filterOpen])

  const filtered = useMemo(() => {
    const term = search.trim().toLocaleLowerCase('ar')
    const items = categoryProducts.filter((product) => {
      const categoryName = storeCategories.find((category) => category.id === product.category)?.label ?? ''
      const searchable = [product.name, product.description, categoryName, product.material, product.color, product.comfort, ...product.sizes].join(' ').toLocaleLowerCase('ar')
      return (!term || searchable.includes(term))
        && (!filters.category || product.category === filters.category)
        && (!filters.size || product.sizes.includes(filters.size))
        && (!filters.material || product.material === filters.material)
        && (!filters.color || product.color === filters.color)
        && (!filters.comfort || product.comfort === filters.comfort)
        && (!filters.stock || product.inStock === (filters.stock === 'available'))
        && (!filters.minPrice || product.price >= Number(filters.minPrice))
        && (!filters.maxPrice || product.price <= Number(filters.maxPrice))
    })
    return sort === 'relevant' ? items : items.sort((a, b) => sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : b.order - a.order)
  }, [search, sort, filters, categoryProducts])

  const activeFilters: { key: keyof Filters; label: string }[] = filterOptions.flatMap((field) => {
    const selected = filters[field.key]
    const label = field.options.find((option) => option.value === selected)?.label
    return selected ? [{ key: field.key, label: `${field.label}: ${label ?? selected}` }] : []
  })
  if (filters.minPrice) activeFilters.push({ key: 'minPrice', label: `من ${formatPrice(Number(filters.minPrice))} ر.س` })
  if (filters.maxPrice) activeFilters.push({ key: 'maxPrice', label: `إلى ${formatPrice(Number(filters.maxPrice))} ر.س` })

  const updateFilters = (next: Filters) => { setFilters(next); setVisibleCount(8) }
  const updateSearch = (next: string) => { setSearch(next); setVisibleCount(8) }
  const clearFilters = () => { updateFilters(emptyFilters); setDraft(emptyFilters) }

  return (
    <main id="main-content" className="store-page">
      <div className={`store-intro ${category ? 'store-category-intro' : ''}`} style={{ '--store-intro-image': `url("${categoryImage?.imageDesktop ?? publicAsset('/images/store/mattress-cotton.webp')}")` } as CSSProperties}>
        <div className="store-container">
          <nav aria-label="مسار الصفحة" className="store-breadcrumb"><a href={publicAsset('/')}>الرئيسية</a><span aria-hidden="true">‹</span>{category ? <><a href={publicAsset('/#/store')}>المتجر</a><span aria-hidden="true">‹</span><span aria-current="page">{category.label}</span></> : <span aria-current="page">المتجر</span>}</nav>
          <div className="store-intro-copy"><p className="store-eyebrow">{category ? 'تسوق حسب القسم' : 'تشكيلة كيان'}</p><h1>{category ? category.label : 'اكتشف مجموعتنا'}</h1><p>{category ? `تصفح منتجات ${category.label} واختر ما يناسبك من التشكيلة.` : 'اختر من المراتب ومستلزمات النوم ما يناسب غرفتك.'}</p></div>
        </div>
      </div>

      <div className="store-container store-main">
        {category && <nav className="store-category-switcher" aria-label="تصفح الأقسام">{categories.map((item) => <a key={item.id} href={item.href} aria-current={item.id === categoryId ? 'page' : undefined} className={item.id === categoryId ? 'is-current' : ''}>{item.name}</a>)}</nav>}
        <p className="store-demo-notice">منتجات وصور وأسعار وتوفر للعرض التوضيحي فقط؛ تُحدَّث عند اعتماد الكتالوج الرسمي.</p>
        <div className="store-toolbar">
          <label className="store-search"><Search size={19} aria-hidden="true" /><span className="sr-only">ابحث في المنتجات</span><input type="search" placeholder="ابحث عن منتج..." value={search} onChange={(event) => updateSearch(event.target.value)} /></label>
          <div className="store-toolbar-end"><span className="store-result-count" aria-live="polite">عرض {filtered.length} من المنتجات</span><label className="store-sort"><span className="sr-only">ترتيب المنتجات</span><select aria-label="ترتيب المنتجات" value={sort} onChange={(event) => setSort(event.target.value)}><option value="relevant">الأكثر صلة</option><option value="price-asc">السعر: من الأقل للأعلى</option><option value="price-desc">السعر: من الأعلى للأقل</option><option value="newest">الأحدث</option></select><ChevronDown size={15} aria-hidden="true" /></label><button ref={filterButtonRef} type="button" className="store-mobile-filter-button" onClick={() => { setDraft(filters); setFilterOpen(true) }}><SlidersHorizontal size={17} /> الفلاتر{activeFilters.length > 0 && <span>{activeFilters.length}</span>}</button></div>
        </div>

        <div className="store-desktop-filters"><FiltersFields value={filters} onChange={updateFilters} options={filterOptions} />{activeFilters.length > 0 && <button type="button" className="store-clear-inline" onClick={clearFilters}>إعادة تعيين</button>}</div>
        {activeFilters.length > 0 && <div className="store-active-filters" aria-label="الفلاتر النشطة">{activeFilters.map((filter) => <button key={filter.key} type="button" onClick={() => updateFilters({ ...filters, [filter.key]: '' })}>{filter.label}<X size={13} /></button>)}<button type="button" className="store-clear-all" onClick={clearFilters}>مسح الكل</button></div>}

        {filtered.length ? <><div className="store-grid">{filtered.slice(0, visibleCount).map((product, index) => <StoreProductCard key={product.id} product={product} index={index} />)}</div>{visibleCount < filtered.length && <div className="store-load-more"><p>عرض {Math.min(visibleCount, filtered.length)} من {filtered.length} منتجًا</p><button type="button" onClick={() => setVisibleCount((count) => count + 8)}>عرض المزيد</button></div>}</> : <div className="store-empty"><Search size={28} aria-hidden="true" /><h2>لم نجد منتجات مطابقة</h2><p>جرّب بحثًا آخر أو امسح الفلاتر المحددة.</p><button type="button" onClick={() => { updateSearch(''); clearFilters() }}>عرض كل المنتجات</button></div>}
      </div>

      {filterOpen && <div className="store-filter-overlay"><button type="button" className="store-filter-backdrop" aria-label="إغلاق الفلاتر" onClick={() => setFilterOpen(false)} /><section ref={filterSheetRef} className="store-filter-sheet" role="dialog" aria-modal="true" aria-labelledby="store-filters-title"><div className="store-sheet-header"><h2 id="store-filters-title">فلترة المنتجات</h2><button type="button" aria-label="إغلاق" onClick={() => setFilterOpen(false)}><X size={22} /></button></div><div className="store-sheet-content"><FiltersFields value={draft} onChange={setDraft} options={filterOptions} /></div><div className="store-sheet-footer"><button type="button" className="store-sheet-clear" onClick={() => setDraft(emptyFilters)}>مسح الفلاتر</button><button type="button" className="store-sheet-apply" onClick={() => { updateFilters(draft); setFilterOpen(false) }}>عرض النتائج</button></div></section></div>}
    </main>
  )
}
