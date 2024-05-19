import { type UseQueryResult, useQuery } from '@tanstack/react-query'

import api from '@/lib/api'
import type { InsertProfile } from '@acme/db/schemas'

const profileKeys = {
  getProfile: () => ['profile'] as const,
}

const fetchProfile = async () => {
  return (await api
    .get('profile')
    .then((res) => res.data)) as Promise<InsertProfile>
}

export const useProfile = (): UseQueryResult<
  InsertProfile | undefined,
  Error
> => {
  return useQuery({
    queryKey: profileKeys.getProfile(),
    queryFn: () => fetchProfile(),
  })
}
