import { isAxiosError } from './lib/api'

export const handleError = (err: unknown, defaultMessage?: string) => {
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
