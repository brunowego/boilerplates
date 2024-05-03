import { cookies } from 'next/headers'

import { github } from '@acme/auth/providers'
import { db } from '@acme/db'
import { oauthAccountsTable, usersTable } from '@acme/db/schema'
import { and, eq } from '@acme/db/orm'
import { auth } from '@acme/auth'
import { generateId } from '@acme/id'
import { OAuth2RequestError } from '@acme/auth/lib/arctic'

// https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28
interface GitHubUser {
  login: string
  id: string
  avatar_url: string
  name: string
  email: string
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const storedState = cookies().get('github_oauth_state')?.value ?? null

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    })
  }

  try {
    const tokens = await github.validateAuthorizationCode(code)
    const githubUserResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    })

    const githubUser: GitHubUser = await githubUserResponse.json()
    const existingAccount = await db.query.oauthAccountsTable.findFirst({
      where: and(
        eq(oauthAccountsTable.providerId, 'github'),
        eq(oauthAccountsTable.providerUserId, githubUser.id),
      ),
    })

    if (existingAccount) {
      // @ts-ignore
      const session = await auth.createSession(existingAccount.userId, {})
      const sessionCookie = auth.createSessionCookie(session.id)

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      )

      return new Response(null, {
        headers: {
          Location: '/api/auth/redirect',
        },
        status: 302,
      })
    }

    const existingUser = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, githubUser.email),
    })

    const userId = existingUser?.id ?? generateId()

    await db.transaction(async (tx) => {
      if (!existingUser) {
        await tx.insert(usersTable).values({
          id: userId,
          email: githubUser.email,
          // username: githubUser.login,
          firstName: githubUser.name,
          picture: githubUser.avatar_url,
        })
      }

      await tx.insert(oauthAccountsTable).values({
        providerId: 'github',
        providerUserId: githubUser.id,
        userId,
      })
    })

    // @ts-ignore
    const session = await auth.createSession(userId, {})
    const sessionCookie = auth.createSessionCookie(session.id)

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    )

    return new Response(null, {
      headers: {
        Location: '/api/auth/redirect',
      },
      status: 302,
    })
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(err)
    }

    if (
      err instanceof OAuth2RequestError &&
      err.message === 'bad_verification_code'
    ) {
      return new Response(null, {
        status: 400,
      })
    }

    return new Response(null, {
      status: 500,
    })
  }
}
