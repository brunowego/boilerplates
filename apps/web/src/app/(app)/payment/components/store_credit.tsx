import type { JSX } from 'react'

import type { PaymentMethod } from '@acme/db/types'
import { CreditCard as Icon } from '@acme/ui/components/icon'

import Option from './option'

type StoreCreditProps = PaymentMethod

export default function StoreCredit({
  enabled,
}: StoreCreditProps): JSX.Element {
  return (
    <Option
      enabled={enabled}
      icon={<Icon className='size-8' />}
      title='Store credit'
    />
  )
}
