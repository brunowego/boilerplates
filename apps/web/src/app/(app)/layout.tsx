import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'
import Link from 'next/link'

import { auth } from '@acme/auth'
import Layout from '@acme/ui/components/layout'
import { LogIn } from '@acme/ui/components/icon'

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

  return (
    <Layout>
      <Layout.Header>
        {session?.user ? (
          <LogOut className='mt-auto' />
        ) : (
          <Link className='mt-auto' href='sign-in'>
            <LogIn className='size-5 shrink-0' />

            <span className='sr-only'>Sign in</span>
          </Link>
        )}
      </Layout.Header>

      <Layout.Content>{children}</Layout.Content>

      <Layout.Aside />
    </Layout>
  )
}
