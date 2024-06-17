import type { JSX } from 'react'
import { useMeasure } from 'react-use'

import type { PaymentMethod } from '@acme/db/types'
import Label from '@acme/ui/components/label'
import Input from '@acme/ui/components/input'

import Option from './option'

type DeliveryProps = PaymentMethod

export default function Delivery({ enabled }: DeliveryProps): JSX.Element {
  const [spanRef, { width }] = useMeasure<HTMLSpanElement>()

  return (
    <Option enabled={enabled} title='Delivery'>
      <div className='space-y-2'>
        <Label>Delivery fee</Label>

        <div className='relative'>
          <span
            className='absolute inset-y-0 left-4 flex items-center text-muted-foreground text-sm'
            ref={spanRef}
          >
            R$
          </span>

          <Input
            defaultValue={0}
            style={{ paddingLeft: width + 20 }}
            type='text'
          />
        </div>
      </div>
    </Option>
  )
}
