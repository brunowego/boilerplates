import { type UseQueryResult, useQuery } from '@tanstack/react-query'

import api from '@/lib/api'
import type { Product } from '@acme/db/schemas'

const productKeys = {
  getProduct: (productId: string) => ['product', productId] as const,
}

const fetchProduct = async (productId: string) => {
  return (await api
    .get(`/products/${productId}`)
    .then((res) => res.data)) as Promise<Product>
}

export const useProducts = (
  productId: string,
): UseQueryResult<Product | undefined, Error> => {
  return useQuery({
    queryKey: productKeys.getProduct(productId),
    queryFn: () => fetchProduct(productId),
  })
}
