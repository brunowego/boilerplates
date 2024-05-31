import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'

import { Layout, LayoutHeader, LayoutContent } from '@acme/ui/components/layout'

import Menu from '@/components/menu'
import Sidebar from '@/components/sidebar'

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
      <LayoutHeader>
        <Menu />
      </LayoutHeader>

      <LayoutContent>
        <Sidebar />

        {children}
      </LayoutContent>
    </Layout>
  )
}
