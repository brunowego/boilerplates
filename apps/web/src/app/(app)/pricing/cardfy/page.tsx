import type { JSX } from 'react'

import Page from '@acme/ui/components/page'
import { typographyVariants } from '@acme/ui/components/typography'
import Pricing from './components/pricing'

export default function ButtonPage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <h1
          className={typographyVariants({
            className: 'leading-8',
            variant: 'title',
          })}
        >
          Cardfy
        </h1>
      </Page.Header>

      <Page.Content className='space-y-2'>
        <Pricing />
      </Page.Content>
    </Page>
  )
}
