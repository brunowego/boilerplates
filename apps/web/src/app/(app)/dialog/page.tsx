import type { JSX } from 'react'

import Page from '@acme/ui/components/page'
import { typographyVariants } from '@acme/ui/components/typography'

import Dialog from './components/dialog'

export default function DialogPage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <h1
          className={typographyVariants({
            className: 'leading-8',
            variant: 'title',
          })}
        >
          Dialog
        </h1>
      </Page.Header>

      <Page.Content className='space-y-4'>
        <Dialog />
      </Page.Content>
    </Page>
  )
}
