'use client'

import type { JSX } from 'react'

import { typographyVariants } from '@acme/ui/components/typography'
import LoadingBarDivider from '@acme/ui/components/loading-bar-divider'

import { useUsers } from '@/hooks/api/use-users'
import { Page, PageHeader, PageFooter } from '@/components/page'

import UsersList from './users-list'

export default function Home(): JSX.Element {
  const { data: users, isLoading } = useUsers()

  return (
    <Page>
      <PageHeader>
        <h1 className={typographyVariants({ variant: 'header' })}>Users</h1>

        <p className={typographyVariants({ size: 'sm', variant: 'muted' })}>
          List of registered users.
        </p>
      </PageHeader>

      <LoadingBarDivider isLoading={isLoading} />

      <div className='flex-1'>
        <UsersList users={users} isLoading={isLoading} />
      </div>

      <PageFooter>
        <p>TBD</p>
      </PageFooter>
    </Page>
  )
}
