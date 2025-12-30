import { test, expect } from "@playwright/test";

test.describe('Landing Page Smoke Test', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Statecraft/);
  });

  test('hero section is visible', async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByText("Teach Government Through Action.", { exact: true })
    ).toBeVisible();
  });

  test('daily intelligence brief section exists (AP Gov)', async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#dynamic-intel-feed")).toBeVisible();
    await expect(page.locator("#dynamic-headline")).toBeVisible();
    await expect(page.locator("#dynamic-date")).toBeVisible();
    await expect(page.locator("#dynamic-activity")).toBeVisible();
  });

  test('critical navigation buttons work', async ({ page }) => {
    await page.goto("/");
    const authButton = page.getByText("AUTHORIZE MISSION ACCESS", { exact: true });
    await expect(authButton).toBeVisible();
    await expect(authButton).toBeEnabled();
  });
});

