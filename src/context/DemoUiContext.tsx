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
  addToCartDemo: (productName: string) => void
  toggleWishlistDemo: () => void
  quickViewMessage: string | null
  openQuickViewDemo: (productName: string) => void
  clearQuickView: () => void
}

const DemoUiContext = createContext<DemoUiContextValue | null>(null)

export function DemoUiProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [quickViewMessage, setQuickViewMessage] = useState<string | null>(null)

  const addToCartDemo = useCallback((productName: string) => {
    setCartCount((c) => c + 1)
    setQuickViewMessage(`[تجريبي] تمت إضافة «${productName}» إلى السلة`)
    window.setTimeout(() => setQuickViewMessage(null), 3200)
  }, [])

  const toggleWishlistDemo = useCallback(() => {
    setWishlistCount((c) => (c > 0 ? 0 : 1))
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
      addToCartDemo,
      toggleWishlistDemo,
      quickViewMessage,
      openQuickViewDemo,
      clearQuickView,
    }),
    [
      cartCount,
      wishlistCount,
      addToCartDemo,
      toggleWishlistDemo,
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
