'use client'

import { type JSX, useState, useEffect } from 'react'
import Link from 'next/link'

import Popover from '@acme/ui/components/popover'
import Button from '@acme/ui/components/button'
import cn from '@acme/ui/utils/cn'
import { Bell, Settings2 } from '@acme/ui/components/icon'
import Tabs from '@acme/ui/components/tabs'
// import { ScrollArea } from '@acme/ui/components/scroll-area'

// import { useNotifications } from '@/hooks/use-notifications'

import EmptyState from './empty-state'
// import NotificationItem from './notification-item'

type NotificationCenterProps = {
  className?: string
}

export default function NotificationCenter({
  className,
}: NotificationCenterProps): JSX.Element {
  const [isOpen, setOpen] = useState(false)

  // const {
  //   hasUnseenNotificaitons,
  //   notifications,
  //   markMessageAsRead,
  //   markAllMessagesAsSeen,
  //   markAllMessagesAsRead,
  // } = useNotifications()

  // const unreadNotifications = notifications.filter(
  //   (notification) => !notification.read,
  // )

  // const archivedNotifications = notifications.filter(
  //   (notification) => notification.read,
  // )

  // useEffect(() => {
  //   if (isOpen && hasUnseenNotificaitons) {
  //     markAllMessagesAsSeen()
  //   }
  // }, [hasUnseenNotificaitons, isOpen])

  return (
    <Popover onOpenChange={setOpen} open={isOpen}>
      <Popover.Trigger asChild>
        <Button
          className={cn('relative', className)}
          size='icon'
          variant='outline'
        >
          {/* {hasUnseenNotificaitons && ( */}
          <div className='-top-1 -right-1 absolute size-2.5 rounded-full bg-amber-400' />
          {/* )} */}

          <Bell className='size-4' />
        </Button>
      </Popover.Trigger>

      <Popover.Content
        className='relative mr-7 h-[535px] w-screen overflow-hidden p-0 md:w-[400px]'
        sideOffset={10}
      >
        <Tabs defaultValue='inbox'>
          <Tabs.List
          // className='h-12 w-full justify-start rounded-none border-b bg-transparent'
          >
            <Tabs.Trigger value='inbox'>Inbox</Tabs.Trigger>

            <Tabs.Trigger value='archive'>Archive</Tabs.Trigger>
          </Tabs.List>

          <Link
            href='/settings/notifications'
            className='absolute top-1 right-1'
          >
            <Button onClick={() => setOpen(false)} size='icon' variant='ghost'>
              <Settings2 className='size-4' />
            </Button>
          </Link>

          <Tabs.Content value='inbox' className='relative mt-0'>
            {/* {!unreadNotifications.length && ( */}
            <EmptyState description='No new notifications' />
            {/* )} */}

            {/* {unreadNotifications.length > 0 && (
              <ScrollArea className='h-[485px] pb-12'>
                <div className='divide-y'>
                  {unreadNotifications.map((notification) => {
                    return (
                      <NotificationItem
                        createdAt={notification.createdAt}
                        description={notification.payload.description}
                        from={notification.payload?.from}
                        id={notification.id}
                        key={notification.id}
                        markMessageAsRead={markMessageAsRead}
                        recordId={notification.payload.recordId}
                        setOpen={setOpen}
                        to={notification.payload?.to}
                        type={notification.payload.type}
                      />
                    )
                  })}
                </div>
              </ScrollArea>
            )} */}

            {/* {unreadNotifications.length > 0 && (
              <div className='absolute bottom-0 flex h-12 w-full items-center justify-center border-t-[1px]'>
                <Button
                  className='bg-transparent'
                  onClick={markAllMessagesAsRead}
                  variant='secondary'
                >
                  Archive all
                </Button>
              </div>
            )} */}
          </Tabs.Content>

          <Tabs.Content value='archive' className='mt-0'>
            {/* {!archivedNotifications.length && ( */}
            <EmptyState description='Nothing in the archive' />
            {/* )} */}

            {/* {archivedNotifications.length > 0 && (
              <ScrollArea className='h-[490px]'>
                <div className='divide-y'>
                  {archivedNotifications.map((notification) => {
                    return (
                      <NotificationItem
                        createdAt={notification.createdAt}
                        description={notification.payload.description}
                        key={notification.id}
                        recordId={notification.payload.recordId}
                        setOpen={setOpen}
                        type={notification.payload.type}
                      />
                    )
                  })}
                </div>
              </ScrollArea>
            )} */}
          </Tabs.Content>
        </Tabs>
      </Popover.Content>
    </Popover>
  )
}
