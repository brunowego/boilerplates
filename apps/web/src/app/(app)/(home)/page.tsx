import type { JSX } from 'react'

import { typographyVariants } from '@acme/ui/components/typography'

import { Page, PageHeader, PageFooter } from '@/components/page'

import UsersList from './components/users-list'

export default function HomePage(): JSX.Element {
  return (
    <Page>
      <PageHeader>
        <h1 className={typographyVariants({ variant: 'header' })}>Users</h1>

        <p className={typographyVariants({ size: 'sm', variant: 'muted' })}>
          List of registered users.
        </p>
      </PageHeader>

      <div className='flex-1'>
        <UsersList />
      </div>

      <PageFooter>
        <p>TBD</p>
      </PageFooter>
    </Page>
  )
}