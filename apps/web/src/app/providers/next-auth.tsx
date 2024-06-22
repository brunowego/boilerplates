'use client'

import type { JSX } from 'react'

import { SessionProvider, type SessionProviderProps } from '@acme/auth/react'

export default function NextAuthProvider({
  children,
  ...props
}: SessionProviderProps): JSX.Element {
  return <SessionProvider {...props}>{children}</SessionProvider>
}
