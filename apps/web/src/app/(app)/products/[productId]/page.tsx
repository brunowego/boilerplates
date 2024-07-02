import type { JSX } from 'react'

import Page from '@acme/ui/components/page'

import ViewProduct from '../components/view-product'

type ProductsPageProps = {
  params: {
    productId: string
  }
}

export default function ProductsPage({
  params,
}: ProductsPageProps): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Product</Page.Title>
      </Page.Header>

      <Page.Content>
        <ViewProduct productId={params.productId} />
      </Page.Content>
    </Page>
  )
}
