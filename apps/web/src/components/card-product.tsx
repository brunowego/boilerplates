import type { JSX } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

import type { Product } from '@/type'
import { FADE_IN_ANIMATION_SETTINGS } from '@/constants/framer-motion'

type CardProductProps = Product & { index: number }

export default function CardProduct({
  // index,
  title,
  price,
  images,
}: CardProductProps): JSX.Element {
  return (
    <motion.article
      className='group rounded-lg border'
      transition={{
        // delay: index * 0.25,
        // ease: 'easeInOut',
        duration: 0.2,
      }}
      {...FADE_IN_ANIMATION_SETTINGS}
    >
      <div className='aspect-square overflow-hidden'>
        <Image
          alt={title}
          className='size-full object-contain transition-all duration-300 group-hover:scale-125'
          src={images[0] as string}
          width={256}
          height={256}
        />
      </div>

      <div className='space-y-4 p-4'>
        <div className='flex justify-between space-x-4 text-sm'>
          <h3 className='truncate'>{title}</h3>

          <span className='font-semibold'>${price}</span>
        </div>

        <button
          className='group flex h-10 w-full items-stretch overflow-hidden rounded-md font-medium text-background'
          type='button'
        >
          <div className='flex w-[inherit] items-center justify-center bg-gray-100 text-xs uppercase transition-colors group-hover:bg-emerald-600 group-hover:text-white'>
            Add
          </div>

          <div className='flex items-center justify-center bg-gray-300 px-4 transition-colors group-hover:bg-emerald-500 group-hover:text-white'>
            +
          </div>
        </button>
      </div>
    </motion.article>
  )
}
