import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'
import Link from 'next/link'

import Layout from '@acme/ui/components/layout'

import Sidebar from '@/components/sidebar'

export const metadata: Metadata = {
  title: 'App',
}

const components = [
  {
    name: 'Avatar',
    href: '/avatar',
  },
  {
    name: 'Button',
    href: '/button',
  },
  {
    name: 'Dialog',
    href: '/dialog',
  },
  {
    name: 'Dropdown Menu',
    href: '/dropdown-menu',
  },
  {
    name: 'Expand',
    href: '/expand',
  },
  {
    name: 'Form',
    href: '/form',
  },
  {
    name: 'Modal',
    href: '/modal',
  },
  {
    name: 'Popover',
    href: '/popover',
  },
] as { name: string; href: string }[]

interface AppLayoutProps {
  children: ReactNode
}

export default async function AppLayout({
  children,
}: AppLayoutProps): Promise<JSX.Element> {
  return (
    <Layout>
      <Layout.Header />

      <Layout.Content>
        <Sidebar>
          <div className='p-4'>
            <h2 className='font-medium leading-8'>Components</h2>
          </div>

          <div className='p-4'>
            <nav className='-mt-2 mb-2 flex flex-col space-y-1'>
              {components.map(({ name, href }, index) => (
                <Link
                  className='-mx-2.5 rounded-sm px-2.5 leading-10 hover:bg-secondary'
                  href={href}
                  // biome-ignore lint/suspicious/noArrayIndexKey: This is a static list of components
                  key={index}
                >
                  {name}
                </Link>
              ))}
            </nav>
          </div>
        </Sidebar>

        {children}
      </Layout.Content>
    </Layout>
  )
}
