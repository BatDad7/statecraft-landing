import { defineConfig, devices } from "@playwright/test";

const baseURL =
  process.env.BASE_URL?.replace(/\/+$/, "") || "http://localhost:3000";

const isLocalBaseUrl =
  baseURL.includes("localhost") || baseURL.includes("127.0.0.1");

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  expect: { timeout: 10_000 },
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : [["list"]],
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  // If running against localhost, start a server automatically.
  ...(isLocalBaseUrl
    ? {
        webServer: {
          // CI runs the built server; locally we run dev for convenience.
          command: process.env.CI
            ? "npm run start -- -p 3000"
            : "npm run dev -- -p 3000",
          url: baseURL,
          reuseExistingServer: !process.env.CI,
          timeout: 120_000,
        },
      }
    : {}),
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
