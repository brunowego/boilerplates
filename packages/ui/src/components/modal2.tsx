'use client'

import type { DialogProps } from '@radix-ui/react-dialog'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './dialog'
import cn from '../utils/cn'
import { LogoMark } from './logo'

export type ModalProps = {
  title: string | React.ReactNode
  subtitle?: string | React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
  trigger: React.ReactNode
  children: React.ReactNode
  dialogProps?: DialogProps
}

export default function Modal({
  title,
  subtitle,
  trigger,
  size = 'md',
  children,
  dialogProps,
}: ModalProps) {
  return (
    <Dialog {...dialogProps}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        className={cn(
          'my-10 p-0',
          size === 'sm' && 'sm:max-w-sm',
          size === 'md' && 'sm:max-w-md',
          size === 'lg' && 'sm:max-w-lg',
          size === 'xl' && 'sm:max-w-xl',
          size === '2xl' && 'sm:max-w-2xl',
          size === '3xl' && 'sm:max-w-3xl',
          size === '4xl' && 'sm:max-w-4xl',
          size === '5xl' && 'sm:max-w-5xl',
        )}
      >
        <div className='no-scrollbar max-h-[80vh] overflow-scroll'>
          <header className='border-b p-4 lg:p-5'>
            <DialogHeader>
              <div className='flex justify-center'>
                <LogoMark className='mb-4 size-10' />
              </div>

              <DialogTitle className='mb-4 text-center'>{title}</DialogTitle>

              {subtitle && (
                <DialogDescription className='text-center'>
                  {subtitle}
                </DialogDescription>
              )}
            </DialogHeader>
          </header>

          <section className='bg-zinc-50 p-4 dark:bg-secondary lg:px-5'>
            {children}
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
