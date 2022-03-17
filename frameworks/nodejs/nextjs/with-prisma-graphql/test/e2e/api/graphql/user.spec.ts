import { test, expect } from '@playwright/test'

test('get multiple users', async ({ request }) => {
  const response = await request.post('/api/graphql', {
    data: {
      query: `{
        users {
          edges {
            node {
              id
            }
          }
        }
      }`,
    },
  })
  const result = await response.json()

  expect(result.data.users.edges.length).toBe(1)
})

test('get single user', async ({ request }) => {
  const response = await request.post('/api/graphql', {
    data: {
      query: `{
        user(id: "0f591484-fd1d-4aba-a3c4-5bf1f8cd5351") {
          username
        }
      }`,
    },
  })
  const result = await response.json()

  expect(result.data.user.username).toBe('admin')
})

test('should edit username', async ({ request }) => {
  const response = await request.post('/api/graphql', {
    data: {
      query: `mutation {
        editUser(input: {
          id: "0f591484-fd1d-4aba-a3c4-5bf1f8cd5351",
          username: "superuser"
        }) {
          username
        }
      }`,
    },
  })
  const result = await response.json()

  expect(result.data.editUser.username).toBe('superuser')
})

test('should delete user', async ({ request }) => {
  const response = await request.post('/api/graphql', {
    data: {
      query: `mutation {
        deleteUser(input: { id: "0f591484-fd1d-4aba-a3c4-5bf1f8cd5351" })
      }`,
    },
  })
  const result = await response.json()

  expect(result.data.deleteUser).toBe('SUCCESS')
})
