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

import { useUsers } from '@/hooks/api/use-users'
import { toLocalDate } from '@/utils'

type UsersListProps = {
  className?: string
}

export default function UsersList({ className }: UsersListProps): JSX.Element {
  const { data: users, isLoading } = useUsers()

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <TableHead className='w-40'>First name</TableHead>
          <TableHead className='w-40'>Last name</TableHead>
          <TableHead className='text-right'>Created at</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users && !isLoading ? (
          users.length > 0 ? (
            users.map(({ id, firstName, lastName, createdAt }) => (
              <Suspense key={id}>
                <TableRow>
                  <TableCell>{firstName}</TableCell>
                  <TableCell>{lastName}</TableCell>
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
                  title='No users found'
                  description="Looks like you still don't have any users using these criteria."
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
