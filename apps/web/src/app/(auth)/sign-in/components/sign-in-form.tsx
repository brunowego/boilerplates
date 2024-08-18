import type { JSX } from 'react'

import Label from '@acme/ui/components/label'
import { AtSign } from '@acme/ui/components/icon'
import Input from '@acme/ui/components/input'

export default function SignInForm(): JSX.Element {
  return (
    <form>
      <div>
        <Label className='sr-only'>Email</Label>

        <div className='relative flex'>
          <AtSign className='absolute left-3.5 size-4 self-center' />

          <Input className='pl-10' placeholder='Your email...' />
        </div>
      </div>
    </form>
  )
}
