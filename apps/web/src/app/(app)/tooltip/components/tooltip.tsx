'use client'

import type { JSX } from 'react'

import Tooltip from '@acme/ui/components/tooltip'
import Button from '@acme/ui/components/button'

export default function _Tooltip(): JSX.Element {
  return (
    <Tooltip>
      <Tooltip.Trigger asChild>
        <Button>Hover</Button>
      </Tooltip.Trigger>

      <Tooltip.Content align='center' side='right'>
        <Tooltip.Arrow />

        <p>Add to library</p>
      </Tooltip.Content>
    </Tooltip>
  )
}
