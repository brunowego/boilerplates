import type {
  Adapter,
  AdapterUser,
  // AdapterSession,
  AdapterAccount,
  VerificationToken,
} from 'next-auth/adapters'

import { type PostgresJsDatabase, and, eq } from '@acme/db/orm'
import {
  usersTable,
  // sessionsTable,
  accountsTable,
  verificationTokensTable,
} from '@acme/db/schema'

import { generateId } from '@acme/id'

// declare module 'next-auth' {
//   interface User {
//     id: string
//   }
// }

// declare module 'next-auth/adapters' {
//   interface AdapterUser {
//     id: string
//   }
// }

// type CustomAdapter = Omit<Adapter, 'createUser'> & {
//   createUser: (
//     user: Omit<AdapterUser & { username: string }, 'id'>,
//   ) => Awaitable<AdapterUser & { username: string }>
// }

export default function DrizzleAdapter(db: PostgresJsDatabase): Adapter {
  return {
    // @ts-ignore
    async createUser(data: AdapterUser) {
      return db
        .insert(usersTable)
        .values({
          // @ts-ignore
          id: generateId() || null,
          fullName: data.name,
          email: data.email,
          emailVerified: data.emailVerified,
          image: data.image,
        })
        .returning()
        .then((res) => res[0])
    },

    // @ts-ignore
    async getUser(userId: string) {
      return db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, userId))
        .then((res) => (res.length > 0 ? res[0] : null))
    },

    // @ts-ignore
    async getUserByEmail(email: string) {
      return db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .then((res) => (res.length > 0 ? res[0] : null))
    },

    // async createSession(data: {
    //   sessionToken: string
    //   userId: string
    //   expires: Date
    // }) {
    //   return db
    //     .insert(sessionsTable)
    //     .values(data)
    //     .returning()
    //     .then((res) => res[0])
    // },

    // async getSessionAndUser(sessionToken: string) {
    //   return db
    //     .select({
    //       session: sessionsTable,
    //       user: usersTable,
    //     })
    //     .from(sessionsTable)
    //     .where(eq(sessionsTable.sessionToken, sessionToken))
    //     .innerJoin(usersTable, eq(usersTable.id, sessionsTable.userId))
    //     .then((res) => (res.length > 0 ? res[0] : null))
    // },

    async updateUser(data: Partial<AdapterUser> & Pick<AdapterUser, 'id'>) {
      if (!data.id) {
        throw new Error('No user id.')
      }

      const [result] = await db
        .update(usersTable)
        .set(data)
        .where(eq(usersTable.id, data.id))
        .returning()

      if (!result) {
        throw new Error('No user found.')
      }

      return result
    },

    // async updateSession(
    //   data: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>,
    // ) {
    //   return db
    //     .update(sessionsTable)
    //     .set(data)
    //     .where(eq(sessionsTable.sessionToken, data.sessionToken))
    //     .returning()
    //     .then((res) => res[0])
    // },

    async linkAccount(data: AdapterAccount) {
      await db.insert(accountsTable).values({
        userId: data.userId,
        type: data.type,
        provider: data.provider,
        providerAccountId: data.providerAccountId,
        refreshToken: data.refresh_token,
        accessToken: data.access_token,
        expiresAt: data.expires_at,
        tokenType: data.token_type,
        scope: data.scope,
        idToken: data.id_token,
        // sessionState: data.session_state,
      })
    },

    async getUserByAccount(
      account: Pick<AdapterAccount, 'provider' | 'providerAccountId'>,
    ) {
      const result = await db
        .select({
          account: accountsTable,
          user: usersTable,
        })
        .from(accountsTable)
        .innerJoin(usersTable, eq(accountsTable.userId, usersTable.id))
        .where(
          and(
            eq(accountsTable.provider, account.provider),
            eq(accountsTable.providerAccountId, account.providerAccountId),
          ),
        )
        .then((res) => res[0])

      return result?.user ?? null
    },

    // async deleteSession(sessionToken: string) {
    //   await db
    //     .delete(sessionsTable)
    //     .where(eq(sessionsTable.sessionToken, sessionToken))
    // },

    async createVerificationToken(data: VerificationToken) {
      return db
        .insert(verificationTokensTable)
        .values(data)
        .returning()
        .then((res) => res[0])
    },

    // @ts-ignore
    async useVerificationToken(params: { identifier: string; token: string }) {
      return db
        .delete(verificationTokensTable)
        .where(
          and(
            eq(verificationTokensTable.identifier, params.identifier),
            eq(verificationTokensTable.token, params.token),
          ),
        )
        .returning()
        .then((res) => (res.length > 0 ? res[0] : null))
    },

    async deleteUser(id: string) {
      await db.delete(usersTable).where(eq(usersTable.id, id))
    },

    async unlinkAccount(
      params: Pick<AdapterAccount, 'provider' | 'providerAccountId'>,
    ) {
      await db
        .delete(accountsTable)
        .where(
          and(
            eq(accountsTable.provider, params.provider),
            eq(accountsTable.providerAccountId, params.providerAccountId),
          ),
        )
    },
  }
}
