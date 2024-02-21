import { type ReactNode, type JSX } from 'react'

import { NextThemesProvider } from './next-themes'
import { ReactQueryProvider } from './react-query'
import { TrpcProvider } from './trpc'
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
      <ReactQueryProvider>
        <TrpcProvider>{children}</TrpcProvider>
      </ReactQueryProvider>

      <ToasterProvider />
    </NextThemesProvider>
  )
}
