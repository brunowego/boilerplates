import ResendProvider from 'next-auth/providers/resend'

export default ResendProvider({
  from: process.env.EMAIL_FROM,
  apiKey: process.env.RESEND_API_KEY,
})
