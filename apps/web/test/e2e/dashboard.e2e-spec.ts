import { expect, test } from '@playwright/test'

test.describe('Dashboard Page', () => {
  test('display month total revenue metric', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    expect(page.getByText('$ 4,523,189', { exact: true })).toBeVisible()
    expect(page.getByText('+20.1% from last month')).toBeVisible()
  })
})
