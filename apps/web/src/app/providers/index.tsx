'use client'

import dynamic from 'next/dynamic'
import { type ReactNode, type JSX } from 'react'

const LinguiProvider = dynamic(() => import('./lingui'), {
  ssr: false,
})

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps): JSX.Element {
  return <LinguiProvider>{children}</LinguiProvider>
}
