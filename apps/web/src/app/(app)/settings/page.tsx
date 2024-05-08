import type { JSX } from 'react'

import { typographyVariants } from '@acme/ui/components/typography'

import { Page, PageHeader, PageFooter, PageContent } from '@/components/page'

export default function SettingsPage(): JSX.Element {
  return (
    <Page>
      <PageHeader>
        <h1 className={typographyVariants({ variant: 'header' })}>Settings</h1>

        <p className={typographyVariants({ size: 'sm', variant: 'muted' })}>
          TBD
        </p>
      </PageHeader>

      <div className='flex flex-1'>
        <PageContent />

        <aside className='w-96 shrink-0 border-l' />
      </div>

      <PageFooter>
        <p>TBD</p>
      </PageFooter>
    </Page>
  )
}
