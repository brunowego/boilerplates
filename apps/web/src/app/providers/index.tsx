import type { ReactNode, JSX } from 'react'

import NextThemesProvider from './next-themes'
import TooltipProvider from './tooltip'
import ReactQueryProvider from './react-query'
import SonnerProvider from './sonner'

type ProvidersProps = {
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
      <TooltipProvider delayDuration={100}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </TooltipProvider>

      <SonnerProvider />
    </NextThemesProvider>
  )
}
