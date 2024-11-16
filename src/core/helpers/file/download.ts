import { saveAs } from 'file-saver'
import HTMLToDocx from 'html-docx-js'
import HTMLToPDF from 'html-pdf'

declare module 'html-docx-js'
declare module 'html-pdf'

export const createHtmlFromContent = (content: string): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 2rem;
          }
          p {
            margin-bottom: 1rem;
          }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `
}

export const downloadAsFormat = async (
  content: string,
  format: string,
): Promise<void> => {
  switch (format.toLowerCase()) {
    case 'html': {
      const htmlContent = createHtmlFromContent(content)
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' })
      saveAs(blob, `document.html`)
      break
    }
    case 'pdf': {
      const htmlContent = createHtmlFromContent(content)
      const buffer = await new Promise<Buffer>((resolve, reject) => {
        HTMLToPDF.create(htmlContent).toBuffer((err, buffer) => {
          if (err) reject(err)
          else resolve(buffer)
        })
      })
      const blob = new Blob([buffer], { type: 'application/pdf' })
      saveAs(blob, `document.pdf`)
      break
    }
    case 'docx': {
      const htmlContent = createHtmlFromContent(content)
      const buffer = HTMLToDocx.asBlob(htmlContent)
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      })
      saveAs(blob, `document.docx`)
      break
    }
    case 'txt': {
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, `document.txt`)
      break
    }
    default:
      throw new Error(`Unsupported format: ${format}`)
  }
}
