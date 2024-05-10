import type { ReactNode, JSX } from 'react'

import WorkspaceProvider from '@/context/workspace-context'

import NextThemesProvider from './next-themes'
import ReactQueryProvider from './react-query'

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
      <ReactQueryProvider>
        <WorkspaceProvider>{children}</WorkspaceProvider>
      </ReactQueryProvider>
    </NextThemesProvider>
  )
}
