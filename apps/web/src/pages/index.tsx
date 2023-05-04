import useUser from '../hooks/user.hook'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Meta from '../components/Meta'
import { Container } from '@mantine/core'

export default function Home() {
  const { refreshUser } = useUser()
  const router = useRouter()

  // If the user is already logged in, redirect to the upload page
  useEffect(() => {
    refreshUser().then((user) => {
      if (user) {
        router.replace('/upload')
      }
    })
  }, [])

  return (
    <>
      <Meta title="Home" />

      <Container />
    </>
  )
}
