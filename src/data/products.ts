/** Homepage teaser cards share the same illustrative catalog as the store. */
import { demoStoreProducts } from './demoStoreProducts'

export type DemoProduct = {
  id: string
  name: string
  priceSar: number
  compareAtSar?: number
  image: string
  imageWidth: number
  imageHeight: number
  href: string
  badge?: 'sale'
}

export const productsDemoNotice =
  'المنتجات والأسعار المعروضة للتوضيح فقط حتى اعتماد كتالوج كيان الرسمي.'

const featuredIds = ['m-01', 'm-02', 'p-01', 'pr-01', 'pa-01', 'd-01']

export const demoProducts: DemoProduct[] = featuredIds.flatMap((id) => {
  const product = demoStoreProducts.find((item) => item.id === id)
  return product ? [{
    id: product.id,
    name: product.name,
    priceSar: product.price,
    compareAtSar: product.previousPrice,
    image: product.image,
    imageWidth: 1122,
    imageHeight: 1408,
    href: `#/products/${product.id}`,
    badge: product.previousPrice ? 'sale' as const : undefined,
  }] : []
})
