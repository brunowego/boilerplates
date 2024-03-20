import { isAxiosError } from './lib/api'

export const handleError = (error: unknown, defaultMessage?: string) => {
  if (isAxiosError(error)) {
    if (typeof error.response?.data === 'string') {
      return error.response.data
    }

    return (
      (error.response?.data.message || defaultMessage) ??
      'Internal Server Error'
    )
  }

  if (error instanceof Error) {
    return error.message
  }

  return defaultMessage ?? 'Internal Server Error'
}

export const getInitials = ({
  firstName,
  lastName,
  name,
}: {
  firstName?: string | null
  lastName?: string | null
  name?: string | null
}) =>
  [(firstName || '')[0], (lastName || '')[0]].join('').trim() || (name || '')[0]
