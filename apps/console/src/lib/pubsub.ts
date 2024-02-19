import Redis from 'ioredis'

import { serverEnv as env } from '@/env/server'

export const pubsub = new Redis(env.UPSTASH_REDIS_URL)
