'use client'

import type { JSX } from 'react'

import { typographyVariants } from '@acme/ui/components/typography'

import { useWorkspace } from '@/context/workspace-context'
import { Page, PageHeader, PageFooter } from '@/components/page'

import WorkspacesList from './components/workspaces-list'

export default function HomePage(): JSX.Element {
  const ws = useWorkspace()

  return (
    <Page>
      <PageHeader>
        <h1 className={typographyVariants({ variant: 'header' })}>
          Workspaces
        </h1>

        <p className={typographyVariants({ size: 'sm', variant: 'muted' })}>
          List of registered workspaces.
        </p>
      </PageHeader>

      <div className='flex-1'>
        {ws?.currentWorkspace?.name}

        <WorkspacesList />
      </div>

      <PageFooter>
        <p>TBD</p>
      </PageFooter>
    </Page>
  )
}
