import type { JSX } from 'react'

import { Bot as Icon } from '@acme/ui/components/icon'

import Option from './option'

type WhatsAppBotProps = {
  enabled: boolean
}

export default function WhatsAppBot({
  enabled,
}: WhatsAppBotProps): JSX.Element {
  return (
    <Option
      enabled={enabled}
      icon={<Icon className='m-1 size-6' />}
      title='WhatsApp bot notification'
    />
  )
}
