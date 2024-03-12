import { auth } from '@/lib/auth'
import { isWithinExpirationDate } from 'oslo'
import { db } from '@/lib/db'
import { getCachedSession } from '@/lib/auth/session'

const invalidCodeMsg = 'Invalid or expired verification code!'

type Context = { params: { code: string } }

export async function GET(_: Request, { params }: Context): Promise<Response> {
  const code = params.code

  const { user } = await getCachedSession()

  if (!user) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  if (typeof code !== 'string' || code.length !== 8) {
    return new Response(invalidCodeMsg, {
      status: 400,
    })
  }

  await db.transaction().execute(async (tx) => {
    const emailVerification = await tx
      .selectFrom('email_verification as ev')
      .where('ev.userId', '=', user.id)
      .selectAll()
      .executeTakeFirst()

    if (emailVerification) {
      await tx
        .deleteFrom('email_verification as ev')
        .where('ev.id', '=', emailVerification.id)
        .execute()
    }

    if (
      !emailVerification ||
      emailVerification.code !== code ||
      !isWithinExpirationDate(emailVerification.expiresAt) ||
      user.email !== emailVerification.email
    ) {
      return new Response(invalidCodeMsg, {
        status: 400,
      })
    }
  })

  await auth.invalidateUserSessions(user.id)

  await db
    .updateTable('user')
    .set({ emailVerified: true })
    .where('user.id', '=', user.id)
    .execute()

  const session = await auth.createSession(user.id, {})
  const sessionCookie = auth.createSessionCookie(session.id)

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/api/auth/redirect',
      'Set-Cookie': sessionCookie.serialize(),
    },
  })
}
