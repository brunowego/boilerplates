import { type UseQueryResult, useQuery } from '@tanstack/react-query'

import api from '@/lib/api'
import type { Workspace } from '@acme/db/schemas'

const workspaceKeys = {
  getWorkspaces: () => ['workspaces'] as const,
}

const fetchWorkspaces = async () => {
  return (await api.get('workspaces').then((res) => res.data)) as Promise<
    Workspace[]
  >
}

export const useWorkspaces = (): UseQueryResult<
  Workspace[] | undefined,
  Error
> => {
  return useQuery({
    queryKey: workspaceKeys.getWorkspaces(),
    queryFn: () => fetchWorkspaces(),
  })
}
