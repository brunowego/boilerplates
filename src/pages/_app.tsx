import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster position="bottom-right" />

      <Component {...pageProps} />
    </>
  )
}

export default App
