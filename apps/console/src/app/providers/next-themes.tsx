import type { JSX } from 'react'
import type { ThemeProviderProps } from 'next-themes/dist/types'
import { ThemeProvider } from 'next-themes'

export default function NextThemesProvider({
  children,
  ...props
}: ThemeProviderProps): JSX.Element {
  return <ThemeProvider {...props}>{children}</ThemeProvider>
}
