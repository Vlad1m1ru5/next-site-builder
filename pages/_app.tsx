import React from 'react'
import { AppProps } from 'next/app'

const MyApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
)

export default MyApp