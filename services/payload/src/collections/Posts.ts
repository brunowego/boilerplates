import type { Access, CollectionConfig } from 'payload/types'
import { User } from '../payload-types'

const isAdmin: Access = async ({ req }) => {
  const user = req.user as User | undefined
  return user?.role === 'admin'
}

export default {
  slug: 'posts',
  auth: true,
  fields: [],
} satisfies CollectionConfig
