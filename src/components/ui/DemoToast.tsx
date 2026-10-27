import { useDemoUi } from '../../context/DemoUiContext'

export function DemoToast() {
  const { quickViewMessage, toastAction, clearQuickView } = useDemoUi()

  if (!quickViewMessage) return null

  return (
    <div
      className="demo-toast fixed bottom-4 start-4 z-[60] max-w-sm rounded-2xl border border-beige bg-white px-4 py-3 text-sm text-charcoal shadow-lg"
      role="status"
      aria-live="polite"
    >
      <p>{quickViewMessage}</p>
      <div className="mt-2 flex items-center gap-4">
        {toastAction && <a href={toastAction.href} className="inline-flex min-h-10 items-center rounded-lg bg-burgundy px-3 font-medium text-white hover:bg-burgundy-deep" onClick={clearQuickView}>{toastAction.label}</a>}
        <button
          type="button"
          className="inline-flex min-h-10 items-center text-xs font-medium text-burgundy underline"
          onClick={clearQuickView}
        >
          إغلاق
        </button>
      </div>
    </div>
  )
}
