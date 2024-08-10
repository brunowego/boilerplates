import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'

import Layout from '@/components/layout'
import LogOut from '@/components/log-out'

export const metadata: Metadata = {
  title: 'Dashboard',
}

type DashboardLayoutProps = {
  children: ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps): Promise<JSX.Element> {
  return (
    <Layout>
      <Layout.Header>
        <LogOut className='mt-auto' />
      </Layout.Header>

      <Layout.Content>{children}</Layout.Content>

      <Layout.Aside />
    </Layout>
  )
}
