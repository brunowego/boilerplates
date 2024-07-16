import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'

import Layout from '@acme/ui/components/layout'

export const metadata: Metadata = {
  title: 'Dashboard',
}

interface AppLayoutProps {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps): JSX.Element {
  return (
    <Layout>
      <Layout.Header />

      <Layout.Content>{children}</Layout.Content>

      <Layout.Aside />
    </Layout>
  )
}
