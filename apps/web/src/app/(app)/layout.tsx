import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'

import { Layout, LayoutHeader, LayoutContent } from '@acme/ui/components/layout'

export const metadata: Metadata = {
  title: 'App',
}

interface AppLayoutProps {
  children: ReactNode
}

export default async function AppLayout({
  children,
}: AppLayoutProps): Promise<JSX.Element> {
  return (
    <Layout>
      <LayoutHeader />

      <LayoutContent>{children}</LayoutContent>
    </Layout>
  )
}
