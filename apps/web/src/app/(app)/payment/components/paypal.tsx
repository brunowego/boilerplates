import type { JSX } from 'react'
import { useMeasure } from 'react-use'
import Link from 'next/link'

import type { PaymentMethod } from '@acme/db/types'
import { PayPal as Logo } from '@acme/ui/components/logo'
import Label from '@acme/ui/components/label'
import Input from '@acme/ui/components/input'

import Option from './option'

type PayPalProps = PaymentMethod

export default function PayPal({
  enabled,
  identifier,
}: PayPalProps): JSX.Element | null {
  const [spanRef, { width }] = useMeasure<HTMLSpanElement>()

  return (
    <Option enabled={enabled} icon={<Logo className='size-8' />} title='PayPal'>
      <div className='space-y-2'>
        <Label>Username</Label>

        <div className='relative'>
          <span
            className='absolute inset-y-0 left-4 flex items-center text-muted-foreground text-sm'
            ref={spanRef}
          >
            https://paypal.me/
          </span>

          <Input
            defaultValue={identifier as string}
            onChange={(e) => {
              e.target.value = e.target.value
                .trim()
                .replace(/\s/g, '')
                .toLowerCase()
            }}
            style={{ paddingLeft: width + 16 }}
            type='text'
          />
        </div>

        <p className='text-muted-foreground text-sm leading-6'>
          Don't have PayPal account?{' '}
          <Link
            className='text-foreground underline underline-offset-4'
            href='/'
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </Option>
  )
}
