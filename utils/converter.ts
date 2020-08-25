import remark from 'remark'
import html from 'remark-html'
import { getImage } from 'utils/plantuml'

export const convertMarkdownToHtml = async (markdown: string): Promise<string> => {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

export const findHtmlsIn = async (contents: string[]): Promise<string[]> => {
  const htmls: string[] = []

  for (const content of contents) {
    const plantumls = content.match(/`{3}plantuml{1}(.|\n)*?`{3}/g)
    
    if (plantumls) {
      for (const plantuml of plantumls) {
        console.log(plantuml)
        
        const image = await getImage(plantuml)
      }
    }

    htmls.push(await convertMarkdownToHtml(content))
  }

  return htmls
}
