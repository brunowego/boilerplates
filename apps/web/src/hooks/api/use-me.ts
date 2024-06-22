import { type UseQueryResult, useQuery } from '@tanstack/react-query'

import api from '@/lib/api'
import type { UserSession } from '@acme/db/types'

const meKeys = {
  getMe: () => ['me'] as const,
}

const fetchMe = async () => {
  return (await api.get('me').then((res) => res.data)) as Promise<UserSession>
}

export const useMe = (): UseQueryResult<UserSession | undefined, Error> => {
  return useQuery({
    queryKey: meKeys.getMe(),
    queryFn: () => fetchMe(),
  })
}
