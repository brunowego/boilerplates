import type { JSX } from 'react'
import Link from 'next/link'

import { typographyVariants } from '@acme/ui/components/typography'
import Badge from '@acme/ui/components/badge'
import { Card, CardContent } from '@acme/ui/components/card'
import Button from '@acme/ui/components/button'
import { ShieldCheck } from '@acme/ui/components/icon'
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@acme/ui/components/table'

import { Page, PageHeader, PageContent } from '@/components/page'
import Fieldset from '@/components/fieldset'

// import AddProductForm from './components/add-product-form'

export default function SecurityPage(): JSX.Element {
  return (
    <Page>
      <PageHeader>
        <h1 className={typographyVariants({ variant: 'title' })}>Security</h1>
      </PageHeader>

      <PageContent className='divide-y *:py-5 first:*:pt-0 last:*:pb-0'>
        <Fieldset
          title={
            <>
              Passkeys <Badge className='ml-3'>Recommended</Badge>
            </>
          }
          description={
            <>
              Log in with your fingerprint, face recognition or a PIN instead of
              a password. Passkeys can be synced across devices logged into the
              same platform (like Apple ID or a Google account).
              <br />
              <br />
              Learn more about{' '}
              <Link
                className='text-green-400 underline-offset-4 hover:underline'
                href='/'
              >
                passkeys
              </Link>
              .
            </>
          }
        >
          <Card>
            <CardContent>
              <p className='text-sm'>
                Creating a passkey takes under a minute.
              </p>

              <Button className='mt-4' variant='outline'>
                Create a passkey
              </Button>
            </CardContent>
          </Card>
        </Fieldset>

        <Fieldset title='Password'>
          <Card>
            <CardContent>
              <p className='text-sm'>
                You have not set a password on your account.
              </p>

              <Button className='mt-4' variant='outline'>
                Create password
              </Button>
            </CardContent>
          </Card>
        </Fieldset>

        <Fieldset
          title='Secondary email'
          description='A secondary email can be used to restore access to your account. Security notifications are also sent to this email.'
        >
          <Card>
            <CardContent>
              <p className='text-sm'>You do not have a secondary email.</p>

              <Button className='mt-4' variant='outline'>
                Add secondary email
              </Button>
            </CardContent>
          </Card>
        </Fieldset>

        <Fieldset
          title='Two-step authentication'
          description={
            <>
              Learn more about{' '}
              <Link
                className='text-green-400 underline-offset-4 hover:underline'
                href='/'
              >
                two-step authentication
              </Link>
              .
            </>
          }
        >
          <Card>
            <CardContent className='border-b'>
              <h4 className='font-medium'>Authentication methods</h4>

              <p className='mt-2 text-muted-foreground text-sm leading-5'>
                After entering your password, verify your identity with an
                authentication method.
              </p>
            </CardContent>

            <CardContent>
              <div className='flex items-center gap-x-4'>
                <ShieldCheck className='size-10 shrink-0' />

                <p className='text-muted-foreground text-sm leading-5'>
                  Two-step authentication adds a layer of security to your
                  account by using more than just your password to log in.
                </p>
              </div>

              <h5 className='mt-4 font-medium text-sm'>How it works</h5>

              <p className='mt-3 text-muted-foreground text-sm leading-5'>
                When you log in to Shopify, you'll need to:
              </p>

              <ul className='mt-3 ml-4 list-decimal space-y-2 text-sm'>
                <li>Enter your email and password</li>

                <li>
                  Complete a second step to prove that it's you logging in. You
                  can enter a verification code, use a security key, or confirm
                  your login on a trusted device.
                </li>
              </ul>

              <Button className='mt-4' variant='outline'>
                Turn on two-step
              </Button>
            </CardContent>
          </Card>
        </Fieldset>

        <Fieldset
          title='Devices'
          description="You're currently logged in to Shopify on these devices. If you don't recognize a device, log out to keep your account secure."
        >
          <Card>
            <CardContent className='border-b'>
              <h4 className='font-medium'>Logged in</h4>
            </CardContent>

            <Table className='my-2 leading-6'>
              <TableBody>
                <TableRow>
                  <TableCell className='text-nowrap'>
                    Chrome on macOS
                    <br />
                    <Badge className='mt-1'>This device</Badge>
                  </TableCell>

                  <TableCell className='text-muted-foreground'>
                    Apr 6, 3:33 pm
                  </TableCell>

                  <TableCell className='text-muted-foreground'>
                    Anápolis (Goiás), Brazil
                  </TableCell>

                  <TableCell className='text-right'>
                    <Link
                      className='ml-auto underline-offset-4 hover:underline'
                      href='/'
                    >
                      Log out
                    </Link>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className='text-nowrap'>Chrome on macOS</TableCell>

                  <TableCell className='text-muted-foreground'>
                    Apr 6, 3:33 pm
                  </TableCell>

                  <TableCell className='text-muted-foreground'>
                    Anápolis (Goiás), Brazil
                  </TableCell>

                  <TableCell className='text-right'>
                    <Link
                      className='ml-auto underline-offset-4 hover:underline'
                      href='/'
                    >
                      Log out
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </Fieldset>
      </PageContent>
    </Page>
  )
}
