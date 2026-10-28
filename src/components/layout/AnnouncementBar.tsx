import { useState } from 'react'
import { X } from 'lucide-react'
import { siteConfig } from '../../data/siteConfig'

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(() => window.sessionStorage.getItem('kayan-announcement-dismissed') === '1')

  if (dismissed) return null

  const dismiss = () => {
    window.sessionStorage.setItem('kayan-announcement-dismissed', '1')
    setDismissed(true)
  }

  return (
    <div
      className="announcement-bar border-b border-gold/50 bg-burgundy text-ivory"
      role="region"
      aria-label="إعلان"
    >
      <span className="sr-only">{siteConfig.announcement}</span>
      <div className="announcement-marquee" aria-hidden="true">
        <div className="announcement-marquee__track">
          <span>{siteConfig.announcement}</span>
          <span>{siteConfig.announcement}</span>
        </div>
      </div>
      <button
        type="button"
        className="announcement-close"
        onClick={dismiss}
        aria-label="إغلاق شريط الإعلان"
      >
        <X size={15} aria-hidden="true" />
      </button>
    </div>
  )
}
