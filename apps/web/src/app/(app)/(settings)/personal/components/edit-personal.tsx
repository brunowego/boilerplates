'use client'

import type { JSX } from 'react'

import { typographyVariants } from '@acme/ui/components/typography'

import { useProfile } from '@/hooks/api/use-profile'
import { Page, PageHeader, PageContent } from '@/components/page'

import EditPersonalForm from './edit-personal-form'

export default function EditPersonal(): JSX.Element {
  const { data: profile, isLoading } = useProfile()

  if (isLoading) {
    return <Page>Loading...</Page>
  }

  return (
    <Page>
      <PageHeader>
        <h1 className={typographyVariants({ variant: 'title' })}>Profile</h1>
      </PageHeader>

      <PageContent>
        <EditPersonalForm profile={profile} />
      </PageContent>
    </Page>
  )
}
