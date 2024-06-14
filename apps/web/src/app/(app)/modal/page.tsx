import type { JSX } from 'react'

import Page from '@acme/ui/components/page'

import Modal from './components/modal'

export default function ModalPage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Modal</Page.Title>
      </Page.Header>

      <Page.Content className='space-y-4'>
        <Modal />
      </Page.Content>
    </Page>
  )
}
