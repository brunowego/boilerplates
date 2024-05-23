import type { ReactNode } from 'react'

export type Category = {
  title: string
  children: {
    title: string
    href: string
  }[]
}

export type Setting = {
  title: string
  locked?: boolean
  children?: ReactNode
}
