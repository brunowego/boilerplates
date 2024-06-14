import type { JSX } from 'react'

import { LogoMark, Google, Apple } from '@acme/ui/components/logo'
import Button from '@acme/ui/components/button'
import Input from '@acme/ui/components/input'
import Card from '@acme/ui/components/card'
import { Guarantee } from '@acme/ui/components/sprites'
import Separator from '@acme/ui/components/separator'

export default function CheckoutPage(): JSX.Element {
  return (
    <main className='min-h-screen space-y-8'>
      <header className='h-16 border-b bg-card'>
        <div className='container flex h-full max-w-6xl items-center space-x-4'>
          <div className='mr-auto flex items-center space-x-4'>
            <LogoMark className='h-9' />

            <span className='text-muted-foreground text-xs'>/</span>

            <span className='font-medium'>Checkout</span>
          </div>

          <p className='text-muted-foreground text-sm'>
            Already have an account?
          </p>

          <Button size='sm' variant='secondary'>
            Log in
          </Button>
        </div>
      </header>

      <article className='container grid max-w-6xl md:grid-cols-2 xl:grid-cols-7 md:space-x-8 xl:space-x-10'>
        <div className='space-y-10 xl:col-span-4'>
          <div className='space-y-6'>
            <h1 className='font-semibold text-2xl'>
              Enter the email for your Surfshark account
            </h1>

            <Input
              className='h-14 px-6'
              placeholder='Email address'
              type='email'
            />

            <div className='flex items-center space-x-4'>
              <span className='h-px w-full bg-border' />

              <div className='shrink-0 font-semibold text-xs uppercase tracking-wide'>
                Or continue with
              </div>

              <span className='h-px w-full bg-border' />
            </div>

            <div className='grid grid-cols-2 space-x-4'>
              <Button className='grid grid-cols-button' size='lg'>
                <Google className='size-5' />

                <span>Google</span>

                <span />
              </Button>

              <Button className='grid grid-cols-button' size='lg'>
                <Apple className='size-5' />

                <span>Apple</span>

                <span />
              </Button>
            </div>

            <p className='text-muted-foreground text-sm'>
              We won&rsquo;t share your email address with any third parties,
              and will only contact you when necessary to ensure service quality
              or to announce special offers.
            </p>
          </div>

          <div>
            <h2 className='font-semibold text-2xl'>Choose a payment method</h2>
          </div>
        </div>

        <div className='space-y-10 xl:col-span-3'>
          <div className='ml-auto flex max-w-48 items-center gap-x-4'>
            <div className='relative'>
              <Guarantee className='size-16 shrink-0' />

              <div className='absolute inset-0 m-2 flex flex-col items-center justify-center rounded-full bg-black/10 font-semibold text-white *:leading-none'>
                <div className='font-mono text-xl'>30</div>
                <div className='text-xs uppercase'>day</div>
              </div>
            </div>

            <span>Money-back guarantee</span>
          </div>

          <Card className='rounded-xl py-2'>
            <Card.Header>
              <Card.Title className='text-xl'>Order summary</Card.Title>
            </Card.Header>

            <Card.Content className='space-y-4'>
              <h2>Surfshark One subscription</h2>

              <dl className='grid grid-cols-2 gap-y-3 [&>dd]:text-right [&>dt]:text-muted-foreground'>
                <dt className='space-x-4 text-nowrap text-sm'>
                  24-months (BRL 12.81/mo){' '}
                  <span className='text-red-500'>+ 3 months EXTRA</span>
                </dt>
                <dd className='font-medium text-sm'>BRL 345.87</dd>

                <dt>
                  <span className='inline-flex rounded-full bg-rose-200 px-3 font-medium text-rose-950 text-xs leading-7'>
                    Save 84%
                  </span>
                </dt>
                <dd className='font-medium text-sm line-through'>
                  BRL 2159.73
                </dd>
              </dl>

              <Separator />

              <dl className='grid grid-cols-2 gap-y-3 [&>dd]:text-right [&>dt]:text-muted-foreground'>
                <dt className='space-x-4 text-sm'>
                  <span>No VAT/Sales Tax</span>

                  <button
                    className='underline underline-offset-4'
                    type='button'
                  >
                    Brazil
                  </button>
                </dt>
                <dd className='font-medium text-sm'>BRL 0.00</dd>

                <dt className='font-semibold text-xl'>Total</dt>
                <dd className='font-semibold text-xl'>BRL 345.87</dd>
              </dl>

              <Separator />

              <div className='flex space-x-3'>
                <Input className='h-12' placeholder='Enter coupon code' />

                <Button
                  className='!bg-accent !text-accent-foreground'
                  disabled
                  size='lg'
                >
                  Apply
                </Button>
              </div>
            </Card.Content>
          </Card>
        </div>
      </article>

      <footer className='border-t'>
        <div className='container max-w-6xl py-4'>
          <p className='leading-10'>
            Subscription, Automatic Renewal, and other Terms
          </p>
        </div>
      </footer>
    </main>
  )
}
