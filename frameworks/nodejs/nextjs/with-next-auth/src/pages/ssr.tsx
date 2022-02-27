import Layout from '@/components/Layout'
import type { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'

export default function Server() {
  return (
    <Layout>
      <h1 className="mb-4 text-3xl font-bold">Server Side Rendering</h1>

      <p className="mb-3">
        This page uses the universal <strong>getSession()</strong> method in{' '}
        <strong>getServerSideProps()</strong>.
      </p>
      <p className="mb-3">
        Using <strong>getSession()</strong> in <strong>getServerSideProps()</strong> is the
        recommended approach if you need to support Server Side Rendering with authentication.
      </p>
      <p className="mb-3">
        The advantage of Server Side Rendering is this page does not require client side JavaScript.
      </p>
      <p>The disadvantage of Server Side Rendering is that this page is slower to render.</p>
    </Layout>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}
