'use client'

import type { ReactNode, JSX } from 'react'

import type Icon from '@acme/ui/components/icon'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@acme/ui/components/tooltip'
import cn from '@acme/ui/utils/cn'

import useSidebar from '@/store/use-sidebar'
import DynamicIcon from '@/components/dynamic-icon'

import RawElements from './raw-elements'
import SectionTemplates from './section-templates'
import PageStructure from './page-structure'
import Images from './images'
import Settings from './settings'

export const menu = [
  {
    title: 'Elements',
    icon: 'Plus',
    sidebar: <RawElements />,
  },
  {
    title: 'Templates',
    icon: 'LayoutTemplate',
    sidebar: <SectionTemplates />,
  },
  {
    title: 'Structure',
    icon: 'Layers',
    sidebar: <PageStructure />,
  },
  {
    title: 'Images',
    icon: 'Images',
    sidebar: <Images />,
  },
  {
    title: 'Settings',
    icon: 'Settings2',
    sidebar: <Settings />,
  },
] as {
  title: string
  icon: keyof typeof Icon
  sidebar: ReactNode
}[]

export default function Menu(): JSX.Element {
  const { setSidebar } = useSidebar()

  return (
    <>
      {menu.map(({ title, icon, sidebar }, index) => (
        <Tooltip
          // biome-ignore lint/suspicious/noArrayIndexKey: This is a static list
          key={index}
        >
          <TooltipTrigger asChild>
            <button
              className={cn('rounded-sm hover:bg-border')}
              onClick={() => setSidebar(sidebar)}
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
