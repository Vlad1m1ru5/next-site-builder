import React from 'react'

type Props = {
  headline: string
}

const Article: React.FunctionComponent<Props> = ({ headline, children }) => (
  <article>
    <h3>{headline}</h3>
    <div>{children}</div>
  </article>
)

export default Article