'use client'

import type { ReactNode, Dispatch, SetStateAction } from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { Drawer } from 'vaul'

import useMediaQuery from '../hooks/use-media-query'

export default function Popover({
  children,
  content,
  align = 'center',
  openPopover,
  setOpenPopover,
  mobileOnly,
}: {
  children: ReactNode
  content: ReactNode | string
  align?: 'center' | 'start' | 'end'
  openPopover: boolean
  setOpenPopover: Dispatch<SetStateAction<boolean>>
  mobileOnly?: boolean
}) {
  const { isMobile } = useMediaQuery()

  if (mobileOnly || isMobile) {
    return (
      <Drawer.Root open={openPopover} onOpenChange={setOpenPopover}>
        <Drawer.Trigger className='sm:hidden' asChild>
          {children}
        </Drawer.Trigger>

        <Drawer.Overlay className='fixed inset-0 z-40 bg-zinc-100 bg-opacity-10 backdrop-blur dark:bg-zinc-800' />

        <Drawer.Portal>
          <Drawer.Content className='fixed right-0 bottom-0 left-0 z-50 mt-24 rounded-t-[10px] border-t bg-secondary'>
            <div className='sticky top-0 z-20 flex w-full items-center justify-center rounded-t-[10px] bg-inherit'>
              <div className='my-3 h-1 w-12 rounded-full bg-zinc-300 dark:bg-zinc-700' />
            </div>

            <div className='flex min-h-[150px] w-full items-center justify-center overflow-hidden bg-secondary pb-8 align-middle shadow-xl'>
              {content}
            </div>
          </Drawer.Content>
          <Drawer.Overlay />
        </Drawer.Portal>
      </Drawer.Root>
    )
  }

  return (
    <PopoverPrimitive.Root open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverPrimitive.Trigger className='sm:inline-flex' asChild>
        {children}
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          sideOffset={8}
          align={align}
          className='z-50 animate-slide-up-fade items-center rounded-lg border bg-secondary drop-shadow-lg sm:block'
        >
          {content}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
