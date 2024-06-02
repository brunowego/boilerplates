import type { JSX } from 'react'

import Page from '@acme/ui/components/page'
import { typographyVariants } from '@acme/ui/components/typography'

import Expand from './components/expand'

export default function ExpandPage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <h1
          className={typographyVariants({
            className: 'leading-8',
            variant: 'title',
          })}
        >
          Expand
        </h1>
      </Page.Header>

      <Page.Content className='space-y-4'>
        <Expand />
      </Page.Content>
    </Page>
  )
}
