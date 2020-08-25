import remark from 'remark'
import html from 'remark-html'

export const convertMarkdownToHtml = async (markdown: string): Promise<string> => {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

export const findHtmlsIn = async (contents: string[]): Promise<string[]> => {
  const htmls: string[] = []

  for (const content of contents) {
    //const inlineUMLs = content.match(/`{3}plantuml{1}(.|\n)*?`{3}/g)
    htmls.push(await convertMarkdownToHtml(content))
  }

  return htmls
}
