/** Resolve files in public/ against Vite's deployment base (for example /kayen/). */
export function publicAsset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
