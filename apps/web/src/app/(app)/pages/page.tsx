import type { JSX } from 'react'

import Page from '@acme/ui/components/page'
import { typographyVariants } from '@acme/ui/components/typography'

import ListPages from './components/list-pages'

export default function HomePage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <h1
          className={typographyVariants({
            className: 'leading-8',
            variant: 'title',
          })}
        >
          Pages
        </h1>
      </Page.Header>

      <Page.Content>
        <ListPages />
      </Page.Content>
    </Page>
  )
}
