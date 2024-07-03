'use client'

import { type JSX, useState, useRef, useEffect } from 'react'

import { Loader2 } from '@acme/ui/components/icon'

import type { Product } from '@/type'
import { axios } from '@/lib/api'
import CardProduct from '@/components/card-product'

export default function Products(): JSX.Element {
  const [hasMore, setHasMore] = useState(true)
  const [data, setData] = useState<Product[]>([])
  const [page, setPage] = useState(0)

  const loaderRef = useRef(null)

  async function getData() {
    await axios
      .get(
        `https://dummyjson.com/products?limit=12&skip=${page * 12}&select=title,images,description,price`,
      )
      .then((res) => {
        if (res.data.products.length === 0) {
          setHasMore(false)
        } else {
          setData([...data, ...res.data.products])
          setPage((page) => page + 1)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.9,
    }

    const obs = new IntersectionObserver((entries) => {
      const first = entries[0]

      if (first?.isIntersecting && hasMore) {
        getData()
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
  }, [page, loaderRef])

  return (
    <div className='grid grid-cols-4 gap-2'>
      {data?.map((product, index) => (
        <CardProduct
          index={index}
          // biome-ignore lint/suspicious/noArrayIndexKey: This is a demo
          key={index}
          {...product}
        />
      ))}

      {hasMore && <Loader2 className='size-5 animate-spin' ref={loaderRef} />}
    </div>
  )
}
