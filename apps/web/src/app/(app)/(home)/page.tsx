'use client'

import type { JSX } from 'react'

import { typographyVariants } from '@acme/ui/components/typography'

import { Page, PageHeader, PageContent, PageFooter } from '@/components/page'

import { event } from '@/lib/fpixel'

export default function HomePage(): JSX.Element {
  return (
    <Page>
      <PageHeader>
        <h1 className={typographyVariants({ variant: 'header' })}>
          Meta Pixel
        </h1>
      </PageHeader>

      <PageContent>
        <ul>
          <li>
            <a
              href='tel:+551112345678'
              onClick={() => {
                event('Contact', { contact_form: 'phone' })
              }}
            >
              +55 11 1234-5678
            </a>
          </li>

          <li>
            <a
              href='mailto:contact@acme.tld'
              // onClick={() => {
              //   event('Contact', { contact_form: 'email' })
              // }}
              rel='noreferrer'
              target='_blank'
            >
              contact@acme.tld
            </a>
          </li>
        </ul>
      </PageContent>

      <PageFooter>
        <p>TBD</p>
      </PageFooter>
    </Page>
  )
}
