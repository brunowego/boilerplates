import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Page Editor',
}

interface EditorLayoutProps {
  children: ReactNode
}

export default async function EditorLayout({
  children,
}: EditorLayoutProps): Promise<ReactNode> {
  return children
}
