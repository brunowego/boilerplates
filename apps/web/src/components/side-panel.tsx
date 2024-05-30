import type { ReactNode, JSX } from 'react'

import cn from '@acme/ui/utils/cn'
import Button from '@acme/ui/components/button'
import { MoveLeft, X } from '@acme/ui/components/icon'

import useSidePanel from '@/store/use-side-panel'

import type { Panel } from './panels'

type SidePanelProps = {
  className?: string
  children: ReactNode
}

const SidePanel = ({ className, ...props }: SidePanelProps): JSX.Element => {
  return (
    <aside className={cn('sticky top-0 h-full w-full', className)} {...props} />
  )
}

type SidePanelHeaderProps = {
  backTo?: Panel | null
  children: ReactNode
}

const SidePanelHeader = ({
  backTo,
  children,
}: SidePanelHeaderProps): JSX.Element => {
  const { open, close } = useSidePanel()

  return (
    <div className='p-4 lg:px-5'>
      <div className='flex h-10 items-center gap-x-4'>
        {backTo ? (
          <Button onClick={() => open(backTo)} size='icon' variant='secondary'>
            <MoveLeft className='size-4' />

            <span className='sr-only'>Back</span>
          </Button>
        ) : null}

        {children}

        <button className='-mr-2 ml-auto p-1' onClick={close} type='button'>
          <X
            aria-hidden='true'
            className='size-5 text-muted-foreground hover:text-foreground'
          />
        </button>
      </div>
    </div>
  )
}

type SidePanelTitleProps = {
  className?: string
  children: ReactNode
}

const SidePanelTitle = ({
  className,
  ...props
}: SidePanelTitleProps): JSX.Element => {
  return <h2 className={cn('font-medium leading-8', className)} {...props} />
}

type SidePanelContentProps = {
  className?: string
  children: ReactNode
}

const SidePanelContent = ({
  className,
  ...props
}: SidePanelContentProps): JSX.Element => {
  return (
    <div
      className={cn('p-4 [&:not(:last-child)]:border-b lg:px-5', className)}
      {...props}
    />
  )
}

export { SidePanel, SidePanelHeader, SidePanelTitle, SidePanelContent }
