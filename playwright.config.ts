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
  ...(process.env.CI && isLocalBaseUrl
    ? {
        webServer: {
          // CI already runs `npm run build` in the workflow.
          command: "npm run start -- -p 3000",
          url: baseURL,
          reuseExistingServer: false,
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
  // In CI we prefer testing the real, built app. This also keeps PR checks
  // deterministic and independent of Vercel preview URLs.
  ...(process.env.CI && isLocalBaseUrl
    ? {
        webServer: {
          command: "npm run start -- -p 3000",
          url: baseURL,
          reuseExistingServer: false,
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


