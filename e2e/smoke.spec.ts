import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'https://statecraft-landing.vercel.app';

test.describe('Landing Page Smoke Test', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/Statecraft/);
  });

  test('hero section is visible', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('text=Teach Government Through Action')).toBeVisible();
  });

  test('daily intelligence brief section exists', async ({ page }) => {
    await page.goto(BASE_URL);
    // Check for the header text we know exists
    await expect(page.locator('text=Daily Intelligence Brief')).toBeVisible();
  });

  test('critical navigation buttons work', async ({ page }) => {
    await page.goto(BASE_URL);
    const authButton = page.locator('text=AUTHORIZE MISSION ACCESS');
    await expect(authButton).toBeVisible();
    await expect(authButton).toBeEnabled();
  });
});

