import type { JSX } from 'react'

import Page from '@acme/ui/components/page'

import ReactGridLayout from './components/react-grid-layout'

export default function AvatarPage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Page.Title>React Grid Layout</Page.Title>
      </Page.Header>

      <Page.Content>
        <ReactGridLayout />
      </Page.Content>
    </Page>
  )
}
