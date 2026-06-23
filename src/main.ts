import './style.css'
import {
  createEmptyFormData,
  DOCUMENT_TITLE,
  INQUIRY_FIELDS,
  type FormData,
} from './fields'
import { downloadDocx } from './exportDocx'
import { downloadImage } from './exportImage'
import { downloadPdf } from './exportPdf'
import { renderPreview } from './preview'
import { suppressBenignErrors } from './suppressBenignErrors'

suppressBenignErrors()

const STORAGE_KEY = 'inquiry-paper-form-data'

let formData: FormData = loadFormData()

function loadFormData(): FormData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return { ...createEmptyFormData(), ...JSON.parse(saved) }
    }
  } catch {
    /* ignore corrupt storage */
  }
  return createEmptyFormData()
}

function saveFormData(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
}

function renderFormFields(): string {
  return INQUIRY_FIELDS.map((field) => {
    const value = formData[field.id] ?? ''
    const inputTag = field.multiline
      ? `<textarea id="field-${field.id}" rows="3" placeholder="${field.placeholder}">${escapeAttr(value)}</textarea>`
      : `<input type="text" id="field-${field.id}" value="${escapeAttr(value)}" placeholder="${field.placeholder}" />`

    return `
      <div class="form-field">
        <label for="field-${field.id}">
          <span class="field-sn">${field.sn}</span>
          ${field.label}
        </label>
        ${inputTag}
      </div>
    `
  }).join('')
}

function escapeAttr(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
}

function mountApp(): void {
  const app = document.querySelector<HTMLDivElement>('#app')!
  app.innerHTML = `
    <header class="site-header">
      <div class="header-inner">
        <span class="brand-mark" aria-hidden="true">問</span>
        <h1>${DOCUMENT_TITLE}</h1>
      </div>
    </header>

    <main class="layout">
      <section class="panel form-panel" aria-labelledby="form-heading">
        <div class="panel-head">
          <h2 id="form-heading">विवरण भर्नुहोस्</h2>
          <button type="button" id="btn-clear" class="btn btn-ghost">Clear form</button>
        </div>
        <form id="inquiry-form" class="inquiry-form" novalidate>
          ${renderFormFields()}
        </form>
      </section>

      <section class="panel preview-panel" aria-labelledby="preview-heading">
        <div class="panel-head">
          <h2 id="preview-heading">पूर्वावलोकन</h2>
          <div class="export-actions">
            <button type="button" id="btn-docx" class="btn btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              Download Word
            </button>
            <button type="button" id="btn-pdf" class="btn btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 18 15 15"/></svg>
              Download PDF
            </button>
            <button type="button" id="btn-jpg" class="btn btn-outline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              Download JPG
            </button>
          </div>
        </div>
        <div id="preview" class="preview-wrap">
          ${renderPreview(formData)}
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <p>Consultancy use — data stays in your browser (local storage).</p>
    </footer>
  `

  bindEvents()
}

function bindEvents(): void {
  const form = document.querySelector<HTMLFormElement>('#inquiry-form')!
  const preview = document.querySelector<HTMLDivElement>('#preview')!
  let previewTimer: ReturnType<typeof setTimeout> | undefined

  form.addEventListener('input', (event) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement
    if (!target.id.startsWith('field-')) return

    const fieldId = target.id.replace('field-', '')
    formData[fieldId] = target.value
    saveFormData()

    clearTimeout(previewTimer)
    previewTimer = setTimeout(() => {
      preview.innerHTML = renderPreview(formData)
    }, 120)
  })

  document.querySelector('#btn-clear')!.addEventListener('click', () => {
    if (!confirm('Clear all fields? This cannot be undone.')) return
    formData = createEmptyFormData()
    saveFormData()
    mountApp()
  })

  document.querySelector('#btn-docx')!.addEventListener('click', async () => {
    const btn = document.querySelector('#btn-docx') as HTMLButtonElement
    btn.disabled = true
    btn.textContent = 'Generating…'
    try {
      await downloadDocx(formData)
    } finally {
      btn.disabled = false
      btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        Download Word
      `
    }
  })

  document.querySelector('#btn-pdf')!.addEventListener('click', async () => {
    const btn = document.querySelector('#btn-pdf') as HTMLButtonElement
    btn.disabled = true
    btn.textContent = 'Generating…'
    try {
      const doc = preview.querySelector('.preview-document') as HTMLElement | null
      if (!doc) throw new Error('Preview not ready')
      await downloadPdf(doc, formData)
    } catch (error) {
      console.error(error)
      alert('PDF generation failed. Please try again.')
    } finally {
      btn.disabled = false
      btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 18 15 15"/></svg>
        Download PDF
      `
    }
  })

  document.querySelector('#btn-jpg')!.addEventListener('click', async () => {
    const btn = document.querySelector('#btn-jpg') as HTMLButtonElement
    btn.disabled = true
    btn.textContent = 'Generating…'
    try {
      const doc = preview.querySelector('.preview-document') as HTMLElement
      await downloadImage(doc, formData)
    } finally {
      btn.disabled = false
      btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        Download JPG
      `
    }
  })
}

mountApp()
