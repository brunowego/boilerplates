'use client'

import type { JSX } from 'react'

import Popover from '@acme/ui/components/popover'

export default function _Popover(): JSX.Element {
  return (
    <Popover>
      <Popover.Trigger>Open</Popover.Trigger>

      <Popover.Content>
        <Popover.Arrow />
        Place content for the popover here.
      </Popover.Content>
    </Popover>
  )
}
