import { type UseQueryResult, useQuery } from '@tanstack/react-query'

import type { Product } from '@acme/db/types'

import api from '@/lib/api'

const productKeys = {
  getProducts: () => ['products'] as const,
  getProduct: (id: string) => ['products', id] as const,
}

const fetchProducts = async () => {
  return (await api.get('products').then((res) => res.data)) as Promise<
    Product[]
  >
}

const fetchProduct = async (id: string) => {
  return (await api
    .get(`products/${id}`)
    .then((res) => res.data)) as Promise<Product>
}

export const useProducts = (): UseQueryResult<Product[] | undefined, Error> => {
  return useQuery({
    queryKey: productKeys.getProducts(),
    queryFn: () => fetchProducts(),
  })
}

export const useProduct = (
  id: string,
): UseQueryResult<Product | undefined, Error> => {
  return useQuery({
    queryKey: productKeys.getProduct(id),
    queryFn: () => fetchProduct(id),
  })
}
