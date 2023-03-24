import { useSession, signOut, signIn } from 'next-auth/react'
import { Button } from '@acme/ui'

export default function Web() {
  const { data: session } = useSession()

  return (
    <div>
      <h1>Web</h1>
      <Button />

      {session && (
        <>
          Hello, {session.user?.name} ({session.user?.email})
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}

      {!session && (
        <>
          Not signed in
          <button onClick={() => signIn('dex')}>Sign in</button>
        </>
      )}
    </div>
  )
}
