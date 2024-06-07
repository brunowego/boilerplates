import { cookies } from 'next/headers'
import { OAuth2RequestError } from 'arctic'

import { github } from '@acme/auth/providers'
import { findUserByGithubId, createUser } from '@acme/db/queries'
import { generateId } from '@acme/id'
import { auth } from '@acme/auth'

// https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28
interface GitHubUser {
  login: string
  id: number
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
    const existingUser = await findUserByGithubId(githubUser.id)

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
          Location: '/',
        },
        status: 302,
      })
    }

    const userId = generateId()

    await createUser({
      id: userId,
      email: githubUser.email,
      // username: githubUser.login,
      firstName: githubUser.name,
      picture: githubUser.avatar_url,
      githubId: githubUser.id,
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
        Location: '/',
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
