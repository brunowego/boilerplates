import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
