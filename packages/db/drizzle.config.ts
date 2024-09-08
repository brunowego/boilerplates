import type { Config } from 'drizzle-kit'

export default {
  dialect: 'postgresql',
  out: './src/migrations',
  schema: './src/schema.ts',
  // migrations: {
  //   table: 'migrations',
  //   schema: 'public',
  // },
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
} satisfies Config
