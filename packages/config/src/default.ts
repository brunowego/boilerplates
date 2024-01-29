export const config = {
  name: 'Acme',

  backendUrl: process.env.ACME_BACKEND_URL ?? 'http://localhost:3000',
  frontendUrl: process.env.ACME_FRONTEND_URL ?? 'http://localhost:4000',

  debug: false,
}

export default config

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

export type Config = DeepPartial<typeof config>
