'use client'

import { type JSX, useState, useEffect } from 'react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

import {
  Inbox,
  Transactions,
  Inventory2,
  Email,
  Match,
  Bell,
  Settings,
} from '@acme/ui/components/icon'
import Button from '@acme/ui/components/button'
import Popover from '@acme/ui/components/popover'
import Tabs from '@acme/ui/components/tabs'
import { ScrollArea } from '@acme/ui/components/scroll-area'
import cn from '@acme/ui/utils/cn'

import { useNotifications } from '@/hooks/use-notifications'

type EmptyStateProps = {
  description: string
}

function EmptyState({ description }: EmptyStateProps): JSX.Element {
  return (
    <div className='flex h-[460px] flex-col items-center justify-center space-y-4'>
      <div className='flex size-12 items-center justify-center rounded-full bg-accent'>
        <Inbox className='size-5' />
      </div>

      <p className='text-muted-foreground text-sm'>{description}</p>
    </div>
  )
}

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

function NotificationItem({
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
            onClick={() => setOpen(false)}
            href={`/transactions?filter=${JSON.stringify({
              date: {
                from,
                to,
              },
            })}`}
          >
            <div className='flex size-9 items-center justify-center space-y-0 rounded-full border'>
              <Transactions />
            </div>

            <div>
              <p className='text-sm'>{description}</p>

              <span className='text-muted-foreground text-xs'>
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
                <Inventory2 />
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
            onClick={() => setOpen(false)}
            href={`/transactions?id=${recordId}`}
          >
            <div className='flex size-9 items-center justify-center space-y-0 rounded-full border'>
              <Transactions />
            </div>

            <div>
              <p className='text-sm'>{description}</p>

              <span className='text-muted-foreground text-xs'>
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
                <Inventory2 />
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
            onClick={() => setOpen(false)}
            href={`/inbox?id=${recordId}`}
          >
            <div className='flex size-9 items-center justify-center space-y-0 rounded-full border'>
              <Email />
            </div>

            <div>
              <p className='text-sm'>{description}</p>

              <span className='text-muted-foreground text-xs'>
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
                <Inventory2 />
              </Button>
            </div>
          )}
        </div>
      )

    case 'match':
      return (
        <div className='items-between flex justify-between space-x-4 px-3 py-3 hover:bg-secondary'>
          <Link
            className='items-between flex justify-between space-x-4 '
            onClick={() => setOpen(false)}
            href={`/transactions?id=${recordId}`}
          >
            <div className='flex size-9 items-center justify-center space-y-0 rounded-full border'>
              <Match />
            </div>

            <div>
              <p className='text-sm'>{description}</p>

              <span className='text-muted-foreground text-xs'>
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
                <Inventory2 />
              </Button>
            </div>
          )}
        </div>
      )

    default:
      return null
  }
}

type NotificationCenterProps = {
  className?: string
}

export function NotificationCenter({
  className,
}: NotificationCenterProps): JSX.Element {
  const [isOpen, setOpen] = useState(false)

  const {
    hasUnseenNotificaitons,
    notifications,
    markMessageAsRead,
    markAllMessagesAsSeen,
    markAllMessagesAsRead,
  } = useNotifications()

  const unreadNotifications = notifications.filter(
    // @ts-ignore
    (notification) => !notification.read,
  )

  const archivedNotifications = notifications.filter(
    // @ts-ignore
    (notification) => notification.read,
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isOpen && hasUnseenNotificaitons) {
      markAllMessagesAsSeen()
    }
  }, [hasUnseenNotificaitons, isOpen])

  return (
    <Popover onOpenChange={setOpen} open={isOpen}>
      <Popover.Trigger asChild>
        <Button className={cn('relative', className)} variant='ghost'>
          {hasUnseenNotificaitons && (
            <div className='absolute top-1 right-1 size-2 rounded-full bg-amber-400' />
          )}

          <Bell className='size-5 shrink-0' />
        </Button>
      </Popover.Trigger>

      <Popover.Content
        align='end'
        className='h-[535px] p-0 md:w-96'
        side='right'
        sideOffset={10}
      >
        <Popover.Arrow />

        <Tabs defaultValue='inbox'>
          <Tabs.List>
            <Tabs.Trigger value='inbox'>Inbox</Tabs.Trigger>

            <Tabs.Trigger value='archive'>Archive</Tabs.Trigger>
          </Tabs.List>

          <Link
            href='/settings/notifications'
            className='absolute top-1 right-1'
          >
            <Button onClick={() => setOpen(false)} size='icon' variant='ghost'>
              <Settings className='size-5 text-muted-foreground' />
            </Button>
          </Link>

          <Tabs.Content value='inbox' className='relative mt-0'>
            {!unreadNotifications.length && (
              <EmptyState description='No new notifications' />
            )}

            {unreadNotifications.length > 0 && (
              <ScrollArea className='h-[485px] pb-12'>
                <div className='divide-y'>
                  {unreadNotifications.map((notification) => {
                    console.log(notification)
                    return (
                      <NotificationItem
                        // @ts-ignore
                        key={notification.id}
                        // @ts-ignore
                        id={notification.id}
                        markMessageAsRead={markMessageAsRead}
                        setOpen={setOpen}
                        // @ts-ignore
                        description={notification.payload.description}
                        // @ts-ignore
                        createdAt={notification.createdAt}
                        // @ts-ignore
                        recordId={notification.payload.recordId}
                        // @ts-ignore
                        type={notification.payload.type}
                        // @ts-ignore
                        from={notification.payload?.from}
                        // @ts-ignore
                        to={notification.payload?.to}
                      />
                    )
                  })}
                </div>
              </ScrollArea>
            )}

            {unreadNotifications.length > 0 && (
              <div className='absolute bottom-0 flex h-12 w-full items-center justify-center border-t-[1px] px-1'>
                <Button
                  className='w-full'
                  onClick={markAllMessagesAsRead}
                  variant='ghost'
                >
                  Archive all
                </Button>
              </div>
            )}
          </Tabs.Content>

          <Tabs.Content value='archive' className='mt-0'>
            {!archivedNotifications.length && (
              <EmptyState description='Nothing in the archive' />
            )}

            {archivedNotifications.length > 0 && (
              <ScrollArea className='h-[490px]'>
                <div className='divide-y'>
                  {archivedNotifications.map((notification) => {
                    return (
                      // @ts-ignore
                      <NotificationItem
                        // @ts-ignore
                        createdAt={notification.createdAt}
                        // @ts-ignore
                        description={notification.payload.description}
                        // @ts-ignore
                        key={notification.id}
                        // @ts-ignore
                        recordId={notification.payload.recordId}
                        setOpen={setOpen}
                        // @ts-ignore
                        type={notification.payload.type}
                      />
                    )
                  })}
                </div>
              </ScrollArea>
            )}
          </Tabs.Content>
        </Tabs>
      </Popover.Content>
    </Popover>
  )
}
