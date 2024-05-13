import type { JSX } from 'react'

import { Page, PageHeader, PageContent } from '@/components/page'
import Button from '@acme/ui/components/button'

import AddWorkspaceForm from './components/add-workspace-form'

export default function HomePage(): JSX.Element {
  return (
    <Page>
      <PageHeader className='flex border-b-0'>
        <Button className='ml-auto' variant='ghost'>
          Logout
        </Button>
      </PageHeader>

      <PageContent>
        <div className='mx-auto max-w-xl'>
          <p className='mb-2 text-muted-foreground'>1/4</p>

          <h2 className='mb-4 text-3xl'>Let's setup your workspace</h2>

          <p className='text-muted-foreground'>
            Tailwarden is an open source platform that empowers the next
            generation of developers to take control of their cloud
            infrastructure.
          </p>

          <AddWorkspaceForm className='mt-8' />
        </div>
      </PageContent>
    </Page>
  )
}
