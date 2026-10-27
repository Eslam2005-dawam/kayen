import { publicAsset } from './publicAsset'
import { productPrimaryImage } from './productImages'

export const storeCategories = [
  { id: 'mattresses', label: 'المراتب' },
  { id: 'pillows', label: 'المخدات' },
  { id: 'protectors', label: 'واقيات المراتب' },
  { id: 'pads', label: 'اللبادات' },
  { id: 'duvets', label: 'اللحف' },
] as const

export type StoreCategory = (typeof storeCategories)[number]['id']

export type StoreProduct = {
  id: string
  name: string
  description: string
  category: StoreCategory
  price: number
  previousPrice?: number
  sizes: string[]
  /** Illustrative market-range estimates by size; replace with approved KAYAN prices. */
  sizePrices?: Record<string, number>
  material: string
  color: string
  comfort?: string
  inStock: boolean
  image: string
  imagePosition?: string
  badge?: 'new' | 'bestseller'
  order: number
}

const fallback = {
  mattresses: publicAsset('/images/categories/mattresses.webp'),
  pillows: publicAsset('/images/categories/pillows.webp'),
  protectors: publicAsset('/images/categories/mattress-protectors.webp'),
  pads: publicAsset('/images/categories/bedding-pads.webp'),
  duvets: publicAsset('/images/categories/duvets.webp'),
}

const img = (id: string, category: StoreCategory) => productPrimaryImage(id, fallback[category])

/** Names follow supplied image filenames where available. Prices and stock remain illustrative sample data. */
export const demoStoreProducts: StoreProduct[] = [
  { id: 'm-01', name: 'مرتبة Gray Mattress', description: 'تصميم مبطن بدرجات رمادية', category: 'mattresses', price: 1399, sizePrices: { '120×200': 1399, '140×200': 1599, '160×200': 1899, '180×200': 2199 }, sizes: ['120×200', '140×200', '160×200', '180×200'], material: 'قماش مبطن', color: 'رمادي', inStock: true, image: img('m-01', 'mattresses'), badge: 'bestseller', order: 16 },
  { id: 'm-02', name: 'مرتبة Blue Memory Mattress', description: 'تصميم بدرجات الأزرق الداكن', category: 'mattresses', price: 1799, sizePrices: { '120×200': 1799, '160×200': 2199, '180×200': 2499 }, sizes: ['120×200', '160×200', '180×200'], material: 'ميموري فوم', color: 'أزرق', inStock: true, image: img('m-02', 'mattresses'), order: 15 },
  { id: 'm-03', name: 'مرتبة Cotton Max Mattress', description: 'مظهر فاتح بتفاصيل مبطنة', category: 'mattresses', price: 1499, sizePrices: { '120×200': 1499, '140×200': 1699, '160×200': 1899, '180×200': 2199 }, sizes: ['120×200', '140×200', '160×200', '180×200'], material: 'قماش مبطن', color: 'بيج', inStock: true, image: img('m-03', 'mattresses'), badge: 'new', order: 18 },
  { id: 'p-01', name: 'مخدة اللاتكس', description: 'تصميم مثقب بلون فاتح', category: 'pillows', price: 275, sizes: ['50×70'], material: 'لاتكس', color: 'أبيض', inStock: true, image: img('p-01', 'pillows'), order: 14 },
  { id: 'p-02', name: 'مخدة الميموري فوم', description: 'وسادة بلون محايد', category: 'pillows', price: 99, sizePrices: { '50×70': 99, '60×80': 129 }, sizes: ['50×70', '60×80'], material: 'ميموري فوم', color: 'أبيض', inStock: true, image: img('p-02', 'pillows'), order: 13 },
  { id: 'p-03', name: 'مخدة الجل البارد', description: 'مخدة بتفاصيل هادئة', category: 'pillows', price: 107, sizes: ['50×70'], material: 'جل', color: 'أبيض', inStock: true, image: img('p-03', 'pillows'), order: 12 },
  { id: 'pr-01', name: 'واقي المرتبة القطني', description: 'غطاء فاتح للمرتبة', category: 'protectors', price: 79, sizePrices: { '120×200': 79, '160×200': 95, '180×200': 115 }, sizes: ['120×200', '160×200', '180×200'], material: 'قطن', color: 'أبيض', inStock: true, image: img('pr-01', 'protectors'), order: 11 },
  { id: 'pr-02', name: 'واقي المرتبة الفاخر', description: 'غطاء بتصميم محايد', category: 'protectors', price: 99, sizePrices: { '120×200': 99, '160×200': 129, '180×200': 149 }, sizes: ['120×200', '160×200', '180×200'], material: 'قماش', color: 'أبيض', inStock: true, image: img('pr-02', 'protectors'), order: 10 },
  { id: 'pr-03', name: 'واقي المرتبة ضد السوائل', description: 'غطاء مخصص للمرتبة', category: 'protectors', price: 74, sizePrices: { '120×200': 74, '160×200': 89, '180×200': 100 }, sizes: ['120×200', '160×200', '180×200'], material: 'قماش', color: 'أبيض', inStock: true, image: img('pr-03', 'protectors'), order: 9 },
  { id: 'pr-04', name: 'واقي المرتبة الفندقي', description: 'غطاء فاتح بمظهر مرتب', category: 'protectors', price: 85, sizePrices: { '160×200': 85, '180×200': 115 }, sizes: ['160×200', '180×200'], material: 'قماش', color: 'أبيض', inStock: true, image: img('pr-04', 'protectors'), order: 8 },
  { id: 'pa-01', name: 'لبادة كيان المبطنة', description: 'تصميم مبطن للسرير', category: 'pads', price: 239, sizePrices: { '120×200': 239, '160×200': 299, '180×200': 349 }, sizes: ['120×200', '160×200', '180×200'], material: 'ألياف', color: 'أبيض', inStock: true, image: img('pa-01', 'pads'), order: 7 },
  { id: 'pa-02', name: 'لبادة قطنية', description: 'مظهر فاتح بتنسيق بسيط', category: 'pads', price: 279, sizePrices: { '140×200': 279, '160×200': 329 }, sizes: ['140×200', '160×200'], material: 'قطن', color: 'بيج', inStock: true, image: img('pa-02', 'pads'), order: 6 },
  { id: 'd-01', name: 'اللحاف الصيفي الخفيف', description: 'لحاف فاتح لتنسيق السرير', category: 'duvets', price: 399, sizePrices: { '160×200': 399, '200×220': 499 }, sizes: ['160×200', '200×220'], material: 'قماش', color: 'أبيض', inStock: true, image: img('d-01', 'duvets'), order: 5 },
  { id: 'd-02', name: 'اللحاف الشتوي', description: 'لحاف بتصميم مبطن', category: 'duvets', price: 499, sizePrices: { '160×200': 499, '200×220': 649 }, sizes: ['160×200', '200×220'], material: 'قماش', color: 'أبيض', inStock: true, image: img('d-02', 'duvets'), order: 4 },
  { id: 'd-03', name: 'اللحاف الفندقي', description: 'لون أبيض بتصميم بسيط', category: 'duvets', price: 575, sizePrices: { '160×200': 575, '200×220': 675 }, sizes: ['160×200', '200×220'], material: 'قماش', color: 'أبيض', inStock: true, image: img('d-03', 'duvets'), order: 3 },
  { id: 'd-04', name: 'لحاف مايكروفايبر', description: 'نسيج بمظهر هادئ', category: 'duvets', price: 349, sizePrices: { '160×200': 349, '200×220': 449 }, sizes: ['160×200', '200×220'], material: 'مايكروفايبر', color: 'أبيض', inStock: true, image: img('d-04', 'duvets'), order: 2 },
]

export function priceForSize(product: StoreProduct, size?: string) {
  return size && product.sizePrices?.[size] !== undefined ? product.sizePrices[size] : product.price
}
