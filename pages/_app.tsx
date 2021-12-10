import type { AppProps } from 'next/app'
import Head from 'next/head'
import { GlobalStyle } from 'styles/globals'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link
          href="//fonts.googleapis.com/css?family=Source+Code+Pro:300&subset=latin,latin-ext"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
