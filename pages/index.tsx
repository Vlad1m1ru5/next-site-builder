import React from 'react'
import Head from 'next/head'
import { findAllDirectoriesPathsFor, findAllMarkdownsFor } from 'utils/filesystem'
import { GetStaticProps } from 'next'
import Article from 'components/article'
import { parseMarkdownContent } from 'utils/parser'
import { convertMarkdownToHtml } from 'utils/converter'
import Markdown from 'components/markdown'
import { getWithSvg } from 'utils/plantuml'

type Props = {
  htmls: string[]
}

const IndexPage: React.FunctionComponent<Props> = ({ htmls }) => {
  
  const getArticle = (html: string, index: number) => (
    <Article 
      key={index}
      headline={''}
    >
      <Markdown content={html}/>
    </Article>
  )

  return (
    <>
      <Head>
        <link
          rel='shortcut icon'
          href='/favicon/favicon.ico'
          type='image/x-icon'
        />
      </Head>
      <header>
        <h1>Index Page Headline</h1>
      </header>
      <main>
        <h2>Index Page Content</h2>
        {htmls
          .map(getArticle)}
      </main>
      <footer>
        <h2>Index Page Basement</h2>
      </footer>
      <style jsx global>
        {`
          body, html {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
          }
        `}
      </style>
    </>
  )
}

export default IndexPage

export const getStaticProps: GetStaticProps<Props> = async () => {
  const base = './docs'
  const htmls: string[] = []
  const directoriesPaths = await findAllDirectoriesPathsFor(base)

  for (const directoryPath of directoriesPaths) {  
    const markdown = await findAllMarkdownsFor(directoryPath)
    const content = await getWithSvg(parseMarkdownContent(markdown))
    const html = await convertMarkdownToHtml(content)
    htmls.push(html)
  }

  return {
    props: {
      htmls
    }
  }
}