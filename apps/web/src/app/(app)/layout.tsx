import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'
import Link from 'next/link'

import { LogoMark } from '@acme/ui/components/logo'

import { Layout, LayoutHeader, LayoutContent } from '@/components/layout'
import ThemeToggle from '@/components/theme-toggle'

export const metadata: Metadata = {
  title: 'Dashboard',
}

interface DashboardLayoutProps {
  children: ReactNode
  window: ReactNode
}

export default function DashboardLayout({
  children,
  window,
}: DashboardLayoutProps): JSX.Element {
  return (
    <Layout>
      <LayoutHeader>
        <Link className='self-center py-1' href='/'>
          <LogoMark className='size-8' />
        </Link>

        <ThemeToggle className='mt-auto self-center' />
      </LayoutHeader>

      <LayoutContent>
        {children}

        {window}
      </LayoutContent>
    </Layout>
  )
}
