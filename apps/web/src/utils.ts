import { isAxiosError } from '@/lib/api'

import { SECOND_LEVEL_DOMAINS, ccTLDs, SPECIAL_APEX_DOMAINS } from './constants'

export const isValidUrl = (url: string) => {
  try {
    new URL(url)

    return true
  } catch (err) {
    console.error(err)

    return false
  }
}

export const getSubdomain = (name: string, apexName: string) => {
  if (name === apexName) {
    return null
  }

  return name.slice(0, name.length - apexName.length - 1)
}

export const getDomainWithoutWWW = (url: string) => {
  if (isValidUrl(url)) {
    return new URL(url).hostname.replace(/^www\./, '')
  }

  try {
    if (url.includes('.') && !url.includes(' ')) {
      return new URL(`https://${url}`).hostname.replace(/^www\./, '')
    }
  } catch (err) {
    console.error(err)

    return null
  }
}

export const validDomainRegex = new RegExp(
  /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
)

export const getApexDomain = (url: string) => {
  // biome-ignore lint/suspicious/noExplicitAny: This is a custom response type
  let domain: any

  try {
    domain = new URL(url.replace(/^[a-zA-Z]+:\/\//, 'https://')).hostname
  } catch (err) {
    console.error(err)

    return ''
  }

  if (domain === 'youtu.be') {
    return 'youtube.com'
  }

  if (domain === 'raw.githubusercontent.com') {
    return 'github.com'
  }

  if (domain.endsWith('.vercel.app')) {
    return 'vercel.app'
  }

  const parts = domain.split('.')

  if (parts.length > 2) {
    if (
      (SECOND_LEVEL_DOMAINS.has(parts[parts.length - 2]) &&
        ccTLDs.has(parts[parts.length - 1])) ||
      SPECIAL_APEX_DOMAINS.has(parts.slice(-2).join('.'))
    ) {
      return parts.slice(-3).join('.')
    }

    return parts.slice(-2).join('.')
  }

  return domain
}

export function hasSubdomain(subdomain: string, domain: string): boolean {
  return new Set([`${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`]).has(
    domain,
  )
}

export interface CustomResponse extends Response {
  // biome-ignore lint/suspicious/noExplicitAny: This is a custom response type
  json: () => Promise<any>
  error?: { code: string; projectId: string; message: string }
}

export function handleError(err: unknown, defaultMessage?: string): string {
  if (isAxiosError(err)) {
    if (typeof err.response?.data === 'string') {
      return err.response.data
    }

    return (
      (err.response?.data.message || defaultMessage) ?? 'Internal Server Error'
    )
  }

  if (err instanceof Error) {
    return err.message
  }

  return defaultMessage ?? 'Internal Server Error'
}
