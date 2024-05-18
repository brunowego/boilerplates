import type { Provider } from 'next-auth/providers'

import sendVerificationRequest from '../lib/send-verification-request'

const HttpEmailProvider: Provider = {
  id: 'http-email',
  type: 'email',
  name: 'HTTP Email',
  from: process.env.EMAIL_FROM as string,
  maxAge: 24 * 60 * 60,
  sendVerificationRequest,
  options: {},
}

export default HttpEmailProvider
