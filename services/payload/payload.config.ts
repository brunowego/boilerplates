import { buildConfig } from 'payload/config'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'node:path'

import { Posts } from './src/collections'

const { DATABASE_URI } = process.env

export default buildConfig({
  admin: {
    bundler: webpackBundler(),
  },
  collections: [Posts],
  db: mongooseAdapter({
    url: DATABASE_URI,
  }),
  editor: slateEditor({}),
  typescript: {
    outputFile: path.resolve(__dirname, 'src/payload-types.ts'),
  },
})
