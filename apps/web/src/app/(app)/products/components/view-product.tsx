'use client'

import type { JSX } from 'react'
import Image from 'next/image'

import Button from '@acme/ui/components/button'

import { useProduct } from '@/hooks/api/use-products'
import { formatter } from '@/utils'

import RatingForm from './rating-form'

type ViewProductProps = {
  productId: string
}

export default function ViewProduct({
  productId,
}: ViewProductProps): JSX.Element {
  const { data: product, isLoading } = useProduct(productId)

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-12 gap-8'>
        <div className='col-span-7 flex h-80 justify-center rounded-lg bg-white p-4'>
          <Image
            alt={product?.name as string}
            className='object-contain'
            src={product?.image as string}
            width={800}
            height={800}
          />
        </div>

        <div className='col-span-5 space-y-6'>
          <div className='space-y-1'>
            <h1 className='text-3xl'>{product?.name}</h1>

            <p className='text-muted-foreground text-sm'>{product?.category}</p>
          </div>

          <div className='font-medium text-xl'>
            {formatter.format(product?.price as number)}
          </div>

          <Button className='mt-auto w-full' disabled size='lg'>
            Add to cart
          </Button>
        </div>
      </div>

      <h2 className='font-medium text-lg'>Customer Review</h2>

      <RatingForm productId={product?.id as string} onAddReview={() => {}} />
    </div>
  )
}
