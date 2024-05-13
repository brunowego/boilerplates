import type { JSX } from 'react'

import { typographyVariants } from '@acme/ui/components/typography'

import { Page, PageHeader, PageContent } from '@/components/page'

import AddProductForm from './components/add-product-form'

export default function HomePage(): JSX.Element {
  return (
    <Page>
      <PageHeader>
        <h1 className={typographyVariants({ variant: 'title' })}>
          Add Product
        </h1>
      </PageHeader>

      <PageContent>
        <AddProductForm />
      </PageContent>
    </Page>
  )
}
