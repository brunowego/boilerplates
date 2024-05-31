import type { JSX } from 'react'
import Link from 'next/link'

import Button from '@acme/ui/components/button'

import {
  SidePanel,
  SidePanelContent,
  SidePanelHeader,
  SidePanelTitle,
} from '@/components/side-panel'

type UrlParametersProps = {
  className?: string
}

export default function UrlParameters({
  className,
}: UrlParametersProps): JSX.Element {
  return (
    <SidePanel className={className}>
      <SidePanelHeader backTo='settings'>
        <SidePanelTitle>Page structure</SidePanelTitle>
      </SidePanelHeader>

      <SidePanelContent className='space-y-4'>
        <p className='text-muted-foreground text-sm'>
          Set default values for the missing parameters in the URL.{' '}
          <Link href='/'>Learn more about URL parameters</Link>.
        </p>

        <Button className='w-full' variant='secondary'>
          Add
        </Button>

        <p className='text-center text-muted-foreground text-sm'>
          No URL parameters registered
        </p>
      </SidePanelContent>
    </SidePanel>
  )
}
