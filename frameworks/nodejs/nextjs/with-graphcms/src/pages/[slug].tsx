import { useLinkQuery, LinkDocument } from '@/generated/graphql'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { GetStaticPaths, GetStaticProps } from 'next'
import { client, ssrCache } from '@/lib/urql'

interface IProps {
  slug: string
}

function LinkPage({ slug }: IProps) {
  const [{ data }] = useLinkQuery({
    variables: {
      slug: slug,
    },
  })

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>{data?.link?.title ?? ''}</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <Link href="/">
          <a>Home Page</a>
        </Link>

        <h1 className="text-6xl font-bold">
          <a className="text-blue-600" href={data?.link?.link ?? ''}>
            {data?.link?.title ?? ''}
          </a>
        </h1>

        <p className="mt-3 mb-4 text-2xl">{data?.link?.description ?? ''}</p>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2"
        >
          Powered by <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}

export default LinkPage

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  await client.query(LinkDocument, { slug: params?.slug }).toPromise()

  return {
    props: {
      urqlState: ssrCache.extractData(),
      slug: params?.slug,
    },
  }
}
