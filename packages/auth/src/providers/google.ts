import GoogleProvider, { type GoogleProfile } from 'next-auth/providers/google'

export default GoogleProvider({
  profile: (profile: GoogleProfile) => {
    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
      image: profile.picture,
    }
  },
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  allowDangerousEmailAccountLinking: true,
})
