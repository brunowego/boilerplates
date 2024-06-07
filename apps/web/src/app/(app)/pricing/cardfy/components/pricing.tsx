'use client'

// https://github.com/gabrielccarvalho/cardfy

import { type JSX, useState } from 'react'

import { DiscountArrow, Sparkles, CircleCheck } from '@acme/ui/components/icon'
import MaxWidthWrapper from '@acme/ui/components/max-width-wrapper'
import Separator from '@acme/ui/components/separator'
import Badge from '@acme/ui/components/badge'
import Button from '@acme/ui/components/button'

export default function Pricing(): JSX.Element {
  const [yearly, setYearly] = useState(true)

  return (
    <main className='mt-12 mb-10 flex w-full flex-col items-center'>
      <div className='mx-auto max-w-md px-2.5 text-center sm:max-w-xl sm:px-0'>
        <h1 className='mt-5 text-center font-display font-extrabold text-3xl leading-[1.15] sm:text-5xl sm:leading-[1.15]'>
          Pricing
        </h1>

        <p className='mt-5 font-medium text-muted-foreground sm:text-xl'>
          The core of Cardfy is free, including the flashcards with spaced
          repetition. Unlock a new level of learning with our Pro plan.
        </p>

        <button
          className='group relative mx-auto mt-20 flex h-12 w-48 items-center justify-around overflow-hidden rounded-full border border-border bg-white/10 backdrop-blur-md hover:cursor-pointer'
          onClick={() => setYearly(!yearly)}
          type='button'
        >
          <p className='font-medium text-sm'>Monthly</p>
          <p className='font-medium text-sm'>Yearly</p>

          <div
            aria-checked={yearly}
            className='absolute left-0 h-12 w-24 rounded-full bg-gray-500/10 transition-all duration-300 aria-checked:translate-x-24'
          />
        </button>

        <div className='relative'>
          <DiscountArrow className='-inset-y-32 absolute inset-x-[390px] size-36' />
        </div>
      </div>

      <MaxWidthWrapper className='mx-auto my-10 grid grid-cols-3 gap-4'>
        <div className='my-auto flex h-[500px] w-full flex-col rounded-xl border border-border bg-secondary p-6 shadow-lg backdrop-blur-lg'>
          <div className='mb-4 flex flex-col space-y-4'>
            <h3 className='font-medium text-xl'>Free</h3>
            <p className='font-medium text-gray-500 text-sm'>
              Everything you need to supercharge your learning
            </p>
            <p className='flex items-center gap-2 font-bold text-5xl'>
              R$0
              <span className='font-medium text-base text-gray-500'>
                /month
              </span>
            </p>
          </div>

          <Separator className='bg-gradient-to-r from-gray-100 via-gray-400 to-gray-100 my-4' />

          <div className='flex flex-col w-full justify-between h-full'>
            <div>
              <p className='text-gray-500 font-medium'>What's included:</p>
              <div className='grid grid-cols-1 py-4 space-y-4'>
                <div className='flex items-center'>
                  <CircleCheck className='size-5 text-emerald-500' />
                  <span className='ml-2 text-muted-foreground font-medium text-sm'>
                    Complete flashcards experience
                  </span>
                </div>
                <div className='flex items-center'>
                  <CircleCheck className='size-5 text-emerald-500' />
                  <span className='ml-2 text-muted-foreground font-medium text-sm'>
                    Spaced Repetition Algorithm
                  </span>
                </div>
                <div className='flex items-center'>
                  <CircleCheck className='size-5 text-emerald-500' />
                  <span className='ml-2 text-muted-foreground font-medium text-sm'>
                    Challenge mode
                  </span>
                </div>
              </div>
            </div>
            <Button variant='outline'>Access now</Button>
          </div>
        </div>
        <div className='h-[600px] bg-secondary backdrop-blur-lg w-full rounded-xl shadow-md shadow-emerald-200/30 border-emerald-500/30 border-2 my-auto flex flex-col p-6'>
          <div className='flex flex-col space-y-4 mb-4'>
            <h3 className='text-xl font-medium'>Pro</h3>
            <p className='font-medium text-sm text-gray-500'>
              Unlock a new level of your learning productivity.
            </p>
            <div className='flex items-center gap-1'>
              <p className='flex text-5xl font-bold gap-2 items-center'>
                {yearly ? 'R$20' : 'R$25'}
                <span className='text-base text-gray-500 font-medium'>
                  /month
                </span>
              </p>
              {yearly && (
                <Badge className='rounded-full px-1 bg-emerald-500 hover:bg-emerald-600'>
                  -20%
                </Badge>
              )}
            </div>
          </div>
          <Separator className='bg-gradient-to-r from-gray-100 via-gray-400 to-gray-100 my-4' />
          <div className='flex flex-col w-full justify-between h-full'>
            <div>
              <p className='text-gray-500 font-medium'>What's included:</p>
              <div className='grid grid-cols-1 py-4 space-y-4'>
                <div className='flex items-center'>
                  <CircleCheck className='size-5 text-emerald-500' />
                  <span className='ml-2 text-muted-foreground font-medium text-sm'>
                    Everything in Free
                  </span>
                </div>
                <div className='flex items-center'>
                  <CircleCheck className='size-5 text-emerald-500' />
                  <span className='ml-2 text-muted-foreground font-medium text-sm'>
                    Advanced Analytics
                  </span>
                </div>
                <div className='flex items-center'>
                  <CircleCheck className='size-5 text-emerald-500' />
                  <span className='ml-2 text-muted-foreground font-medium text-sm'>
                    AI powered quizzes
                  </span>
                </div>
                <div className='flex items-center'>
                  <Sparkles
                    strokeWidth={2}
                    fill='currentColor'
                    className='size-5 text-emerald-500'
                  />
                  <span className='ml-2 text-muted-foreground font-medium text-sm'>
                    More coming soon!
                  </span>
                </div>
              </div>
            </div>
            <Button variant='outline'>Select Plan</Button>
          </div>
        </div>

        <div className='h-[500px] bg-secondary backdrop-blur-lg w-full rounded-xl shadow-lg border-border border my-auto flex flex-col p-6'>
          <div className='flex flex-col space-y-4 mb-4'>
            <h3 className='text-xl font-medium'>Custom</h3>

            <p className='font-medium text-sm text-gray-500'>
              Need something more? Reach us!
            </p>
          </div>

          <Separator className='bg-gradient-to-r from-gray-100 via-gray-400 to-gray-100 my-4' />

          <div className='flex h-full w-full flex-col justify-between'>
            <p className='font-medium text-muted-foreground'>
              Reach out to our support team and let us know how can we make the
              perfect solution for you or your business.
            </p>

            <Button variant='outline'>Send us a message</Button>
          </div>
        </div>
      </MaxWidthWrapper>
    </main>
  )
}
