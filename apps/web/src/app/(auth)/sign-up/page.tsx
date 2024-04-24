import type { JSX } from 'react'
import Link from 'next/link'

import { typographyVariants } from '@acme/ui/components/typography'
import { buttonVariants } from '@acme/ui/components/button'
import { GitHub, Google } from '@acme/ui/components/logo'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@acme/ui/components/accordion'

import SignUpForm from './components/sign-up-form'

export default function SignUpPage(): JSX.Element {
  return (
    <>
      <div className='flex flex-col space-y-4'>
        <h1
          className={typographyVariants({
            className:
              'dark:bg-gradient-to-r dark:from-primary dark:via-lime-300 dark:to-lime-400 dark:bg-clip-text dark:text-transparent',
            variant: 'h1',
          })}
        >
          Get started with Acme.
        </h1>

        <p className={typographyVariants({ size: 'xl', variant: 'muted' })}>
          Automate your tasks, stay organized, and make informed decisions
          effortlessly.{' '}
          <Link
            className='text-foreground underline underline-offset-4'
            href='/sign-in'
          >
            Sign in
          </Link>{' '}
          now.
        </p>
      </div>

      <Link
        className={buttonVariants({ className: 'space-x-2', size: 'lg' })}
        href='/sign-in/github'
      >
        <GitHub className='size-6' />

        <span>Continue with GitHub</span>
      </Link>

      <Accordion type='single' collapsible className='border-t pt-2'>
        <AccordionItem value='item-1' className='border-0'>
          <AccordionTrigger className='flex justify-center space-x-2 text-sm'>
            <span>More options</span>
          </AccordionTrigger>

          <AccordionContent className='mt-4 flex flex-col space-y-6'>
            <SignUpForm />

            <div className='flex items-center space-x-4'>
              <span className='h-px w-full bg-border' />

              <div className='shrink-0 font-semibold text-xs uppercase tracking-wide'>
                Or continue with
              </div>

              <span className='h-px w-full bg-border' />
            </div>

            <div className='flex flex-col space-y-4'>
              <Link
                className={buttonVariants({
                  className: 'space-x-2',
                  size: 'lg',
                })}
                href='/sign-in/google'
              >
                <Google className='size-6' />

                <span>Continue with Google</span>
              </Link>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}
