import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Navigation() {
  const { data: session } = useSession()

  return (
    <nav className="mb-4 grow">
      <ul className="flex gap-4">
        <li>
          <a href={`/`}>Home</a>
        </li>
        <li>
          <a href={`/ssr`}>SSR</a>
        </li>
        <li>
          <a href={`/protected`}>Protected</a>
        </li>
        <li>
          <a href={`/d`}>Dashboard</a>
        </li>
        <li>
          <a href={`/me`}>Profile</a>
        </li>
        <li className="grow text-right">
          {!session && (
            <Link href="/api/auth/signin">
              <a
                className="text-blue-600"
                onClick={(e) => {
                  e.preventDefault()
                  signIn(undefined, { callbackUrl: '/d' })
                }}
              >
                Sign in
              </a>
            </Link>
          )}

          {session?.user && (
            <>
              {session.user.image && (
                <span style={{ backgroundImage: `url('${session.user.image}')` }} />
              )}
              Signed in as <strong>{session.user.name ?? session.user.email}</strong>.{' '}
              <Link href="/api/auth/signout">
                <a
                  className="text-blue-600"
                  onClick={(e) => {
                    e.preventDefault()
                    signOut({ callbackUrl: '/' })
                  }}
                >
                  Sign out
                </a>
              </Link>
            </>
          )}
        </li>
      </ul>
    </nav>
  )
}
