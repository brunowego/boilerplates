import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'
import Link from 'next/link'

import { Layout, LayoutHeader, LayoutContent, LayoutAside } from '@/components'
import { LogoMark } from '@acme/ui/components/logo'
import ThemeToggle from '@/components/theme-toggle'

export const metadata: Metadata = {
  title: 'Dashboard',
}

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({
  children,
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
        <article className='p-4 lg:px-5'>{children}</article>
      </LayoutContent>

      <LayoutAside />
    </Layout>
  )
}
