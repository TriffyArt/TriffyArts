import fs from 'fs/promises'
import path from 'path'

type UrlEntry = {
  loc: string
  lastmod?: string
  changefreq?: string
  priority?: string
}

async function readSitemapXml(): Promise<string> {
  const p = path.join(process.cwd(), 'public', 'sitemap.xml')
  return fs.readFile(p, 'utf8')
}

function parseXml(xml: string): UrlEntry[] {
  const urlRe = /<url>([\s\S]*?)<\/url>/gi
  const entries: UrlEntry[] = []
  let m: RegExpExecArray | null
  while ((m = urlRe.exec(xml))) {
    const block = m[1]
    const extract = (tag: string) => {
      const r = new RegExp(`<${tag}>(.*?)<\/${tag}>`, 'i')
      const mm = r.exec(block)
      return mm ? mm[1].trim() : undefined
    }
    const loc = extract('loc')
    if (!loc) continue
    entries.push({
      loc,
      lastmod: extract('lastmod'),
      changefreq: extract('changefreq'),
      priority: extract('priority'),
    })
  }
  return entries
}

function cap(s?: string) {
  if (!s) return ''
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}

export default async function generateSitemapHtml(): Promise<string> {
  const xml = await readSitemapXml()
  const entries = parseXml(xml)

  const rows = entries
    .map(
      (e) => `
            <tr>
                <td><a href="${e.loc}">${e.loc}</a></td>
                <td>${e.lastmod ? e.lastmod.split('T')[0] : ''}</td>
                <td class="changefreq">${cap(e.changefreq)}</td>
                <td class="priority">${e.priority ?? ''}</td>
            </tr>`
    )
    .join('\n')

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sitemap</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; max-width:900px; margin:0 auto; padding:20px; background:#f5f5f5 }
        h1 { color:#333; border-bottom:2px solid #007bff; padding-bottom:10px }
        table { width:100%; border-collapse:collapse; background:#fff; box-shadow:0 2px 4px rgba(0,0,0,0.1) }
        th { background:#007bff; color:#fff; padding:12px; text-align:left; font-weight:600 }
        td { padding:12px; border-bottom:1px solid #ddd }
        tr:hover { background:#f9f9f9 }
        a { color:#007bff; text-decoration:none }
        a:hover { text-decoration:underline }
        .priority { text-align:center }
        .changefreq { text-align:center }
    </style>
</head>
<body>
    <h1>Sitemap</h1>
    <table>
        <thead>
            <tr>
                <th>URL</th>
                <th>Last Modified</th>
                <th class="changefreq">Change Frequency</th>
                <th class="priority">Priority</th>
            </tr>
        </thead>
        <tbody>
${rows}
        </tbody>
    </table>
</body>
</html>`
}

export { generateSitemapHtml }
