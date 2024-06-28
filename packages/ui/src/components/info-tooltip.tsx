import type { ReactNode, JSX } from 'react'

import Tooltip from './tooltip'
import { HelpCircle } from './icon'

type InfoTooltipProps = { children: ReactNode | string }

export default function InfoTooltip({
  children,
}: InfoTooltipProps): JSX.Element {
  return (
    <Tooltip>
      <Tooltip.Trigger>
        <HelpCircle className='size-4 text-muted-foreground' />
      </Tooltip.Trigger>

      <Tooltip.Content className='max-w-xs leading-5'>
        {children}
      </Tooltip.Content>
    </Tooltip>
  )
}
