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
import Skeleton from '@acme/ui/components/skeleton'
import EmptyState from '@acme/ui/components/empty-state'

import useRouterStuff from '@/hooks/use-router-stuff'
import { useUsers } from '@/hooks/api/use-users'
import { toLocalDate } from '@/utils/formatter'

import Search from './search'
import Sort from './sort'
import Pagination from './pagination'

export default function ViewUsers(): JSX.Element {
  const { searchParams } = useRouterStuff()
  const search = searchParams?.get('search')
  const sortBy = searchParams?.get('sortBy')
  const page = Number.parseInt(searchParams?.get('page') || '1')

  const { data: users, isLoading } = useUsers({ search, sortBy, page })

  return (
    <>
      <div className='flex space-x-4 p-4 lg:px-5'>
        <Search className='max-w-sm' placeholder='Search for users...' />

        <Sort />
      </div>

      <Table>
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
                    <TableCell>
                      <div>{firstName}</div>
                    </TableCell>
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

      <Pagination />
    </>
  )
}
