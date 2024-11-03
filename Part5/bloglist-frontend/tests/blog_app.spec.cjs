const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Blog app', () => {

  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('blogs');
    await expect(locator).toBeVisible();
  });

  test('login form can be opened', async ({ page }) => {
    await page.getByTestId('username').fill('cactus');
    await page.getByTestId('password').fill('sekret');
    await page.getByRole('button', { name: 'login' }).click();

    await expect(page.getByText('cactus logged-in')).toBeVisible();
  });
});