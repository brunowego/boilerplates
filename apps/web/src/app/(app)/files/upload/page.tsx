import type { JSX } from 'react'

import { typographyVariants } from '@acme/ui/components/typography'

import { Page, PageHeader, PageContent } from '@/components/page'

import FileUpload from '../components/file-upload'

export default function NewPage(): JSX.Element {
  return (
    <Page>
      <PageHeader>
        <h1
          className={typographyVariants({
            className: 'leading-8',
            variant: 'title',
          })}
        >
          File upload
        </h1>
      </PageHeader>

      <PageContent>
        <FileUpload />
      </PageContent>
    </Page>
  )
}
