'use client'

import { type JSX, Suspense } from 'react'

import Skeleton from '@acme/ui/components/skeleton'
import EmptyState from '@acme/ui/components/empty-state'

import Button from '@acme/ui/components/button'

import { useDomains } from '@/hooks/api/use-domains'

import useAddDomainModal from '../hooks/use-add-domain-modal'
import DomainCard from './domain-card'

export default function ListDomains(): JSX.Element {
  const { data: domains, isLoading } = useDomains()
  const { setShowAddDomainModal, AddDomainModal } = useAddDomainModal()

  if (isLoading) {
    return (
      <div className='relative'>
        <div className='grid space-y-2'>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              className='h-24 rounded-t-md border border-dashed'
              // biome-ignore lint/suspicious/noArrayIndexKey: This is static placeholder content
              key={index}
            />
          ))}
        </div>

        <div className='absolute inset-y-0 w-full bg-gradient-to-b from-transparent to-background' />
      </div>
    )
  }

  if (domains?.length === 0) {
    return (
      <>
        <div className='relative'>
          <div className='grid space-y-2'>
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                className='h-24 rounded-md border border-dashed bg-secondary'
                // biome-ignore lint/suspicious/noArrayIndexKey: This is static placeholder content
                key={index}
              />
            ))}
          </div>

          <div className='absolute inset-y-0 w-full bg-gradient-to-b from-transparent to-background' />
        </div>

        <EmptyState
          className='-mt-64 relative'
          emoji='🌐'
          title='Add your first domain'
          description="You don't have any active custom domains yet."
        >
          <Button
            className='mx-auto px-10'
            onClick={() => setShowAddDomainModal(true)}
          >
            Add a domain
          </Button>
        </EmptyState>

        <AddDomainModal />
      </>
    )
  }

  return (
    <div className='grid space-y-2'>
      {domains?.map(({ ...domain }) => (
        <Suspense key={domain.id}>
          <DomainCard {...domain} />
        </Suspense>
      ))}
    </div>
  )
}
