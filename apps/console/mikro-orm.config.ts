import type { Options } from '@mikro-orm/core'
import { type PostgreSqlDriver, defineConfig } from '@mikro-orm/postgresql'
// import { Store } from '@medusajs/store'

import Store from './src/models/store'

const options: Options<PostgreSqlDriver> = {
  clientUrl: 'postgres://acme:acme@localhost:5432/acme',
  entities: [Store],
}

export default defineConfig(options)
