import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'

import TailwindIndicator from '@acme/ui/components/tailwind-indicator'

import { fontSans } from '@/lib/fonts'
import '@/styles/globals.css'

import Providers from './providers'

export const metadata: Metadata = {
  title: 'ACME',
  description: 'Basic boilerplate for Next.js.',
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={fontSans.className}>
        <Providers>{children}</Providers>

        <TailwindIndicator env={process.env.NODE_ENV} />
      </body>
    </html>
  )
}
