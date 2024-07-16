'use client'

import ThemeProvider, {
  type ThemeProviderProps,
} from '@acme/ui/providers/next-themes'

export default function NextThemesProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>
}
