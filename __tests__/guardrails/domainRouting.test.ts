import { classifyHost, getGovRewritePath } from "@/lib/routing";

describe("domain routing guardrails", () => {
  test("apgov host does NOT get treated as gov", () => {
    expect(classifyHost("apgov.statecraftsims.com")).toBe("apgov");
    expect(getGovRewritePath("apgov.statecraftsims.com", "/")).toBeNull();
  });

  test("www.gov host is treated as gov", () => {
    expect(classifyHost("www.gov.statecraftsims.com")).toBe("gov");
    expect(getGovRewritePath("www.gov.statecraftsims.com", "/")).toBe("/higher-ed");
  });

  test("gov host rewrites / to /higher-ed", () => {
    expect(classifyHost("gov.statecraftsims.com")).toBe("gov");
    expect(getGovRewritePath("gov.statecraftsims.com", "/")).toBe("/higher-ed");
  });
});


