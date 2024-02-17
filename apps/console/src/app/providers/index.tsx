import { type ReactNode, type JSX } from 'react'

import { NextThemesProvider } from './next-themes'
import { ToastProvider } from './toast'

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

      <ToastProvider />
    </NextThemesProvider>
  )
}
