import type { JSX } from 'react'

import Page from '@acme/ui/components/page'

import UsersList from './components/list-reviews'

export default function HomePage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Users</Page.Title>
      </Page.Header>

      <UsersList />
    </Page>
  )
}
