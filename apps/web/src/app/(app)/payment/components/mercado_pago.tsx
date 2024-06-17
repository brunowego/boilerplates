import type { JSX } from 'react'
import { useMeasure } from 'react-use'
import Link from 'next/link'

import type { PaymentMethod } from '@acme/db/types'
import { MercadoPago as Logo } from '@acme/ui/components/logo'
import Label from '@acme/ui/components/label'
import Input from '@acme/ui/components/input'

import Option from './option'

type MercadoPagoProps = PaymentMethod

export default function MercadoPago({
  enabled,
  identifier,
}: MercadoPagoProps): JSX.Element {
  const [spanRef, { width }] = useMeasure<HTMLSpanElement>()

  return (
    <Option
      enabled={enabled}
      icon={<Logo className='size-8' />}
      title='Mercado Pago'
    >
      <div className='space-y-2'>
        <Label>Username</Label>

        <div className='relative'>
          <span
            className='absolute inset-y-0 left-4 flex items-center text-muted-foreground text-sm'
            ref={spanRef}
          >
            https://link.mercadopago.com.br/
          </span>

          <Input
            defaultValue={identifier as string}
            style={{ paddingLeft: width + 16 }}
            type='text'
          />
        </div>

        <p className='text-muted-foreground text-sm leading-6'>
          Don't have Mercado Pago account?{' '}
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
