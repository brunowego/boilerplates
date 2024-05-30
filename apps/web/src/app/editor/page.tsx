import type { JSX } from 'react'

import { Page, PageContent, PageHeader } from '@acme/ui/components/page'
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@acme/ui/components/sheet'

import Sidebar from '@/components/sidebar'

export default function EditorPage(): JSX.Element {
  return (
    <>
      <Sidebar />

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

            <Sheet>
              <SheetTrigger asChild>
                <Button variant='secondary'>Publish</Button>
              </SheetTrigger>

              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Publish website</SheetTitle>

                  <SheetDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </PageHeader>

        <PageContent />
      </Page>
    </>
  )
}
