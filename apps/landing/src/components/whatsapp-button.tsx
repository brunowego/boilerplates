'use client'

import { type JSX, useState, useEffect } from 'react'
import Image from 'next/image'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Icon,
  Button,
  cn,
} from '@acme/ui'

export default function WhatsappButton(): JSX.Element {
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false)
  const [isPopoverOpen, setisPopoverOpen] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      setIsAlertVisible(true)
    }, 5000)
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: This is a false positive
  useEffect(() => {
    setIsAlertVisible(false)
  }, [isPopoverOpen])

  return (
    <Popover open={isPopoverOpen} onOpenChange={setisPopoverOpen}>
      <PopoverTrigger className='fixed right-8 bottom-8 w-16 transition-colors duration-700 hover:bg-[#25d366] h-16 bg-neutral-800 text-white rounded-full flex items-center justify-center'>
        <div
          className={cn(
            'bg-red-600 text-xs leading-6 absolute -top-1 -left-1 w-6 h-6 rounded-full text-center font-semibold',
            isAlertVisible ? 'animate-bounce-in' : 'opacity-0',
          )}
        >
          1
        </div>

        <Icon.whatsApp className='w-7 h-7' />
      </PopoverTrigger>

      <PopoverContent className='rounded-xl mr-4'>
        <div className='relative h-32 -mt-4 -mx-4'>
          <Image
            alt='WhatsApp Background'
            className='rounded-t-xl'
            fill={true}
            src='/static/img/bg-whatsapp.jpg'
          />
        </div>

        <div className='mt-4' />

        <h2 className='font-semibold'>Oi tudo bem?</h2>

        <div className='mt-2' />

        <p>Se precisar fale com a gente pelo WhatsApp!</p>

        <div className='mt-4' />

        <Button className='w-full rounded-full' variant='outline'>
          Fale conosco
        </Button>
      </PopoverContent>
    </Popover>
  )
}
