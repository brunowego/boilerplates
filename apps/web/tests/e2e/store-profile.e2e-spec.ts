import { expect, test } from '@playwright/test'

test('update restaurant profile successfully', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Pizza Shop' }).click()
  await page.getByRole('menuitem', { name: 'Store profile' }).click()

  await page.getByLabel('Store name').fill('Another Name')
  await page.getByLabel('Description').fill('Another Description')

  await page.getByRole('button', { name: 'Save' }).click()

  await page.waitForLoadState('networkidle')

  const toast = page.getByText('Profile updated successfully!')

  expect(toast).toBeVisible()

  await page.getByRole('button', { name: 'Close' }).click()

  expect(page.getByText('Another Name')).toBeVisible()
})

test('update restaurant profile with error', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Pizza Shop' }).click()
  await page.getByRole('menuitem', { name: 'Store profile' }).click()

  await page.getByLabel('Nome').fill('Invalid name')
  await page.getByLabel('Descrição').fill('Another Description')

  await page.getByRole('button', { name: 'Save' }).click()

  await page.waitForLoadState('networkidle')

  const toast = page.getByText('Failed to update profile, please try again!')

  expect(toast).toBeVisible()

  await page.getByRole('button', { name: 'Close' }).click()

  expect(page.getByText('Invalid name')).not.toBeVisible()
})
