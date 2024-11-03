const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Blog app', () => {

  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset');
    await request.post('http://localhost:3001/api/users', {
      data: {
        username: 'cactus',
        password: 'sekret'
      }
    });

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

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('cactus');
      await page.getByTestId('password').fill('sekret');
      await page.getByRole('button', { name: 'login' }).click();

      const hideWhenVisibleBlogs = await page.locator('.hideWhenVisible');
      const blogText0 = await hideWhenVisibleBlogs.nth(0).innerText();
      await expect(blogText0).toContain('What is hedgehock');
      const blogText1 = await hideWhenVisibleBlogs.nth(1).innerText();
      await expect(blogText1).toContain('What is xxx');
    });

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('cactus');
      await page.getByTestId('password').fill('wrongpassword');
      await page.getByRole('button', { name: 'login' }).click();
      await expect(page.getByText('wrong credentials')).toBeVisible();
    });
  });

});