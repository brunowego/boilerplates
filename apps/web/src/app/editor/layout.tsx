import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'

import { Layout, LayoutHeader, LayoutContent } from '@/components/layout'
import Menu from '@/components/menu'
import Sidebar from '@/components/sidebar'

export const metadata: Metadata = {
  title: 'Page Editor',
}

interface EditorLayoutProps {
  children: ReactNode
}

export default async function EditorLayout({
  children,
}: EditorLayoutProps): Promise<JSX.Element> {
  return (
    <Layout>
      <LayoutHeader>
        <Menu />
      </LayoutHeader>

      <LayoutContent className='flex'>
        <Sidebar />

        {children}
      </LayoutContent>
    </Layout>
  )
}
