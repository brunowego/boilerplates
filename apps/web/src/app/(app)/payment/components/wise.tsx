import type { JSX } from 'react'
import { useMeasure } from 'react-use'
import Link from 'next/link'

import type { PaymentMethod } from '@acme/db/types'
import { Wise as Logo } from '@acme/ui/components/logo'
import Label from '@acme/ui/components/label'
import Input from '@acme/ui/components/input'

import Option from './option'

type WiseProps = PaymentMethod

export default function Wise({ enabled, identifier }: WiseProps): JSX.Element {
  const [spanRef, { width }] = useMeasure<HTMLSpanElement>()

  return (
    <Option
      enabled={enabled}
      icon={<Logo className='size-8 fill-[#163300] dark:fill-[#9FE870]' />}
      title='Wise'
    >
      <div className='space-y-2'>
        <Label>Tag ID</Label>

        <div className='relative'>
          <span
            className='absolute inset-y-0 left-4 flex items-center text-muted-foreground text-sm'
            ref={spanRef}
          >
            https://wise.com/pay/me/
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
          Don't have Wise account?{' '}
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
