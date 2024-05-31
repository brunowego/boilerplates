import type { JSX } from 'react'

import Label from '@acme/ui/components/label'
import Input from '@acme/ui/components/input'
import Button from '@acme/ui/components/button'
import Textarea from '@acme/ui/components/textarea'

import {
  SidePanel,
  SidePanelContent,
  SidePanelHeader,
  SidePanelTitle,
} from '@/components/side-panel'

type FacebookIntegrationProps = {
  className?: string
}

export default function FacebookIntegration({
  className,
}: FacebookIntegrationProps): JSX.Element {
  return (
    <SidePanel className={className}>
      <SidePanelHeader backTo='settings'>
        <SidePanelTitle>Facebook Integration</SidePanelTitle>
      </SidePanelHeader>

      <SidePanelContent className='space-y-4'>
        <h3 className='mb-4 font-medium text-muted-foreground text-sm'>
          Conversion API
        </h3>

        <div className='space-y-2'>
          <Label>Pixel ID</Label>

          <Input type='text' />
        </div>

        <div className='space-y-2'>
          <Label>Access Token</Label>

          <Textarea />
        </div>

        <div className='space-y-2'>
          <Label>Events name</Label>

          <Input type='text' />
        </div>

        <div className='space-y-2'>
          <Label>Test event code</Label>

          <Input type='text' />
        </div>

        <Button className='w-full' variant='secondary'>
          Save
        </Button>
      </SidePanelContent>
    </SidePanel>
  )
}
