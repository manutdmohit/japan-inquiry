import { saveAs } from 'file-saver'
import { type FormData, getFileBaseName } from './fields'
import { capturePreviewCanvas } from './capturePreview'

export async function downloadImage(previewElement: HTMLElement, data: FormData): Promise<void> {
  const canvas = await capturePreviewCanvas(previewElement)

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, 'image/jpeg', 0.95)
  })

  if (!blob) throw new Error('Failed to generate image')

  saveAs(blob, `${getFileBaseName(data)}.jpg`)
}
