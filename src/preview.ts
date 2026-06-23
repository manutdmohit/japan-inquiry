import { DOCUMENT_TITLE, INQUIRY_FIELDS, type FormData } from './fields'

export function renderPreview(data: FormData): string {
  const rows = INQUIRY_FIELDS.map(
    (field) => `
      <tr>
        <td class="col-sn">${field.sn}</td>
        <td class="col-question">${field.label}</td>
        <td class="col-answer">${escapeHtml(data[field.id] || '') || '&nbsp;'}</td>
      </tr>
    `,
  ).join('')

  return `
    <div class="preview-document">
      <h2 class="preview-title">${DOCUMENT_TITLE}</h2>
      <table class="preview-table">
        <thead>
          <tr>
            <th class="col-sn">क.सं.</th>
            <th class="col-question">प्रश्न</th>
            <th class="col-answer">जवाफ</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br>')
}
