import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'

import { LogoMark } from '@acme/ui/components/logo'
import { typographyVariants } from '@acme/ui/components/typography'

import { Layout, LayoutContent, LayoutHeader } from '@/components/layout'
import ThemeToggle from '@/components/theme-toggle'

import { getSession } from './actions'

export const metadata: Metadata = {
  title: 'Dashboard',
}

type AuthLayoutProps = {
  children: ReactNode
}

export default async function AuthLayout({
  children,
}: AuthLayoutProps): Promise<JSX.Element> {
  const { user } = await getSession()

  if (user) {
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
          <section className='m-auto flex w-full max-w-md flex-col space-y-6 p-4 lg:px-5'>
            {children}

            <p className={typographyVariants({ size: 'sm', variant: 'muted' })}>
              By clicking continue, you acknowledge that you have read and agree
              to Acme's{' '}
              <Link className='underline underline-offset-4' href='/'>
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link className='underline underline-offset-4' href='/'>
                Privacy Policy
              </Link>
              .
            </p>
          </section>
        </article>
      </LayoutContent>
    </Layout>
  )
}