export interface User {
  id: string
  products?: (string | Product)[] | null
  avatar?: string | Media | null
  role: 'admin' | 'user'
  updatedAt: string
  createdAt: string
  email: string
  resetPasswordToken?: string | null
  resetPasswordExpiration?: string | null
  salt?: string | null
  hash?: string | null
  _verified?: boolean | null
  _verificationToken?: string | null
  loginAttempts?: number | null
  lockUntil?: string | null
  password: string | null
}

export interface Media {
  id: string
  user?: (string | null) | User
  updatedAt: string
  createdAt: string
  url?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
  width?: number | null
  height?: number | null
  sizes?: {
    thumbnail?: {
      url?: string | null
      width?: number | null
      height?: number | null
      mimeType?: string | null
      filesize?: number | null
      filename?: string | null
    }
    card?: {
      url?: string | null
      width?: number | null
      height?: number | null
      mimeType?: string | null
      filesize?: number | null
      filename?: string | null
    }
    tablet?: {
      url?: string | null
      width?: number | null
      height?: number | null
      mimeType?: string | null
      filesize?: number | null
      filename?: string | null
    }
  }
}

export interface Post {
  id: string
  title: string
  subtext: string
  mainPhoto: string | Media
  updatedAt: string
  createdAt: string
}

export interface Team {
  id: string
  name: string
  position: string
  mainPhoto: string | Media
  updatedAt: string
  createdAt: string
}

export interface Product {
  id: string
  user?: (string | null) | User
  title: string
  price: number
  description: string
  features?:
    | {
        feature: string
        id?: string | null
      }[]
    | null
  priceId?: string | null
  stripeId?: string | null
  updatedAt: string
  createdAt: string
}

export interface Order {
  id: string
  _isPaid: boolean
  user: string | User
  products: (string | Product)[]
  updatedAt: string
  createdAt: string
}

export interface PayloadPreference {
  id: string
  user: {
    relationTo: 'users'
    value: string | User
  }
  key?: string | null
  value?:
    | {
        [k: string]: unknown
      }
    | unknown[]
    | string
    | number
    | boolean
    | null
  updatedAt: string
  createdAt: string
}

export interface PayloadMigration {
  id: string
  name?: string | null
  batch?: number | null
  updatedAt: string
  createdAt: string
}

export interface Config {
  collections: {
    users: User
    media: Media
    posts: Post
    team: Team
    products: Product
    orders: Order
    'payload-preferences': PayloadPreference
    'payload-migrations': PayloadMigration
  }
  // biome-ignore lint/complexity/noBannedTypes: This is a generated type
  globals: {}
}

declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}
