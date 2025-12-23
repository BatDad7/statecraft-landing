import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

// Initialize Upstash Redis client
const redis = Redis.fromEnv();

export async function GET() {
  console.log("Reading from Upstash Redis...");
  
  try {
    const data = await redis.get("daily_intel");
    
    // Fallback if no data exists in Redis yet
    if (!data) {
      return NextResponse.json({
        headline: "Awaiting Satellite Uplink...",
        date: new Date().toISOString().split('T')[0],
        activity: "Initializing secure connection to educational database...",
        ap_unit: "Unit 0",
        concept: "Introduction",
        foundational_doc: "Syllabus",
        seo_slug: "awaiting-uplink"
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Redis GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch from intelligence database" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // 1. Security: Check Bearer Token
  const authHeader = request.headers.get("authorization");
  const secretKey = process.env.CR_INTEL_SECRET_KEY;

  if (!authHeader || !authHeader.startsWith("Bearer ") || authHeader.split(" ")[1] !== secretKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 2. Extract Body
    const body = await request.json();
    const { headline, date, activity, ap_unit, concept, foundational_doc, seo_slug } = body;

    // 3. Validation: Ensure all fields are valid strings
    if (
      typeof headline !== "string" || !headline.trim() ||
      typeof date !== "string" || !date.trim() ||
      typeof activity !== "string" || !activity.trim() ||
      typeof ap_unit !== "string" || !ap_unit.trim() ||
      typeof concept !== "string" || !concept.trim() ||
      typeof foundational_doc !== "string" || !foundational_doc.trim() ||
      typeof seo_slug !== "string" || !seo_slug.trim()
    ) {
      return NextResponse.json({ 
        error: "Invalid payload: All fields (headline, date, activity, ap_unit, concept, foundational_doc, seo_slug) are required." 
      }, { status: 400 });
    }

    const payload = { headline, date, activity, ap_unit, concept, foundational_doc, seo_slug };

    // Phase 4: Persistence with Upstash Redis (Dual-Write for Programmatic SEO)
    // 1. Keep the homepage fast with the current intel
    await redis.set("daily_intel", payload);
    // 2. Archive the entry to build history/programmatic pages
    await redis.lpush("intel_archive", payload);

    // 4. Action: Log and Return Success
    console.log("--- SECURE INTEL UPLINK RECEIVED (PERSISTED & ARCHIVED) ---");
    console.log("Headline:", headline);
    console.log("SEO Slug:", seo_slug);
    console.log("-----------------------------------------------------------");

    return NextResponse.json(
      { 
        success: true, 
        message: "Secure Uplink Established & Persisted", 
        data: payload 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Redis POST Error:", error);
    return NextResponse.json({ error: "Invalid JSON body or Database error" }, { status: 400 });
  }
}
