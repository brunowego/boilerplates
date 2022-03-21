import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import type { AppProps } from 'next/app'
import { ReactQueryDevtools } from 'react-query/devtools'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks')
}

const queryClient = new QueryClient()

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />

        {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </>
  )
}

export default App
