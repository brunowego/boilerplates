import type { JSX } from 'react'

import type { PaymentMethod } from '@acme/db/types'
import { WalletMinimal as Icon } from '@acme/ui/components/icon'

import Option from './option'

type CodProps = PaymentMethod

export default function Cod({ enabled }: CodProps): JSX.Element {
  return (
    <Option
      enabled={enabled}
      icon={<Icon className='size-8' />}
      title='Cash on delivery'
    />
  )
}
