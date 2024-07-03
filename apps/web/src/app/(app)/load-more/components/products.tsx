'use client'

import { type JSX, useState, useEffect } from 'react'

import Button from '@acme/ui/components/button'
import { Loader2 } from '@acme/ui/components/icon'

import type { Product } from '@/type'
import { axios } from '@/lib/api'
import CardProduct from '@/components/card-product'

export default function Products(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Product[]>([])
  const [page, setPage] = useState(0)

  useEffect(() => {
    async function loadData() {
      setLoading(true)

      await axios
        .get(
          `https://dummyjson.com/products?limit=12&skip=${page * 12}&select=title,images,description,price`,
        )
        .then((res) => {
          setData([...data, ...res.data.products])
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
    }

    loadData()
  }, [page])

  const loadMore = async () => {
    setLoading(true)
    setPage(page + 1)

    await axios
      .get(
        `https://dummyjson.com/products?limit=12&skip=${page * 12}&select=title,images,description,price`,
      )
      .then((res) => {
        setLoading(false)
        setData([...res.data, data])
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  return (
    <>
      <div className='grid grid-cols-4 gap-2'>
        {data?.map((product, index) => (
          <CardProduct
            index={index}
            // biome-ignore lint/suspicious/noArrayIndexKey: This is a demo
            key={index}
            {...product}
          />
        ))}
      </div>

      <div className='flex justify-center pb-10'>
        <Button
          className='!rounded-full w-full max-w-lg'
          disabled={loading}
          onClick={loadMore}
          size='lg'
          variant='outline'
        >
          {loading ? (
            <Loader2 className='size-5 animate-spin' />
          ) : (
            <>Load more</>
          )}
        </Button>
      </div>
    </>
  )
}
