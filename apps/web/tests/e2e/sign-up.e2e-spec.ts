import { expect, test } from '@playwright/test'

test('sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Business name').fill('Pizza Shop')
  await page.getByLabel('Your name').fill('John Doe')
  await page.getByLabel('Your email').fill('john.doe@example.tld')
  await page.getByLabel('Cell phone').fill('4799928273')

  await page.getByRole('button', { name: 'Finish' }).click()

  const toast = page.getByText('Registered restaurant!')

  expect(toast).toBeVisible()

  await page.getByRole('button', { name: 'Login' }).click()

  expect(page.url()).toContain(`/sign-in?email=john.doe@example.tld`)
})

test('sign up with error', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Business name').fill('Invalid name')
  await page.getByLabel('Your name').fill('John Doe')
  await page.getByLabel('Your email').fill('john.doe@example.tld')
  await page.getByLabel('Cell phone').fill('4799928273')

  await page.getByRole('button', { name: 'Finish' }).click()

  const toast = page.getByText('Erro ao registrar restaurante!')

  expect(toast).toBeVisible()
})
