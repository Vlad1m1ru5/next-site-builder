import matter from 'gray-matter'

export const parseMarkdownContent = (markdown: string): string => {
  const { content } = matter(markdown)
  return content
}