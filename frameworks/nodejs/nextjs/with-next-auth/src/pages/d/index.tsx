import Layout from '@/components/Layout'

export default function Dashboard() {
  return (
    <Layout>
      <h1 className="mb-4 text-3xl font-bold">Dashboard</h1>

      <p>This page is protected by Middleware. Only admin users can see this page.</p>
    </Layout>
  )
}
