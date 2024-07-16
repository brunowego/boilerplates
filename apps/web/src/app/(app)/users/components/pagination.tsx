import type { JSX } from 'react'
import { useSearchParams } from 'next/navigation'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
  PaginationButton,
  PaginationPrevious,
  PaginationNext,
} from '@acme/ui/components/pagination'
import NumberTooltip from '@acme/ui/components/number-tooltip'
import { nFormatter } from '@acme/ui/lib/formater'

import useRouterStuff from '@/hooks/use-router-stuff'
import useUsersCount from '@/hooks/api/use-users-count'

export const PAGINATION_LIMIT = 15

type PaginationProps = {
  className?: string
}

export default function Pagination2({
  className,
}: PaginationProps): JSX.Element {
  const searchParams = useSearchParams()
  const currentPage = Number.parseInt(searchParams?.get('page') || '1')
  const { queryParams } = useRouterStuff()

  const { data: count } = useUsersCount()

  const paginatedCount = Math.ceil(count.total / PAGINATION_LIMIT)
  const paginationArray = !Number.isNaN(paginatedCount)
    ? Array.from(Array(paginatedCount).keys())
    : []

  return (
    <>
      <Pagination className='h-10'>
        <PaginationContent>
          {currentPage > 1 && paginatedCount > 5 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  queryParams({
                    set: {
                      page: (currentPage - 1).toString(),
                    },
                  })
                }}
              />
            </PaginationItem>
          )}

          {paginationArray.length > 6 ? (
            currentPage > 3 && currentPage < paginationArray.length - 2 ? (
              <>
                <PaginationButton2 value={1} />

                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>

                <PaginationButton2 value={currentPage - 1} />
                <PaginationButton2 value={currentPage} />
                <PaginationButton2 value={currentPage + 1} />

                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>

                <PaginationButton2 value={paginationArray.length} />
              </>
            ) : currentPage <= 3 ? (
              <>
                <PaginationButton2 value={1} />
                <PaginationButton2 value={2} />
                <PaginationButton2 value={3} />

                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>

                <PaginationButton2 value={paginationArray.length} />
              </>
            ) : (
              <>
                <PaginationButton2 value={1} />

                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>

                <PaginationButton2 value={paginationArray.length - 2} />
                <PaginationButton2 value={paginationArray.length - 1} />
                <PaginationButton2 value={paginationArray.length} />
              </>
            )
          ) : (
            paginationArray.map((i) => (
              <PaginationButton2 key={i + 1} value={i + 1} />
            ))
          )}

          {currentPage < paginatedCount && paginatedCount > 5 && (
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  queryParams({
                    set: {
                      page: (currentPage + 1).toString(),
                    },
                  })
                }}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>

      <div className='mt-6' />

      <p className='text-center text-muted-foreground text-xs'>
        Showing {(currentPage - 1) * PAGINATION_LIMIT + 1} -{' '}
        {Math.min(currentPage * PAGINATION_LIMIT, count.total)} of{' '}
        <NumberTooltip value={count.total} unit='users'>
          <span>{nFormatter(count.total)}</span>
        </NumberTooltip>{' '}
        users
      </p>
    </>
  )
}

const PaginationButton2 = ({ value }: { value: number }) => {
  const searchParams = useSearchParams()
  const currentPage = Number.parseInt(searchParams?.get('page') || '1')
  const { queryParams } = useRouterStuff()

  return (
    <PaginationButton
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
    </PaginationButton>
  )
}
