import type { CSSProperties } from 'react'

type Source = { src: string; media?: string; width?: number; height?: number }

type Props = {
  sources?: Source[]
  src: string
  alt: string
  width: number
  height: number
  className?: string
  imgClassName?: string
  imgStyle?: CSSProperties
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
  onError?: () => void
}
export function ResponsivePicture({
  sources,
  src,
  alt,
  width,
  height,
  className = '',
  imgClassName = '',
  imgStyle,
  loading = 'lazy',
  fetchPriority,
  onError,
}: Props) {
  return (
    <picture className={className}>
      {sources?.map((s) => (
        <source key={s.src + (s.media ?? '')} media={s.media} srcSet={s.src} />
      ))}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        className={imgClassName}
        style={imgStyle}
        onError={onError}
      />
    </picture>
  )
}
