import { type JSX, useState } from 'react'
import Link from 'next/link'

import Layout from '@acme/ui/components/layout'
import Page from '@acme/ui/components/page'
import { typographyVariants } from '@acme/ui/components/typography'
import Button, { buttonVariants } from '@acme/ui/components/button'
import { MoveLeft /*, Monitor, Tablet, Check*/ } from '@acme/ui/components/icon'

import Puck, { type Data, usePuck, MenuBar } from '@/lib/puck'
import Menu from '@/components/menu'
import Sidebar from '@/components/sidebar'

type CustomPuckProps = {
  onPublish: (data: Data) => void
}

export default function CustomPuck({
  onPublish,
}: CustomPuckProps): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false)
  const { appState, dispatch } = usePuck()

  return (
    <>
      {/* <pre className='ml-16 p-4' suppressHydrationWarning>
        {JSON.stringify(appState, null, 2)}
      </pre> */}

      <Layout>
        <Layout.Header>
          <Menu />
        </Layout.Header>

        <Layout.Content className='flex'>
          <Sidebar />

          <Page>
            <Page.Header className='justify-between'>
              <div className='flex items-center space-x-4'>
                <Link
                  className={buttonVariants({
                    size: 'icon',
                    variant: 'secondary',
                  })}
                  href='/pages'
                >
                  <MoveLeft className='size-4' />

                  <span className='sr-only'>Back</span>
                </Link>

                <div className='flex items-center space-x-2'>
                  <h1
                    className={typographyVariants({
                      className: 'font-medium leading-8',
                    })}
                  >
                    Acme Studio
                  </h1>
                </div>
              </div>

              {/* <div className='flex items-center space-x-1'>
                <Button size='icon' variant='secondary'>
                  <Monitor className='size-4' />
                </Button>

                <Button size='icon' variant='ghost'>
                  <Tablet className='size-4' />
                </Button>
              </div> */}

              <div className='flex items-center space-x-4'>
                {/* <Button variant='ghost'>View draft</Button> */}

                <MenuBar
                  appState={appState}
                  data={appState.data}
                  dispatch={dispatch}
                  onPublish={onPublish}
                  menuOpen={menuOpen}
                  renderHeaderActions={() => (
                    <>
                      {/* <span className='flex items-center gap-x-1 text-muted-foreground text-sm'>
                        <Check className='size-4' />
                        Saved changes
                      </span> */}

                      <Button
                        onClick={() => {
                          onPublish(appState.data)
                        }}
                        variant='secondary'
                      >
                        Publish
                      </Button>
                    </>
                  )}
                  setMenuOpen={setMenuOpen}
                />
              </div>
            </Page.Header>

            <Puck.Preview />
          </Page>
        </Layout.Content>
      </Layout>
    </>
  )
}
