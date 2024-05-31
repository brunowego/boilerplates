import { NextResponse } from 'next/server'

import { setVerifiedDomain } from '@acme/db'

import {
  getDomainResponse,
  getConfigResponse,
  verifyDomain,
} from '@/lib/api/domains'
import type { DomainVerificationStatusProps } from '@/types'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

export async function GET(
  _: Request,
  { params }: { params: { domain: string } },
): Promise<Response> {
  const [domainJson, configJson] = await Promise.all([
    getDomainResponse(params.domain),
    getConfigResponse(params.domain),
  ])

  let status: DomainVerificationStatusProps = 'Valid Configuration'

  if (domainJson?.error?.code === 'not_found') {
    status = 'Domain Not Found'

    return NextResponse.json(
      { status, response: { configJson, domainJson } },
      {
        status: 200,
      },
    )
  }

  if (domainJson.error) {
    status = 'Unknown Error'

    return NextResponse.json(
      { status, response: { configJson, domainJson } },
      {
        status: 200,
      },
    )
  }

  if (configJson?.conflicts.length > 0) {
    status = 'Conflicting DNS Records'

    return NextResponse.json(
      { status, response: { configJson, domainJson } },
      {
        status: 200,
      },
    )
  }

  if (!domainJson.verified) {
    status = 'Pending Verification'

    const verificationJson = await verifyDomain(params.domain)

    if (verificationJson?.verified) {
      status = 'Valid Configuration'
    }

    return NextResponse.json(
      {
        status,
        response: { configJson, domainJson, verificationJson },
      },
      {
        status: 200,
      },
    )
  }

  await setVerifiedDomain(params.domain, !configJson.misconfigured)

  if (configJson.misconfigured) {
    status = 'Invalid Configuration'
  }

  return NextResponse.json(
    {
      status,
      response: { configJson, domainJson },
    },
    {
      status: 200,
    },
  )
}
