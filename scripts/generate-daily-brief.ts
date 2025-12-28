import { Redis } from '@upstash/redis';
import fs from 'fs';
import path from 'path';

// --- INLINED LIB/PACING.TS ---
interface APUnit {
  id: string;
  name: string;
  focus: string;
  pain_point: string;
}

interface PacingPeriod {
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  unit: APUnit;
}

const PACING_CALENDAR: PacingPeriod[] = [
  {
    startMonth: 7, startDay: 15, endMonth: 8, endDay: 30,
    unit: { id: "UNIT_1", name: "Foundations of American Democracy", focus: "Federalism, Constitution, Brutus No. 1", pain_point: "Students struggling with abstract theory vs practice." }
  },
  {
    startMonth: 9, startDay: 1, endMonth: 9, endDay: 31,
    unit: { id: "UNIT_2", name: "Interactions Among Branches", focus: "Gridlock, Vetoes, Checks and Balances", pain_point: "Explaining why Congress moves so slowly." }
  },
  {
    startMonth: 10, startDay: 1, endMonth: 10, endDay: 30,
    unit: { id: "UNIT_3", name: "Civil Liberties and Rights", focus: "Bill of Rights, Due Process, SCOTUS cases", pain_point: "Balancing safety vs liberty." }
  },
  {
    startMonth: 11, startDay: 1, endMonth: 0, endDay: 31,
    unit: { id: "UNIT_4_5", name: "Ideologies & Participation", focus: "Polling, Elections, Media Bias", pain_point: "Connecting data to outcomes." }
  },
  {
    startMonth: 1, startDay: 1, endMonth: 4, endDay: 15,
    unit: { id: "REVIEW", name: "Exam Review", focus: "FRQ Writing, Argumentation", pain_point: "Students forgetting concepts." }
  }
];

function getCurrentTopic(date: Date = new Date()): APUnit {
  const month = date.getMonth();
  const day = date.getDate();
  const defaultUnit: APUnit = { id: "CURRENT_EVENTS", name: "Current Events", focus: "General Political Context", pain_point: "Keeping students engaged." };

  for (const period of PACING_CALENDAR) {
    if (period.startMonth > period.endMonth) {
      if ((month === period.startMonth && day >= period.startDay) || (month > period.startMonth) || (month < period.endMonth) || (month === period.endMonth && day <= period.endDay)) return period.unit;
    } else {
      if ((month > period.startMonth || (month === period.startMonth && day >= period.startDay)) && (month < period.endMonth || (month === period.endMonth && day <= period.endDay))) return period.unit;
    }
  }
  return defaultUnit;
}

// --- MAIN SCRIPT ---

// Load .env.local manually
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    const [key, value] = line.split('=');
    if (key && value && !process.env[key.trim()]) {
      process.env[key.trim()] = value.trim().replace(/^["']|["']$/g, '');
    }
  });
}

const MODEL_ID = "gemini-3-pro-preview";

async function generateBrief() {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
  const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!GEMINI_API_KEY) { console.error('❌ Missing GEMINI_API_KEY'); process.exit(1); }
  if (!UPSTASH_URL || !UPSTASH_TOKEN) { console.error('❌ Missing UPSTASH_REDIS_REST_URL/TOKEN'); process.exit(1); }

  const redis = new Redis({ url: UPSTASH_URL, token: UPSTASH_TOKEN });

  // A. Get Current Topic
  const topic = getCurrentTopic(new Date());
  console.log(`🎯 Context: ${topic.name} (${topic.focus})`);

  // B. Prompt Gemini (REST API) with UPDATED LOGIC
  const isSummer = topic.id === 'CURRENT_EVENTS';
  
  const contextInstruction = isSummer 
    ? `Since it is summer break, focus on MAJOR structural political events (SCOTUS rulings, Conventions, significant Legislation) rather than specific unit minutiae.`
    : `The teacher is currently covering Unit: '${topic.name}' with a focus on '${topic.focus}'. Find a news event that illustrates THIS specific concept.`;

  const prompt = `
    Act as a high-level intelligence analyst and news aggregator.
    Your mission: Scan global news feeds from the last 24 HOURS.
    
    ${contextInstruction}
    
    Task: Write a 3-sentence 'Intelligence Brief' connecting a REAL news event from the last 24-48 hours to the AP Government concept above.
    
    Style Guidelines:
    - Tone: Classified Memo / Situation Room.
    - Urgency: High.
    - Format: Concise, actionable intelligence.
    
    RETURN JSON FORMAT ONLY: 
    { 
      "headline": "string (Short, Punchy, All-Caps optional)", 
      "activity": "string (The 3-sentence brief)", 
      "topic_tag": "string (Strict Format: 'Unit [Number]: [Topic Name]') or 'Summer Session: Global Events'" 
    }
  `;

  try {
    console.log('🤖 Generating brief with Gemini...');
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json' }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const jsonText = data.candidates[0].content.parts[0].text;
    
    // Clean markdown code blocks if present
    const jsonStr = (text: string) => text.replace(/```json/g, '').replace(/```/g, '').trim();
    const brief = JSON.parse(jsonStr(jsonText));
    
    // Add date manually
    brief.date = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

    console.log('📝 Generated:', brief);

    // C. Save to Redis
    console.log('💾 Saving to Redis (daily_brief)...');
    await redis.set('daily_brief', JSON.stringify(brief), { ex: 90000 });
    
    console.log('✅ Success!');

  } catch (error) {
    console.error('❌ Generation Failed:', error);
    process.exit(1);
  }
}

generateBrief();
