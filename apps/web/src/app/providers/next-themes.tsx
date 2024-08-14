import type { JSX } from 'react'

import ThemeProvider, {
  type ThemeProviderProps,
} from '@acme/ui/providers/next-themes'

export default function NextThemesProvider({
  children,
  ...props
}: ThemeProviderProps): JSX.Element {
  return <ThemeProvider {...props}>{children}</ThemeProvider>
}
