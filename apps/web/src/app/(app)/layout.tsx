import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'

import Layout from '@acme/ui/components/layout'

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
      <Layout.Header />

      <Layout.Content>
        <Sidebar />

        {children}
      </Layout.Content>
    </Layout>
  )
}
