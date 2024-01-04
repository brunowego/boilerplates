import { expect, test } from '@playwright/test'

test('list orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  expect(page.getByRole('cell', { name: 'order-1', exact: true })).toBeVisible()
  expect(
    page.getByRole('cell', { name: 'order-10', exact: true }),
  ).toBeVisible()
})

test('paginate orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Next page' }).click()

  await page.waitForLoadState('networkidle')

  expect(
    page.getByRole('cell', { name: 'order-11', exact: true }),
  ).toBeVisible()
  expect(
    page.getByRole('cell', { name: 'order-20', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Last page' }).click()

  await page.waitForLoadState('networkidle')

  expect(
    page.getByRole('cell', { name: 'order-51', exact: true }),
  ).toBeVisible()
  expect(
    page.getByRole('cell', { name: 'order-60', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Previous page' }).click()

  await page.waitForLoadState('networkidle')

  expect(
    page.getByRole('cell', { name: 'order-41', exact: true }),
  ).toBeVisible()
  expect(
    page.getByRole('cell', { name: 'order-50', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'First page' }).click()

  await page.waitForLoadState('networkidle')

  expect(page.getByRole('cell', { name: 'order-1', exact: true })).toBeVisible()
  expect(
    page.getByRole('cell', { name: 'order-10', exact: true }),
  ).toBeVisible()
})

test('filter by order id', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('Order ID').fill('order-11')
  await page.getByRole('button', { name: 'Filter results' }).click()

  await page.waitForLoadState('networkidle')

  expect(
    page.getByRole('cell', { name: 'order-11', exact: true }),
  ).toBeVisible()
})

test('filter by customer name', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('Client name').fill('Customer 11')
  await page.getByRole('button', { name: 'Filter results' }).click()

  await page.waitForLoadState('networkidle')

  expect(
    page.getByRole('cell', { name: 'order-11', exact: true }),
  ).toBeVisible()
})

test('filter by status', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('combobox').click()
  await page.getByLabel('Pending').click()

  await page.getByRole('button', { name: 'Filter results' }).click()

  await page.waitForLoadState('networkidle')

  const pendingTableRows = await page
    .getByRole('cell', { name: 'Pending' })
    .all()

  expect(pendingTableRows).toHaveLength(10)
})
