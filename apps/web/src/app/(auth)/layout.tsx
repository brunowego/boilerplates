import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'
import { redirect } from 'next/navigation'

import { auth } from '@acme/auth'
import Layout from '@acme/ui/components/layout'

export const metadata: Metadata = {
  title: 'Dashboard',
}

type AuthLayoutProps = {
  children: ReactNode
}

export default async function AuthLayout({
  children,
}: AuthLayoutProps): Promise<JSX.Element> {
  const session = await auth()

  if (session?.user) {
    return redirect('/')
  }

  return (
    <Layout>
      <Layout.Header infinite={false} />

      <Layout.Content>
        <section className='flex min-h-screen w-full items-center justify-center overflow-hidden p-6 md:p-0'>
          <div className='m-auto flex w-full max-w-lg flex-col space-y-6 p-4 lg:px-5'>
            {children}
          </div>
        </section>
      </Layout.Content>
    </Layout>
  )
}
