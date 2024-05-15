import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'
import Link from 'next/link'

import { LogoMark } from '@acme/ui/components/logo'
import { Settings2 } from '@acme/ui/components/icon'

import {
  Layout,
  LayoutHeader,
  LayoutContent /*, LayoutAside*/,
} from '@/components'
import ThemeToggle from '@/components/theme-toggle'
import Sidebar from '@/components/sidebar'

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

        <nav className='mt-auto grid *:flex *:h-10 *:items-center *:justify-center'>
          <Link href='/personal'>
            <Settings2 className='size-5' />
          </Link>
        </nav>

        <ThemeToggle className='self-center' />
      </LayoutHeader>

      <LayoutContent>
        <Sidebar />

        {children}
      </LayoutContent>

      {/* <LayoutAside /> */}
    </Layout>
  )
}
