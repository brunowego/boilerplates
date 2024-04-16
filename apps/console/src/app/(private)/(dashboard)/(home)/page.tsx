import type { JSX } from 'react'

import AddProductForm from './components/add-product-form'

export default function HomePage(): JSX.Element {
  return (
    <>
      <header>
        <h1>Add Product</h1>
      </header>

      <div className='mt-4' />

      <AddProductForm />
    </>
  )
}
