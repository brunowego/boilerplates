import { isAxiosError } from '@/lib/api'

export const createImageUrl = (key: string) => {
  return `https://khedma-market.s3.amazonaws.com/${key}`
}

export default function handleError(err: unknown, defaultMessage?: string) {
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
