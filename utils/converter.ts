import remark from 'remark'
import html from 'remark-html'
import { getWithSvg } from 'utils/plantuml'

export const convertMarkdownToHtml = async (markdown: string): Promise<string> => {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

export const convertToHtml = async (content: string): Promise<string> => {
  const markdown = await getWithSvg(content)
  return await convertMarkdownToHtml(markdown)
}
