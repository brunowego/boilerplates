import useSWR from 'swr'

import fetcher from '@/utils/fetcher'

import useRouterStuff from '../use-router-stuff'

export default function useUsersCount() {
  const { getQueryString } = useRouterStuff()

  const { data, error } = useSWR<{ total: number }>(
    `/api/users/count${getQueryString()}`,
    fetcher,
    {
      dedupingInterval: 30000,
      keepPreviousData: true,
    },
  )

  return {
    data: data ?? { total: 0 },
    loading: !error && !data,
    error,
  }
}
