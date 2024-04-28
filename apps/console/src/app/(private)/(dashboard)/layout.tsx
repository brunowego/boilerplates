import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'

import { Layout, LayoutHeader, LayoutContent, LayoutAside } from '@/components'
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
        <ThemeToggle />
      </LayoutHeader>

      <LayoutContent>
        <article className='p-4 lg:px-5'>{children}</article>
      </LayoutContent>

      <LayoutAside />
    </Layout>
  )
}
