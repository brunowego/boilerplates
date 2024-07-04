'use client'

import type { JSX } from 'react'

import Button from '@acme/ui/components/button'
import { Loader2 } from '@acme/ui/components/icon'

import { useProducts } from '@/hooks/api/use-products'
import CardProduct from '@/components/card-product'

export default function Products(): JSX.Element {
  const { data, isLoading, fetchNextPage } = useProducts()

  if (isLoading) {
    return <Loader2 className='size-6 animate-spin' />
  }

  return (
    <>
      <div className='grid grid-cols-4 gap-2'>
        {data?.pages.map((page) =>
          page.products.map((product) => (
            <CardProduct key={product.id} {...product} />
          )),
        )}
      </div>

      <div className='flex justify-center pb-10'>
        <Button
          className='!rounded-full w-full max-w-lg'
          disabled={isLoading}
          onClick={() => fetchNextPage()}
          size='lg'
          variant='outline'
        >
          {isLoading ? (
            <Loader2 className='size-5 animate-spin' />
          ) : (
            <>Load more</>
          )}
        </Button>
      </div>
    </>
  )
}
