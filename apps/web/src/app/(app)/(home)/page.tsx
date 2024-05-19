import type { JSX } from 'react'

import { typographyVariants } from '@acme/ui/components/typography'

import { Page, PageHeader } from '@/components/page'

import UsersList from './components/users-list'

export default function HomePage(): JSX.Element {
  return (
    <Page>
      <PageHeader>
        <h1 className={typographyVariants({ variant: 'title' })}>Users</h1>
      </PageHeader>

      <div className='flex-1'>
        <UsersList />
      </div>
    </Page>
  )
}
