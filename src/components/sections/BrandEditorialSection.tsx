import { Reveal } from '../ui/Reveal'

export function BrandEditorialSection() {
  return (
    <section id="craft" className="relative isolate flex min-h-[34rem] items-end overflow-hidden text-white sm:min-h-[32rem] sm:items-center lg:min-h-[38rem]" aria-labelledby="craft-heading">
      <img
        src="/images/kayan-factory-banner.webp"
        alt="مراحل صناعة المراتب والمفروشات داخل المصنع"
        width="1942"
        height="777"
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[42%_center] md:object-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal/85 via-charcoal/50 to-charcoal/10 md:from-charcoal/80 md:via-charcoal/35 md:to-transparent" aria-hidden />
      <div dir="ltr" className="mx-auto w-full max-w-6xl px-6 py-14 lg:px-8">
        <Reveal className="max-w-lg text-left" direction="left">
          <div dir="rtl">
            <p className="text-sm font-medium tracking-wide text-beige">من قلب المصنع</p>
            <h2 id="craft-heading" className="mt-3 text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              تفاصيل تُصنع لراحتك
            </h2>
            <p className="mt-4 max-w-md text-base leading-8 text-white/90">
              وراء كل ليلة هادئة عناية بالتفاصيل. اكتشف عالم كيان واختار ما يناسب نومك ومساحتك.
            </p>
            <a href="#categories" className="mt-6 inline-flex min-h-11 items-center rounded-full border border-white/80 px-6 text-sm font-medium text-white transition hover:bg-white hover:text-charcoal">
              تسوق منتجات كيان
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
