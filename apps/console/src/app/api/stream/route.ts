import Redis from 'ioredis'

import { serverEnv as env } from '@/env/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const setKey = 'users'

const redisSubscriber = new Redis(env.UPSTASH_REDIS_URL)

export async function GET(): Promise<Response> {
  const encoder = new TextEncoder()

  const customReadable = new ReadableStream({
    start(controller) {
      redisSubscriber.subscribe(setKey, (err) => {
        if (err) console.log(err)
      })

      redisSubscriber.on('message', (channel, message) => {
        if (channel === setKey)
          controller.enqueue(encoder.encode(`data: ${message}\n\n`))
      })
    },
  })

  return new Response(customReadable, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache, no-transform',
      'Content-Encoding': 'none',
    },
  })
}
