import html2canvas from 'html2canvas'
import { clearExportClone, clonePreviewForExport, ensureExportFontsReady } from './exportUtils'
import { waitForLayout } from './suppressBenignErrors'

const EXPORT_FONT = "'Noto Sans Devanagari', 'Mangal', sans-serif"

export async function capturePreviewCanvas(previewElement: HTMLElement): Promise<HTMLCanvasElement> {
  await ensureExportFontsReady()
  const clone = await clonePreviewForExport(previewElement)
  await waitForLayout()

  try {
    return await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: clone.scrollWidth,
      windowHeight: clone.scrollHeight,
      onclone: (clonedDoc, element) => {
        element.style.fontFamily = EXPORT_FONT
        clonedDoc.querySelectorAll('.export-render h2, .export-render th, .export-render td').forEach((node) => {
          ;(node as HTMLElement).style.fontFamily = EXPORT_FONT
        })
      },
    })
  } finally {
    clearExportClone()
  }
}
