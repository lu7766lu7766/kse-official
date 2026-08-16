export default defineNuxtPlugin(() => {
  if (import.meta.server) return

  // 1. 阻止 iOS Safari 兩指縮放手勢 (gesturestart / gesturechange / gestureend)
  const preventDefault = (e: Event) => {
    e.preventDefault()
  }

  document.addEventListener("gesturestart", preventDefault, { passive: false })
  document.addEventListener("gesturechange", preventDefault, { passive: false })
  document.addEventListener("gestureend", preventDefault, { passive: false })

  // 2. 阻止多指觸控 (touchstart / touchmove 偵測到兩指以上)
  document.addEventListener(
    "touchstart",
    (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault()
      }
    },
    { passive: false }
  )

  document.addEventListener(
    "touchmove",
    (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault()
      }
    },
    { passive: false }
  )

  // 3. 阻止快速連點兩下 (Double-tap) 縮放
  let lastTouchEnd = 0
  document.addEventListener(
    "touchend",
    (e: TouchEvent) => {
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

  // 4. 阻止電腦版觸控板雙指縮放 / Ctrl + 滾輪縮放
  document.addEventListener(
    "wheel",
    (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault()
      }
    },
    { passive: false }
  )

  // 5. 阻止鍵盤快捷鍵縮放 (Ctrl/Cmd + Plus/Minus/0)
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.key === "+" || e.key === "-" || e.key === "=" || e.key === "0")
    ) {
      e.preventDefault()
    }
  })
})
