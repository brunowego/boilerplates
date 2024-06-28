import type { JSX } from 'react'

import Page from '@acme/ui/components/page'

import ProseKit from './components/prosekit'

export default function AvatarPage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Page.Title>ProseKit</Page.Title>
      </Page.Header>

      <Page.Content>
        <ProseKit />
      </Page.Content>
    </Page>
  )
}
