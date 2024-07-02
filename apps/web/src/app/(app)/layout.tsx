import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'
import { redirect } from 'next/navigation'

import { auth } from '@acme/auth'
import Layout from '@acme/ui/components/layout'

import LogOut from '@/components/log-out'

export const metadata: Metadata = {
  title: 'Dashboard',
}

interface DashboardLayoutProps {
  children: ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps): Promise<JSX.Element> {
  const session = await auth()

  if (!session?.user) {
    return redirect('/sign-in')
  }

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
