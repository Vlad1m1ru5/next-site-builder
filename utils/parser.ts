import matter from 'gray-matter'

export const parseMarkdownContent = (markdown: string): string => {
  const { content } = matter(markdown)
  return content
}

export const findAllContentsIn = (markdowns: string[]): string[] => {
  const contents: string[] = []

  for (const markdown of markdowns) {
    contents.push(parseMarkdownContent(markdown))
  }

  return contents
}