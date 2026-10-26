import { HeroCarousel } from '../components/hero/HeroCarousel'
import { BestSellersSection } from '../components/sections/BestSellersSection'
import { BrandEditorialSection } from '../components/sections/BrandEditorialSection'
import { CategorySection } from '../components/sections/CategorySection'
import { ComfortBanner } from '../components/sections/ComfortBanner'
import { FaqSection } from '../components/sections/FaqSection'
import { CompleteYourBedSection } from '../components/sections/CompleteYourBedSection'

export function HomePage() {
  return (
    <main id="main-content">
      <HeroCarousel />
      <CategorySection />
      <ComfortBanner />
      <BestSellersSection />
      <BrandEditorialSection />
      <CompleteYourBedSection />
      <FaqSection />
    </main>
  )
}
