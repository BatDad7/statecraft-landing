import { test, expect } from "@playwright/test";

const BASE =
  (process.env.BASE_URL || "http://localhost:3000").replace(/\/+$/, "");

async function expectOk(res: any) {
  expect(res.status()).toBeGreaterThanOrEqual(200);
  expect(res.status()).toBeLessThan(400);
}

test.describe("Link / asset integrity (hardening)", () => {
  test("sitemap + critical downloads are reachable", async ({ request }) => {
    // sitemap
    const sitemap = await request.get(`${BASE}/sitemap.xml`, { maxRedirects: 0 });
    await expectOk(sitemap);
    expect((await sitemap.text()).toLowerCase()).toContain("<urlset");

    // AP Gov syllabus
    const apPdf = await request.get(`${BASE}/assets/Statecraft_Syllabus_2025.pdf`, {
      maxRedirects: 0,
    });
    await expectOk(apPdf);

    // Higher Ed syllabus
    const hePdf = await request.get(
      `${BASE}/assets/Statecraft_HigherEd_Syllabus_2025.pdf`,
      { maxRedirects: 0 }
    );
    await expectOk(hePdf);

    // Research abstracts
    for (const p of [
      "/assets/research/the-statecraft-effect-abstract.txt",
      "/assets/research/controlled-comparison-abstract.txt",
      "/assets/research/learning-by-doing-abstract.txt",
    ]) {
      const r = await request.get(`${BASE}${p}`, { maxRedirects: 0 });
      await expectOk(r);
      expect((await r.text()).length).toBeGreaterThan(20);
    }
  });

  test("health endpoint responds", async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`, { maxRedirects: 0 });
    await expectOk(res);
    const json = await res.json();
    expect(typeof json.status).toBe("string");
  });
});


