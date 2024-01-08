'use client'

import type { UseQueryResult } from '@tanstack/react-query'
import type { JSX } from 'react'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@acme/ui/src/components/ui/card'

import type { TotalRevenue as Type } from '@/types'

type TotalRevenueProps = {
  query: () => UseQueryResult<Type | null | undefined, Error>
}

export function TotalRevenue({ query }: TotalRevenueProps): JSX.Element {
  const { data, isLoading /*, error */ } = query()

  const { amount, diffFromLastMonth } = data || {
    amount: 0,
    diffFromLastMonth: 0,
  }

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>

        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          className='h-4 w-4 text-muted-foreground'
        >
          <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
        </svg>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className='text-2xl font-bold'>...</div>
        ) : (
          <>
            <div className='text-2xl font-bold'>
              $ {amount.toLocaleString('en-US')}
            </div>

            <p className='text-xs text-muted-foreground'>
              {diffFromLastMonth > 0 ? '+' : '-'}
              {diffFromLastMonth}% from last month
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
