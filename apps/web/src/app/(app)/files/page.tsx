import type { JSX } from 'react'

import { typographyVariants } from '@acme/ui/components/typography'

import { Page, PageHeader, PageContent } from '@/components/page'

import ListFiles from './components/list-files'

export default function HomePage(): JSX.Element {
  return (
    <Page>
      <PageHeader>
        <h1
          className={typographyVariants({
            className: 'leading-8',
            variant: 'title',
          })}
        >
          Files
        </h1>
      </PageHeader>

      <PageContent>
        <ListFiles />
      </PageContent>
    </Page>
  )
}
