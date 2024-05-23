import type { JSX } from 'react'
import Link from 'next/link'

import Label from '@acme/ui/components/label'
import Input from '@acme/ui/components/input'
import Button from '@acme/ui/components/button'

export default function PageAddress(): JSX.Element {
  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label>Domain</Label>

        <div className='relative'>
          <span className='absolute inset-y-0 left-3 flex items-center text-muted-foreground text-sm'>
            https://
          </span>

          <Input
            className='pl-16'
            defaultValue='acme.sellitbr.shop'
            type='text'
            readOnly
          />
        </div>

        <p className='text-muted-foreground text-sm'>
          Learn{' '}
          <Link className='underline underline-offset-4' href='/'>
            how set up new domain
          </Link>
          .
        </p>
      </div>

      <div className='space-y-2'>
        <Label>Subdirectory</Label>

        <div className='relative'>
          <span className='absolute inset-y-0 left-4 flex items-center text-muted-foreground text-sm'>
            /
          </span>

          <Input className='pl-6' type='text' />
        </div>

        <p className='text-muted-foreground text-sm'>
          This is your page address (URL), this is how people will access it:
        </p>

        <p className='text-sm'>
          <Link href='/'>https://acme.sellitbr.shop/</Link>
        </p>
      </div>

      <Button className='w-full' variant='secondary'>
        Save
      </Button>
    </div>
  )
}
