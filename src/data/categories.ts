import { imageManifest } from './imageManifest'

export type CategoryItem = {
  id: string
  name: string
  href: string
  imageDesktop: string
  imageMobile: string
  width: number
  height: number
  alt: string
}

export const categories: CategoryItem[] = [
  {
    id: 'mattresses',
    name: 'المراتب',
    href: '#/categories/mattresses',
    imageDesktop: imageManifest.categories.mattresses.desktop,
    imageMobile: imageManifest.categories.mattresses.mobile,
    width: imageManifest.categories.mattresses.width,
    height: imageManifest.categories.mattresses.height,
    alt: 'مراتب كيان — صورة قسم المراتب',
  },
  {
    id: 'pillows',
    name: 'المخدات',
    href: '#/categories/pillows',
    imageDesktop: imageManifest.categories.pillows.desktop,
    imageMobile: imageManifest.categories.pillows.mobile,
    width: imageManifest.categories.pillows.width,
    height: imageManifest.categories.pillows.height,
    alt: 'مخدات — صورة قسم المخدات',
  },
  {
    id: 'protectors',
    name: 'واقيات المراتب',
    href: '#/categories/protectors',
    imageDesktop: imageManifest.categories.protectors.desktop,
    imageMobile: imageManifest.categories.protectors.mobile,
    width: imageManifest.categories.protectors.width,
    height: imageManifest.categories.protectors.height,
    alt: 'واقيات المراتب — صورة القسم',
  },
  {
    id: 'pads',
    name: 'اللبادات',
    href: '#/categories/pads',
    imageDesktop: imageManifest.categories.pads.desktop,
    imageMobile: imageManifest.categories.pads.mobile,
    width: imageManifest.categories.pads.width,
    height: imageManifest.categories.pads.height,
    alt: 'لبادات — صورة القسم',
  },
  {
    id: 'duvets',
    name: 'اللحف',
    href: '#/categories/duvets',
    imageDesktop: imageManifest.categories.duvets.desktop,
    imageMobile: imageManifest.categories.duvets.mobile,
    width: imageManifest.categories.duvets.width,
    height: imageManifest.categories.duvets.height,
    alt: 'اللحف — صورة القسم',
  },
]
