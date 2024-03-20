// import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'

import { fontSans } from '@/lib/fonts'
import '@/styles/globals.css'

// import { Providers } from './providers'

// export const metadata: Metadata = {
//   title: 'ACME',
//   description: 'Basic Boilerplate for Next.js.',
// }

interface RootLayoutProps {
  children: ReactNode
}

export default async function RootLayout({
  children,
}: RootLayoutProps): Promise<JSX.Element> {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={fontSans.className}>
        {children}
        {/* <Providers>{children}</Providers> */}
      </body>
    </html>
  )
}
