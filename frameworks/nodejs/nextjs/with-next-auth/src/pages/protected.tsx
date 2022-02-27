import { useSession, signIn } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'

export default function Protected() {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const [content, setContent] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/examples/protected')
      const json = await res.json()

      if (json.content) {
        setContent(json.content)
      }
    }
    fetchData()
  }, [session])

  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <h1 className="mb-4 text-3xl font-bold">Access Denied</h1>

        <p>
          <Link href="/api/auth/signin">
            <a
              onClick={(e) => {
                e.preventDefault()
                signIn()
              }}
            >
              You must be signed in to view this page.
            </a>
          </Link>
        </p>
      </Layout>
    )
  }

  // If session exists, display content
  return (
    <Layout>
      <h1 className="mb-4 text-3xl font-bold">Protected</h1>

      <p>{content ?? '\u00a0'}</p>
    </Layout>
  )
}
