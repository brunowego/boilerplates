import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'
import Link from 'next/link'

import { LogoMark } from '@acme/ui/components/logo'
import { Users, Settings2 } from '@acme/ui/components/icon'

import { Layout, LayoutHeader, LayoutContent } from '@/components/layout'
import ThemeToggle from '@/components/theme-toggle'

export const metadata: Metadata = {
  title: 'Dashboard',
}

interface DashboardLayoutProps {
  children: ReactNode
  aside: ReactNode
}

export default function DashboardLayout({
  children,
  aside,
}: DashboardLayoutProps): JSX.Element {
  return (
    <Layout>
      <LayoutHeader>
        <Link className='self-center py-1' href='/'>
          <LogoMark className='size-8' />
        </Link>

        <nav className='flex flex-col *:flex *:h-10 *:items-center *:justify-center'>
          <Link href='/'>
            <Users className='size-5' />

            <span className='sr-only'>Users</span>
          </Link>

          <Link href='/settings'>
            <Settings2 className='size-5' />

            <span className='sr-only'>Settings</span>
          </Link>
        </nav>

        <ThemeToggle className='mt-auto self-center' />
      </LayoutHeader>

      <LayoutContent>{children}</LayoutContent>

      {aside}
    </Layout>
  )
}
