import { isAxiosError } from '@/lib/api'

export const toLocalDate = (value: Date) => {
  return new Date(value).toLocaleString('en-US', {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  })
}

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

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
