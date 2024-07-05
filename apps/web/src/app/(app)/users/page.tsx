import type { JSX } from 'react'

import Page from '@acme/ui/components/page'

import UsersList from './components/users-list'

export default function UsersPage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Users</Page.Title>
      </Page.Header>

      <UsersList />
    </Page>
  )
}
