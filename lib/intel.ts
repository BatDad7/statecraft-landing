import { Redis } from '@upstash/redis';
import { getTopicForCalendar } from './pacing';

const MODEL_ID = "gemini-3-pro-preview";

export async function generateDailyBrief(verticalId: 'ap-gov' | 'college-gov' = 'ap-gov') {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (!GEMINI_API_KEY) throw new Error('Missing GEMINI_API_KEY');
  if (!UPSTASH_URL || !UPSTASH_TOKEN) throw new Error('Missing UPSTASH_REDIS_REST_URL/TOKEN');

  const redis = new Redis({ url: UPSTASH_URL, token: UPSTASH_TOKEN });

  // A. Get Current Topic based on Academic Calendar
  const topic = getTopicForCalendar(verticalId, new Date());
  
  // B. Construct Context-Aware Prompt
  const isSummer = topic.id === 'CURRENT_EVENTS';
  
  const contextInstruction = isSummer 
    ? `Since it is summer break, focus on MAJOR structural political events (SCOTUS rulings, Conventions, significant Legislation) rather than specific unit minutiae.`
    : `The instructor is currently covering: '${topic.name}' with a focus on '${topic.focus}'. Find a news event that illustrates THIS specific concept.`;

  const prompt = `
    Act as a high-level intelligence analyst and news aggregator for a ${verticalId === 'college-gov' ? 'University Political Science' : 'AP Government'} audience.
    Your mission: Scan global news feeds from the last 24 HOURS.
    
    ${contextInstruction}
    
    Task: Write a 3-sentence 'Intelligence Brief' connecting a REAL news event from the last 24-48 hours to the political science concept above.
    
    Style Guidelines:
    - Tone: Classified Memo / Situation Room.
    - Urgency: High.
    - Format: Concise, actionable intelligence.
    
    RETURN JSON FORMAT ONLY: 
    { 
      "headline": "string (Short, Punchy, All-Caps optional)", 
      "activity": "string (The 3-sentence brief)", 
      "topic_tag": "string (Strict Format: 'Unit/Topic: [Topic Name]') or 'Summer Session: Global Events'" 
    }
  `;

  // C. Call Gemini API
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' }
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API Error: ${response.status} - ${err}`);
  }

  const data = await response.json();
  const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!jsonText) throw new Error('Gemini returned empty response');

  // Parse JSON
  const jsonStr = (text: string) => text.replace(/```json/g, '').replace(/```/g, '').trim();
  const brief = JSON.parse(jsonStr(jsonText));
  
  // Add metadata
  brief.date = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  brief.generated_at = new Date().toISOString();
  brief.vertical = verticalId;

  // D. Save to Redis
  // Key strategy: 'daily_brief' (legacy/default) AND 'daily_brief:college-gov'
  const redisKey = verticalId === 'ap-gov' ? 'daily_brief' : `daily_brief:${verticalId}`;
  
  await redis.set(redisKey, JSON.stringify(brief), { ex: 90000 }); 
  
  // E. Dispatch Email Report
  try {
    await sendEmailReport(brief, verticalId);
  } catch (emailErr) {
    console.error('Failed to send email report:', emailErr);
    // Don't fail the job if email fails
  }

  return brief;
}

async function sendEmailReport(brief: any, verticalId: string) {
  if (!process.env.POSTMARK_SERVER_TOKEN) {
    console.log('Skipping email report: No POSTMARK_SERVER_TOKEN');
    return;
  }
  
  const res = await fetch("https://api.postmarkapp.com/email", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": process.env.POSTMARK_SERVER_TOKEN!
    },
    body: JSON.stringify({
      "From": process.env.EMAIL_FROM || "joe.jaeger@statecraftsims.com",
      "To": process.env.EMAIL_TO || "joe.jaeger@statecraftsims.com",
      "Subject": `[${verticalId.toUpperCase()}] Daily Intel Brief: ${brief.headline}`,
      "HtmlBody": `
        <div style="font-family: sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0f172a; padding: 20px; text-align: center;">
            <h2 style="color: #22c55e; margin: 0; font-family: monospace; letter-spacing: 2px;">// STATECRAFT INTEL</h2>
            <div style="color: #64748b; font-size: 10px; text-transform: uppercase; margin-top: 5px;">CHANNEL: ${verticalId}</div>
          </div>
          <div style="padding: 30px;">
            <div style="margin-bottom: 20px;">
              <span style="background-color: #f1f5f9; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; color: #475569; text-transform: uppercase;">${brief.topic_tag}</span>
              <span style="float: right; font-size: 12px; color: #64748b;">${brief.date}</span>
            </div>
            <h3 style="font-size: 24px; margin-top: 0; margin-bottom: 16px; color: #0f172a;">${brief.headline}</h3>
            <p style="font-size: 16px; line-height: 1.6; color: #334155;">${brief.activity}</p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <a href="https://apgov.statecraftsims.com" style="display: block; width: 100%; text-align: center; background-color: #2563eb; color: white; padding: 12px 0; text-decoration: none; border-radius: 6px; font-weight: bold;">View Live Site</a>
            </div>
          </div>
          <div style="background-color: #f8fafc; padding: 15px; text-align: center; font-size: 11px; color: #94a3b8;">
            Generated via Gemini 3 Pro + Vercel Cron<br>
            Time: ${new Date().toISOString()}
          </div>
        </div>
      `,
      "MessageStream": "outbound"
    })
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Postmark API Error: ${res.status} ${txt}`);
  }
  
  console.log('📧 Email Report Sent via Postmark');
}
