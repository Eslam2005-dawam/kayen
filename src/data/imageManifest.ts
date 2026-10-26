/** Central image paths — replace files under /public/images without code changes where possible. */
import { publicAsset } from './publicAsset'

export const imageManifest = {
  hero: {
    slide1: {
      src: publicAsset('/images/kayan-hero.webp'),
      mobile: publicAsset('/images/hero/kayan-mobile-background.webp'),
      width: 1920,
      height: 800,
      mobileWidth: 900,
      mobileHeight: 1200,
      alt: 'غرفة نوم أنيقة مع مرتبة كيان',
    },
    slide2: {
      desktop: publicAsset('/images/hero/kayan_hero-2.webp'),
      mobile: publicAsset('/images/hero/kayan_hero_2-mobile.webp'),
      widthDesktop: 1774,
      heightDesktop: 887,
      widthMobile: 1024,
      heightMobile: 1536,
      alt: 'كيان للمراتب: جودة تصنع راحة تدوم، من مصنعنا إلى منزلك',
    },
    slide3: {
      desktop: publicAsset('/images/hero/kayan-desktop-campaign.webp'),
      mobile: publicAsset('/images/hero/kayan-mobile-campaign.webp'),
      widthDesktop: 1920,
      heightDesktop: 800,
      widthMobile: 900,
      heightMobile: 1200,
      alt: 'كيان للمراتب: كل تفاصيل راحتك في مكان واحد',
      ready: true,
    },
  },
  categoriesReference: publicAsset('/images/categories-reference.webp'),
  categories: {
    mattresses: {
      desktop: publicAsset('/images/categories/mattresses.webp'),
      mobile: publicAsset('/images/categories/mattresses-mobile.webp'),
      width: 960,
      height: 1440,
    },
    pillows: {
      desktop: publicAsset('/images/categories/pillows.webp'),
      mobile: publicAsset('/images/categories/pillows-mobile.webp'),
      width: 960,
      height: 1440,
    },
    protectors: {
      desktop: publicAsset('/images/categories/mattress-protectors.webp'),
      mobile: publicAsset('/images/categories/mattress-protectors-mobile.webp'),
      width: 960,
      height: 1440,
    },
    pads: {
      desktop: publicAsset('/images/categories/bedding-pads.webp'),
      mobile: publicAsset('/images/categories/bedding-pads-mobile.webp'),
      width: 960,
      height: 1440,
    },
    duvets: {
      desktop: publicAsset('/images/categories/duvets.webp'),
      mobile: publicAsset('/images/categories/duvets-mobile.webp'),
      width: 960,
      height: 1440,
    },
  },
  comfortBanner: {
    desktop: publicAsset('/images/comfort-banner.webp'),
    mobile: publicAsset('/images/comfort-banner-mobile.webp'),
    widthDesktop: 1920,
    heightDesktop: 600,
    widthMobile: 900,
    heightMobile: 600,
    alt: 'راحة في كل تفصيلة — لقطة مقربة لنسيج المرتبة',
    /** Banner includes designed Arabic text in the image */
    textInImage: true,
    ready: true,
  },
  brandEditorial: {
    desktop: publicAsset('/images/brand-editorial-banner.webp'),
    mobile: publicAsset('/images/brand-editorial-banner-mobile.webp'),
    widthDesktop: 1920,
    heightDesktop: 720,
    widthMobile: 900,
    heightMobile: 720,
    alt: 'حملة كيان — قصة العلامة',
    textInImage: true,
    ready: true,
  },
  mattressGuide: {
    src: publicAsset('/images/categories/mattresses.webp'),
    alt: 'طبقات مرتبة — صورة توضيحية وليست مواصفات منتج محدد',
  },
  brandStory: {
    src: publicAsset('/images/hero/slide-3-desktop.webp'),
    alt: 'جو غرفة نوم يعكس هوية كيان',
  },
  products: {
    placeholder: publicAsset('/images/products/placeholder.webp'),
  },
} as const

export type ImageManifest = typeof imageManifest
