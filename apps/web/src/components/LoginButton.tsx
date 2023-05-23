import { Button } from '@mantine/core'
import { IconBrandGoogle } from '@tabler/icons-react'
import { useSession, signOut, signIn } from 'next-auth/react'

const LoginButton = () => {
  const { data: session } = useSession()

  if (session && session.user) {
    return (
      <Button leftIcon={<IconBrandGoogle />} onClick={() => signOut()}>
        Logout
      </Button>
    )
  }

  return (
    <Button leftIcon={<IconBrandGoogle />} onClick={() => signIn('google')}>
      Login with Google
    </Button>
  )
}

export default LoginButton
