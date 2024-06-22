'use client'

import type { JSX } from 'react'
import Link from 'next/link'

import { typographyVariants } from '@acme/ui/components/typography'
import { GitHub, Google, LinkedIn } from '@acme/ui/components/logo'
import Accordion from '@acme/ui/components/accordion'

import OAuthButton from '@/components/oauth-button'

import SignInForm from './sign-in-form'

export default function SignIn(): JSX.Element {
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
          Login to Acme.
        </h1>

        <p className={typographyVariants({ size: 'xl', variant: 'muted' })}>
          Automate your tasks, stay organized, and make informed decisions
          effortlessly.{' '}
          <Link
            className='text-foreground underline underline-offset-4'
            href='/sign-up'
            prefetch={false}
          >
            Sign up
          </Link>{' '}
          for an account.
        </p>
      </div>

      <OAuthButton provider='github' size='lg'>
        <GitHub className='size-6' />

        <span>Continue with GitHub</span>
      </OAuthButton>

      <Accordion type='single' collapsible className='border-t pt-2'>
        <Accordion.Item value='item-1' className='border-0'>
          <Accordion.Trigger className='flex justify-center space-x-2 text-sm'>
            <span>More options</span>
          </Accordion.Trigger>

          <Accordion.Content className='mt-4 flex flex-col space-y-6'>
            <SignInForm />

            <div className='flex items-center space-x-4'>
              <span className='h-px w-full bg-border' />

              <div className='shrink-0 font-semibold text-xs uppercase tracking-wide'>
                Or continue with
              </div>

              <span className='h-px w-full bg-border' />
            </div>

            <div className='flex flex-col space-y-4'>
              <OAuthButton provider='google' size='lg'>
                <Google className='size-6' />

                <span>Continue with Google</span>
              </OAuthButton>

              <OAuthButton provider='linkedin' size='lg'>
                <LinkedIn className='size-6' />

                <span>Continue with LinkedIn</span>
              </OAuthButton>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>

      <p className={typographyVariants({ size: 'sm', variant: 'muted' })}>
        By clicking continue, you acknowledge that you have read and agree to
        Acme's{' '}
        <Link className='underline underline-offset-4' href='/'>
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link className='underline underline-offset-4' href='/'>
          Privacy Policy
        </Link>
        .
      </p>
    </>
  )
}
