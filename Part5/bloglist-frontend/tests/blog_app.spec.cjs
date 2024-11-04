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

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('cactus');
      await page.getByTestId('password').fill('sekret');
      await page.getByRole('button', { name: 'login' }).click();
    });

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click();

      const titleInput = page.locator('#title-input');
      const urltInput = page.locator('#url-input');
      const title = 'Test by Playwright';
      await titleInput.fill(title);
      await urltInput.fill('http://example.com');

      await page.getByRole('button', { name: 'save' }).click();
      const hideWhenVisibleBlogs = page.locator('.hideWhenVisible');
      const blogText0 = await hideWhenVisibleBlogs.nth(0).innerText();
      expect(blogText0).toContain(title);
    });

    test('the blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click();

      const titleInput = page.locator('#title-input');
      const urltInput = page.locator('#url-input');
      const title = 'Test by Playwright';
      await titleInput.fill(title);
      await urltInput.fill('http://example.com');

      await page.getByRole('button', { name: 'save' }).click();
      await page.getByTestId('view').click();
      await page.getByTestId('likeBtn').click();

      await page.waitForTimeout(2000);
      expect(await page.getByTestId('likes').innerText()).toContain('1');
    });

    test('the blog can be removed', async ({ page }) => {
      page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.accept();
      });

      await page.getByRole('button', { name: 'new blog' }).click();

      const titleInput = page.locator('#title-input');
      const urltInput = page.locator('#url-input');
      const title = 'Test by Playwright';
      await titleInput.fill(title);
      await urltInput.fill('http://example.com');

      await page.getByRole('button', { name: 'save' }).click();
      await page.waitForTimeout(2000);

      const blogs = page.locator('.blog');
      const count = await blogs.count();
      expect(count).toBeGreaterThan(0);

      await page.getByTestId('view').click();
      await page.getByTestId('remove').click();

      await page.waitForTimeout(1000);
      const blogsAfterDeleting = page.locator('.blog');
      await expect(blogsAfterDeleting).toHaveCount(0);
    });
  })

});