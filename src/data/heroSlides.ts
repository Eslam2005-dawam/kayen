import { imageManifest } from './imageManifest'

export type HeroSlide = {
  id: string
  headline: string
  subtitle: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  image: {
    desktop: string
    mobile?: string
    width: number
    height: number
    mobileWidth?: number
    mobileHeight?: number
    alt: string
    fetchPriority?: 'high' | 'low' | 'auto'
    preload?: boolean
  }
  /** When false, show placeholder panel instead of pretending a duplicate slide */
  imageReady: boolean
  textInImage?: boolean
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    headline: 'راحة تبدأ من اختيارك',
    subtitle: 'مراتب ومفروشات نوم مصممة لتجربة هادئة — اكتشف تشكيلة كيان بأسلوب يناسب غرفتك.',
    primaryCta: { label: 'اكتشف المراتب', href: '#categories' },
    secondaryCta: { label: 'الأسئلة الشائعة', href: '#faq' },
    image: {
      desktop: imageManifest.hero.slide1.src,
      mobile: imageManifest.hero.slide1.mobile,
      width: imageManifest.hero.slide1.width,
      height: imageManifest.hero.slide1.height,
      mobileWidth: imageManifest.hero.slide1.mobileWidth,
      mobileHeight: imageManifest.hero.slide1.mobileHeight,
      alt: imageManifest.hero.slide1.alt,
      fetchPriority: 'high',
      preload: true,
    },
    imageReady: true,
  },
  {
    id: 'slide-2',
    headline: 'كل تفاصيل راحتك في مكان واحد',
    subtitle: 'من المرتبة إلى المخدة — مكونات نوم متناسقة بلمسة عصرية وهدوء بصري.',
    primaryCta: { label: 'تسوق حسب القسم', href: '#categories' },
    secondaryCta: { label: 'الأكثر مبيعًا', href: '#best-sellers' },
    image: {
      desktop: imageManifest.hero.slide2.desktop,
      mobile: imageManifest.hero.slide2.mobile,
      width: imageManifest.hero.slide2.widthDesktop,
      height: imageManifest.hero.slide2.heightDesktop,
      mobileWidth: imageManifest.hero.slide2.widthMobile,
      mobileHeight: imageManifest.hero.slide2.heightMobile,
      alt: imageManifest.hero.slide2.alt,
    },
    imageReady: true,
    textInImage: true,
  },
  {
    id: 'slide-3',
    headline: 'كل تفاصيل راحتك في مكان واحد',
    subtitle: 'مراتب ومخدات ومفارش تكمل تجربة نومك.',
    primaryCta: { label: 'اكتشف منتجات كيان', href: '#categories' },
    secondaryCta: { label: 'الأكثر مبيعًا', href: '#best-sellers' },
    image: {
      desktop: imageManifest.hero.slide3.desktop,
      mobile: imageManifest.hero.slide3.mobile,
      width: imageManifest.hero.slide3.widthDesktop,
      height: imageManifest.hero.slide3.heightDesktop,
      mobileWidth: imageManifest.hero.slide3.widthMobile,
      mobileHeight: imageManifest.hero.slide3.heightMobile,
      alt: imageManifest.hero.slide3.alt,
    },
    imageReady: true,
    textInImage: true,
  },
]
