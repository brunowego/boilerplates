import { isAxiosError } from '@/lib/api'

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
