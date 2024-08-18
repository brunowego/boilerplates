import type { JSX } from 'react'

import Page from '@/components/page'

type SuccessPageProps = {
  searchParams: {
    amount: string
  }
}

export default function SuccessPage({
  searchParams,
}: SuccessPageProps): JSX.Element {
  return (
    <Page>
      <Page.Header>
        <Page.Title>Success Payment</Page.Title>
      </Page.Header>

      <Page.Content>{searchParams.amount}</Page.Content>
    </Page>
  )
}
