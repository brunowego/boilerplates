import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'

import { Layout, LayoutHeader, LayoutContent } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Dashboard',
}

interface DashboardLayoutProps {
  children: ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps): Promise<JSX.Element> {
  return (
    <Layout>
      <LayoutHeader />

      <LayoutContent>{children}</LayoutContent>
    </Layout>
  )
}
