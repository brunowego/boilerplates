import {
  type UseInfiniteQueryResult,
  type InfiniteData,
  useInfiniteQuery,
} from '@tanstack/react-query'

import type { Product } from '@/types'

import { axios } from '@/lib/api'

export type FetchResponse<T> = {
  products: T[]
}

const productKeys = {
  getProducts: () => ['products'] as const,
}

const fetchProducts = async (page: number) => {
  return (await axios
    .get('https://dummyjson.com/products', {
      params: {
        select: 'title,images,description,price',
        limit: 12,
        skip: page * 12,
      },
    })
    .then((res) => res.data)) as Promise<FetchResponse<Product[]>>
}

export const useProducts = (): UseInfiniteQueryResult<
  InfiniteData<FetchResponse<Product>>,
  Error
> => {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => fetchProducts(pageParam),
    queryKey: productKeys.getProducts(),
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
  })
}
