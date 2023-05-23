import Head from 'next/head'

const Meta = ({ title, description }: { title: string; description?: string }) => {
  const metaTitle = `${title} — ACME`

  return (
    <Head>
      <title>{metaTitle}</title>

      <meta
        name="description"
        content={description ?? 'Several boilerplates for personal learning.'}
      ></meta>
    </Head>
  )
}

export default Meta
