import { imageManifest } from '../../data/imageManifest'
import { Reveal } from '../ui/Reveal'
import { ResponsivePicture } from '../ui/ResponsivePicture'

export function ComfortBanner() {
  const { comfortBanner } = imageManifest

  return (
    <section className="relative isolate min-h-[36rem] overflow-hidden sm:min-h-[30rem] lg:min-h-[34rem]" aria-labelledby="comfort-heading">
      <ResponsivePicture
        src={comfortBanner.desktop}
        sources={[{ src: comfortBanner.mobile, media: '(max-width: 768px)' }]}
        alt={comfortBanner.alt}
        width={comfortBanner.widthDesktop}
        height={comfortBanner.heightDesktop}
        className="absolute inset-0 -z-20 h-full w-full"
        imgClassName="h-full w-full object-cover object-[58%_center] md:object-center"
        loading="lazy"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ivory/95 via-ivory/70 to-transparent md:from-ivory/90 md:via-ivory/55 md:to-transparent" aria-hidden />
      <div dir="ltr" className="mx-auto flex min-h-[36rem] max-w-6xl items-start px-6 py-14 sm:min-h-[30rem] sm:items-center lg:min-h-[34rem] lg:px-8">
        <Reveal className="w-full max-w-md text-left" direction="left">
          <div dir="rtl">
            <p className="text-sm font-semibold text-burgundy">راحة في كل تفصيلة</p>
            <h2 id="comfort-heading" className="mt-3 text-balance text-3xl font-semibold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
              نوم هادئ يبدأ من التفاصيل
            </h2>
            <p className="mt-4 max-w-sm text-base leading-8 text-charcoal/80">
              من المرتبة إلى آخر لمسة في غرفتك، اختار ما يضيف لليلتك راحة تستحقها.
            </p>
            <a href="#categories" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-burgundy px-6 text-sm font-medium text-white transition hover:bg-burgundy-deep">
              اكتشف التشكيلة
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
