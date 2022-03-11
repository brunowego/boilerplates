import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'

test.describe('Posts', () => {
  let id: string | undefined

  test('should get multiple posts', async ({ request }) => {
    const response = await request.get('/api/v1/posts')
    const result = await response.json()

    expect(response.status()).toBe(200)
    expect(result.total).toBeGreaterThanOrEqual(10)
    expect(result.maxPages).toBeGreaterThanOrEqual(2)
    expect(result.posts.length).toBeGreaterThanOrEqual(5)
  })

  test('should create an post', async ({ request }) => {
    const response = await request.post('/api/v1/posts', {
      data: {
        title: faker.company.companyName(),
        body: faker.lorem.paragraphs(2),
      },
    })

    expect(response.ok()).toBe(true)

    const body = await response.json()

    expect(body).toBeTruthy()

    id = body.id
  })

  test('should update an post', async ({ request }) => {
    const response = await request.put(`/api/v1/posts/${id}`, {
      data: {
        title: faker.company.companyName(),
        body: faker.lorem.paragraphs(2),
      },
    })

    expect(response.status()).toBe(201)
  })

  test('should remove an post', async ({ request }) => {
    const response = await request.delete(`/api/v1/posts/${id}`)

    expect(response.status()).toBe(204)
  })
})
