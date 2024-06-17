import type { JSX } from 'react'

import { ShoppingBag as Icon } from '@acme/ui/components/icon'

import Option from './option'

type SelfPickUpProps = {
  enabled: boolean
}

export default function SelfPickUp({ enabled }: SelfPickUpProps): JSX.Element {
  return (
    <Option
      enabled={enabled}
      icon={<Icon className='m-1 size-6' />}
      title='Self pick-up'
    />
  )
}
