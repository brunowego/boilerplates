import { cookies } from 'next/headers'

import { linkedin } from '@acme/auth/providers'
import { db } from '@acme/db'
import { usersTable } from '@acme/db/schema'
import { eq } from '@acme/db/orm'
import { auth } from '@acme/auth'
import { generateId } from '@acme/id'
import { OAuth2RequestError } from '@acme/auth/lib/arctic'

interface LinkedInUser {
  login: string
  sub: string
  picture: string
  given_name: string
  family_name: string
  email: string
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const storedState = cookies().get('linkedin_oauth_state')?.value ?? null

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    })
  }

  try {
    const tokens = await linkedin.validateAuthorizationCode(code)
    const linkedinUserResponse = await fetch(
      'https://api.linkedin.com/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    )

    const linkedinUser: LinkedInUser = await linkedinUserResponse.json()
    const existingUser = await db.query.usersTable.findFirst({
      where: eq(usersTable.linkedinId, linkedinUser.sub),
    })

    if (existingUser) {
      // @ts-ignore
      const session = await auth.createSession(existingUser.id, {})
      const sessionCookie = auth.createSessionCookie(session.id)

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      )

      return new Response(null, {
        headers: {
          Location: '/auth/redirect',
        },
        status: 302,
      })
    }

    const userId = generateId()

    await db.insert(usersTable).values({
      id: userId,
      email: linkedinUser.email,
      firstName: linkedinUser.given_name,
      lastName: linkedinUser.family_name,
      picture: linkedinUser.picture,
      linkedinId: linkedinUser.sub,
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
        Location: '/auth/redirect',
      },
      status: 302,
    })
  } catch (err) {
    console.error(err)

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
