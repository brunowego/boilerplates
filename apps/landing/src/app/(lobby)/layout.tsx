import type { ReactNode, JSX } from 'react'

interface LobbyLayoutProps {
  children: ReactNode
}

export default function LobbyLayout({
  children,
}: LobbyLayoutProps): JSX.Element {
  return <>{children}</>
}
