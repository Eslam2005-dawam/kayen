import { useDemoUi } from '../../context/DemoUiContext'

export function DemoToast() {
  const { quickViewMessage, clearQuickView } = useDemoUi()

  if (!quickViewMessage) return null

  return (
    <div
      className="fixed bottom-4 start-4 z-[60] max-w-sm rounded-2xl border border-beige bg-white px-4 py-3 text-sm text-charcoal shadow-lg"
      role="status"
      aria-live="polite"
    >
      <p>{quickViewMessage}</p>
      <button
        type="button"
        className="mt-2 text-xs font-medium text-burgundy underline"
        onClick={clearQuickView}
      >
        إغلاق
      </button>
    </div>
  )
}
