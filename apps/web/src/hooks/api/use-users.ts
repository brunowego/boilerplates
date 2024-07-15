import useSWR from 'swr'

import type { User } from '@acme/db/schema'

import fetcher from '@/utils/fetcher'

import useRouterStuff from '../use-router-stuff'

export default function useUsers() {
  const { getQueryString } = useRouterStuff()

  const { data: users, isValidating } = useSWR<User[]>(
    `/api/users${getQueryString()}`,
    fetcher,
  )

  return {
    users,
    isValidating,
  }
}
