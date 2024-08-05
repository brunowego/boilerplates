import type { JSX } from 'react'

import Page from '@acme/ui/components/page'

export default async function SSRPage(): Promise<JSX.Element> {
  const data = await fetchData()

  return (
    <Page>
      <Page.Header>
        <Page.Title>Static Site Generation (SSG)</Page.Title>
      </Page.Header>

      <Page.Content>
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </Page.Content>
    </Page>
  )
}

async function fetchData() {
  const res = await fetch(
    'https://dummyjson.com/products?limit=10&select=title,images,description,price',
    {
      // SSG (replace getStaticSideProps)
      cache: 'force-cache',
      //
      // SSR (replace getServerSideProps)
      // cache: 'no-store'
      //
      // ISR + SSR (replace revalidate)
      // next: {
      //   revalidate: 20,
      // },
    },
  )

  return await res.json()
}
