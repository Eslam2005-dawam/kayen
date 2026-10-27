import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { demoStoreProducts } from '../data/demoStoreProducts'

export type CartItem = { productId: string; size: string; quantity: number; isSuggested?: boolean }

type DemoUiContextValue = {
  cartItems: CartItem[]
  cartCount: number
  wishlistCount: number
  favoriteIds: string[]
  addToCart: (productId: string, size: string, quantity?: number, source?: 'suggestion', notify?: boolean) => void
  updateCartQuantity: (productId: string, size: string, quantity: number) => void
  removeFromCart: (productId: string, size: string) => void
  toggleFavoriteDemo: (productId: string) => void
  quickViewMessage: string | null
  toastAction: { label: string; href: string } | null
  openQuickViewDemo: (productName: string) => void
  clearQuickView: () => void
}

const CART_STORAGE_KEY = 'kayan-demo-cart-v1'
const FAVORITES_STORAGE_KEY = 'kayan-demo-favorites-v1'
const DemoUiContext = createContext<DemoUiContextValue | null>(null)

function readStoredFavorites() {
  try {
    const stored: unknown = JSON.parse(window.localStorage.getItem(FAVORITES_STORAGE_KEY) ?? '[]')
    return Array.isArray(stored)
      ? [...new Set(stored.filter((id): id is string => typeof id === 'string' && demoStoreProducts.some((product) => product.id === id)))]
      : []
  } catch {
    return []
  }
}

function readStoredCart(): CartItem[] {
  try {
    const stored: unknown = JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) ?? '[]')
    if (!Array.isArray(stored)) return []
    return stored.filter((item): item is CartItem => {
      if (!item || typeof item !== 'object') return false
      const product = demoStoreProducts.find((candidate) => candidate.id === (item as CartItem).productId)
      return Boolean(product
        && product.sizes.includes((item as CartItem).size)
        && Number.isInteger((item as CartItem).quantity)
        && (item as CartItem).quantity > 0
        && (item as CartItem).quantity <= 10
        && ((item as CartItem).isSuggested === undefined || typeof (item as CartItem).isSuggested === 'boolean'))
    })
  } catch {
    return []
  }
}

export function DemoUiProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(readStoredCart)
  const [favoriteIds, setFavoriteIds] = useState<string[]>(readStoredFavorites)
  const wishlistCount = favoriteIds.length
  const [quickViewMessage, setQuickViewMessage] = useState<string | null>(null)
  const [toastAction, setToastAction] = useState<{ label: string; href: string } | null>(null)
  const toastTimer = useRef<number | null>(null)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const showToast = useCallback((message: string, action: { label: string; href: string } | null = null) => {
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current)
    setQuickViewMessage(message)
    setToastAction(action)
    toastTimer.current = window.setTimeout(() => {
      setQuickViewMessage(null)
      setToastAction(null)
      toastTimer.current = null
    }, 4000)
  }, [])

  useEffect(() => {
    try { window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems)) } catch { /* storage may be unavailable */ }
  }, [cartItems])

  useEffect(() => {
    try { window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds)) } catch { /* storage may be unavailable */ }
  }, [favoriteIds])

  const addToCart = useCallback((productId: string, size: string, quantity = 1, source?: 'suggestion', notify = source !== 'suggestion') => {
    const product = demoStoreProducts.find((item) => item.id === productId)
    if (!product || !product.sizes.includes(size) || !product.inStock) return
    const safeQuantity = Math.max(1, Math.min(10, Math.floor(quantity)))
    setCartItems((current) => {
      const existing = current.find((item) => item.productId === productId && item.size === size)
      if (existing && source === 'suggestion' && existing.isSuggested) return current
      return existing
        ? current.map((item) => item === existing ? { ...item, quantity: Math.min(10, item.quantity + safeQuantity), isSuggested: source === 'suggestion' } : item)
        : [...current, { productId, size, quantity: safeQuantity, ...(source === 'suggestion' ? { isSuggested: true } : {}) }]
    })
    if (notify) {
      const quantityLabel = safeQuantity > 1 ? ` (${safeQuantity})` : ''
      showToast(`تم إضافة ${product.name}${quantityLabel} للسلة`, { label: 'عرض السلة', href: '#/cart' })
    }
  }, [showToast])

  const updateCartQuantity = useCallback((productId: string, size: string, quantity: number) => {
    setCartItems((current) => quantity < 1
      ? current.filter((item) => item.productId !== productId || item.size !== size)
      : current.map((item) => item.productId === productId && item.size === size
        ? { ...item, quantity: Math.min(10, quantity) }
        : item))
  }, [])

  const removeFromCart = useCallback((productId: string, size: string) => {
    setCartItems((current) => current.filter((item) => item.productId !== productId || item.size !== size))
  }, [])

  const toggleFavoriteDemo = useCallback((productId: string) => {
    setFavoriteIds((current) => current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId])
  }, [])
  const openQuickViewDemo = useCallback((productName: string) => {
    showToast(`معاينة سريعة: ${productName}`)
  }, [showToast])
  const clearQuickView = useCallback(() => {
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current)
    toastTimer.current = null
    setQuickViewMessage(null)
    setToastAction(null)
  }, [])

  const value = useMemo(() => ({
    cartItems,
    cartCount,
    wishlistCount,
    favoriteIds,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    toggleFavoriteDemo,
    quickViewMessage,
    toastAction,
    openQuickViewDemo,
    clearQuickView,
  }), [cartItems, cartCount, wishlistCount, favoriteIds, addToCart, updateCartQuantity, removeFromCart, toggleFavoriteDemo, quickViewMessage, toastAction, openQuickViewDemo, clearQuickView])

  return <DemoUiContext.Provider value={value}>{children}</DemoUiContext.Provider>
}

export function useDemoUi() {
  const ctx = useContext(DemoUiContext)
  if (!ctx) throw new Error('useDemoUi must be used within DemoUiProvider')
  return ctx
}
