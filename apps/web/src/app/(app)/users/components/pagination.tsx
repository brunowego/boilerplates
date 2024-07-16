import type { JSX } from 'react'
import { useSearchParams } from 'next/navigation'

import Pagination from '@acme/ui/components/pagination'
import NumberTooltip from '@acme/ui/components/number-tooltip'
import { nFormatter } from '@acme/ui/lib/formater'
import cn from '@acme/ui/utils/cn'

import useRouterStuff from '@/hooks/use-router-stuff'
import { useUsersCount } from '@/hooks/api/use-users'

export const PAGINATION_LIMIT = 15

type PaginationProps = {
  className?: string
}

export default function _Pagination({
  className,
}: PaginationProps): JSX.Element {
  const searchParams = useSearchParams()
  const search = searchParams?.get('search')
  const currentPage = Number.parseInt(searchParams?.get('page') || '1')
  const { queryParams } = useRouterStuff()

  const { data: count } = useUsersCount({ search, page: currentPage })

  const total = count?.total ?? 0

  const paginatedCount = Math.ceil(total / PAGINATION_LIMIT)
  const paginationArray = !Number.isNaN(paginatedCount)
    ? Array.from(Array(paginatedCount).keys())
    : []

  return (
    <>
      <Pagination className={cn('h-10', className)}>
        <Pagination.Content>
          {currentPage > 1 && paginatedCount > 5 && (
            <Pagination.Item>
              <Pagination.Previous
                onClick={() => {
                  queryParams({
                    set: {
                      page: (currentPage - 1).toString(),
                    },
                  })
                }}
              />
            </Pagination.Item>
          )}

          {paginationArray.length > 6 ? (
            currentPage > 3 && currentPage < paginationArray.length - 2 ? (
              <>
                <PaginationButton value={1} />

                <Pagination.Item>
                  <Pagination.Ellipsis />
                </Pagination.Item>

                <PaginationButton value={currentPage - 1} />
                <PaginationButton value={currentPage} />
                <PaginationButton value={currentPage + 1} />

                <Pagination.Item>
                  <Pagination.Ellipsis />
                </Pagination.Item>

                <PaginationButton value={paginationArray.length} />
              </>
            ) : currentPage <= 3 ? (
              <>
                <PaginationButton value={1} />
                <PaginationButton value={2} />
                <PaginationButton value={3} />

                <Pagination.Item>
                  <Pagination.Ellipsis />
                </Pagination.Item>

                <PaginationButton value={paginationArray.length} />
              </>
            ) : (
              <>
                <PaginationButton value={1} />

                <Pagination.Item>
                  <Pagination.Ellipsis />
                </Pagination.Item>

                <PaginationButton value={paginationArray.length - 2} />
                <PaginationButton value={paginationArray.length - 1} />
                <PaginationButton value={paginationArray.length} />
              </>
            )
          ) : (
            paginationArray.map((i) => (
              <PaginationButton key={i + 1} value={i + 1} />
            ))
          )}

          {currentPage < paginatedCount && paginatedCount > 5 && (
            <Pagination.Item>
              <Pagination.Next
                onClick={() => {
                  queryParams({
                    set: {
                      page: (currentPage + 1).toString(),
                    },
                  })
                }}
              />
            </Pagination.Item>
          )}
        </Pagination.Content>
      </Pagination>

      <div className='mt-6' />

      <p className='text-center text-muted-foreground text-xs'>
        Showing {(currentPage - 1) * PAGINATION_LIMIT + 1} -{' '}
        {Math.min(currentPage * PAGINATION_LIMIT, total)} of{' '}
        <NumberTooltip value={total} unit='users'>
          <span>{nFormatter(total)}</span>
        </NumberTooltip>{' '}
        users
      </p>
    </>
  )
}

const PaginationButton = ({ value }: { value: number }) => {
  const searchParams = useSearchParams()
  const currentPage = Number.parseInt(searchParams?.get('page') || '1')
  const { queryParams } = useRouterStuff()

  return (
    <Pagination.Button
      isActive={value === currentPage}
      onClick={() => {
        queryParams({
          set: {
            page: value.toString(),
          },
        })
      }}
    >
      {value}
    </Pagination.Button>
  )
}
