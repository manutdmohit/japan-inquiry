import {
  AlignmentType,
  BorderStyle,
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from 'docx'
import { saveAs } from 'file-saver'
import { DOCUMENT_TITLE, INQUIRY_FIELDS, type FormData, getFileBaseName } from './fields'

const border = {
  style: BorderStyle.SINGLE,
  size: 1,
  color: '000000',
}

function cell(text: string, bold = false, width?: number): TableCell {
  return new TableCell({
    width: width ? { size: width, type: WidthType.PERCENTAGE } : undefined,
    borders: {
      top: border,
      bottom: border,
      left: border,
      right: border,
    },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [
      new Paragraph({
        children: [new TextRun({ text: text || ' ', bold, size: 22 })],
      }),
    ],
  })
}

export async function downloadDocx(data: FormData): Promise<void> {
  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      cell('क.सं.', true, 8),
      cell('प्रश्न', true, 32),
      cell('जवाफ', true, 60),
    ],
  })

  const dataRows = INQUIRY_FIELDS.map(
    (field) =>
      new TableRow({
        children: [
          cell(String(field.sn), false, 8),
          cell(field.label, false, 32),
          cell(data[field.id] || '', false, 60),
        ],
      }),
  )

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, right: 720, bottom: 720, left: 720 },
          },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
            children: [
              new TextRun({
                text: DOCUMENT_TITLE,
                bold: true,
                size: 28,
              }),
            ],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [headerRow, ...dataRows],
          }),
        ],
      },
    ],
  })

  const blob = await Packer.toBlob(doc)
  saveAs(blob, `${getFileBaseName(data)}.docx`)
}
