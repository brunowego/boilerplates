import type { EmailConfig } from 'next-auth/providers/email'

import { db } from '@acme/db'
import { eq } from '@acme/db/orm'
import { usersTable } from '@acme/db/schema'
import { sendEmail, MagicLinkEmail } from '@acme/email'

type SendVerificationRequestParams = Parameters<
  EmailConfig['sendVerificationRequest']
>[0]

export default async function sendVerificationRequest({
  identifier: email,
  url: magicLink,
}: SendVerificationRequestParams) {
  const user = await db.query.usersTable.findFirst({
    columns: { emailVerified: true },
    where: eq(usersTable.email, email),
  })

  await sendEmail({
    to: email,
    subject: user?.emailVerified ? 'Sign in to Acme' : 'Welcome to Acme!',
    react: MagicLinkEmail({
      email,
      magicLink,
    }),
  })
}
