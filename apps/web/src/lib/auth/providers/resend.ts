import ResendProvider from 'next-auth/providers/resend'

export default ResendProvider({
  from: process.env.EMAIL_FROM,
  apiKey: process.env.RESEND_API_KEY,
})

// https://github.com/Dercraker/Motdle/blob/develop/src/lib/auth/getNextAuthConfigProvider.ts
// https://github.com/tanguyMichardiere/wishgrid
// https://github.com/Zac-Zajdel/jottings/blob/main/auth.ts
