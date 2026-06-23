# Japan Inquiry Paper Generator

**जापानबाट फोन आउँदा सोधिने प्रश्नहरु** — A web tool for consultancies to prepare students and sponsors for verification phone calls from Japan.

## What is this?

When Japanese language schools or immigration authorities verify a student's application, they call the student or sponsor and ask detailed questions about:

- Applied college, consultancy, and study plans
- Student background (school, current activity, language study)
- Sponsor details (income sources, cooperative bank balance, addresses)

This tool lets staff enter all 21 standard fields once, preview the formatted inquiry paper (matching the traditional Word template), and download it as **Word (.docx)** or **PDF** for printing or sharing with the student/family before the call.

## Features

- 21 bilingual (Nepali label) form fields matching the standard inquiry paper
- Live preview of the table document as you type
- Download as Word or PDF
- Auto-saves draft data in browser local storage
- Full Unicode / Devanagari support for Nepali text

## Quick start

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to any static host (Netlify, Vercel, GitHub Pages, etc.).

## Field list

| S.N. | Field |
|------|-------|
| 1 | Applied college |
| 2 | Applied year & month |
| 3 | Language study duration in Japan |
| 4 | Applied consultancy |
| 5 | Student name |
| 6 | Student date of birth |
| 7 | Plus 2 school |
| 8 | Student's current activity |
| 9 | Sponsor name |
| 10 | Permanent address |
| 11 | Current address |
| 12 | Language school |
| 13 | Language study duration |
| 14 | Language teacher name |
| 15 | Income sources |
| 16 | Annual income |
| 17 | Cooperative (bank balance) |
| 18 | Balance in cooperative |
| 19 | Account opening date |
| 20 | Cooperative account number |
| 21 | Study plan after Japanese language |

## Privacy

All data stays in the browser. Nothing is sent to a server.
