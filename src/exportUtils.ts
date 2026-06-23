import { waitForLayout } from './suppressBenignErrors'

const EXPORT_FONT = "'Noto Sans Devanagari', 'Mangal', sans-serif"

let exportRoot: HTMLElement | null = null

function getExportRoot(): HTMLElement {
  if (!exportRoot) {
    exportRoot = document.createElement('div')
    exportRoot.id = 'export-root'
    exportRoot.setAttribute('aria-hidden', 'true')
    exportRoot.style.cssText =
      'position:fixed;left:-10000px;top:0;width:794px;pointer-events:none;overflow:visible;'
    document.body.appendChild(exportRoot)
  }
  return exportRoot
}

export async function clonePreviewForExport(previewElement: HTMLElement): Promise<HTMLElement> {
  const root = getExportRoot()
  root.replaceChildren()

  const clone = previewElement.cloneNode(true) as HTMLElement
  clone.classList.add('export-render')
  clone.style.width = '794px'
  clone.style.padding = '40px'
  clone.style.background = '#ffffff'
  clone.style.fontFamily = EXPORT_FONT
  clone.style.boxShadow = 'none'

  clone.querySelectorAll('h2, th, td').forEach((node) => {
    ;(node as HTMLElement).style.fontFamily = EXPORT_FONT
  })

  root.appendChild(clone)
  await waitForLayout()
  return clone
}

export function clearExportClone(): void {
  getExportRoot().replaceChildren()
}

export async function ensureExportFontsReady(): Promise<void> {
  const sizes = ['400', '600', '700'] as const
  await Promise.all(
    sizes.map((weight) =>
      document.fonts.load(`${weight} 16px "Noto Sans Devanagari"`),
    ),
  )
  await document.fonts.ready
}
