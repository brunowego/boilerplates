import type { JSX } from 'react'

import Page from '@acme/ui/components/page'

import Dialog from './components/dialog'

export default function DialogPage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Dialog</Page.Title>
      </Page.Header>

      <Page.Content className='space-y-4'>
        <Dialog />
      </Page.Content>
    </Page>
  )
}
