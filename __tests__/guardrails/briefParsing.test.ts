import { parseDailyBrief } from "@/lib/briefs";

describe("brief parsing guardrail", () => {
  const fallback = {
    headline: "fallback",
    activity: "fallback",
    topic_tag: "fallback",
  };

  test("accepts object brief", () => {
    const out = parseDailyBrief(
      { headline: "h", activity: "a", topic_tag: "t" },
      fallback
    );
    expect(out.headline).toBe("h");
    expect(out.topic_tag).toBe("t");
  });

  test("accepts JSON string brief", () => {
    const out = parseDailyBrief(
      JSON.stringify({ headline: "h", activity: "a", topic_tag: "t" }),
      fallback
    );
    expect(out.activity).toBe("a");
  });

  test("falls back on invalid JSON", () => {
    const out = parseDailyBrief("{not-json", fallback);
    expect(out.headline).toBe("fallback");
  });

  test("falls back on missing fields", () => {
    const out = parseDailyBrief(JSON.stringify({ headline: "h" }), fallback);
    expect(out.headline).toBe("fallback");
  });
});


