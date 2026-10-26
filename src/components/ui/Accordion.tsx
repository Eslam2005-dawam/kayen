import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'

export type AccordionEntry = { id: string; question: string; answer: string }

type Props = {
  items: AccordionEntry[]
}

export function Accordion({ items }: Props) {
  const baseId = useId()
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <div className="divide-y divide-beige/80 rounded-2xl border border-beige/90 bg-white">
      {items.map((item) => {
        const isOpen = openId === item.id
        const panelId = `${baseId}-${item.id}`
        return (
          <div key={item.id} className="px-4 sm:px-6">
            <h3>
              <button
                type="button"
                id={`${panelId}-trigger`}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 py-4 text-start text-base font-medium text-charcoal sm:text-lg"
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                {item.question}
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-burgundy transition-transform duration-300 motion-reduce:transition-none ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={`${panelId}-trigger`}
              hidden={!isOpen}
              className="pb-4 text-sm leading-relaxed text-charcoal/80 sm:text-base"
            >
              {item.answer}
            </div>
          </div>
        )
      })}
    </div>
  )
}
