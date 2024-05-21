import type { Status } from './types'

export const toLocalDate = (value: Date) => {
  return new Date(value).toLocaleString('en-US', {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  })
}

export const getStatusColor = (status: Status, variant: 'bg' | 'text') => {
  switch (status) {
    case 'broken':
      return `${variant}-red-500`
    case 'available':
      return `${variant}-green-500`
    case 'in use':
      return `${variant}-yellow-500`
    default:
      return `${variant}-gray-500`
  }
}

export const formatDate = (date: string) => {
  const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  return dateFormatter.format(new Date(date))
}
