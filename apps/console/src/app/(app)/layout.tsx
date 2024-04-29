import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'
import Link from 'next/link'

import Logo from '@acme/ui/components/logo'

import ThemeToggle from '@/components/theme-toggle'
import { Layout, LayoutAside, LayoutContent, LayoutHeader } from '@/components'

export const metadata: Metadata = {
  title: 'Dashboard',
}

interface AppLayoutProps {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps): JSX.Element {
  return (
    <Layout>
      <LayoutHeader>
        <Link className='self-center py-1' href='/'>
          <Logo.mark className='size-8' />
        </Link>

        <ThemeToggle className='mt-auto self-center' />
      </LayoutHeader>

      <LayoutContent>
        <article>{children}</article>
      </LayoutContent>

      <LayoutAside />
    </Layout>
  )
}
