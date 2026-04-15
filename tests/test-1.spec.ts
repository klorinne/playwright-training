import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await page.getByRole('button', { name: 'Playwright Test' }).click();
  await page.getByRole('link', { name: 'Docs' }).click();
});

test('test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Ambassadors' }).click();
  await page.getByText('Butch Mayhewxss').click();
});