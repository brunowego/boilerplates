import { type UseQueryResult, useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api'
import type { MeResponse } from '@/app/api/me/route'

const userKeys = {
  getUserProfile: ['user', 'profile'] as const,
}

const fetchUserProfile = async () => {
  return (await api.get('/me').then((res) => res.data)) as Promise<MeResponse>
}

export const useGetProfile = (): UseQueryResult<
  MeResponse | undefined,
  Error
> => {
  return useQuery({
    queryKey: userKeys.getUserProfile,
    queryFn: fetchUserProfile,
  })
}
