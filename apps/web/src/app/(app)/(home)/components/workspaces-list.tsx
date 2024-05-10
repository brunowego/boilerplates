'use client'

import { type JSX, Suspense } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@acme/ui/components/table'
import EmptyState from '@acme/ui/components/empty-state'
import Skeleton from '@acme/ui/components/skeleton'

import { useWorkspaces } from '@/hooks/api/use-workspaces'
import { toLocalDate } from '@/utils'

type WorkspacesListProps = {
  className?: string
}

export default function WorkspacesList({
  className,
}: WorkspacesListProps): JSX.Element {
  const { data: workspaces, isLoading } = useWorkspaces()

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <TableHead className='w-56'>Name</TableHead>
          <TableHead className='w-56'>Slug</TableHead>
          <TableHead className='text-right'>Created at</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {workspaces && !isLoading ? (
          workspaces.length > 0 ? (
            workspaces.map(({ id, name, slug, createdAt }) => (
              <Suspense key={id}>
                <TableRow>
                  <TableCell>{name}</TableCell>
                  <TableCell>{slug}</TableCell>
                  <TableCell className='text-right'>
                    {toLocalDate(createdAt)}
                  </TableCell>
                </TableRow>
              </Suspense>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>
                <EmptyState
                  emoji='🧘🏻'
                  title='No workspaces found'
                  description="Looks like you still don't have any workspaces."
                />
              </TableCell>
            </TableRow>
          )
        ) : (
          Array.from({ length: 15 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: This is a skeleton loader
            <TableRow key={i}>
              <TableCell>
                <Skeleton className='h-3 w-24 rounded-full' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-3 w-24 rounded-full' />
              </TableCell>
              <TableCell className='text-right'>
                <Skeleton className='inline-flex h-3 w-20 rounded-full' />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
