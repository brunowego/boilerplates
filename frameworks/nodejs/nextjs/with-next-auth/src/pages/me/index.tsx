import Layout from '@/components/Layout'

export default function Me() {
  return (
    <Layout>
      <h1 className="mb-4 text-3xl font-bold">My Profile</h1>

      <p className="mb-3">
        The examples below show responses from the example API endpoints.{' '}
        <em>You must be signed in to see responses.</em>
      </p>

      <h2 className="mb-3 font-bold">Session</h2>

      <iframe className="mb-3 w-full rounded bg-gray-100 px-2 pb-2" src="/api/examples/session" />

      <h2 className="mb-3 font-bold">JSON Web Token</h2>

      <iframe className="mb-3 w-full rounded bg-gray-100 px-2 pb-2" src="/api/examples/jwt" />
    </Layout>
  )
}
