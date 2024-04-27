import type { JSX } from 'react'

import { typographyVariants } from '@acme/ui/components/typography'

import { Page, PageContent, PageHeader, PageFooter } from '@/components/page'

export default async function HomePage(): Promise<JSX.Element> {
  return (
    <Page>
      <PageHeader>
        <h1 className={typographyVariants({ variant: 'header' })}>Users</h1>

        <p className={typographyVariants({ size: 'sm', variant: 'muted' })}>
          List of registered users.
        </p>
      </PageHeader>

      <PageContent>
        <p>TBD</p>
      </PageContent>

      <PageFooter>
        <p>TBD</p>
      </PageFooter>
    </Page>
  )
}
