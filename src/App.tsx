import { AnnouncementBar } from './components/layout/AnnouncementBar'
import { SiteFooter } from './components/layout/SiteFooter'
import { SiteHeader } from './components/layout/SiteHeader'
import { DemoToast } from './components/ui/DemoToast'
import { HomePage } from './pages/HomePage'
import { StorePage } from './pages/StorePage'
import { ProductPage } from './pages/ProductPage'
import { DemoUiProvider } from './context/DemoUiContext'
import { useEffect, useState } from 'react'
import { storeCategories, type StoreCategory } from './data/demoStoreProducts'

function currentRoute() {
  const hash = window.location.hash
  const categorySlug = /^#\/categories\/([^/?]+)/.exec(hash)?.[1]
  const productId = /^#\/products\/([^/?]+)/.exec(hash)?.[1]
  const categoryId = storeCategories.find((category) => category.id === categorySlug)?.id
  return { isStore: hash.startsWith('#/store'), isCategoryRoute: Boolean(categorySlug), categoryId, productId }
}

export default function App() {
  const [route, setRoute] = useState(currentRoute)
  useEffect(() => {
    const onHashChange = () => setRoute(currentRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
  useEffect(() => {
    const hash = window.location.hash
    if (hash.startsWith('#/') || hash === '#' || !hash) {
      window.scrollTo(0, 0)
    } else {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    }
  }, [route])
  const categoryId = route.categoryId as StoreCategory | undefined
  const isCatalog = route.isStore || route.isCategoryRoute || Boolean(route.productId)
  return (
    <DemoUiProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-burgundy"
      >
        تخطي إلى المحتوى
      </a>
      <AnnouncementBar />
      <SiteHeader heroOffset={!isCatalog} isStore={isCatalog} />
      {route.productId ? <ProductPage key={route.productId} productId={route.productId} /> : route.isCategoryRoute && !categoryId ? (
        <main id="main-content" className="store-container store-empty"><h1>القسم غير متاح</h1><p>يمكنك تصفح الأقسام المتاحة من المتجر.</p><a href="#/store" className="text-burgundy underline">العودة إلى المتجر</a></main>
      ) : isCatalog ? <StorePage key={categoryId ?? 'store'} categoryId={categoryId} /> : <HomePage />}
      <SiteFooter />
      <DemoToast />
    </DemoUiProvider>
  )
}
