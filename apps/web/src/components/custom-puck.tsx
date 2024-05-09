import type { JSX } from 'react'
import { type Data, usePuck, Puck } from '@measured/puck'
import Link from 'next/link'

import Button, { buttonVariants } from '@acme/ui/components/button'
import { ChevronLeft, ChevronRight } from '@acme/ui/components/icon'
import Separator from '@acme/ui/components/separator'

type CustomHeaderProps = {
  pageId?: string
  onPublish: (data: Data) => void
}

const CustomHeader = ({ pageId, onPublish }: CustomHeaderProps) => {
  const {
    appState,
    history: { back, forward, historyStore },
  } = usePuck()

  const { hasFuture = false, hasPast = false } = historyStore || {}

  return (
    <header className='flex h-16 items-center space-x-2 border-b px-4 lg:px-5'>
      <div className='grow' />

      <div className='flex *:p-2'>
        <button
          className='disabled:pointer-events-none disabled:opacity-50'
          disabled={!hasPast}
          onClick={back}
          type='button'
        >
          <ChevronLeft className='size-5' />

          <span className='sr-only'>Undo</span>
        </button>

        <button
          className='disabled:pointer-events-none disabled:opacity-50'
          disabled={!hasFuture}
          onClick={forward}
          type='button'
        >
          <ChevronRight className='size-5' />

          <span className='sr-only'>Redo</span>
        </button>
      </div>

      {pageId ? (
        <Link
          className={buttonVariants({ variant: 'secondary' })}
          href={`/pages/${pageId}`}
          target='_blank'
        >
          View page
        </Link>
      ) : null}

      <Button onClick={() => onPublish(appState.data)} type='button'>
        Publish
      </Button>
    </header>
  )
}

type CustomPuckProps = {
  pageId?: string
  onPublish: (data: Data) => void
}

export default function CustomPuck({
  pageId,
  onPublish,
}: CustomPuckProps): JSX.Element {
  return (
    <>
      <CustomHeader pageId={pageId} onPublish={onPublish} />

      <div className='flex flex-1'>
        <section className='flex-1 bg-border p-4 lg:px-5'>
          <Puck.Preview />
        </section>

        <aside className='w-96 shrink-0 border-l'>
          <div className='p-4'>
            <h3 className='font-medium text-sm leading-6'>Components</h3>

            <div className='mt-4' />

            <Puck.Components />
          </div>

          <Separator />

          <div className='p-4'>
            <h3 className='font-medium text-sm leading-6'>Outline</h3>

            <div className='mt-4' />

            <Puck.Outline />
          </div>

          <Separator />

          <Puck.Fields />
        </aside>
      </div>
    </>
  )
}
