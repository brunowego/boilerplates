import { checkDomainExists } from '@acme/db/queries'

import { validDomainRegex } from '@/utils'

export const validateDomain = async (domain: string) => {
  if (!domain || typeof domain !== 'string') {
    return 'Missing domain'
  }

  const validDomain = validDomainRegex.test(domain)
  // && !/^(dub\.co|.*\.dub\.co|dub\.sh|.*\.dub\.sh|d\.to|.*\.d\.to)$/i.test(domain)

  if (!validDomain) {
    return 'Invalid domain'
  }

  const exists = await checkDomainExists(domain)

  if (exists) {
    return 'Domain is already in use.'
  }

  return true
}

export interface CustomResponse extends Response {
  // biome-ignore lint/suspicious/noExplicitAny: Any is required here
  json: () => Promise<any>
  error?: { code: string; projectId: string; message: string }
}
