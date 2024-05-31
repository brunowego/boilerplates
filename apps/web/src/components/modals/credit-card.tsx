import type { JSX } from 'react'
import Link from 'next/link'

import {
  Check,
  User,
  X,
  CreditCard as CreditCardIcon,
  Calendar,
  AtSign,
  Globe,
} from '@acme/ui/components/icon'
import Input from '@acme/ui/components/input'
import Label from '@acme/ui/components/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@acme/ui/components/select'
import Button from '@acme/ui/components/button'

export default function CreditCard(): JSX.Element {
  return (
    <>
      <div className='absolute inset-0 z-40 bg-background/70' />

      <div className='lg:-translate-x-1/2 -translate-y-1/2 absolute top-1/2 z-50 grid transform rounded-xl bg-secondary lg:left-1/2 max-lg:mx-14 lg:w-full md:max-w-4xl xl:max-w-5xl lg:grid-cols-2'>
        <div className='p-8 lg:px-9'>
          <h3 className='mb-4 font-medium text-2xl'>Try Acme Pro for free</h3>

          <ul className='mb-8 space-y-2 text-sm'>
            <li className='flex space-x-2'>
              <Check className='size-4 shrink-0 text-green-500' />

              <p>Free 30 day trial, cancel any time</p>
            </li>

            <li className='flex space-x-2'>
              <Check className='size-4 shrink-0 text-green-500' />

              <p>We'll remind you before your trial ends</p>
            </li>
          </ul>

          <form className='mb-8 space-y-4'>
            <div className='space-y-2'>
              <Label>Cardholder name</Label>

              <div className='relative'>
                <User className='absolute inset-y-0 left-3 my-auto' />

                <Input
                  className='h-12 pl-12'
                  placeholder='John Doe'
                  type='text'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label>Card number</Label>

              <div className='relative'>
                <CreditCardIcon className='absolute inset-y-0 left-3 my-auto' />

                <Input
                  className='h-12 pl-12'
                  placeholder='0000 0000 0000 0000'
                  type='text'
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-x-3'>
              <div className='space-y-2'>
                <Label>Expiry date</Label>

                <div className='relative'>
                  <Calendar className='absolute inset-y-0 left-3 my-auto' />

                  <Input
                    className='h-12 pl-12'
                    placeholder='MM / YY'
                    type='text'
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label>Security code</Label>

                <div className='relative'>
                  <CreditCardIcon className='absolute inset-y-0 left-3 my-auto' />

                  <Input className='h-12 pl-12' placeholder='CVC' type='text' />
                </div>
              </div>
            </div>

            <div className='space-y-2'>
              <Label>CPF/CNPJ</Label>

              <Input className='h-12' type='text' />
            </div>

            <hr />

            <div className='space-y-2'>
              <div className='space-y-2'>
                <Label>Email address</Label>

                <div className='relative'>
                  <AtSign className='absolute inset-y-0 left-3 my-auto' />

                  <Input
                    className='h-12 pl-12'
                    placeholder='johndoe@example.com'
                    type='text'
                  />
                </div>
              </div>

              <div>
                <Label className='sr-only'>Country</Label>

                <div className='relative'>
                  <Globe className='absolute inset-y-0 left-3 my-auto' />

                  <Select value='brazil'>
                    <SelectTrigger className='h-12 pl-12'>
                      <SelectValue placeholder='Select country' />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value='brazil'>Brazil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </form>

          <p className='mb-8 text-sm leading-6'>
            This transaction will be processed by{' '}
            <Link
              className='underline underline-offset-4'
              href='https://ebanx.com/br/termos'
              rel='noopener'
              target='_blank'
            >
              EBANX
            </Link>{' '}
            according to their terms. By continuing you acknowledge and accept
            these terms and conditions. To authorize the card, a small amount
            will be charged and immediately refunded. This site is protected by
            reCAPTCHA and the Google{' '}
            <Link
              className='underline underline-offset-4'
              href='https://policies.google.com/privacy'
              rel='noopener'
              target='_blank'
            >
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link
              className='underline underline-offset-4'
              href='https://policies.google.com/terms'
              rel='noopener'
              target='_blank'
            >
              Terms of Service
            </Link>{' '}
            apply. By continuing, I&nbsp;warrant that this location information
            is accurate.
          </p>

          <table className='mb-4 w-full text-sm leading-7'>
            <tbody>
              <tr className='text-muted-foreground'>
                <td>Due June 29, 2024</td>
                <td className='text-right'>R$ 35</td>
              </tr>

              <tr className='font-medium'>
                <td>
                  Due today{' '}
                  <span className='text-green-300'>(30 days free)</span>
                </td>
                <td className='text-right'>R$ 0</td>
              </tr>
            </tbody>
          </table>

          <Button className='mb-6 w-full' disabled size='lg'>
            Next
          </Button>

          <p className='text-sm leading-6'>
            By continuing, you agree to the{' '}
            <Link className='underline underline-offset-2' href='/'>
              Terms of Use
            </Link>{' '}
            applicable to Acme Pro and confirm you have read our{' '}
            <Link className='underline underline-offset-2' href='/'>
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <div
          className='rounded-r-[inherit] bg-border bg-center bg-contain bg-no-repeat'
          style={{ backgroundImage: 'url("/static/img/bg-modal.png")' }}
        />

        <button
          className='-right-2 absolute translate-x-full rounded-full bg-secondary p-2'
          type='button'
        >
          <X className='size-5' />
        </button>
      </div>
    </>
  )
}
