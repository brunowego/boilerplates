import type { Adapter, AdapterUser, AdapterAccount } from 'next-auth/adapters'

import type { Db } from '@acme/db/types'
import { users, accounts, memberships, workspaces } from '@acme/db/schema'
import { eq, and } from '@acme/db/orm'

export default function DrizzleAdapter(db: Db): Adapter {
  return {
    async createUser(data: AdapterUser): Promise<AdapterUser> {
      return await db.transaction(async (tx) => {
        try {
          return (await db
            .insert(users)
            .values({
              fullName: data.name as string,
              email: data.email,
              emailVerified: data.emailVerified,
              image: data.image,
            })
            .returning()
            .then((res) => res[0])) as AdapterUser
        } catch (err) {
          tx.rollback()

          throw err
        }
      })
    },

    async getUser(id: string): Promise<AdapterUser | null> {
      return (await db.query.users.findFirst({
        columns: {
          id: true,
          fullName: true,
          email: true,
          emailVerified: true,
          image: true,
        },
        // with: {
        //   workspaces: {
        //     columns: {
        //       workspaceId: true,
        //     },
        //     with: {
        //       workspace: {
        //         columns: {
        //           current: true,
        //         },
        //       },
        //     },
        //   },
        // },
        where: eq(users.id, id),
      })) as AdapterUser | null
    },

    async getUserByEmail(email: string): Promise<AdapterUser | null> {
      return (await db.query.users.findFirst({
        columns: {
          id: true,
          fullName: true,
          email: true,
          emailVerified: true,
          image: true,
        },
        // with: {
        //   workspaces: {
        //     columns: {
        //       workspaceId: true,
        //     },
        //     with: {
        //       workspace: {
        //         columns: {
        //           current: true,
        //         },
        //       },
        //     },
        //   },
        // },
        where: eq(users.email, email),
      })) as AdapterUser | null
    },

    async updateUser(data: Partial<AdapterUser> & Pick<AdapterUser, 'id'>) {
      if (!data.id) {
        throw new Error('No user id.')
      }

      const [result] = await db
        .update(users)
        .set(data)
        .where(eq(users.id, data.id))
        .returning()

      if (!result) {
        throw new Error('No user found.')
      }

      return result
    },

    async linkAccount(data: AdapterAccount) {
      await db.insert(accounts).values({
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
      })
    },

    async getUserByAccount(
      account: Pick<AdapterAccount, 'provider' | 'providerAccountId'>,
    ): Promise<AdapterUser | null> {
      const result = await db
        .select({
          account: {
            id: accounts.type,
          },
          user: {
            id: users.id,
            email: users.email,
            emailVerified: users.emailVerified,
            image: users.image,
          },
          workspace: { id: workspaces.id },
        })
        .from(accounts)
        .innerJoin(users, eq(accounts.userId, users.id))
        .innerJoin(memberships, eq(users.id, memberships.userId))
        .innerJoin(
          workspaces,
          and(
            eq(memberships.workspaceId, workspaces.id),
            eq(workspaces.current, true),
          ),
        )
        .where(
          and(
            eq(accounts.provider, account.provider),
            eq(accounts.providerAccountId, account.providerAccountId),
          ),
        )
        .then((res) => {
          const result = res[0]

          return {
            user: {
              id: result?.user.id as string,
              email: result?.user.email as string,
              emailVerified: result?.user.emailVerified as Date,
              image: result?.user.image as string,
              workspaceId: result?.workspace.id,
            },
            account: result?.account,
          }
        })

      return result?.user ?? null
    },

    async deleteUser(id: string) {
      await db.delete(users).where(eq(users.id, id))
    },

    async unlinkAccount(
      params: Pick<AdapterAccount, 'provider' | 'providerAccountId'>,
    ) {
      await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.provider, params.provider),
            eq(accounts.providerAccountId, params.providerAccountId),
          ),
        )
    },
  }
}
