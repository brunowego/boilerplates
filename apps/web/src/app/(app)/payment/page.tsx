import type { JSX } from 'react'

import Page from '@/components/page'

import Checkout from './components/checkout'

export default function HomePage(): JSX.Element {
  const amount = 49.99

  return (
    <Page>
      <Page.Header>
        <Page.Title>Checkout</Page.Title>
      </Page.Header>

      <Page.Content className='space-y-4'>
        <dl>
          <dt className='font-medium'>John Doe</dt>
          <dd>has requested ${amount}</dd>
        </dl>

        <Checkout amount={amount} />
      </Page.Content>
    </Page>
  )
}
