import type { JSX } from 'react'

import { auth } from '@acme/auth'
import { typographyVariants } from '@acme/ui/components/typography'

import { Page, PageContent, PageHeader } from '@/components/page'

// import TestUpateSessionButton from '@/components/test-update-session-button'

import Me from './components/me'
import SwitchWorkspace from '@/components/switch-workspace'

export default async function HomePage(): Promise<JSX.Element> {
  const session = await auth()

  return (
    <Page>
      <PageHeader>
        <h1 className={typographyVariants({ variant: 'header' })}>Me</h1>
      </PageHeader>

      <PageContent className='space-y-4'>
        <SwitchWorkspace className='max-w-xs' />

        {/* <TestUpateSessionButton workspaceId='01J101T7E9VXK6ZW32PAH82SXP'>
          Change user session workspaceId
        </TestUpateSessionButton> */}

        <div className='space-y-4'>
          <h2>Client</h2>

          <pre className='text-sm'>{JSON.stringify(session, null, 2)}</pre>

          <h2>API</h2>

          <Me />
        </div>
      </PageContent>
    </Page>
  )
}
