/** Local product images. Additional views can be placed in the matching product folder. */
const localImages = import.meta.glob('../../products/**/*.{webp,png,jpg,jpeg,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const primaryFiles: Record<string, string> = {
  'm-01': 'products/مراتب/Gray Mattress — المرتبة الرمادي.webp',
  'm-02': 'products/مراتب/Blue Memory Mattress — الأزرق.webp',
  'm-03': 'products/مراتب/Cotton Max Mattress — القطن.webp',
  'p-01': 'products/مخدات/Latex Pillow — مخدة اللاتكس.webp',
  'p-02': 'products/مخدات/Memory Foam Pillow — مخدة الميموري فوم.webp',
  'p-03': 'products/مخدات/Cooling Gel Pillow — مخدة الجل البارد.webp',
  'pr-01': 'products/واقي مراتب/Cotton Mattress Protector — الواقي القطني.webp',
  'pr-02': 'products/واقي مراتب/Premium Deep-Fit Mattress Protector — الواقي الفاخر.webp',
  'pr-03': 'products/واقي مراتب/Waterproof Mattress Protector — الواقي ضد السوائل.webp',
  'pr-04': 'products/واقي مراتب/الواقي الفندقي.webp',
  'd-01': 'products/اللحاف/Summer Lightweight Duvet — اللحاف الصيفي.webp',
  'd-02': 'products/اللحاف/Winter Duvet — اللحاف الشتوي.webp',
  'd-03': 'products/اللحاف/otel Duvet — اللحاف الفندقي.webp',
  'd-04': 'products/اللحاف/Microfiber Duvet — لحاف مايكروفايبر.webp',
}

function findImage(suffix: string) {
  const normalizedSuffix = suffix.replaceAll('\\', '/')
  const exactPathMatch = Object.entries(localImages).find(([path]) => path.replaceAll('\\', '/').endsWith(normalizedSuffix))?.[1]
  if (exactPathMatch) return exactPathMatch
  const filename = normalizedSuffix.slice(normalizedSuffix.lastIndexOf('/') + 1)
  return Object.entries(localImages).find(([path]) => path.replaceAll('\\', '/').endsWith(`/${filename}`))?.[1]
}

export function productPrimaryImage(id: string, fallback: string) {
  return (primaryFiles[id] && findImage(primaryFiles[id])) || fallback
}

export function productGalleryImages(id: string, primary: string) {
  const primaryPath = Object.entries(localImages).find(([, url]) => url === primary)?.[0]?.replaceAll('\\', '/')
  const productFolder = primaryPath?.slice(0, primaryPath.lastIndexOf('/'))
  const productsRootIndex = primaryPath?.lastIndexOf('/products/') ?? -1
  const pathBelowProducts = productsRootIndex >= 0 ? primaryPath?.slice(productsRootIndex + '/products/'.length) : undefined
  // Category-level images sit directly under /products/<category>; model galleries
  // live one level deeper under /products/<category>/<product>/<image>.
  const hasProductFolder = Boolean(pathBelowProducts && pathBelowProducts.split('/').length >= 3)
  const additional = Object.entries(localImages)
    .filter(([path]) => {
      const normalizedPath = path.replaceAll('\\', '/')
      return normalizedPath.includes(`/${id}/`) || (hasProductFolder && Boolean(productFolder) && normalizedPath.startsWith(`${productFolder}/`) && normalizedPath !== primaryPath)
    })
    .sort(([a], [b]) => a.localeCompare(b, 'ar', { numeric: true }))
    .map(([, url]) => url)
  return [...new Set([primary, ...additional])]
}
