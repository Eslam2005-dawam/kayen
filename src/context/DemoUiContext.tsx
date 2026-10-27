import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type DemoUiContextValue = {
  cartCount: number
  wishlistCount: number
  favoriteIds: string[]
  addToCartDemo: (productName: string, quantity?: number) => void
  toggleWishlistDemo: () => void
  toggleFavoriteDemo: (productId: string) => void
  quickViewMessage: string | null
  openQuickViewDemo: (productName: string) => void
  clearQuickView: () => void
}

const DemoUiContext = createContext<DemoUiContextValue | null>(null)

export function DemoUiProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0)
  const [homeFavorite, setHomeFavorite] = useState(false)
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const wishlistCount = favoriteIds.length + Number(homeFavorite)
  const [quickViewMessage, setQuickViewMessage] = useState<string | null>(null)

  const addToCartDemo = useCallback((productName: string, quantity = 1) => {
    setCartCount((c) => c + quantity)
    setQuickViewMessage(`[تجريبي] تمت إضافة ${quantity > 1 ? `${quantity} × ` : ''}«${productName}» إلى السلة`)
    window.setTimeout(() => setQuickViewMessage(null), 3200)
  }, [])

  const toggleWishlistDemo = useCallback(() => {
    setHomeFavorite((current) => !current)
  }, [])

  const toggleFavoriteDemo = useCallback((productId: string) => {
    setFavoriteIds((current) => current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId])
  }, [])

  const openQuickViewDemo = useCallback((productName: string) => {
    setQuickViewMessage(`[تجريبي] معاينة سريعة: ${productName}`)
    window.setTimeout(() => setQuickViewMessage(null), 3200)
  }, [])

  const clearQuickView = useCallback(() => setQuickViewMessage(null), [])

  const value = useMemo(
    () => ({
      cartCount,
      wishlistCount,
      favoriteIds,
      addToCartDemo,
      toggleWishlistDemo,
      toggleFavoriteDemo,
      quickViewMessage,
      openQuickViewDemo,
      clearQuickView,
    }),
    [
      cartCount,
      wishlistCount,
      favoriteIds,
      addToCartDemo,
      toggleWishlistDemo,
      toggleFavoriteDemo,
      quickViewMessage,
      openQuickViewDemo,
      clearQuickView,
    ],
  )

  return (
    <DemoUiContext.Provider value={value}>{children}</DemoUiContext.Provider>
  )
}

export function useDemoUi() {
  const ctx = useContext(DemoUiContext)
  if (!ctx) throw new Error('useDemoUi must be used within DemoUiProvider')
  return ctx
}
