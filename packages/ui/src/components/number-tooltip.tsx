import type { ReactNode, JSX } from 'react'

import { nFormatter } from '../lib/formater'
import { timeAgo } from '../lib/time-ago'

import Tooltip from './tooltip'

export default function NumberTooltip({
  value,
  unit = 'total clicks',
  children,
  lastClicked,
}: {
  value?: number | null
  unit?: string
  children: ReactNode
  lastClicked?: Date | null
}): JSX.Element | ReactNode {
  if ((!value || value < 1000) && !lastClicked) {
    return children
  }

  return (
    <Tooltip
      content={
        <div className='block max-w-xs px-4 py-2 text-center text-gray-700 text-sm'>
          <p className='font-semibold text-gray-700 text-sm'>
            {nFormatter(value || 0, { full: true })} {unit}
          </p>

          {lastClicked && (
            <p className='mt-1 text-gray-500 text-xs' suppressHydrationWarning>
              Last clicked {timeAgo(lastClicked, { withAgo: true })}
            </p>
          )}
        </div>
      }
    >
      {children}
    </Tooltip>
  )
}
