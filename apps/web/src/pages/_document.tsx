import { createGetInitialProps } from '@mantine/next'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

const getInitialProps = createGetInitialProps()

export default class Document extends NextDocument {
  static getInitialProps = getInitialProps

  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="shortcut icon"
            type="image/png"
            href="/favicon-dark.png"
            media="(prefers-color-scheme: dark)"
          />
          <link
            rel="shortcut icon"
            type="image/png"
            href="/favicon.png"
            media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
          />
          <link rel="apple-touch-icon" href="/assets/icons/icon-128x128.png" />

          <meta name="robots" content="noindex" />
          <meta name="theme-color" content="#46509e" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
