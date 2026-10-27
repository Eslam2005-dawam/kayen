import { ArrowLeft } from 'lucide-react'
import { categories } from '../../data/categories'
import { Reveal } from '../ui/Reveal'
import { ResponsivePicture } from '../ui/ResponsivePicture'

const essentials = [
  { category: categories[1], note: 'اللمسة الناعمة لبداية يوم أهدأ' },
  { category: categories[2], note: 'حماية يومية تحافظ على مرتبتك' },
  { category: categories[4], note: 'دفء خفيف يكمل تنسيق السرير' },
]

export function CompleteYourBedSection() {
  return (
    <section className="border-b border-beige/70 bg-white py-12 sm:py-16" aria-labelledby="essentials-heading">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="mb-7 flex flex-wrap items-end justify-between gap-3 sm:mb-9">
          <div>
            <p className="mb-1 text-sm font-medium text-gold-deep">من المرتبة إلى آخر تفصيلة</p>
            <h2 id="essentials-heading" className="text-3xl font-semibold text-charcoal sm:text-4xl">
              أكمل راحة سريرك
            </h2>
          </div>
          <a href="#categories" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-burgundy hover:underline">
            كل الأقسام <ArrowLeft className="h-4 w-4" aria-hidden />
          </a>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {essentials.map(({ category, note }, index) => (
            <Reveal key={category.id} delayMs={index * 70} className={index === 2 ? 'col-span-2 lg:col-span-1' : ''}>
              <a href={category.href} className="group block h-full overflow-hidden rounded-xl border border-beige/80 bg-ivory transition-shadow duration-300 hover:shadow-lg">
                <div className={`overflow-hidden bg-beige/30 ${index === 2 ? 'aspect-[2/1] lg:aspect-[4/3]' : 'aspect-[4/5] sm:aspect-[4/3]'}`}>
                  <ResponsivePicture
                    src={category.imageDesktop}
                    sources={[{ src: category.imageMobile, media: '(max-width: 768px)' }]}
                    alt={category.alt}
                    width={category.width}
                    height={category.height}
                    className="block h-full w-full"
                    imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 px-4 py-4 sm:px-5">
                  <div>
                    <h3 className="text-base font-semibold text-charcoal sm:text-xl">{category.name}</h3>
                    <p className="mt-1 hidden text-sm text-charcoal/70 sm:block">{note}</p>
                  </div>
                  <ArrowLeft className="h-5 w-5 shrink-0 text-burgundy transition-transform group-hover:-translate-x-1 motion-reduce:transition-none" aria-hidden />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
