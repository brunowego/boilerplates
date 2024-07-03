import type { JSX } from 'react'

import Page from '@acme/ui/components/page'

import Components from './components/components'

export default function ComponentsPage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Components</Page.Title>
      </Page.Header>

      <Page.Content className='space-y-4'>
        <Components />
      </Page.Content>
    </Page>
  )
}
