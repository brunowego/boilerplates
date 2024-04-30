import type { JSX } from 'react'

import { typographyVariants } from '@acme/ui/components/typography'

import { Page, PageContent, PageHeader, PageFooter } from '@/components/page'

export default async function HomePage(): Promise<JSX.Element> {
  return (
    <Page>
      <PageHeader>
        <h1 className={typographyVariants({ variant: 'header' })}>Admin</h1>
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
