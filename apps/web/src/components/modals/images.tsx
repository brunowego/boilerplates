import type { JSX } from 'react'

import Button from '@acme/ui/components/button'
import { Upload } from '@acme/ui/components/icon'

import {
  SidePanel,
  SidePanelHeader,
  SidePanelTitle,
  SidePanelContent,
} from '@/components/side-panel'

type ImagesProps = {
  className?: string
}

export default function Images({ className }: ImagesProps): JSX.Element {
  return (
    <SidePanel className={className}>
      <SidePanelHeader>
        <SidePanelTitle>Images</SidePanelTitle>
      </SidePanelHeader>

      <SidePanelContent>
        <p className='mb-4 text-muted-foreground text-sm'>
          Upload an image to use on your page.
        </p>

        <Button className='w-full space-x-2' size='sm' variant='secondary'>
          <Upload className='size-4' />

          <span>Upload image</span>
        </Button>
      </SidePanelContent>

      <SidePanelContent>
        <h3 className='mb-4 font-medium text-sm'>Search</h3>

        <p className='text-muted-foreground text-sm'>
          Images uploaded by you will be displayed here.
        </p>
      </SidePanelContent>
    </SidePanel>
  )
}
