'use client'

import type { ReactNode, JSX } from 'react'
import { SWRConfig } from 'swr'

type SwrProviderProps = {
  children: ReactNode
}

export default function SwrProvider({
  children,
}: SwrProviderProps): JSX.Element {
  return <SWRConfig value={{ revalidateOnFocus: false }}>{children}</SWRConfig>
}
