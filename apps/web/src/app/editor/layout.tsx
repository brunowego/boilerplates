import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'

import Layout from '@acme/ui/components/layout'

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
      <Layout.Header />

      <Layout.Content className='flex'>{children}</Layout.Content>
    </Layout>
  )
}
