import { test, expect } from '@playwright/test'

test.describe('GET /api/health-check', () => {
  test('health-check should return 200', async ({ request }) => {
    const response = await request.get('/api/health-check')
    const result = await response.json()

    expect(response.status()).toBe(200)
    expect(result.status).toBe('OK')
  })
})
