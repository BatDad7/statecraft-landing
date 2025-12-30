import { test, expect } from "@playwright/test";

test.describe("Hamburger anchors (no-dead-links)", () => {
  test("AP Gov: Testimonials anchor exists", async ({ page }) => {
    await page.goto("/");
    await page.locator('button[aria-label="Toggle menu"]').click();
    await page.getByText("Testimonials", { exact: true }).click();
    await expect(page).toHaveURL(/#testimonials$/);
    await expect(
      page.getByText("Simulated Politics. Real", { exact: false })
    ).toBeVisible();
  });

  test("Gov 2.0: Daily Policy Brief + Pedagogical Efficacy anchors exist", async ({
    page,
  }) => {
    await page.goto("/higher-ed");
    await page.locator('button[aria-label="Toggle menu"]').click();
    await page.getByText("Daily Policy Brief", { exact: true }).click();
    await expect(page).toHaveURL(/#daily-intel-brief$/);
    await expect(page.getByText("Daily Policy Briefing")).toBeVisible();

    await page.locator('button[aria-label="Toggle menu"]').click();
    await page
      .getByRole("link", { name: "Pedagogical Efficacy", exact: true })
      .click();
    await expect(page).toHaveURL(/#pedagogical-efficacy$/);
    await expect(
      page.getByRole("heading", { name: "Pedagogical Efficacy", exact: true })
    ).toBeVisible();
  });
});


