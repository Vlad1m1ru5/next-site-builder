import React from 'react'
import Head from 'next/head'
import { findAllDirectoriesPathsFor } from 'utils/filesystem'
import { GetStaticProps } from 'next'

const IndexPage: React.FunctionComponent = () => (
  <>
    <Head>
      <link rel='shortcut icon' href='/favicon/favicon.ico' type='image/x-icon'/>
    </Head>
    <header>
      <h1>Index Page Headline</h1>
    </header>
    <main>
      <h2>Index Page Content</h2>
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

export default IndexPage

export const getStaticProps: GetStaticProps = async () => {
  const base = './docs'
  const directoriesPaths = await findAllDirectoriesPathsFor(base)
  console.log(directoriesPaths)
  
  return {
    props: {
      paths: directoriesPaths
    }
  }
}