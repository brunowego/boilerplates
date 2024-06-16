import GitHubProvider, { type GitHubProfile } from 'next-auth/providers/github'

export default GitHubProvider({
  profile: (profile: GitHubProfile) => {
    return {
      id: profile.id.toString(),
      name: profile.name,
      email: profile.email,
      image: profile.avatar_url,
    }
  },
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  allowDangerousEmailAccountLinking: true,
})
