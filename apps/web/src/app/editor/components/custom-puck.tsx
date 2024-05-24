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

import Puck, { type Data } from '@/lib/puck'
import { Layout, LayoutHeader, LayoutContent } from '@/components/layout'
import { Page, PageContent, PageHeader } from '@/components/page'
import Menu from '@/components/menu'
import Sidebar from '@/components/sidebar'

type CustomPuckProps = {
  onPublish: (data: Data) => void
}

export default function CustomPuck({
  onPublish,
}: CustomPuckProps): JSX.Element {
  // const JSONRenderer = () => {
  //   const { appState } = usePuck()

  //   return <div>{JSON.stringify(appState)}</div>
  // }

  return (
    <Layout>
      <LayoutHeader>
        <Menu />
      </LayoutHeader>

      <LayoutContent className='flex'>
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

              <Button variant='secondary'>Publish</Button>
            </div>
          </PageHeader>

          <PageContent className='bg-white'>
            <Puck.Preview />
          </PageContent>
        </Page>
      </LayoutContent>
    </Layout>
  )
}
