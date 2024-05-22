import { type UseQueryResult, useQuery } from '@tanstack/react-query'

import api from '@/lib/api'
import type { User } from '@acme/db/schemas'

const userKeys = {
  getUser: () => ['user'] as const,
}

const fetchUser = async () => {
  return (await api.get('user').then((res) => res.data)) as Promise<User>
}

export const useUser = (): UseQueryResult<User | undefined, Error> => {
  return useQuery({
    queryKey: userKeys.getUser(),
    queryFn: () => fetchUser(),
  })
}
