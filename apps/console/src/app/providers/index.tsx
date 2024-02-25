import { type ReactNode, type JSX } from 'react'

import { NextThemesProvider } from './next-themes'
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
      {children}

      <ToasterProvider />
    </NextThemesProvider>
  )
}
