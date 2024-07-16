import type { JSX } from 'react'

import Page from '@acme/ui/components/page'

import ViewUsers from './components/view-users'

export default function HomePage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Users</Page.Title>
      </Page.Header>

      <ViewUsers />
    </Page>
  )
}
