'use client'

import type { JSX } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import cn from '@acme/ui/utils/cn'

import { useProducts } from '@/hooks/api/use-products'
import { formatter } from '@/utils'
import { Rating } from '@/components'

type ListProductsProps = {
  className?: string
}

export default function ListProducts({
  className,
}: ListProductsProps): JSX.Element {
  const { data: products, isLoading } = useProducts()

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className={cn('grid grid-cols-3', className)}>
      {products?.map(({ id, category, name, image, price }) => (
        <Link className='space-y-3' key={id} href={`/products/${id}`}>
          <div className='flex justify-center rounded-lg bg-white p-4'>
            <Image
              alt={name}
              className='aspect-square'
              src={image}
              width={256}
              height={256}
            />
          </div>

          <div className='space-y-1'>
            <div className='flex justify-between space-x-3'>
              <h3>{name}</h3>

              <p className='font-medium'>{formatter.format(price)}</p>
            </div>

            <p className='text-muted-foreground text-xs'>{category}</p>
          </div>

          <div className='flex items-center'>
            <Rating rating={4} />

            <span className='ml-2 font-semibold text-xs'>4/5</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
