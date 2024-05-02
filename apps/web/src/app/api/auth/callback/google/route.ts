import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { google } from '@acme/auth/providers'
import { db } from '@acme/db'
import { oauthAccountsTable, usersTable } from '@acme/db/schema'
import { and, eq } from '@acme/db/orm'
import { auth } from '@acme/auth'
import { generateId } from '@acme/id'
import { OAuth2RequestError } from '@acme/auth/lib/arctic'

interface GoogleUser {
  id: string
  picture: string
  email: string
  given_name: string
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const storedState = cookies().get('google_oauth_state')?.value ?? null
  const storedCodeVerifier =
    cookies().get('google_oauth_code_verifier')?.value ?? null

  if (
    !code ||
    !state ||
    !storedState ||
    state !== storedState ||
    !storedCodeVerifier
  ) {
    return new Response(null, {
      status: 400,
    })
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      storedCodeVerifier,
    )

    const googleUserResponse = await fetch(
      'https://www.googleapis.com/oauth2/v1/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    )

    const googleUser: GoogleUser = await googleUserResponse.json()
    const existingAccount = await db.query.oauthAccountsTable.findFirst({
      where: and(
        eq(oauthAccountsTable.providerId, 'google'),
        eq(oauthAccountsTable.providerUserId, googleUser.id),
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
      where: eq(usersTable.email, googleUser.email),
    })

    const userId = existingUser?.id ?? generateId()

    await db.transaction(async (tx) => {
      if (!existingUser) {
        await tx.insert(usersTable).values({
          id: userId,
          email: googleUser.email,
          firstName: googleUser.given_name,
          picture: googleUser.picture,
        })
      }

      await tx.insert(oauthAccountsTable).values({
        providerId: 'google',
        providerUserId: googleUser.id,
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
