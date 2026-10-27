/** Local product images. Additional views can be placed in products/<section>/<product-id>/. */
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
  return Object.entries(localImages).find(([path]) => path.replaceAll('\\', '/').endsWith(suffix))?.[1]
}

export function productPrimaryImage(id: string, fallback: string) {
  return (primaryFiles[id] && findImage(primaryFiles[id])) || fallback
}

export function productGalleryImages(id: string, primary: string) {
  const additional = Object.entries(localImages)
    .filter(([path]) => path.replaceAll('\\', '/').includes(`/${id}/`))
    .sort(([a], [b]) => a.localeCompare(b, 'ar', { numeric: true }))
    .map(([, url]) => url)
  return [...new Set([primary, ...additional])]
}
