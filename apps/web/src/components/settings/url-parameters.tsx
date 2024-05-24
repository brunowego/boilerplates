import type { JSX } from 'react'

import Button from '@acme/ui/components/button'
import Link from 'next/link'

export default function UrlParameters(): JSX.Element {
  return (
    <div className='space-y-4'>
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
    </div>
  )
}
