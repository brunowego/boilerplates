import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'

import { Layout, LayoutHeader, LayoutContent } from '@acme/ui/components/layout'

import Menu from '@/components/menu'

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

      <LayoutContent className='flex'>{children}</LayoutContent>
    </Layout>
  )
}
