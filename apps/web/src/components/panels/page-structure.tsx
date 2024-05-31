import type { JSX } from 'react'

import {
  SidePanel,
  SidePanelContent,
  SidePanelHeader,
  SidePanelTitle,
} from '@/components/side-panel'

type PageStructureProps = {
  className?: string
}

export default function PageStructure({
  className,
}: PageStructureProps): JSX.Element {
  return (
    <SidePanel className={className}>
      <SidePanelHeader>
        <SidePanelTitle>Page structure</SidePanelTitle>
      </SidePanelHeader>

      <SidePanelContent>
        <p className='mb-4 text-muted-foreground text-sm leading-6'>
          Add, organize, and edit your page structures.
        </p>

        <h3 className='mb-4 font-medium text-sm'>Sections</h3>

        <p className='text-muted-foreground text-sm leading-6'>
          Click and drag to change the sections' position on your page. To
          rename any of them, double-click on the correspondent title below.
        </p>
      </SidePanelContent>
    </SidePanel>
  )
}
