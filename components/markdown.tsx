import React from 'react'

type Props = {
  content: string
}

const Markdown: React.FunctionComponent<Props> = ({ content }) => (
  <div dangerouslySetInnerHTML={{ __html: content }}/>
)

export default Markdown
