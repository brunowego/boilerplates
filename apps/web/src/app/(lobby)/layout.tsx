import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'

import Layout from '@acme/ui/components/layout'

import Header from '@/components/header'

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
      <Layout.Header>
        <Header />
      </Layout.Header>

      <Layout.Content>{children}</Layout.Content>

      <Layout.Footer />
    </Layout>
  )
}
