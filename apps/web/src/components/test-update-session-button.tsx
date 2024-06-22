'use client'

import type { ButtonHTMLAttributes, JSX } from 'react'

import { useSession } from '@acme/auth/react'

type TestUpateSessionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  workspaceId: string
}

export default function TestUpateSessionButton({
  workspaceId,
  ...props
}: TestUpateSessionButtonProps): JSX.Element {
  const { data: session, update: sessionUpdate } = useSession()

  return (
    <button
      onClick={() => sessionUpdate({ ...session?.user, workspaceId })}
      {...props}
    />
  )
}
