import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const BASE_URL = process.env.BASE_URL || 'https://statecraft-landing.vercel.app';

test.describe('Accessibility (A11y) Checks', () => {
  test('homepage should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto(BASE_URL);

    // Analyze the page
    const accessibilityScanResults = await new AxeBuilder({ page })
      // Optional: Exclude specific elements if known false positives exist (e.g. 3rd party widgets)
      // .exclude('#some-element') 
      .analyze();

    // Assert no violations
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('navigation menu should be accessible when open', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Open menu
    await page.locator('button[aria-label="Open Tactical Menu"]').click();
    
    // Wait for animation
    await page.waitForTimeout(500);

    // Scan only the menu container
    const menuScanResults = await new AxeBuilder({ page })
      .include('.fixed.inset-0') // Target the modal overlay/drawer
      .analyze();

    expect(menuScanResults.violations).toEqual([]);
  });
});

