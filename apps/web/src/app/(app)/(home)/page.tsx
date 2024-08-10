import type { JSX } from 'react'

import Page from '@/components/page'

export default function HomePage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Users</Page.Title>
      </Page.Header>

      <Page.Content />
    </Page>
  )
}
