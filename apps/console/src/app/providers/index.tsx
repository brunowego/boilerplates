import type { ReactNode, JSX } from 'react'

import { NextThemesProvider } from './next-themes'
import { ReactQueryProvider } from './react-query'
import { ToasterProvider } from './toaster'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps): JSX.Element {
  return (
    <NextThemesProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <ReactQueryProvider>{children}</ReactQueryProvider>

      <ToasterProvider />
    </NextThemesProvider>
  )
}
