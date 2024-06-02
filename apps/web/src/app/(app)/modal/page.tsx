import type { JSX } from 'react'

import Page from '@acme/ui/components/page'
import { typographyVariants } from '@acme/ui/components/typography'

import Modal from './components/modal'

export default function ModalPage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <h1
          className={typographyVariants({
            className: 'leading-8',
            variant: 'title',
          })}
        >
          Modal
        </h1>
      </Page.Header>

      <Page.Content className='space-y-4'>
        <Modal />
      </Page.Content>
    </Page>
  )
}
