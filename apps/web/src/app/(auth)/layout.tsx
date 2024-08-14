import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'

import { LogoMark } from '@acme/ui/components/logo'

import { auth } from '@/lib/auth'
import { Layout, LayoutContent, LayoutHeader } from '@/components/layout'
import ThemeToggle from '@/components/theme-toggle'

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
      <LayoutHeader infinite={false}>
        <Link className='self-center py-1' href='/'>
          <LogoMark className='size-8' />
        </Link>

        <ThemeToggle className='mt-auto self-center' />
      </LayoutHeader>

      <LayoutContent>
        <article className='flex min-h-screen items-center justify-center overflow-hidden p-6 md:p-0'>
          <section className='m-auto flex w-full max-w-lg flex-col space-y-6 p-4 lg:px-5'>
            {children}
          </section>
        </article>
      </LayoutContent>
    </Layout>
  )
}
