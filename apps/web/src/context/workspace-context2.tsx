'use client'

import {
  type ReactNode,
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
} from 'react'

import type { Workspace } from '@acme/db/schemas'

import { useWorkspaces } from '@/hooks/api/use-workspaces'

export type WorkspaceContextType = {
  workspaces: Workspace[]
  currentWorkspace: Workspace | null
  isLoading: boolean
  setCurrentWorkspace: (workspace: Workspace) => void
}

export const initialState = {
  workspaces: [],
  currentWorkspace: null,
  isLoading: false,
  setCurrentWorkspace: (workspace: Workspace) => {},
}

const WorkspaceContext = createContext<WorkspaceContextType | null>(
  initialState,
)

type WorkspaceContextProps = {
  children: ReactNode
}

export default function WorkspaceProvider({
  children,
}: WorkspaceContextProps): JSX.Element {
  const { data: workspaces, isLoading } = useWorkspaces()
  const [currentWorkspace, setCurrentWorkspaceState] =
    useState<Workspace | null>(null)

  const setCurrentWorkspace = useCallback((workspace: Workspace) => {
    setCurrentWorkspaceState(workspace)
  }, [])

  const currentWorkspaceId = currentWorkspace
    ? currentWorkspace.id
    : typeof localStorage !== 'undefined'
      ? localStorage.getItem('currentWorkspaceId')
      : null

  const value = useMemo(
    () => ({
      workspaces: workspaces || [],
      currentWorkspace:
        (workspaces || []).find(
          (workspace) => workspace.id === currentWorkspaceId,
        ) || (workspaces || [])[0],
      isLoading,
      setCurrentWorkspace,
    }),
    [workspaces, currentWorkspace, isLoading],
  )

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  )
}

export const useWorkspace = () => useContext(WorkspaceContext)
