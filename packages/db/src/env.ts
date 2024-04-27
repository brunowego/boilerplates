import { object, optional, enum_, string, url, minLength, parse } from 'valibot'

import { Environment } from './types'

const envSchema = object({
  NODE_ENV: optional(enum_(Environment), Environment.development),
  DATABASE_URL: string([url(), minLength(1)]),
})

export const env = parse(envSchema, process.env)
