import { type ReactNode, type JSX } from 'react'

import { MedusaProvider } from './medusa'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps): JSX.Element {
  return <MedusaProvider>{children}</MedusaProvider>
}
