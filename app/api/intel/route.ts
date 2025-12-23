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
        activity: "Initializing secure connection to educational database..."
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
    const { headline, date, activity } = body;

    // 3. Validation: Ensure all fields are valid strings
    if (
      typeof headline !== "string" || !headline.trim() ||
      typeof date !== "string" || !date.trim() ||
      typeof activity !== "string" || !activity.trim()
    ) {
      return NextResponse.json({ error: "Invalid payload: headline, date, and activity are required." }, { status: 400 });
    }

    // Phase 4: Persistence with Upstash Redis
    await redis.set("daily_intel", { headline, date, activity });

    // 4. Action: Log and Return Success
    console.log("--- SECURE INTEL UPLINK RECEIVED (PERSISTED) ---");
    console.log("Headline:", headline);
    console.log("Date:", date);
    console.log("Activity:", activity);
    console.log("------------------------------------------------");

    return NextResponse.json(
      { 
        success: true, 
        message: "Secure Uplink Established & Persisted", 
        data: { headline, date, activity } 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Redis POST Error:", error);
    return NextResponse.json({ error: "Invalid JSON body or Database error" }, { status: 400 });
  }
}
