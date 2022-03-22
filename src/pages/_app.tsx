import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { defaultSeoProps } from '@/config/next-seo'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...defaultSeoProps} />
      <Component {...pageProps} />
    </>
  )
}

export default App
