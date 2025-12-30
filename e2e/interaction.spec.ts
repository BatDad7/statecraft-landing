import { test, expect } from "@playwright/test";

test.describe('Interactive Component Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test('Crisis Simulator vignette transitions correctly', async ({ page }) => {
    const simulator = page.getByText("Domestic Policy Simulator");
    await expect(simulator).toBeVisible();
    
    const vetoButton = page.getByRole("button", { name: "Action: Veto Bill" });
    await expect(vetoButton).toBeVisible();
    await vetoButton.click();

    await expect(page.getByRole("heading", { name: "GRIDLOCK." })).toBeVisible();
    
    const ctaButton = page.getByRole("button", {
      name: "See How Your Students Handle The Pressure",
    });
    await expect(ctaButton).toBeVisible();
  });

  test('Standards Mapper dropdown updates content', async ({ page }) => {
    const select = page.locator('select');
    await expect(select).toBeVisible();
    await select.selectOption('Unit 3');

    const card = page.locator('.max-w-2xl.mx-auto');
    await expect(card).toContainText('Civil Liberties and Civil Rights');
  });

  test('Hamburger menu opens and contains critical links', async ({ page }) => {
    // 1. Find and click hamburger
    const menuButton = page.locator('button[aria-label="Toggle menu"]');
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    // 2. Wait for drawer animation (optional, but good practice)
    await expect(page.getByText("Operations", { exact: true })).toBeVisible();

    // 3. Verify Links exist
    await expect(page.getByText("Daily Intel Brief")).toBeVisible();
    
    // 4. Verify Teacher Login link structure
    const loginLink = page.locator('a:has-text("Instructor Login")');
    await expect(loginLink).toBeVisible();
    await expect(loginLink).toHaveAttribute('href', 'https://www.statecraftsims.com/login');
  });
});
