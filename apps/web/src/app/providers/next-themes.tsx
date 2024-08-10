import type { JSX } from 'react'

import ThemeProvider, {
  type ThemeProviderProps as NextThemesProviderProps,
} from '@acme/ui/providers/next-themes'

export default function NextThemesProvider({
  children,
  ...props
}: NextThemesProviderProps): JSX.Element {
  return <ThemeProvider {...props}>{children}</ThemeProvider>
}
