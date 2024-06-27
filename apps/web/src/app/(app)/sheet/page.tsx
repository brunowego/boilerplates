import type { JSX } from 'react'

import Page from '@acme/ui/components/page'

import Sheet from './components/sheet'

export default function AvatarPage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Sheet</Page.Title>
      </Page.Header>

      <Page.Content className='space-y-4'>
        <Sheet />
      </Page.Content>
    </Page>
  )
}
