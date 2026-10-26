import { siteConfig } from '../../data/siteConfig'

export function AnnouncementBar() {
  return (
    <div
      className="border-b border-beige/70 bg-burgundy text-ivory"
      role="region"
      aria-label="إعلان"
    >
      <p className="mx-auto max-w-6xl truncate px-4 py-2 text-center text-xs sm:text-sm">
        {siteConfig.announcement}
      </p>
    </div>
  )
}
