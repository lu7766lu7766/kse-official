// 只在 LINE LIFF 情境鎖定縮放（/reserve、/bind 專用頁，或在 LINE 內建瀏覽器開啟時）。
// 一般官網頁面保留縮放，避免違反 WCAG 1.4.4 與 Lighthouse 無障礙扣分。
const LIFF_ROUTES = ["/reserve", "/bind"]
const LOCKED_VIEWPORT =
  "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
const DEFAULT_VIEWPORT = "width=device-width, initial-scale=1, viewport-fit=cover"

export default defineNuxtPlugin(() => {
  if (import.meta.server) return

  const inLineApp = /\bLine\//i.test(navigator.userAgent)
  const router = useRouter()
  let locked = false

  const shouldLock = (path: string) => inLineApp || LIFF_ROUTES.some((r) => path === r || path.startsWith(`${r}/`))

  const apply = (path: string) => {
    locked = shouldLock(path)
    document.documentElement.classList.toggle("no-zoom", locked)
    document.querySelector('meta[name="viewport"]')?.setAttribute("content", locked ? LOCKED_VIEWPORT : DEFAULT_VIEWPORT)
  }

  apply(router.currentRoute.value.path)
  router.afterEach((to) => apply(to.path))

  const preventDefault = (e: Event) => {
    if (locked) e.preventDefault()
  }

  // 1. iOS Safari 兩指縮放手勢
  document.addEventListener("gesturestart", preventDefault, { passive: false })
  document.addEventListener("gesturechange", preventDefault, { passive: false })
  document.addEventListener("gestureend", preventDefault, { passive: false })

  // 2. 多指觸控
  const preventMultiTouch = (e: TouchEvent) => {
    if (locked && e.touches.length > 1) e.preventDefault()
  }
  document.addEventListener("touchstart", preventMultiTouch, { passive: false })
  document.addEventListener("touchmove", preventMultiTouch, { passive: false })

  // 3. 快速連點兩下縮放
  let lastTouchEnd = 0
  document.addEventListener(
    "touchend",
    (e: TouchEvent) => {
      if (!locked) return
      const now = Date.now()
      if (now - lastTouchEnd <= 300) {
        // 如果點擊的是 input 或 textarea，允許預設行為以正常聚焦
        const target = e.target as HTMLElement | null
        if (target && ["INPUT", "TEXTAREA", "SELECT", "OPTION"].includes(target.tagName)) {
          return
        }
        e.preventDefault()
      }
      lastTouchEnd = now
    },
    { passive: false }
  )

  // 4. 觸控板雙指縮放 / Ctrl + 滾輪
  document.addEventListener(
    "wheel",
    (e: WheelEvent) => {
      if (locked && e.ctrlKey) e.preventDefault()
    },
    { passive: false }
  )

  // 5. 鍵盤快捷鍵縮放
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (locked && (e.ctrlKey || e.metaKey) && ["+", "-", "=", "0"].includes(e.key)) {
      e.preventDefault()
    }
  })
})
