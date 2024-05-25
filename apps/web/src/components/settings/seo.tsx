import type { JSX } from 'react'

import Label from '@acme/ui/components/label'
import Input from '@acme/ui/components/input'
import Textarea from '@acme/ui/components/textarea'
import Button from '@acme/ui/components/button'

export default function SEO(): JSX.Element {
  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label>Page title</Label>

        <Input defaultValue='Product page' type='text' />

        <p className='text-muted-foreground text-sm'>
          This is the name that appears on your browser's tab.
        </p>
      </div>

      <div className='space-y-2'>
        <Label>Description</Label>

        <Textarea placeholder='Write a description of the content on your page' />

        <p className='text-muted-foreground text-sm'>
          This description is used by search engines (like Google) to show your
          page on the internet.
        </p>
      </div>

      <div className='space-y-2'>
        <Label>Keywords</Label>

        <Textarea placeholder='Add keywords that are related to your page' />

        <p className='text-muted-foreground text-sm'>
          Use commas to separate them. Example of three different keywords:
          Music, Guitar, Arts...
        </p>
      </div>

      <div className='space-y-2'>
        <Label>Share URL</Label>

        <Input type='text' />

        <p className='text-muted-foreground text-sm'>
          Personalize your page's URL to be displayed in any preview created by
          sites like Google, Facebook, Slack etc.
        </p>
      </div>

      <Button className='w-full' variant='secondary'>
        Save
      </Button>
    </div>
  )
}
