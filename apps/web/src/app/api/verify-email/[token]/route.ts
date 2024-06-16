import { db, eq, verificationTokensTable, usersTable } from '@acme/db'

async function handleError({ error, token }: { error: string; token: string }) {
  await db
    .delete(verificationTokensTable)
    .where(eq(verificationTokensTable.token, token))
    .execute()

  return new Response(error, {
    status: 400,
  })
}

export async function GET(
  _: Request,
  { params }: { params: { token: string } },
) {
  const { token } = params

  try {
    const verificationToken = await db.query.verificationTokensTable.findFirst({
      where: eq(verificationTokensTable.token, token),
    })

    if (!verificationToken) {
      return handleError({ error: 'Invalid verification token', token })
    }

    if (verificationToken.expiresAt < new Date()) {
      return handleError({ error: 'Verification token has expired', token })
    }

    const user = await db.query.usersTable.findFirst({
      columns: {
        id: true,
        emailVerified: true,
      },
      where: eq(usersTable.email, verificationTokensTable.identifier),
    })

    if (!user) {
      return handleError({
        error: `Could not find user with email address ${verificationTokensTable.identifier}`,
        token,
      })
    }

    if (user.emailVerified) {
      return handleError({ error: 'Email address is already verified', token })
    }

    db.transaction(async (tx) => {
      await tx
        .update(usersTable)
        .set({ emailVerified: new Date() })
        .where(eq(usersTable.id, user.id))

      await tx
        .delete(verificationTokensTable)
        .where(eq(verificationTokensTable.token, token))
    })

    return new Response(null, {
      status: 200,
    })
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(err)
    }

    return new Response(null, {
      status: 500,
    })
  }
}
