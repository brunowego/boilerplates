import type { JSX } from 'react'

import Page from '@acme/ui/components/page'

export default function HomePage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Home</Page.Title>
      </Page.Header>
    </Page>
  )
}
