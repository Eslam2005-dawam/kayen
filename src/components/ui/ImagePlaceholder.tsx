type Props = {
  label: string
  aspectRatio?: string
  className?: string
}

export function ImagePlaceholder({
  label,
  aspectRatio = '16 / 9',
  className = '',
}: Props) {
  return (
    <div
      className={`flex items-center justify-center border border-beige/80 bg-gradient-to-br from-ivory to-beige/60 text-center text-sm text-charcoal/70 ${className}`}
      style={{ aspectRatio }}
      role="img"
      aria-label={label}
    >
      <span className="max-w-[18ch] px-4 leading-relaxed">{label}</span>
    </div>
  )
}
