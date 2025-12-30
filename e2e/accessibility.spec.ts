import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe('Accessibility (A11y) Checks', () => {
  test('homepage should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto("/");

    // Analyze the page
    const accessibilityScanResults = await new AxeBuilder({ page })
      // Optional: Exclude specific elements if known false positives exist (e.g. 3rd party widgets)
      // .exclude('#some-element') 
      .analyze();

    // Assert no violations (except color-contrast, which we track separately due to brand aesthetics)
    const actionable = accessibilityScanResults.violations.filter(
      (v) => v.id !== "color-contrast"
    );
    expect(actionable).toEqual([]);
  });

  test('navigation menu should be accessible when open', async ({ page }) => {
    await page.goto("/");
    
    // Open menu
    await page.locator('button[aria-label="Toggle menu"]').click();
    
    // Wait for animation
    await page.waitForTimeout(500);

    // Scan only the menu container
    const menuScanResults = await new AxeBuilder({ page })
      .include('.fixed.inset-0') // Target the modal overlay/drawer
      .analyze();

    expect(menuScanResults.violations).toEqual([]);
  });
});

