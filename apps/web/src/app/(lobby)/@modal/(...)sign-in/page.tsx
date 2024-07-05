import type { JSX } from 'react'

// import { auth } from '@acme/auth'

// import RouterModal from '@/components/router-modal'

import SignInModal from './components/sign-in-modal'

export default async function Login(): Promise<JSX.Element> {
  // const session = await auth()

  return <SignInModal />
}
