import { gql, useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const GET_LAUNCHESPAST = gql`
  query LaunchesPast {
    launchesPast(limit: 6) {
      mission_name
      launch_site {
        site_name_long
      }
      links {
        video_link
      }
    }
  }
`

const Home: NextPage = () => {
  const { data } = useQuery(GET_LAUNCHESPAST)

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
            data.launchesPast.map(({ mission_name, launch_site, links }: any, index: any) => (
              <a
                key={index}
                href={`${links.video_link}`}
                className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
              >
                <h3 className="text-2xl font-bold">{mission_name} &rarr;</h3>
                <p className="mt-4 text-xl">{launch_site.site_name_long}</p>
              </a>
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

export default Home
