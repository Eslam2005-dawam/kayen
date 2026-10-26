/** Demonstration catalog — not verified KAYAN SKUs or live prices. */
import { publicAsset } from './publicAsset'

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
  'منتجات وأسعار للعرض التوضيحي فقط — ليست قائمة أسعار أو منتجات رسمية.'

export const demoProducts: DemoProduct[] = [
  {
    id: 'demo-1',
    name: 'مرتبة كيان كلاسيك — عرض توضيحي',
    priceSar: 1299,
    compareAtSar: 1599,
    image: publicAsset('/images/categories/mattresses.webp'),
    imageWidth: 960,
    imageHeight: 1440,
    href: '#',
    badge: 'sale',
  },
  {
    id: 'demo-2',
    name: 'مرتبة كيان بلس — عرض توضيحي',
    priceSar: 1899,
    image: publicAsset('/images/categories/mattresses-mobile.webp'),
    imageWidth: 640,
    imageHeight: 960,
    href: '#',
  },
  {
    id: 'demo-3',
    name: 'مخدة فندقية — عرض توضيحي',
    priceSar: 149,
    compareAtSar: 199,
    image: publicAsset('/images/categories/pillows.webp'),
    imageWidth: 960,
    imageHeight: 1440,
    href: '#',
    badge: 'sale',
  },
  {
    id: 'demo-4',
    name: 'واقي مرتبة — عرض توضيحي',
    priceSar: 249,
    image: publicAsset('/images/categories/mattress-protectors.webp'),
    imageWidth: 960,
    imageHeight: 1440,
    href: '#',
  },
  {
    id: 'demo-5',
    name: 'لبادة مريحة — عرض توضيحي',
    priceSar: 399,
    image: publicAsset('/images/categories/bedding-pads.webp'),
    imageWidth: 960,
    imageHeight: 1440,
    href: '#',
  },
  {
    id: 'demo-6',
    name: 'لحاف خفيف — عرض توضيحي',
    priceSar: 549,
    compareAtSar: 649,
    image: publicAsset('/images/categories/duvets.webp'),
    imageWidth: 960,
    imageHeight: 1440,
    href: '#',
    badge: 'sale',
  },
]
