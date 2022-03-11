import { useLinksQuery, LinksDocument } from '@/generated/graphql'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import type { GetStaticProps } from 'next'
import { client, ssrCache } from '@/lib/urql'

export default function Home() {
  const [{ data }] = useLinksQuery({
    variables: {
      limit: 10,
    },
  })

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Get started by editing{' '}
          <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">pages/index.tsx</code>
        </p>

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          {data &&
            data.links.map(({ title, slug, description }, index) => (
              <Link key={index} href={`${slug}`}>
                <a className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
                  <h3 className="text-2xl font-bold">{title} &rarr;</h3>

                  <p className="mt-4 text-xl">{description}</p>
                </a>
              </Link>
            ))}
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  await Promise.all([client.query(LinksDocument).toPromise()])

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  }
}