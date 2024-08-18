'use client'

import type { JSX } from 'react'

import Accordion from '@acme/ui/components/accordion'
import { Google, LinkedIn } from '@acme/ui/components/logo'

import OAuthButton from '@/components/oauth-button'

import SignInForm from './sign-in-form'

export default function MoreAuthOptions(): JSX.Element {
  return (
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
  )
}
