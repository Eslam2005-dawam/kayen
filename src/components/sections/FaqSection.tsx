import { faqItems } from '../../data/faq'
import { Accordion } from '../ui/Accordion'
import { Reveal } from '../ui/Reveal'

export function FaqSection() {
  return (
    <section id="faq" className="py-14 sm:py-16" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl px-4">
        <Reveal>
          <h2 id="faq-heading" className="text-center text-2xl font-semibold text-charcoal sm:text-3xl">
            الأسئلة الشائعة
          </h2>
        </Reveal>
        <Reveal className="mt-8" delayMs={60}>
          <Accordion items={faqItems} />
        </Reveal>
      </div>
    </section>
  )
}
