'use client'

import type { JSX } from 'react'

import Page from '@acme/ui/components/page'
import Button from '@acme/ui/components/button'

import RoleSelector from '@/components/role-selector'

import UsersList from './components/users-list'

export default function HomePage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Users</Page.Title>
      </Page.Header>

      <Page.Content>
        <div className='flex space-x-2'>
          <RoleSelector />

          <Button variant='ghost'>Clean</Button>
        </div>

        <UsersList className='mt-4' />
      </Page.Content>
    </Page>
  )
}
