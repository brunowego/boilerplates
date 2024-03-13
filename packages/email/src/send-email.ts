import type { CreateEmailOptions } from './type'
import { Resend } from 'resend'

const defaultOptions = {
  from: process.env.SMTP_FROM as string,
} satisfies Pick<CreateEmailOptions, 'from'>

type CreateEmailOptionsWithoutFrom = Omit<CreateEmailOptions, 'from'>

export async function sendEmail({
  ...options
}: Partial<CreateEmailOptionsWithoutFrom>) {
  const payload = {
    ...defaultOptions,
    ...options,
  } as CreateEmailOptions

  const resend = new Resend(process.env.RESEND_API_KEY)

  return await resend.emails.send(payload)
}

export type { CreateEmailOptionsWithoutFrom as CreateEmailOptions }
