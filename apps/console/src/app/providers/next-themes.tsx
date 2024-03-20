import type { ThemeProviderProps } from 'next-themes/dist/types'
import { ThemeProvider } from 'next-themes'

export default async function NextThemesProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>
}
