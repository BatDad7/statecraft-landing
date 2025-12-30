import { test, expect } from "@playwright/test";

const BASE =
  (process.env.BASE_URL || "http://localhost:3000").replace(/\/+$/, "");

const isLocal =
  BASE.includes("localhost") || BASE.includes("127.0.0.1") || BASE.startsWith("/");

const MAX_AGE_HOURS = Number(process.env.BRIEF_MAX_AGE_HOURS || 36);
const MAX_AGE_MS = MAX_AGE_HOURS * 60 * 60 * 1000;

function ageMs(iso?: string) {
  if (!iso) return Number.POSITIVE_INFINITY;
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return Number.POSITIVE_INFINITY;
  return Date.now() - t;
}

test.describe("Canary: daily brief freshness", () => {
  test("AP Gov + College Gov briefs are present and recent", async ({ request }) => {
    test.skip(isLocal, "Freshness canary is for deployed environments only.");

    const res = await request.get(`${BASE}/api/health`, { maxRedirects: 0 });
    expect(res.status()).toBeGreaterThanOrEqual(200);
    expect(res.status()).toBeLessThan(400);

    const json = await res.json();
    expect(json.status).toBe("ok");

    const ap = json.briefs?.ap_gov;
    const college = json.briefs?.college_gov;

    expect(ap?.present).toBe(true);
    expect(college?.present).toBe(true);

    // Ensure generated_at exists and is within threshold.
    const apAge = ageMs(ap?.generated_at);
    const collegeAge = ageMs(college?.generated_at);

    expect(apAge).toBeLessThanOrEqual(MAX_AGE_MS);
    expect(collegeAge).toBeLessThanOrEqual(MAX_AGE_MS);
  });
});


