import type { JSX } from 'react'

import Skeleton from '@acme/ui/components/skeleton'

import {
  SidePanel,
  SidePanelHeader,
  SidePanelTitle,
  SidePanelContent,
} from '@/components/side-panel'

type LoadingProps = {
  className?: string
}

export default function Loading({ className }: LoadingProps): JSX.Element {
  return (
    <SidePanel className={className}>
      <SidePanelHeader>
        <SidePanelTitle>
          <Skeleton className='h-7 w-48' />
        </SidePanelTitle>
      </SidePanelHeader>

      <SidePanelContent>
        <h3 className='mb-4'>
          <Skeleton className='h-5 w-24' />
        </h3>

        <p>
          <Skeleton className='h-5' />
        </p>
      </SidePanelContent>
    </SidePanel>
  )
}
