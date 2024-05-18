import type { JSX } from 'react'

import Step from '../components/step'
import SetUserPassword from './components/set-user-password'

export default function PasswordPage(): JSX.Element {
  return (
    <Step step='2/2' title='Set a secure password' description='TBD'>
      <SetUserPassword className='mt-8' />
    </Step>
  )
}
