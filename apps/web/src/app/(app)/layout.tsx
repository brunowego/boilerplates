import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'

import { auth } from '@acme/auth'
import { LogoMark } from '@acme/ui/components/logo'

import {
  Layout,
  LayoutHeader,
  LayoutContent,
  LayoutAside,
} from '@/components/layout'
import LogOut from '@/components/log-out'
import ThemeToggle from '@/components/theme-toggle'

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
      <LayoutHeader>
        <Link className='self-center py-1' href='/'>
          <LogoMark className='size-8' />
        </Link>

        <LogOut className='mt-auto' />

        <ThemeToggle className='self-center' />
      </LayoutHeader>

      <LayoutContent>{children}</LayoutContent>

      <LayoutAside />
    </Layout>
  )
}