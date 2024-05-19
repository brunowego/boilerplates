import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'
import { redirect } from 'next/navigation'

import { auth } from '@acme/auth'
import { Home, Settings2 } from '@acme/ui/components/icon'

import { Layout, LayoutHeader, LayoutContent } from '@/components/layout'
import LogOut from '@/components/log-out'
import Link from 'next/link'

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

  if (!session?.user.onboarded) {
    return redirect('/onboard')
  }

  return (
    <Layout>
      <LayoutHeader>
        <Link href='/'>
          <Home className='size-5' />
        </Link>

        <Link className='mt-auto' href='/personal'>
          <Settings2 className='size-5' />
        </Link>

        <LogOut />
      </LayoutHeader>

      <LayoutContent>{children}</LayoutContent>
    </Layout>
  )
}
