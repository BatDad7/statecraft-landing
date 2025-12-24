import { JSDOM } from 'jsdom';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Agentic QA Audit Script
 * 
 * This script performs an AI-powered audit of the Statecraft landing page
 * to ensure it maintains the "Situation Room" immersion and aligns with
 * AP Government curriculum standards.
 */

// Simple .env.local loader
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split(/\r?\n/);
  const loadedKeys: string[] = [];
  
  lines.forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const indexOfFirstEqual = trimmedLine.indexOf('=');
      if (indexOfFirstEqual > 0) {
        const key = trimmedLine.substring(0, indexOfFirstEqual).trim();
        let value = trimmedLine.substring(indexOfFirstEqual + 1).trim();
        
        // Remove surrounding quotes
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.substring(1, value.length - 1);
        }
        
        if (key && value && !process.env[key]) {
          process.env[key] = value;
          loadedKeys.push(key);
        }
      }
    }
  });
  if (loadedKeys.length > 0) {
    console.log(`📡 Loaded environment keys: ${loadedKeys.join(', ')}`);
  }
}

const BASE_URL = process.argv[2] || 'http://localhost:3000';

export {};

async function runAgenticQA() {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    console.error('❌ Error: GEMINI_API_KEY environment variable is not set.');
    console.log('Please set it using: export GEMINI_API_KEY=your_key_here');
    process.exit(1);
  }

  console.log(`🚀 Starting Agentic QA Audit for: ${BASE_URL}`);

  try {
    // 1. Fetch the page content (with cache-busting)
    console.log('📡 Fetching page content (Cache-Busted)...');
    const cacheBuster = `?t=${new Date().getTime()}`;
    const response = await fetch(`${BASE_URL}${cacheBuster}`, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${BASE_URL}: ${response.statusText}`);
    }
    const html = await response.text();

    // 2. Extract meaningful text using JSDOM
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    
    // Remove non-content elements
    doc.querySelectorAll('script, style, nav, footer').forEach(el => el.remove());
    
    const content = doc.body.textContent?.replace(/\s+/g, ' ').trim() || '';
    const title = doc.title;

    const MODEL_ID = process.env.MODEL_ID || "gemini-3-pro-preview";
    console.log(`🧠 Sending content to ${MODEL_ID} for reasoning...`);

    // 3. Construct the prompt for Gemini
    const prompt = `
      You are an expert QA Automation Agent specializing in Educational Technology and "Statecraft: The Situation Room".
      
      CONTEXT:
      Statecraft is a high-stakes simulation for AP Government students. The landing page must feel immersive, 
      like a US Government "Situation Room" or "Intelligence Briefing". It must also clearly communicate 
      alignment with AP Gov curriculum (Federalist Papers, Constitution, civil liberties, etc.).
      
      AUDIT CRITERIA:
      1. Immersion: Does the copy and structure feel like a government intelligence interface?
      2. Curriculum Alignment: Are specific AP Gov concepts mentioned?
      3. Tone: Is the tone professional, authoritative, and urgent?
      4. Call to Action: Is it clear how a teacher starts the simulation? Look for "Ghost Buttons" (buttons that are hard to see or don't look clickable) or general UX flaws.
      
      PAGE DATA:
      Title: ${title}
      Content Snippet: ${content.substring(0, 5000)}
      
      TASK:
      Perform a critical audit and return a JSON object with the following structure:
      {
        "score": (number 0-100),
        "immersion_rating": (number 0-10),
        "curriculum_alignment": (number 0-10),
        "strengths": ["string"],
        "weaknesses": ["string"],
        "critical_fix": "string or null"
      }
    `;

    // 4. Call Gemini API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent?key=${GEMINI_API_KEY}`;
    
    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          responseMimeType: 'application/json',
        }
      })
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json();
      throw new Error(`Gemini API Error: ${errorData.error?.message || geminiResponse.statusText}`);
    }

    const data = await geminiResponse.json();
    const reportText = data.candidates[0].content.parts[0].text;
    const report = JSON.parse(reportText);

    // 5. Output Results
    console.log('\n' + '='.repeat(50));
    console.log('📊 AGENTIC QA REPORT');
    console.log('='.repeat(50));
    console.log(`OVERALL SCORE:      ${report.score}/100`);
    console.log(`IMMERSION:          ${report.immersion_rating}/10`);
    console.log(`CURRICULUM ALIGN:   ${report.curriculum_alignment}/10`);
    console.log('-'.repeat(50));
    
    console.log('\n✅ STRENGTHS:');
    report.strengths.forEach((s: string) => console.log(`  • ${s}`));
    
    console.log('\n⚠️ WEAKNESSES:');
    report.weaknesses.forEach((w: string) => console.log(`  • ${w}`));
    
    if (report.critical_fix) {
      console.log('\n🚨 CRITICAL FIX REQUIRED:');
      console.log(`  ${report.critical_fix}`);
    }

    console.log('\n' + '='.repeat(50));

    if (report.score < 80) {
      console.error('❌ Status: FAILED (Score below threshold)');
      process.exit(1);
    } else {
      console.log('✨ Status: PASSED');
      process.exit(0);
    }

  } catch (error: any) {
    console.error(`\n❌ Agentic QA Execution Error: ${error.message}`);
    process.exit(1);
  }
}

runAgenticQA();

