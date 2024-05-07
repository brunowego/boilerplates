import LinkedInProvider, {
  type LinkedInProfile,
} from 'next-auth/providers/linkedin'

export default LinkedInProvider({
  issuer: 'https://www.linkedin.com/oauth',
  profile: (profile: LinkedInProfile) => {
    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
      image: profile.picture,
      // username: profile.email.split('@')[0],
    }
  },
  clientId: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  allowDangerousEmailAccountLinking: true,
})
