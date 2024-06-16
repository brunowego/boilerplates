import LinkedInProvider, {
  type LinkedInProfile,
} from 'next-auth/providers/linkedin'

export default LinkedInProvider({
  profile: (profile: LinkedInProfile) => {
    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
      image: profile.picture,
    }
  },
  clientId: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  allowDangerousEmailAccountLinking: true,
})
