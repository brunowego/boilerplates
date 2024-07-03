import type { JSX } from 'react'

import Page from '@acme/ui/components/page'

import Products from './components/products'

export default function AutoLoadMorePage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Auto Load More</Page.Title>
      </Page.Header>

      <Page.Content>
        <Products />
      </Page.Content>
    </Page>
  )
}
