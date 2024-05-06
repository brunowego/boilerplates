import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'

import { LogoMark } from '@acme/ui/components/logo'

import { auth } from '@/lib/auth'
import { Layout, LayoutContent, LayoutHeader } from '@/components/layout'
import ThemeToggle from '@/components/theme-toggle'

export const metadata: Metadata = {
  title: 'Onboarding',
}

type AuthLayoutProps = {
  children: ReactNode
}

export default async function OnboardPage({
  children,
}: AuthLayoutProps): Promise<JSX.Element> {
  const session = await auth()

  if (!session?.user) {
    return redirect('/')
  }

  return (
    <Layout>
      <LayoutHeader>
        <Link className='self-center py-1' href='/'>
          <LogoMark className='size-8' />
        </Link>

        <ThemeToggle className='mt-auto self-center' />
      </LayoutHeader>

      <LayoutContent>{children}</LayoutContent>
    </Layout>
  )
}
