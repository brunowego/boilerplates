import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'
import Link from 'next/link'

import Layout from '@acme/ui/components/layout'

export const metadata: Metadata = {
  title: 'Dashboard',
}

interface DashboardLayoutProps {
  children: ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps): Promise<JSX.Element> {
  return (
    <Layout>
      <Layout.Header />

      <Layout.Aside>
        <div className='space-y-4 p-4 lg:px-5'>
          <h2 className='font-medium text-lg leading-8 tracking-tight'>
            Infinite Scroll
          </h2>

          <nav className='grid space-y-1 *:leading-8'>
            <Link href='/auto-load-more'>Auto Load More</Link>
            <Link href='/load-more'>Load More</Link>
          </nav>
        </div>
      </Layout.Aside>

      <Layout.Content>{children}</Layout.Content>
    </Layout>
  )
}
