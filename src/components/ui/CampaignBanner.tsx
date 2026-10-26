import { useState, type ReactNode } from 'react'
import { ImagePlaceholder } from './ImagePlaceholder'
import { ResponsivePicture } from './ResponsivePicture'

export type CampaignBannerProps = {
  desktop: string
  mobile?: string
  width: number
  height: number
  widthMobile?: number
  heightMobile?: number
  alt: string
  /** Baked-in text in asset — use intrinsic sizing, no overlay copy */
  textInImage?: boolean
  ready?: boolean
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
  /**
   * intrinsic: full width, natural height (wide promo strips)
   * cover: fill parent (hero slides inside a sized frame)
   */
  fit?: 'intrinsic' | 'cover'
  objectPosition?: string
  placeholderLabel?: string
  onError?: () => void
}

export function CampaignBanner({
  desktop,
  mobile,
  width,
  height,
  widthMobile,
  heightMobile,
  alt,
  textInImage = false,
  ready = true,
  loading = 'lazy',
  fetchPriority,
  fit = 'intrinsic',
  objectPosition = 'center',
  placeholderLabel,
  onError,
}: CampaignBannerProps) {
  const [failed, setFailed] = useState(false)

  const handleError = () => {
    setFailed(true)
    onError?.()
  }

  if (!ready || failed) {
    return (
      <ImagePlaceholder
        label={placeholderLabel ?? alt}
        aspectRatio={`${width} / ${height}`}
        className="campaign-banner campaign-banner--placeholder w-full rounded-none"
      />
    )
  }

  const imgClass =
    fit === 'cover'
      ? 'campaign-banner__img campaign-banner__img--cover'
      : 'campaign-banner__img'

  return (
    <div className="campaign-banner w-full max-w-none">
      <ResponsivePicture
        src={desktop}
        sources={
          mobile
            ? [{ src: mobile, media: '(max-width: 768px)' }]
            : undefined
        }
        alt={alt}
        width={widthMobile ?? width}
        height={heightMobile ?? height}
        loading={loading}
        fetchPriority={fetchPriority}
        className="campaign-banner__picture block w-full max-w-none"
        imgClassName={imgClass}
        imgStyle={fit === 'cover' ? { objectPosition } : undefined}
        onError={handleError}
      />
      {textInImage && <span className="sr-only">{alt}</span>}
    </div>
  )
}

/** Edge-to-edge section wrapper for campaign / promo strips */
export function CampaignBannerSection({
  children,
  className = '',
  'aria-label': ariaLabel,
  id,
}: {
  children: ReactNode
  className?: string
  'aria-label'?: string
  id?: string
}) {
  return (
    <section
      id={id}
      className={`campaign-banner-section w-full max-w-none ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </section>
  )
}
