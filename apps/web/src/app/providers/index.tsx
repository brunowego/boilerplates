import type { ReactNode, JSX } from 'react'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  import('@/mocks')
}

import NextThemesProvider from './next-themes'
import ReactQueryProvider from './react-query'
import SonnerProvider from './sonner'

interface ProvidersProps {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps): JSX.Element {
  return (
    <NextThemesProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <ReactQueryProvider>{children}</ReactQueryProvider>

      <SonnerProvider />
    </NextThemesProvider>
  )
}
