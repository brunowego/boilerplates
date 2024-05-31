import type { JSX } from 'react'

import { categories } from '@/data'

import {
  SidePanel,
  SidePanelContent,
  SidePanelHeader,
  SidePanelTitle,
} from '@/components/side-panel'

export default function SectionTemplates(): JSX.Element {
  return (
    <SidePanel>
      <SidePanelHeader>
        <SidePanelTitle>Section templates</SidePanelTitle>
      </SidePanelHeader>

      <SidePanelContent>
        <nav className='-mt-2 mb-2 flex flex-col space-y-1'>
          {categories.map(({ title }, index) => (
            <button
              className='-mx-3 flex items-center justify-between rounded-sm px-3 text-start leading-10 hover:bg-secondary'
              // biome-ignore lint/suspicious/noArrayIndexKey: This is a static list
              key={index}
              type='button'
            >
              {title}
            </button>
          ))}
        </nav>
      </SidePanelContent>
    </SidePanel>
  )
}
