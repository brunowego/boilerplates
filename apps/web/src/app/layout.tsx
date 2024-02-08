import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'

import { fontSans } from '@/lib/fonts'
import '@/styles/globals.css'

import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'ACME',
  description: 'Basic Boilerplate for Next.js.',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang='en'>
      <body className={`${fontSans.className} dark`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
