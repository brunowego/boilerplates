import type { JSX } from 'react'

import Page from '@acme/ui/components/page'

import Products from './components/products'

export default function LoadMorePage(): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Load More</Page.Title>
      </Page.Header>

      <Page.Content className='space-y-6'>
        <Products />
      </Page.Content>
    </Page>
  )
}
