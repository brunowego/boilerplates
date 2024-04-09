'use client'

import type { ThemeProviderProps } from 'next-themes/dist/types'
import { ThemeProvider } from 'next-themes'

export default function NextThemesProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>
}
