import { AnnouncementBar } from './components/layout/AnnouncementBar'
import { SiteFooter } from './components/layout/SiteFooter'
import { SiteHeader } from './components/layout/SiteHeader'
import { DemoToast } from './components/ui/DemoToast'
import { HomePage } from './pages/HomePage'
import { DemoUiProvider } from './context/DemoUiContext'

export default function App() {
  return (
    <DemoUiProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-burgundy"
      >
        تخطي إلى المحتوى
      </a>
      <AnnouncementBar />
      <SiteHeader heroOffset />
      <HomePage />
      <SiteFooter />
      <DemoToast />
    </DemoUiProvider>
  )
}
