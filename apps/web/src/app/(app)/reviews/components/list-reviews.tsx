'use client'

import { type JSX, Suspense } from 'react'

import Table from '@acme/ui/components/table'
import EmptyState from '@acme/ui/components/empty-state'
// import Skeleton from '@acme/ui/components/skeleton'

import { useReviews } from '@/hooks/api/use-reviews'
// import { toLocalDate } from '@/utils'

type ListProductsProps = {
  className?: string
}

export default function ListProducts({
  className,
}: ListProductsProps): JSX.Element {
  const { data: reviews, isLoading } = useReviews()

  return (
    <Table className={className}>
      <Table.Header>
        <Table.Row>
          {/* <Table.Head className='w-40'>Name</Table.Head> */}
          {/* <Table.Head className='w-40'>Email</Table.Head> */}
          {/* <Table.Head className='text-right'>Created at</Table.Head> */}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {reviews && !isLoading ? (
          reviews.length > 0 ? (
            reviews.map(({ id }) => (
              <Suspense key={id}>
                <Table.Row>
                  {/* <Table.Cell>{fullName}</Table.Cell> */}
                  {/* <Table.Cell>{email}</Table.Cell> */}
                  {/* <Table.Cell className='text-right'>
                    {toLocalDate(createdAt)}
                  </Table.Cell> */}
                </Table.Row>
              </Suspense>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={3}>
                <EmptyState
                  emoji='🧘🏻'
                  title='No reviews found'
                  description="Looks like you still don't have any reviews using these criteria."
                />
              </Table.Cell>
            </Table.Row>
          )
        ) : (
          Array.from({ length: 15 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: This is a skeleton loader
            <Table.Row key={i}>
              {/* <Table.Cell>
                <Skeleton className='h-3 w-24 rounded-full' />
              </Table.Cell> */}
              {/* <Table.Cell>
                <Skeleton className='h-3 w-24 rounded-full' />
              </Table.Cell> */}
              {/* <Table.Cell className='text-right'>
                <Skeleton className='inline-flex h-3 w-20 rounded-full' />
              </Table.Cell> */}
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table>
  )
}
