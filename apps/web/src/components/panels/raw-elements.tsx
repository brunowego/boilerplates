import type { JSX } from 'react'

import DynamicIcon from '@acme/ui/components/dynamic-icon'

import {
  SidePanel,
  SidePanelHeader,
  SidePanelTitle,
  SidePanelContent,
} from '@/components/side-panel'
import { structures, elements } from '@/data'

type RawElementsProps = {
  className?: string
}

export default function RawElements({
  className,
}: RawElementsProps): JSX.Element {
  return (
    <SidePanel className={className}>
      <SidePanelHeader>
        <SidePanelTitle>Structures and elements</SidePanelTitle>
      </SidePanelHeader>

      <SidePanelContent>
        <h3 className='mb-4 font-medium text-muted-foreground text-sm'>
          Structures
        </h3>

        <div className='mb-2 grid grid-cols-6 gap-x-2 gap-y-4 text-[11px]'>
          {structures.map(({ title, icon }, index) => (
            <button
              // biome-ignore lint/suspicious/noArrayIndexKey: This is a static list
              key={index}
              type='button'
            >
              <div className='mb-2 flex aspect-square items-center justify-center rounded-sm bg-secondary'>
                <DynamicIcon className='size-6 stroke-[1.5]' icon={icon} />
              </div>

              <span>{title}</span>
            </button>
          ))}
        </div>
      </SidePanelContent>

      <SidePanelContent>
        <h3 className='mb-4 font-medium text-muted-foreground text-sm'>
          Elements
        </h3>

        <div className='grid grid-cols-6 gap-x-2 gap-y-4 text-[11px]'>
          {elements.map(({ title, icon }, index) => (
            <button
              // biome-ignore lint/suspicious/noArrayIndexKey: This is a static list
              key={index}
              type='button'
            >
              <div className='mb-2 flex aspect-square items-center justify-center rounded-sm bg-secondary'>
                <DynamicIcon className='size-6 stroke-[1.5]' icon={icon} />
              </div>

              <span>{title}</span>
            </button>
          ))}
        </div>
      </SidePanelContent>
    </SidePanel>
  )
}
