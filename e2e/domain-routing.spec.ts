import { test, expect } from "@playwright/test";

const BASE =
  (process.env.BASE_URL || "http://localhost:3000").replace(/\/+$/, "");

test.describe("Domain routing guardrails (host header)", () => {
  test("gov domain: / stays / and renders Higher Ed chrome + policy brief", async ({
    request,
  }) => {
    const res = await request.get(`${BASE}/`, {
      headers: { host: "gov.statecraftsims.com" },
      maxRedirects: 0,
    });
    expect(res.status()).toBe(200);

    const html = await res.text();
    expect(html).toContain("Gov 2.0 Higher Ed");
    expect(html).not.toContain("AP GOV • Situation Room");
    expect(html).not.toContain("SYSTEM ALERT:");
    expect(html).toContain("Daily Policy Briefing");
  });

  test("apgov domain: / renders AP chrome", async ({ request }) => {
    const res = await request.get(`${BASE}/`, {
      headers: { host: "apgov.statecraftsims.com" },
      maxRedirects: 0,
    });
    expect(res.status()).toBe(200);

    const html = await res.text();
    expect(html).toContain("AP GOV • Situation Room");
    expect(html).not.toContain("Gov 2.0 Higher Ed");
    expect(html).toContain("AUTHORIZE MISSION ACCESS");
  });
});


