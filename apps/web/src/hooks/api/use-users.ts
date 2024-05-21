import { type UseQueryResult, useQuery } from '@tanstack/react-query'

import type { UserRole, UserStatus, User } from '@acme/db/types'

import api from '@/lib/api'

type UsersFilter = {
  query?: string | null
  role?: UserRole
  status?: UserStatus[]
}

const userKeys = {
  getUsers: (filter?: UsersFilter) => ['users', { filter }] as const,
}

const fetchUsers = async (filter?: UsersFilter) => {
  return (await api
    .get('users', {
      params: {
        ...filter,
      },
      paramsSerializer: { indexes: null },
    })
    .then((res) => res.data)) as Promise<User[]>
}

type UseUsersProps = {
  filter?: UsersFilter
}

export const useUsers = ({
  filter,
}: UseUsersProps): UseQueryResult<User[] | undefined, Error> => {
  return useQuery({
    queryKey: userKeys.getUsers(filter),
    queryFn: () => fetchUsers(filter),
  })
}
