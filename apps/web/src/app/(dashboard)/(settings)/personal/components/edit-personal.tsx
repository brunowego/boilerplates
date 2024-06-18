import type { JSX } from 'react'

import { typographyVariants } from '@acme/ui/components/typography'

import { Page, PageHeader, PageContent } from '@/components/page'

import EditPersonalForm from './edit-personal-form'

export default function EditPersonal(): JSX.Element {
  return (
    <Page>
      <PageHeader>
        <h1 className={typographyVariants({ variant: 'title' })}>Profile</h1>
      </PageHeader>

      <PageContent>
        <EditPersonalForm />
      </PageContent>
    </Page>
  )
}
