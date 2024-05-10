'use client'

import { createContext, type ReactNode, useMemo, useContext } from 'react'

import type { Workspace } from '@acme/db/schemas'

import { useWorkspaces } from '@/hooks/api/use-workspaces'

type WorkspaceContextType = {
  workspaces?: Workspace[]
  currentWorkspace?: Workspace
  isLoading: boolean
}

const WorkspaceContext = createContext<WorkspaceContextType | null>(null)

type WorkspaceProviderProps = {
  children: ReactNode
}

export default function WorkspaceProvider({
  children,
}: WorkspaceProviderProps): JSX.Element {
  const { data: workspaces, isLoading } = useWorkspaces()

  const currentWorkspaceId =
    typeof localStorage !== 'undefined'
      ? localStorage.getItem('currentWorkspaceId')
      : null

  const value = useMemo<WorkspaceContextType>(
    () => ({
      workspaces,
      currentWorkspace: (workspaces || []).find(
        ({ id }) => id === currentWorkspaceId,
      ),
      isLoading,
    }),
    [currentWorkspaceId, workspaces, isLoading],
  )

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  )
}

export const useWorkspace = () => {
  const ctx = useContext(WorkspaceContext)

  if (!ctx) {
    throw new Error(
      'useWorkspace to be used within <WorkspaceContext.Provider>',
    )
  }

  return ctx
}
