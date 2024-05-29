import type { JSX } from 'react'

import Page from '@acme/ui/components/page'
import { typographyVariants } from '@acme/ui/components/typography'

import Scraping from './component/scraping'

export default function EditorPage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <h1
          className={typographyVariants({
            className: 'leading-8',
            variant: 'title',
          })}
        >
          Scraping
        </h1>
      </Page.Header>

      <Page.Content>
        <Scraping />
      </Page.Content>
    </Page>
  )
}
