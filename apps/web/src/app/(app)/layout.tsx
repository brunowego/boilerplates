import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'

import { auth } from '@acme/auth'
import Layout from '@acme/ui/components/layout'
import { Users } from '@acme/ui/components/icon'

import LogOut from '@/components/log-out'

export const metadata: Metadata = {
  title: 'Dashboard',
}

interface AppLayoutProps {
  children: ReactNode
}

export default async function AppLayout({
  children,
}: AppLayoutProps): Promise<JSX.Element> {
  const session = await auth()

  if (!session?.user) {
    return redirect('/sign-in')
  }

  return (
    <Layout>
      <Layout.Header>
        <Link href='/users'>
          <Users className='size-5' />
        </Link>
        <LogOut className='mt-auto' />
      </Layout.Header>

      <Layout.Content>{children}</Layout.Content>

      <Layout.Aside />
    </Layout>
  )
}
