import { User } from '@prisma/client'

export const users: Pick<User, 'id' | 'email' | 'username'>[] = [
  {
    id: '0f591484-fd1d-4aba-a3c4-5bf1f8cd5351',
    email: 'admin@example.com',
    username: 'admin',
  },
]
