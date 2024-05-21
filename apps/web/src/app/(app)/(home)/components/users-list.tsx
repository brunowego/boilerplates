'use client'

import { type JSX, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

import type { UserRole, UserStatus } from '@acme/db/types'
import { typographyVariants } from '@acme/ui/components/typography'
import EmptyState from '@acme/ui/components/empty-state'
import Skeleton from '@acme/ui/components/skeleton'

import { useUsers } from '@/hooks/api/use-users'
import { toLocalDate } from '@/utils'

type UsersListProps = {
  className?: string
}

export default function UsersList({ className }: UsersListProps): JSX.Element {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')
  const role = searchParams.get('role') as UserRole
  const status = searchParams.getAll('status') as UserStatus[]

  const { data: users, isLoading } = useUsers({
    filter: { query, role, status },
  })

  return (
    <div className={className}>
      {users && !isLoading ? (
        users.length > 0 ? (
          <div className='grid grid-cols-6 gap-4'>
            {users.map(({ id, firstName, lastName, createdAt }) => (
              <Suspense key={id}>
                <div className='aspect-square rounded-md border bg-border/15 p-4'>
                  <h3 className='font-medium text-sm'>
                    {firstName} {lastName}
                  </h3>

                  <time
                    className={typographyVariants({
                      className: 'text-xs',
                      variant: 'muted',
                    })}
                  >
                    {toLocalDate(createdAt)}
                  </time>
                </div>
              </Suspense>
            ))}
          </div>
        ) : (
          <>
            <div className='relative'>
              <div className='grid grid-cols-6 gap-x-4'>
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    className='aspect-square rounded-t-md border border-dashed bg-border/15'
                    // biome-ignore lint/suspicious/noArrayIndexKey: This is static placeholder content
                    key={index}
                  />
                ))}
              </div>

              <div className='absolute inset-y-0 w-full bg-gradient-to-b from-transparent to-background' />
            </div>

            <EmptyState
              className='-mt-40 relative'
              title='Add users the platform'
              description='Empower your platform by seamlessly adding users.'
            />
          </>
        )
      ) : (
        <div className='relative'>
          <div className='grid grid-cols-6 gap-x-4'>
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                className='aspect-square border border-dashed'
                // biome-ignore lint/suspicious/noArrayIndexKey: This is static placeholder content
                key={index}
              />
            ))}
          </div>

          <div className='absolute inset-y-0 w-full bg-gradient-to-b from-transparent to-background' />
        </div>
      )}
    </div>
  )
}
