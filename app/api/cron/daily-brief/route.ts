import { NextRequest, NextResponse } from 'next/server';
import { generateDailyBrief } from '@/lib/intel';

export const dynamic = 'force-dynamic'; // Prevent caching

export async function GET(request: NextRequest) {
  // 1. Verify Vercel Cron Signature
  // Vercel automatically injects CRON_SECRET when invoking this job
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // Optional: Allow running locally for debugging if CRON_SECRET is not set
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    const brief = await generateDailyBrief();
    return NextResponse.json({ success: true, brief });
  } catch (error: any) {
    console.error('Cron Job Failed:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

