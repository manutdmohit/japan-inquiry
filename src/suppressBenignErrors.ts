const RESIZE_OBSERVER_LOOP =
  /ResizeObserver loop (completed with undelivered notifications|limit exceeded)/

/** Stops Vite's dev overlay from treating a harmless browser quirk as a crash. */
export function suppressBenignErrors(): void {
  window.addEventListener(
    'error',
    (event) => {
      if (RESIZE_OBSERVER_LOOP.test(event.message)) {
        event.stopImmediatePropagation()
        event.preventDefault()
      }
    },
    true,
  )
}

export function waitForLayout(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve())
    })
  })
}
