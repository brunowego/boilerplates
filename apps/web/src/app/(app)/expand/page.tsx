import type { JSX } from 'react'

import Page from '@acme/ui/components/page'

import Expand from './components/expand'

export default function ExpandPage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Expand</Page.Title>
      </Page.Header>

      <Page.Content className='space-y-4'>
        <Expand />
      </Page.Content>
    </Page>
  )
}
