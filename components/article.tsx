import React from 'react'

type Props = {
  headline: string
}

const Article: React.FunctionComponent<Props> = ({ headline }) => (
  <article>
    <h3>{headline}</h3>
  </article>
)

export default Article