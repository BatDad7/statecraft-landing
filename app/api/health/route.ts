import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { parseDailyBrief, type DailyBrief } from "@/lib/briefs";

export const dynamic = 'force-dynamic';

const emptyBrief: DailyBrief = {
  headline: "__EMPTY__",
  activity: "__EMPTY__",
  topic_tag: "__EMPTY__",
};

function isConfiguredRedis() {
  // `lib/redis.ts` uses mock placeholders when env is missing; treat that as "not configured".
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

function healthFromRaw(raw: unknown) {
  if (!raw) return { present: false as const };
  const parsed = parseDailyBrief(raw, emptyBrief);
  const present = parsed.headline !== "__EMPTY__";
  return {
    present,
    headline: present ? parsed.headline : undefined,
    topic_tag: present ? parsed.topic_tag : undefined,
    generated_at: present ? parsed.generated_at : undefined,
    date: present ? parsed.date : undefined,
  };
}

export async function GET() {
  const timestamp = new Date().toISOString();
  const region = process.env.VERCEL_REGION || "dev";

  if (!isConfiguredRedis()) {
    return NextResponse.json({
      status: "degraded",
      reason: "redis_not_configured",
      timestamp,
      uptime: process.uptime(),
      region,
    });
  }

  try {
    const [apRaw, collegeRaw] = await Promise.all([
      redis.get("daily_brief"),
      redis.get("daily_brief:college-gov"),
    ]);

    const ap = healthFromRaw(apRaw);
    const college = healthFromRaw(collegeRaw);

    return NextResponse.json({
      status: ap.present && college.present ? "ok" : "degraded",
      timestamp,
      uptime: process.uptime(),
      region,
      briefs: {
        ap_gov: ap,
        college_gov: college,
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        status: "degraded",
        reason: "redis_error",
        timestamp,
        uptime: process.uptime(),
        region,
        error: String(e?.message || e),
      },
      { status: 503 }
    );
  }
}

