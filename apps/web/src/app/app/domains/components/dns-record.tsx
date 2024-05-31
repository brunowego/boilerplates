import type { JSX } from 'react'

import cn from '@acme/ui/utils/cn'
import CopyButton from '@acme/ui/components/copy-button'

import MarkdownText from './markdow-text'

type DnsRecordProps = {
  className?: string
  records: { type: string; name: string; value: string; ttl?: string }[]
  instructions: string
  warning?: string
}

export default function DnsRecord({
  className,
  records,
  instructions,
  warning,
}: DnsRecordProps): JSX.Element {
  const hasTtl = records.some((x) => x.ttl)

  return (
    <div className={cn('space-y-4', className)}>
      <MarkdownText text={instructions} />

      <div className='flex items-center justify-start space-x-10 rounded-md border p-3 lg:px-4'>
        <div className='space-y-2'>
          <p className='font-medium text-muted-foreground text-sm'>Type</p>

          {records.map((record) => (
            <p className='font-mono' key={record.type}>
              {record.type}
            </p>
          ))}
        </div>

        <div className='space-y-2'>
          <p className='font-medium text-muted-foreground text-sm'>Name</p>

          {records.map((record) => (
            <p className='font-mono' key={record.name}>
              {record.name}
            </p>
          ))}
        </div>

        <div className='space-y-2'>
          <p className='font-medium text-muted-foreground text-sm'>Value</p>

          {records.map((record) => (
            <p className='font-mono' key={record.value}>
              {record.value}{' '}
              <CopyButton
                className='rounded-full bg-border p-1.5 transition-colors *:size-3 active:scale-95 hover:scale-105 hover:bg-blue-100 *:hover:text-blue-800 *:transition-colors'
                value={record.value}
              />
            </p>
          ))}
        </div>

        {hasTtl && (
          <div className='space-y-2'>
            <p className='font-medium text-muted-foreground text-sm'>TTL</p>

            {records.map((record) => (
              <p className='font-mono' key={record.ttl}>
                {record.ttl}
              </p>
            ))}
          </div>
        )}
      </div>

      {(warning || hasTtl) && (
        <MarkdownText
          text={
            warning ||
            'Note: for TTL, if <code>86400</code> is not available, set the highest value possible. Also, domain propagation can take anywhere between 1 hour to 12 hours.'
          }
        />
      )}
    </div>
  )
}
