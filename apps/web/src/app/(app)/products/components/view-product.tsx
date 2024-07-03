'use client'

import { type JSX, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Button from '@acme/ui/components/button'
import { Star, ChevronDown, BadgeCheck, Flag } from '@acme/ui/components/icon'

import { useProduct } from '@/hooks/api/use-products'
import { formatter } from '@/utils'
import Rating from '@/components/rating'
import RatingButton from '@/components/rating-button'

// import RatingForm from './rating-form'

const stars = [
  {
    id: 1,
    name: '5',
    value: 69,
  },
  {
    id: 2,
    name: '4',
    value: 2,
  },
  {
    id: 3,
    name: '3',
    value: 1,
  },
  {
    id: 4,
    name: '2',
    value: 1,
  },
  {
    id: 5,
    name: '1',
    value: 0,
  },
]

type ViewProductProps = {
  productId: string
}

export default function ViewProduct({
  productId,
}: ViewProductProps): JSX.Element {
  const [rating, setRating] = useState(0)
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

      <div className='space-y-8' id='reviews'>
        <div className='grid grid-cols-2 items-center text-xl'>
          <h2 className='font-medium'>73 reviews</h2>

          <p className='text-right font-semibold md:text-2xl'>4.95 of 5</p>
        </div>

        <div className='grid gap-6 md:grid-cols-2'>
          <div className='space-y-1'>
            {stars.map(({ name, value }, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: This is safe
              <div className='flex items-center gap-2 text-sm' key={index}>
                <p className='w-2 shrink-0 text-center font-medium leading-none'>
                  {name}
                </p>

                <Star className='size-5 shrink-0 fill-yellow-300 stroke-yellow-300' />

                <div className='h-2.5 w-56 shrink-0 rounded-full bg-border'>
                  <div
                    className='h-2.5 rounded-full bg-yellow-300'
                    style={{ width: `${(value / 73) * 100}%` }}
                  />
                </div>

                <Link
                  className='shrink-0 font-medium leading-none underline-offset-4 hover:underline'
                  href='/'
                >
                  {value} <span className='max-lg:sr-only'>reviews</span>
                </Link>
              </div>
            ))}
          </div>

          <div className='space-y-4 text-right'>
            <div className='space-y-1'>
              <h2 className='font-medium'>
                Do you own or have used the product?
              </h2>

              <p className='text-muted-foreground text-sm'>
                Give your opinion by evaluating the product
              </p>
            </div>

            <RatingButton
              onRatingChange={(newRating) => setRating(newRating)}
              rating={rating}
            />
          </div>
        </div>

        <div className='flex justify-between border-b pb-2 text-muted-foreground leading-10'>
          <h2>
            Showing <span className='text-foreground'>73</span>{' '}
            <span className='max-md:sr-only'>customer reviews</span>
          </h2>

          <button className='flex items-center gap-x-2' type='button'>
            Recently <ChevronDown className='size-5' />
          </button>
        </div>

        <div className='divide-y *:py-8 first:*:pt-0 last:*:pb-0'>
          <div className='grid gap-6 md:grid-cols-3'>
            <div className='space-y-4'>
              <Rating rating={4} />

              <div className='space-y-0.5'>
                <p className='font-semibold'>Jese Leos</p>

                <p className='font-normal text-muted-foreground text-sm'>
                  June 24, 2024, at 12:10 PM
                </p>
              </div>

              <div className='flex items-center space-x-1.5'>
                <BadgeCheck className='size-5' />

                <p className='font-medium text-sm'>Verified purchase</p>
              </div>
            </div>

            <div className='col-span-2 space-y-5'>
              <p className='text-sm leading-6'>
                Thiago Bastos acertou em cheio com 'Carreira de Sucesso'. O
                livro é um guia completo para quem quer transformar sua carreira
                utilizando estratégias práticas e eficazes. A narrativa é direta
                e envolvente, com exemplos reais que ressoam com qualquer
                profissional. Os conselhos sobre superação de desafios e
                desenvolvimento de competências são particularmente úteis.
              </p>

              {/* <div className='flex gap-2'>
                <img
                  alt='Imagem 1'
                  className='h-32 w-24 rounded-md object-cover'
                  src='/_static/img/product/1.webp'
                />
                <img
                  alt='Imagem 2'
                  className='h-32 w-24 rounded-md object-cover'
                  src='/_static/img/product/4.webp'
                />
              </div> */}

              <div className='grid items-center justify-between gap-4 md:grid-cols-2'>
                <p className='space-x-4 font-medium text-sm'>
                  <span className='text-muted-foreground'>
                    Was it helpful for you?
                  </span>

                  <span className='space-x-4'>
                    <button
                      className='underline-offset-4 hover:underline'
                      type='button'
                    >
                      Yes
                    </button>

                    <button
                      className='underline-offset-4 hover:underline'
                      type='button'
                    >
                      No
                    </button>
                  </span>
                </p>

                <button
                  className='flex items-center gap-x-2 text-muted-foreground text-sm hover:text-foreground md:justify-end'
                  type='button'
                >
                  <Flag className='inline-block size-4' /> Report
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='my-10 flex justify-center'>
          <Button
            className='!rounded-full w-full max-w-xl'
            size='lg'
            variant='outline'
          >
            See more reviews
          </Button>
        </div>
      </div>

      {/* <RatingForm productId={product?.id as string} onAddReview={() => {}} /> */}
    </div>
  )
}
