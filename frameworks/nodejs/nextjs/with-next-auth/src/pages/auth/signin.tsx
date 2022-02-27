import { signIn, getProviders } from 'next-auth/react'
import Layout from '@/components/Layout'
import { GetServerSideProps } from 'next'

export default function SignIn({
  providers,
  callbackUrl,
}: {
  providers: {
    [key: string]: {
      id: string
      name: string
      signinUrl: string
    }
  }
  callbackUrl: string
}) {
  return (
    <Layout>
      <h1 className="mb-4 text-3xl font-bold">Sign In</h1>

      <div className="flex flex-col">
        {Object.values(providers).map((provider) => (
          <button
            className="mb-3 max-w-sm rounded-md border border-transparent bg-indigo-800 px-6 py-3 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
            type="button"
            onClick={() => signIn(provider.id, { callbackUrl })}
            key={provider.id}
          >
            Continue with {provider.name}
          </button>
        ))}
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const providers = await getProviders()

  return {
    props: {
      providers,
      callbackUrl: query.callbackUrl,
    },
  }
}
