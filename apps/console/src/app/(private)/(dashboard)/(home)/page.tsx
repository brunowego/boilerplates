import type { JSX } from 'react'

import { Page, PageHeader, PageContent } from '@/components/page'

import AddProductForm from './components/add-product-form'

export default function HomePage(): JSX.Element {
  return (
    <Page>
      <PageHeader>
        <h1>Add Product</h1>
      </PageHeader>

      <PageContent>
        <AddProductForm />
      </PageContent>
    </Page>
  )
}
