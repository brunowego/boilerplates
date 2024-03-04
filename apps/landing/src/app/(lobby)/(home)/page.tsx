import type { JSX } from 'react'

import { Icons } from '@acme/ui'

import { WaitListForm } from './components'

export default function WaitListPage(): JSX.Element {
  return (
    <div className='container hidden relative flex-col justify-center items-center h-screen md:grid lg:grid-cols-2 lg:px-0 lg:max-w-none'>
      <div className='hidden relative flex-col p-10 h-full text-white lg:flex dark:border-r bg-muted'>
        <div className='absolute inset-0 bg-zinc-900' />

        <div className='flex relative z-20 items-center text-lg font-medium'>
          <Icons.command className='mr-2 w-6 h-6' />
          Acme Inc
        </div>

        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.&rdquo;
            </p>

            <footer className='text-sm'>Sofia Davis</footer>
          </blockquote>
        </div>
      </div>

      <div className='lg:p-8'>
        <div className='flex flex-col justify-center mx-auto space-y-6 w-full sm:w-[400px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Join the early access program 🎉
            </h1>

            <p className='text-sm text-muted-foreground'>
              Join the newsletter to get notified when the application will be
              live and for further updates.
            </p>
          </div>

          <WaitListForm />

          <p className='px-8 text-sm text-center text-muted-foreground'>
            No ads. No spam. No commitments
          </p>
        </div>
      </div>
    </div>
  )
}
