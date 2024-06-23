'use client'

import { type JSX, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

import { useSession } from '@acme/auth/react'
import Skeleton from '@acme/ui/components/skeleton'
import cn from '@acme/ui/utils/cn'
import Select from '@acme/ui/components/select'

import { useWorkspaces } from '@/hooks/api/use-workspaces'

type SwitchWorkspaceProps = {
  className?: string
}

export default function SwitchWorkspace({
  className,
}: SwitchWorkspaceProps): JSX.Element {
  const { data: workspaces, isLoading } = useWorkspaces()
  const { data: session, status, update: sessionUpdate } = useSession()

  const { refresh } = useRouter()
  const queryClient = useQueryClient()

  const selected = useMemo(() => {
    return workspaces?.find(
      (workspace) => workspace.id === session?.user?.workspaceId,
    )
  }, [workspaces, session])

  if (isLoading || status === 'loading') {
    return <Skeleton className={cn('h-10', className)} />
  }

  return (
    <Select
      defaultValue={selected?.id}
      onValueChange={(value) => {
        sessionUpdate({ ...session?.user, workspaceId: value }).then(() => {
          refresh()
          queryClient.invalidateQueries()
        })
      }}
    >
      <Select.Trigger className={className}>
        <Select.Value placeholder='Select a workspace' />
      </Select.Trigger>

      <Select.Content>
        {workspaces?.map(({ id, name }) => (
          <Select.Item key={id} value={id}>
            {name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  )
}
