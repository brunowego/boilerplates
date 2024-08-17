'use client'

import type { JSX } from 'react'

import Popover from '@acme/ui/components/popover'
import Button from '@acme/ui/components/button'

export default function _Popover(): JSX.Element {
  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button>Open</Button>
      </Popover.Trigger>

      <Popover.Content align='start' side='right'>
        <Popover.Arrow />
        Place content for the popover here.
      </Popover.Content>
    </Popover>
  )
}
