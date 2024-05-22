import type { JSX } from 'react'

import { typographyVariants } from '@acme/ui/components/typography'

import { Page, PageHeader, PageContent, PageFooter } from '@/components/page'

import ListPages from './components/list-pages'

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
          Pages
        </h1>
      </PageHeader>

      <PageContent>
        <ListPages />
      </PageContent>

      <PageFooter>
        <p>TBD</p>
      </PageFooter>
    </Page>
  )
}
