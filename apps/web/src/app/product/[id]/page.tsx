import type { JSX } from 'react'

import { findProduct } from './actions'

interface PageProps {
  params: {
    id: string
  }
}

export default async function Page({ params }: PageProps): Promise<JSX.Element> {
  const { id } = params
  const product = await findProduct({ id })

  return (
    <main>
      <h1>{product.title}</h1>

      <p>{product.description}</p>
    </main>
  )
}
