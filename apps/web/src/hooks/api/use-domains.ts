import { type UseQueryResult, useQuery } from '@tanstack/react-query'

import type { Domain } from '@acme/db/schemas'

import api from '@/lib/api'
import type { VerifyDomain } from '@/types'

const domainKeys = {
  getDomains: () => ['domains'] as const,
  getDomain: (domain: string) => ['domains', domain] as const,
  verifyDomain: (domain: string) => ['domains', domain, 'verify'] as const,
}

const fetchDomains = async () => {
  return (await api.get('domains').then((res) => res.data)) as Promise<Domain[]>
}

const fetchDomain = async (domain: string) => {
  return (await api
    .get(`domains/${domain}`)
    .then((res) => res.data)) as Promise<Domain>
}

const fetchVerifyDomain = async (domain: string) => {
  return (await api
    .get(`domains/${domain}/verify`)
    .then((res) => res.data)) as Promise<Domain>
}

export const useDomains = (): UseQueryResult<Domain[] | undefined, Error> => {
  return useQuery({
    queryKey: domainKeys.getDomains(),
    queryFn: () => fetchDomains(),
  })
}

export const useDomain = ({
  domain,
}: { domain: string }): UseQueryResult<Domain | undefined, Error> => {
  return useQuery({
    queryKey: domainKeys.getDomain(domain),
    queryFn: () => fetchDomain(domain),
  })
}

export const useVerifyDomain = ({
  domain,
}: { domain: string }): UseQueryResult<VerifyDomain | undefined, Error> => {
  return useQuery({
    queryKey: domainKeys.verifyDomain(domain),
    queryFn: () => fetchVerifyDomain(domain),
  })
}
