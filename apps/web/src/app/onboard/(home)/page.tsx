import type { JSX } from 'react'

import Step from '../components/step'
import UpdateProfile from './components/update-profile'

export default function HomePage(): JSX.Element {
  return (
    <Step step='1/2' title="Let's setup your profile" description='TBD'>
      <UpdateProfile className='mt-8' />
    </Step>
  )
}
