import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'

import { UserOnboardingStep } from '@acme/db/schema'
import { LogoMark } from '@acme/ui/components/logo'

import { auth } from '@/lib/auth'
import { Layout, LayoutContent, LayoutHeader } from '@/components/layout'
import ThemeToggle from '@/components/theme-toggle'
import { Page, PageContent } from '@/components/page'

export const metadata: Metadata = {
  title: 'Onboarding',
}

interface OnboardLayoutProps {
  children: ReactNode
}

export default async function OnboardLayout({
  children,
}: OnboardLayoutProps): Promise<JSX.Element> {
  const session = await auth()

  console.log('onboardingStep', session?.user.onboardingStep)

  if (
    !session?.user ||
    session?.user.onboardingStep === UserOnboardingStep.COMPLETE
  ) {
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

      <LayoutContent>
        <Page>
          <PageContent>{children}</PageContent>
        </Page>
      </LayoutContent>
    </Layout>
  )
}
