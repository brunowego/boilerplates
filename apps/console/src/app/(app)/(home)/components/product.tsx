'use client'

import type { JSX } from 'react'

import { useProducts } from '@/hooks/api/use-products'

import EditProductForm from './edit-product-form'

type ProductProps = {
  productId: string
}

export default function Product({
  productId = 'sxQ2itlspvsb2eL',
}: ProductProps): JSX.Element {
  const { data: product, isLoading: isProductLoading } = useProducts(productId)

  if (isProductLoading) {
    return <>Loading...</>
  }

  return <EditProductForm product={product} />
}
