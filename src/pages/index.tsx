import type { NextPage } from 'next'
import Head from 'next/head'
import showToast from '@/lib/notification'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="mt-4 flex gap-5">
          <button
            className="bg-green-600 py-2 px-5 text-white"
            onClick={() => {
              showToast('Successfully toasted!', 'success')
            }}
          >
            Success
          </button>

          <button
            className="bg-orange-600 py-2 px-5 text-white"
            onClick={() => {
              showToast('Try again in another moment!', 'warning')
            }}
          >
            Warning
          </button>

          <button
            className="bg-red-600 py-2 px-5 text-white"
            onClick={() => {
              showToast("This didn't work.", 'error')
            }}
          >
            Error
          </button>
        </div>
      </main>
    </div>
  )
}

export default Home
