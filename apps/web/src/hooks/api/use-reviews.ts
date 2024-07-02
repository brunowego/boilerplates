import { type UseQueryResult, useQuery } from '@tanstack/react-query'

import type { Review } from '@acme/db/types'

import api from '@/lib/api'

const reviewKeys = {
  getReviews: () => ['reviews'] as const,
}

const fetchReviews = async () => {
  return (await api.get('reviews').then((res) => res.data)) as Promise<Review[]>
}

export const useReviews = (): UseQueryResult<Review[] | undefined, Error> => {
  return useQuery({
    queryKey: reviewKeys.getReviews(),
    queryFn: () => fetchReviews(),
  })
}
