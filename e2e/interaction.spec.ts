import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'https://statecraft-landing.vercel.app';

test.describe('Interactive Component Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('Crisis Simulator vignette transitions correctly', async ({ page }) => {
    const simulator = page.locator('.relative.rounded-xl.border.border-slate-700');
    await expect(simulator).toContainText('Domestic Policy Simulator');
    
    const vetoButton = simulator.locator('button', { hasText: 'Action: Veto Bill' });
    await expect(vetoButton).toBeVisible();
    await vetoButton.click();

    await expect(simulator).toContainText('GRIDLOCK.');
    
    const ctaButton = simulator.locator('button', { hasText: 'See How Your Students Handle The Pressure' });
    await expect(ctaButton).toBeVisible();
  });

  test('Standards Mapper dropdown updates content', async ({ page }) => {
    const select = page.locator('select');
    await expect(select).toBeVisible();
    await select.selectOption('Unit 3');

    const card = page.locator('.max-w-2xl.mx-auto');
    await expect(card).toContainText('Civil Liberties and Civil Rights');
  });

  test('Tactical Menu opens and contains critical links', async ({ page }) => {
    // 1. Find and click hamburger
    const menuButton = page.locator('button[aria-label="Open Tactical Menu"]');
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    // 2. Wait for drawer animation (optional, but good practice)
    // We check for the header text inside the drawer
    // Using getByText to avoid XPath confusion with the "//" characters
    const drawerHeader = page.getByText('// Classified Access');
    await expect(drawerHeader).toBeVisible();

    // 3. Verify Links exist
    await expect(page.locator('text=Daily Intel Brief')).toBeVisible();
    
    // 4. Verify Teacher Login link structure
    const loginLink = page.locator('a:has-text("Teacher Login")');
    await expect(loginLink).toBeVisible();
    await expect(loginLink).toHaveAttribute('href', 'https://www.statecraftsims.com/login');
  });
});
