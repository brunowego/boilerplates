import type { JSX } from 'react'
import Image from 'next/image'

import Button from '@acme/ui/components/button'

export default async function Product(): Promise<JSX.Element> {
  return (
    <article className='container grid grid-cols-6 gap-x-6'>
      <Image
        alt='Product 1'
        className='col-span-2 rounded-lg'
        src='/static/img/product-1.webp'
        width={1100}
        height={1650}
      />

      <Image
        alt='Product 2'
        className='col-span-2 rounded-lg'
        src='/static/img/product-2.webp'
        width={1100}
        height={1650}
      />

      <div className='col-span-2 space-y-4'>
        <div>
          <h1 className='mb-1 font-semibold text-4xl'>Memopad</h1>

          <p className='font-semibold text-3xl text-muted-foreground'>
            Our kind of waste.
          </p>
        </div>

        <Button className='w-full gap-x-2' size='lg'>
          Add to cart <span className='text-muted-foreground'>&ndash;</span> R$
          40,00
        </Button>
      </div>
    </article>
  )
}
