import type { JSX } from 'react'

import AddressForm from './address-form'

export default function SignUp(): JSX.Element {
  return (
    <div className='p-4 lg:px-5'>
      <AddressForm
        address={{
          zipCode: '12345678',
          state: 'SP',
          city: 'São Paulo',
          neighborhood: 'Vila Olímpia',
          street: 'Rua Fidêncio Ramos',
          number: '308',
          reference: 'Ao lado do Shopping Vila Olímpia',
        }}
      />
    </div>
  )
}
