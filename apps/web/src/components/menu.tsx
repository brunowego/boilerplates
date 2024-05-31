'use client'

import type { JSX } from 'react'

import type Icon from '@acme/ui/components/icon'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@acme/ui/components/tooltip'
import cn from '@acme/ui/utils/cn'
import DynamicIcon from '@acme/ui/components/dynamic-icon'

export const menu = [
  {
    title: 'Elements',
    icon: 'Plus',
  },
  {
    title: 'Templates',
    icon: 'LayoutTemplate',
  },
  {
    title: 'Structure',
    icon: 'Layers',
  },
  {
    title: 'Images',
    icon: 'Images',
  },
  {
    title: 'Settings',
    icon: 'Settings2',
  },
] as {
  title: string
  icon: keyof typeof Icon
}[]

export default function Menu(): JSX.Element {
  return (
    <>
      {menu.map(({ title, icon }, index) => (
        <Tooltip
          // biome-ignore lint/suspicious/noArrayIndexKey: This is a static list
          key={index}
        >
          <TooltipTrigger asChild>
            <button className={cn('rounded-sm hover:bg-border')} type='button'>
              <DynamicIcon className='size-6 stroke-[1.5]' icon={icon} />

              <span className='sr-only'>{title}</span>
            </button>
          </TooltipTrigger>

          <TooltipContent side='right'>{title}</TooltipContent>
        </Tooltip>
      ))}
    </>
  )
}
