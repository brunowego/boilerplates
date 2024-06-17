import type { JSX } from 'react'
import { useMeasure } from 'react-use'

import { Truck as Icon } from '@acme/ui/components/icon'
import Label from '@acme/ui/components/label'
import Input from '@acme/ui/components/input'

import Option from './option'

type DeliveryProps = {
  enabled: boolean
}

export default function Delivery({ enabled }: DeliveryProps): JSX.Element {
  const [spanRef, { width }] = useMeasure<HTMLSpanElement>()

  return (
    <Option
      enabled={enabled}
      icon={<Icon className='m-1 size-6' />}
      title='Delivery'
    >
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
