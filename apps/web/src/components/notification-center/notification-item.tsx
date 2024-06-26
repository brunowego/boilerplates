import type { JSX } from 'react'
import Link from 'next/link'

import Button from '@acme/ui/components/button'
import { formatDistanceToNow } from '@acme/ui/lib/date-fns'

type NotificationItemProps = {
  id: string
  setOpen: (value: boolean) => void
  description: string
  createdAt: string
  recordId: string
  from: string
  to: string
  markMessageAsRead?: (id: string) => void
  type: 'transactions' | 'transaction' | 'inbox' | 'match'
}

export default function NotificationItem({
  id,
  setOpen,
  description,
  createdAt,
  recordId,
  from,
  to,
  markMessageAsRead,
  type,
}: NotificationItemProps): JSX.Element | null {
  switch (type) {
    case 'transactions':
      return (
        <div className='items-between flex justify-between space-x-4 px-3 py-3 hover:bg-secondary'>
          <Link
            className='items-between flex justify-between space-x-4 '
            href={`/transactions?filter=${JSON.stringify({
              date: {
                from,
                to,
              },
            })}`}
            onClick={() => setOpen(false)}
          >
            <div className='flex size-9 items-center justify-center space-y-0 rounded-full border'>
              {/* <Transactions /> */}
            </div>

            <div>
              <p className='text-sm'>{description}</p>

              <span className='text-[#606060] text-xs'>
                {formatDistanceToNow(new Date(createdAt))} ago
              </span>
            </div>
          </Link>

          {markMessageAsRead && (
            <div>
              <Button
                size='icon'
                variant='secondary'
                className='rounded-full bg-transparent hover:bg-[#1A1A1A]'
                onClick={() => markMessageAsRead(id)}
              >
                {/* <Inventory2 /> */}
              </Button>
            </div>
          )}
        </div>
      )

    case 'transaction':
      return (
        <div className='items-between flex justify-between space-x-4 px-3 py-3 hover:bg-secondary'>
          <Link
            className='items-between flex justify-between space-x-4 '
            href={`/transactions?id=${recordId}`}
            onClick={() => setOpen(false)}
          >
            <div className='flex size-9 items-center justify-center space-y-0 rounded-full border'>
              {/* <Transactions /> */}
            </div>

            <div>
              <p className='text-sm'>{description}</p>

              <span className='text-[#606060] text-xs'>
                {formatDistanceToNow(new Date(createdAt))} ago
              </span>
            </div>
          </Link>

          {markMessageAsRead && (
            <div>
              <Button
                className='rounded-full bg-transparent hover:bg-[#1A1A1A]'
                onClick={() => markMessageAsRead(id)}
                size='icon'
                variant='secondary'
              >
                {/* <Inventory2 /> */}
              </Button>
            </div>
          )}
        </div>
      )

    case 'inbox':
      return (
        <div className='items-between flex justify-between space-x-4 px-3 py-3 hover:bg-secondary'>
          <Link
            className='items-between flex justify-between space-x-4 '
            href={`/inbox?id=${recordId}`}
            onClick={() => setOpen(false)}
          >
            <div className='flex size-9 items-center justify-center space-y-0 rounded-full border'>
              {/* <Email /> */}
            </div>

            <div>
              <p className='text-sm'>{description}</p>

              <span className='text-xs text-[#606060]'>
                {formatDistanceToNow(new Date(createdAt))} ago
              </span>
            </div>
          </Link>

          {markMessageAsRead && (
            <div>
              <Button
                size='icon'
                variant='secondary'
                className='rounded-full bg-transparent hover:bg-[#1A1A1A]'
                onClick={() => markMessageAsRead(id)}
              >
                {/* <Inventory2 /> */}
              </Button>
            </div>
          )}
        </div>
      )

    case 'match':
      return (
        <div className='flex items-between justify-between space-x-4 px-3 py-3 hover:bg-secondary'>
          <Link
            className='flex items-between justify-between space-x-4 '
            onClick={() => setOpen(false)}
            href={`/transactions?id=${recordId}`}
          >
            <div className='size-9 flex items-center justify-center space-y-0 border rounded-full'>
              {/* <Match /> */}
            </div>

            <div>
              <p className='text-sm'>{description}</p>

              <span className='text-xs text-[#606060]'>
                {formatDistanceToNow(new Date(createdAt))} ago
              </span>
            </div>
          </Link>

          {markMessageAsRead && (
            <div>
              <Button
                size='icon'
                variant='secondary'
                className='rounded-full bg-transparent hover:bg-[#1A1A1A]'
                onClick={() => markMessageAsRead(id)}
              >
                {/* <Inventory2 /> */}
              </Button>
            </div>
          )}
        </div>
      )

    default:
      return null
  }
}
