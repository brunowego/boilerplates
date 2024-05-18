import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'
import { redirect } from 'next/navigation'

import { auth } from '@acme/auth'
import { Layout, LayoutHeader, LayoutContent, LayoutAside } from '@/components'
import { Page, PageHeader, PageContent } from '@/components/page'
import LogOut from '@/components/log-out'

export const metadata: Metadata = {
  title: 'Onboarding',
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

  if (session?.user.onboarded) {
    return redirect('/')
  }

  return (
    <Layout>
      <LayoutHeader />

      <LayoutContent>
        <Page>
          <PageHeader className='flex border-b-0'>
            <LogOut className='ml-auto' />
          </PageHeader>

          <PageContent>{children}</PageContent>
        </Page>
      </LayoutContent>

      <LayoutAside />
    </Layout>
  )
}
