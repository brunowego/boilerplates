'use client'

import { type JSX, useRef, useEffect } from 'react'

import { Loader2 } from '@acme/ui/components/icon'

import { useProducts } from '@/hooks/api/use-products'
import CardProduct from '@/components/card-product'

export default function Products(): JSX.Element {
  const { hasNextPage, isLoading, fetchNextPage, data } = useProducts()

  const loaderRef = useRef(null)

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.9,
    }

    const obs = new IntersectionObserver((entries) => {
      const first = entries[0]

      if (first?.isIntersecting && hasNextPage && !isLoading) {
        fetchNextPage()
      }
    }, options)

    if (loaderRef.current) {
      obs.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) {
        obs.unobserve(loaderRef.current)
      }
    }
  }, [hasNextPage, isLoading, fetchNextPage])

  if (isLoading && !data) {
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

      {hasNextPage && (
        <div ref={loaderRef} className='flex justify-center py-10'>
          <Loader2 className='size-5 animate-spin' />
        </div>
      )}
    </>
  )
}
