'use client'

import type { JSX } from 'react'

import { Page, PageContent, PageHeader } from '@acme/ui/components/page'
import { typographyVariants } from '@acme/ui/components/typography'
import Button from '@acme/ui/components/button'

import useAddDomainModal from '../hooks/use-add-domain-modal'
import ListDomains from './list-domains'

export default function Domains(): JSX.Element {
  const { setShowAddDomainModal, AddDomainModal } = useAddDomainModal()

  return (
    <>
      <Page>
        <PageHeader className='justify-between'>
          <h1
            className={typographyVariants({
              className: 'leading-8',
              variant: 'title',
            })}
          >
            Domains
          </h1>

          <Button
            className='mx-auto px-10'
            onClick={() => setShowAddDomainModal(true)}
            variant='secondary'
          >
            Add a domain
          </Button>
        </PageHeader>

        <PageContent>
          <ListDomains />
        </PageContent>
      </Page>

      <AddDomainModal />
    </>
  )
}
