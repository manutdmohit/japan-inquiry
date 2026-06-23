import { jsPDF } from 'jspdf'
import { type FormData, getFileBaseName } from './fields'
import { capturePreviewCanvas } from './capturePreview'

export async function downloadPdf(previewElement: HTMLElement, data: FormData): Promise<void> {
  const canvas = await capturePreviewCanvas(previewElement)
  const imgData = canvas.toDataURL('image/jpeg', 0.95)

  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })
  const margin = 10
  const pageWidth = pdf.internal.pageSize.getWidth() - margin * 2
  const pageHeight = pdf.internal.pageSize.getHeight() - margin * 2
  const imgHeight = (canvas.height * pageWidth) / canvas.width

  let offsetY = 0
  let page = 0

  while (offsetY < imgHeight) {
    if (page > 0) pdf.addPage()

    pdf.addImage(imgData, 'JPEG', margin, margin - offsetY, pageWidth, imgHeight)
    offsetY += pageHeight
    page += 1
  }

  pdf.save(`${getFileBaseName(data)}.pdf`)
}
