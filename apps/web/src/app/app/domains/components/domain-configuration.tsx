import { type JSX, useState } from 'react'

import cn from '@acme/ui/utils/cn'

import type { DomainVerificationStatusProps } from '@/types'
import { getSubdomain } from '@/utils'

import DnsRecord from './dns-record'

type DomainConfigurationProps = {
  // biome-ignore lint/suspicious/noExplicitAny: any is used here because the type of data.response is not known
  data: { status: DomainVerificationStatusProps; response: any }
}

export default function DomainConfiguration({
  data,
}: DomainConfigurationProps): JSX.Element {
  const { domainJson, configJson } = data.response
  const subdomain = getSubdomain(domainJson.name, domainJson.apexName)
  const [recordType, setRecordType] = useState(subdomain ? 'CNAME' : 'A')

  if (data.status === 'Pending Verification') {
    const txtVerification = domainJson.verification.find(
      // biome-ignore lint/suspicious/noExplicitAny: any is used here because the type of domainJson.verification is not known
      (x: any) => x.type === 'TXT',
    )

    return (
      <DnsRecord
        className='p-4 lg:px-5'
        instructions={`Please set the following TXT record on <code>${domainJson.apexName}</code> to prove ownership of <code>${domainJson.name}</code>:`}
        records={[
          {
            type: txtVerification.type,
            name: txtVerification.domain.slice(
              0,
              txtVerification.domain.length - domainJson.apexName.length - 1,
            ),
            value: txtVerification.value,
          },
        ]}
        warning='Warning: if you are using this domain for another site, setting this TXT record will transfer domain ownership away from that site and break it. Please exercise caution when setting this record; make sure that the domain that is shown in the TXT verification value is actually the <b><i>domain you want to use on acme.tld</i></b> &ndash; <b><i>not your production site</i></b>.'
      />
    )
  }

  if (data.status === 'Conflicting DNS Records') {
    return (
      <>
        <div className=''>
          {configJson?.conflicts.some((x: { type: string }) => x.type === 'A')
            ? 'A Record (recommended)'
            : 'CNAME Record (recommended)'}
        </div>

        <DnsRecord
          instructions='Please remove the following conflicting DNS records from your DNS provider:'
          records={configJson?.conflicts.map(
            ({
              name,
              type,
              value,
            }: {
              name: string
              type: string
              value: string
            }) => ({
              name,
              type,
              value,
            }),
          )}
        />

        <DnsRecord
          instructions='Afterwards, set the following record on your DNS provider to continue:'
          records={[
            {
              type: recordType,
              name: recordType === 'A' ? '@' : subdomain ?? 'www',
              value:
                recordType === 'A'
                  ? '76.76.21.21'
                  : // `cname.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
                    'cname.vercel-dns.com',
              ttl: '86400',
            },
          ]}
        />
      </>
    )
  }

  if (data.status === 'Unknown Error') {
    return <p className='text-sm'>{data.response.domainJson.error.message}</p>
  }

  return (
    <>
      <div className='*:-mb-px flex h-10 space-x-4 border-b px-4 font-medium text-muted-foreground text-sm *:border-b lg:px-5'>
        <button
          className={cn(
            recordType === 'A' ? 'border-foreground text-foreground' : null,
          )}
          onClick={() => setRecordType('A')}
          type='button'
        >
          A Record{!subdomain && ' (recommended)'}
        </button>

        <button
          className={cn(
            recordType === 'CNAME' ? 'border-foreground text-foreground' : null,
          )}
          onClick={() => setRecordType('CNAME')}
          type='button'
        >
          CNAME Record{subdomain && ' (recommended)'}
        </button>
      </div>

      <DnsRecord
        className='p-4 lg:px-5'
        instructions={`To configure your ${
          recordType === 'A' ? 'apex domain' : 'subdomain'
        } <code>${
          recordType === 'A' ? domainJson.apexName : domainJson.name
        }</code>, set the following ${recordType} record on your DNS provider to continue:`}
        records={[
          {
            type: recordType,
            name: recordType === 'A' ? '@' : subdomain ?? 'www',
            value:
              recordType === 'A'
                ? '76.76.21.21'
                : // `cname.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
                  'cname.vercel-dns.com',
            ttl: '86400',
          },
        ]}
      />
    </>
  )
}
