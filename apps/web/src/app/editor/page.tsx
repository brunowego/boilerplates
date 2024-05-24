import type { JSX } from 'react'

import { typographyVariants } from '@acme/ui/components/typography'
import Button from '@acme/ui/components/button'
import {
  MoveLeft,
  Monitor,
  Tablet,
  Undo,
  Redo,
  Check,
} from '@acme/ui/components/icon'

import { Page, PageContent, PageHeader } from '@/components/page'
import DrillDown, { type Row } from '@/components/drill-down'

const rows: Row[] = [
  {
    name: 'Saved sections',
    children: [
      {
        name: 'Hero',
        children: [],
      },
    ],
  },
  {
    name: 'About',
    children: [
      {
        name: 'Hero',
        children: [],
      },
    ],
  },
  {
    name: 'Bonus',
    children: [],
  },
  {
    name: 'Capture',
    children: [],
  },
  {
    name: 'Content',
    children: [],
  },
  {
    name: 'CTA',
    children: [],
  },
  {
    name: 'FAQ',
    children: [],
  },
  {
    name: 'Footer',
    children: [],
  },
  {
    name: 'Guarantee',
    children: [],
  },
  {
    name: 'Header',
    children: [],
  },
  {
    name: 'Link in bio',
    children: [],
  },
  {
    name: 'List',
    children: [],
  },
  {
    name: 'Product Display',
    children: [],
  },
  {
    name: 'Testimonials',
    children: [],
  },
  {
    name: 'Thank you',
    children: [],
  },
  {
    name: 'Videos',
    children: [],
  },
]

export default function EditorPage(): JSX.Element {
  return (
    <Page>
      <PageHeader className='justify-between'>
        <div className='flex items-center space-x-4'>
          <Button size='icon' variant='secondary'>
            <MoveLeft className='size-4' />

            <span className='sr-only'>Back</span>
          </Button>

          <div className='flex items-center space-x-2'>
            <h1
              className={typographyVariants({
                className: 'leading-8',
              })}
            >
              Home page
            </h1>
          </div>
        </div>

        <div className='flex items-center space-x-1'>
          <Button size='icon' variant='secondary'>
            <Monitor className='size-4' />
          </Button>

          <Button size='icon' variant='ghost'>
            <Tablet className='size-4' />
          </Button>
        </div>

        <div className='flex items-center space-x-4'>
          <Button variant='ghost'>View draft</Button>

          <div className='flex items-center space-x-1'>
            <Button disabled size='icon' variant='ghost'>
              <Undo className='size-4' />
            </Button>

            <Button disabled size='icon' variant='ghost'>
              <Redo className='size-4' />
            </Button>
          </div>

          <span className='flex items-center gap-x-1 text-muted-foreground text-sm'>
            <Check className='size-4' />
            Saved changes
          </span>

          <Button variant='secondary'>Publish</Button>
        </div>
      </PageHeader>

      <PageContent className='bg-white dark:bg-background'>
        <DrillDown rows={rows} />
      </PageContent>
    </Page>
  )
}
