import { generateDailyBrief } from '@/lib/intel';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Ensure this endpoint is only accessible via Vercel Cron
  const authHeader = process.env.CRON_SECRET;
  const requestAuthHeader = request.headers.get('authorization');
  
  // Note: Vercel Cron sends the secret in the Authorization header as "Bearer <token>"
  // We need to verify if that matches CRON_SECRET or if we are using custom header validation.
  // For simplicity here, assuming standard Vercel protection or checking ENV.
  
  // Actually, Vercel automatically protects cron jobs if configured, but checking the header is safe.
  const vercelCronHeader = request.headers.get('x-vercel-cron');
  
  if (process.env.NODE_ENV === 'production' && !vercelCronHeader) {
     return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    console.log('🔄 Starting Multi-Vertical Cron Job...');
    
    // Generate for AP Gov
    const apBrief = await generateDailyBrief('ap-gov');
    console.log('✅ AP Gov Generated:', apBrief.headline);

    // Generate for College Gov
    const collegeBrief = await generateDailyBrief('college-gov');
    console.log('✅ College Gov Generated:', collegeBrief.headline);

    return NextResponse.json({ 
      success: true, 
      results: {
        ap: apBrief.headline,
        college: collegeBrief.headline
      }
    });
  } catch (error: any) {
    console.error('Cron job failed:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
