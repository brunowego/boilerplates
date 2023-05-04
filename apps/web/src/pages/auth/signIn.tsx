import { LoadingOverlay } from '@mantine/core'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SignInForm from '../../components/auth/SignInForm'
import Meta from '../../components/Meta'
import useUser from '../../hooks/user.hook'

export function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: { redirectPath: context.query.redirect ?? null },
  }
}

const SignIn = ({ redirectPath }: { redirectPath?: string }) => {
  const { refreshUser } = useUser()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(redirectPath ? true : false)

  useEffect(() => {
    refreshUser().then((user) => {
      if (user) {
        router.replace(redirectPath ?? '/upload')
      } else {
        setIsLoading(false)
      }
    })
  }, [])

  if (isLoading) return <LoadingOverlay overlayOpacity={1} visible />

  return (
    <>
      <Meta title="Sign In" />

      <SignInForm redirectPath={redirectPath ?? '/upload'} />
    </>
  )
}
export default SignIn
