'use client'

import type { JSX } from 'react'

import Tooltip from '@acme/ui/components/tooltip'

export default function _Popover(): JSX.Element {
  return (
    <Tooltip>
      <Tooltip.Trigger>Hover</Tooltip.Trigger>

      <Tooltip.Content side='right'>
        <Tooltip.Arrow />

        <p>Add to library</p>
      </Tooltip.Content>
    </Tooltip>
  )
}
