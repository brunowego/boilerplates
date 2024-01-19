const dotenv = require('dotenv')

dotenv.config()

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `@medusajs/file-local`,
    /** @type {import('@medusajs/file-local').PluginOptions} */
    options: {
      upload_dir: 'uploads',
    },
  },
]

const REDIS_URL = process.env.REDIS_URL

const modules = {
  eventBus: {
    resolve: '@medusajs/event-bus-redis',
    options: {
      redisUrl: REDIS_URL,
    },
  },
  cacheService: {
    resolve: '@medusajs/cache-redis',
    options: {
      redisUrl: REDIS_URL,
    },
  },
}

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  store_cors: process.env.STORE_CORS,
  database_url: process.env.DATABASE_URL,
  admin_cors: process.env.ADMIN_CORS,
  redis_url: REDIS_URL,
}

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules,
}
