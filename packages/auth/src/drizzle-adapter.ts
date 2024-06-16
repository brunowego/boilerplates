import type {
  Adapter,
  AdapterUser,
  AdapterAccount,
  AdapterSession,
} from 'next-auth/adapters'

import { type PostgresJsDatabase, eq, and } from '@acme/db/orm'
import { usersTable, accountsTable, sessionsTable } from '@acme/db/schema'
import { generateId } from '@acme/id'

export default function DrizzleAdapter(db: PostgresJsDatabase): Adapter {
  return {
    // @ts-ignore
    async createUser(data: AdapterUser) {
      return await db.transaction(async (tx) => {
        try {
          return await tx
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
        } catch (err) {
          tx.rollback()

          throw err
        }
      })
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

    // @ts-ignore
    async createSession(data: {
      sessionToken: string
      userId: string
      expires: Date
    }) {
      return db
        .insert(sessionsTable)
        .values(data)
        .returning()
        .then((res) => res[0])
    },

    // @ts-ignore
    async getSessionAndUser(sessionToken: string) {
      return db
        .select({
          session: sessionsTable,
          user: usersTable,
        })
        .from(sessionsTable)
        .where(eq(sessionsTable.sessionToken, sessionToken))
        .innerJoin(usersTable, eq(usersTable.id, sessionsTable.userId))
        .then((res) => (res.length > 0 ? res[0] : null))
    },

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

    async updateSession(
      data: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>,
    ) {
      return db
        .update(sessionsTable)
        .set(data)
        .where(eq(sessionsTable.sessionToken, data.sessionToken))
        .returning()
        .then((res) => res[0])
    },

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

    async deleteUser(id: string) {
      await db.delete(usersTable).where(eq(usersTable.id, id))
    },

    async deleteSession(sessionToken: string) {
      await db
        .delete(sessionsTable)
        .where(eq(sessionsTable.sessionToken, sessionToken))
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
