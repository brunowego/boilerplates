import type { JSX } from 'react'

import Page from '@acme/ui/components/page'

import ListProducts from './components/list-products'

export default function ProductsPage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Products</Page.Title>
      </Page.Header>

      <Page.Content>
        <ListProducts />
      </Page.Content>
    </Page>
  )
}
