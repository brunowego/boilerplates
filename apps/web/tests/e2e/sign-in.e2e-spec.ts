import { expect, test } from '@playwright/test'

test('sign in successfully', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Your email').fill('john.doe@example.tld')
  await page.getByRole('button', { name: 'Access dashboard' }).click()

  const toast = page.getByText('We send an authentication link to your email.')

  expect(toast).toBeVisible()
})

test('sign in with wrong credentials', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Your email').fill('wrong@example.tld')
  await page.getByRole('button', { name: 'Access dashboard' }).click()

  const toast = page.getByText('Invalid credentials')

  expect(toast).toBeVisible()
})

test('navigate to new restaurant page', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'New establishment' }).click()

  expect(page.url()).toContain('/sign-up')
})
