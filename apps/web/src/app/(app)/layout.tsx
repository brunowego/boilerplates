import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'

import Layout from '@acme/ui/components/layout'

export const metadata: Metadata = {
  title: 'Dashboard',
}

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps): JSX.Element {
  return (
    <Layout>
      <Layout.Header />

      <Layout.Content>{children}</Layout.Content>
    </Layout>
  )
}
