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

import useSidePanel from '@/store/use-side-panel'

import { Panels, type Panel } from './panels'

export const menu = [
  {
    panel: Panels.RAW_ELEMENTS,
    title: 'Elements',
    icon: 'Plus',
  },
  {
    panel: Panels.SECTION_TEMPLATES,
    title: 'Templates',
    icon: 'LayoutTemplate',
  },
  {
    panel: Panels.PAGE_STRUCTURE,
    title: 'Structure',
    icon: 'Layers',
  },
  {
    panel: Panels.IMAGES,
    title: 'Images',
    icon: 'Images',
  },
  {
    panel: Panels.SETTINGS,
    title: 'Settings',
    icon: 'Settings2',
  },
] as {
  panel: Panel
  title: string
  icon: keyof typeof Icon
}[]

export default function Menu(): JSX.Element {
  const { open } = useSidePanel()

  return (
    <>
      {menu.map(({ panel, title, icon }, index) => (
        <Tooltip
          // biome-ignore lint/suspicious/noArrayIndexKey: This is a static list
          key={index}
        >
          <TooltipTrigger asChild>
            <button
              className={cn('rounded-sm hover:bg-border')}
              onClick={() => open(panel)}
              type='button'
            >
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
