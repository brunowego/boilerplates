import { type UseQueryResult, useQuery } from '@tanstack/react-query'

import api from '@/lib/api'
import type { User } from '@acme/db/schema'

const userKeys = {
  getUsers: () => ['users'] as const,
}

const fetchUsers = async () => {
  return (await api.get('users').then((res) => res.data)) as Promise<User[]>
}

export const useUsers = (): UseQueryResult<User[] | undefined, Error> => {
  return useQuery({
    queryKey: userKeys.getUsers(),
    queryFn: () => fetchUsers(),
  })
}
