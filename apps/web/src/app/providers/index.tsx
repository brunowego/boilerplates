import type { ReactNode, JSX } from 'react'

import NextAuthProvider from './next-auth'
import NextThemesProvider from './next-themes'
import ReactQueryProvider from './react-query'
import SonnerProvider from './sonner'

interface ProvidersProps {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps): JSX.Element {
  return (
    <NextAuthProvider>
      <NextThemesProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>

        <SonnerProvider />
      </NextThemesProvider>
    </NextAuthProvider>
  )
}
