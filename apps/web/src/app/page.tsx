import type { JSX } from 'react'

import medusa from '@/lib/medusa'

export default function Page(): JSX.Element {
  void medusa.admin.products.list().then(({ products }) => {
    console.log(products.length)
  })

  // void medusa.products.list().then(({ products }) => {
  //   console.log(products.length)
  // })

  return (
    <main>
      <h1>ACME</h1>
    </main>
  )
}
