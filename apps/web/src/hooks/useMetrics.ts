import { UseQueryResult, useQuery } from '@tanstack/react-query'
import ky from 'ky'

import { TotalRevenue, Subscriptions } from '@/types'

const fetchTotalRevenue = async () => {
  return (await ky('/v1/metrics/total-revenue').json()) as TotalRevenue
}

const fetchSubscriptions = async () => {
  return (await ky('/v1/metrics/subscriptions').json()) as TotalRevenue
}

const useTotalRevenue = (): UseQueryResult<TotalRevenue | undefined, Error> => {
  return useQuery({
    queryKey: ['metrics', 'total-revenue'],
    queryFn: fetchTotalRevenue,
  })
}

const useSubscriptions = (): UseQueryResult<
  Subscriptions | undefined,
  Error
> => {
  return useQuery({
    queryKey: ['metrics', 'subscriptions'],
    queryFn: fetchSubscriptions,
  })
}

export {
  fetchTotalRevenue,
  fetchSubscriptions,
  useTotalRevenue,
  useSubscriptions,
}
