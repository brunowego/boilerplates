import type { JSX } from 'react'

import { typographyVariants } from '@acme/ui/components/typography'
import EmptyState from '@acme/ui/components/empty-state'
import Label from '@acme/ui/components/label'
import Input from '@acme/ui/components/input'
import Button from '@acme/ui/components/button'
import { RefreshCcw } from '@acme/ui/components/icon'

import { Page, PageHeader, PageContent } from '@/components/page'

export default function HomePage(): JSX.Element {
  return (
    <>
      <Page>
        <PageHeader>
          <h1
            className={typographyVariants({
              className: 'leading-8',
              variant: 'title',
            })}
          >
            Webhooks
          </h1>
        </PageHeader>

        <PageContent>
          <div className='relative'>
            <div className='grid grid-cols-5 gap-x-4'>
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  className='aspect-square rounded-t-md border border-dashed bg-secondary'
                  // biome-ignore lint/suspicious/noArrayIndexKey: This is static placeholder content
                  key={index}
                />
              ))}
            </div>

            <div className='absolute inset-y-0 w-full bg-gradient-to-b from-transparent to-background' />
          </div>

          <EmptyState
            className='-mt-56 relative'
            emoji='🪝'
            title='Add a webhook'
            description='Configure webhooks for real-time updates and seamless integration between applications.'
          />
        </PageContent>
      </Page>

      <div className='fixed inset-0 z-50 bg-background/50' />

      <div className='fixed inset-y-0 right-0 z-50 w-full max-w-lg border-l bg-background'>
        <header className='h-16 border-b p-4 lg:px-5'>
          <h2 className='font-medium text-lg leading-8'>Dew domain</h2>
        </header>

        <div className='space-y-4 border-b p-4 lg:px-5'>
          <div className='space-y-2'>
            <Label>Domain</Label>

            <Input type='url' />
          </div>
        </div>

        <div className='space-y-4 p-4 lg:px-5'>
          <h3>Webhook</h3>

          <div className='space-y-2'>
            <Label>Secret key</Label>

            <div className='relative'>
              <Input
                type='url'
                // value='RrbWcztXiv2GPJrIovrwIRORtOjciC/P+vHsreWBdUg='
              />

              <button
                className='absolute inset-y-0 right-2 my-1 p-2'
                type='button'
              >
                <RefreshCcw className='size-4' />
              </button>
            </div>

            <p className='text-muted-foreground text-sm leading-6'>
              Generate a secret key that will be used to create a unique
              signature when firing webhooks, this signature will be available
              in the request Header <strong>(X-Signature)</strong>.
            </p>
          </div>

          <div className='space-y-2'>
            <Label>Events URL</Label>

            <Input placeholder='https://example.com/webhook' type='url' />

            <p className='text-muted-foreground text-sm leading-6'>
              You will receive the webhook when the user starts scanning or
              submits data.
            </p>

            <p className='text-muted-foreground text-orange-200 text-sm leading-6'>
              Make sure the webhook is of type POST and has CORS enabled for the
              domain https://api.example.com.
            </p>
          </div>

          <div className='space-y-2'>
            <Label>Redirect URL</Label>

            <Input placeholder='https://example.com' type='url' />

            <p className='text-muted-foreground text-sm leading-6'>
              You can redirect the user to a specific page after verification.
            </p>

            <p className='text-muted-foreground text-orange-200 text-sm leading-6'>
              Make sure the "enableRedirect" option is enabled.
            </p>
          </div>

          <div className='flex justify-end'>
            <Button className='px-10' size='lg'>
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
