import { http, HttpResponse, type HttpHandler } from 'msw'

import type { User } from '@/types'

const users: User[] = [
  {
    id: '01J1T0A9MBQFCZP0MBJZJJBJB3',
    fullName: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    createdAt: '2021-01-01T00:00:00.000Z',
  },
]

export const handlers = [
  http.get('/api/users', () => HttpResponse.json(users)),
] satisfies HttpHandler[]
