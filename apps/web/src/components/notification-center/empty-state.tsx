import type { JSX } from 'react'

import { Inbox } from '@acme/ui/components/icon'

type EmptyStateProps = {
  description: string
}

export default function EmptyState({
  description,
}: EmptyStateProps): JSX.Element {
  return (
    <div className='flex h-[460px] flex-col items-center justify-center space-y-4'>
      <div className='flex size-12 items-center justify-center rounded-full bg-accent'>
        <Inbox className='size-5' />
      </div>

      <p className='text-muted-foreground text-sm'>{description}</p>
    </div>
  )
}
