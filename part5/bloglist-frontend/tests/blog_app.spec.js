import { test, expect } from '@playwright/test'

test('Fail Loggin',  async({ page }) => {
  await page.goto('http://localhost:5173')


  const textboxes = await page.getByRole('textbox').all()
  await textboxes[0].fill('dang123')
  await textboxes[1].fill('025117461A')

  await page.getByRole('button', { name: 'LOGIN' }).click()
  await expect(page.getByText('wrong user')).toBeVisible()
})

test('Logged',  async({ page }) => {
  await page.goto('http://localhost:5173')


  const textboxes = await page.getByRole('textbox').all()
  await textboxes[0].fill('dang123')
  await textboxes[1].fill('025117461aA')

  await page.getByRole('button', { name: 'LOGIN' }).click()
  await expect(page.getByText('dang123 logged')).toBeVisible()
})





