import remark from 'remark'
import html from 'remark-html'
import { getPlantUmlFor } from 'utils/plantuml'

export const convertMarkdownToHtml = async (markdown: string): Promise<string> => {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

export const findHtmlsIn = async (contents: string[]): Promise<string[]> => {
  const htmls: string[] = []

  for (const content of contents) {
    const markdown = await getPlantUmlFor(content)
    htmls.push(await convertMarkdownToHtml(markdown))
  }

  return htmls
}
