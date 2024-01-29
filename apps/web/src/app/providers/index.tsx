import { type ReactNode, type JSX } from 'react'

import { I18nProvider } from './i18n'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps): JSX.Element {
  return <I18nProvider>{children}</I18nProvider>
}
