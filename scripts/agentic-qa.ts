import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Agentic QA Audit Script (Visual Edition)
 * 
 * This script uses Playwright to capture a screenshot of the landing page
 * and sends it to Gemini for a multimodal audit (Visuals + Content).
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

// Default to Gemini 3 Pro for reliable Vision capabilities
const MODEL_ID = process.env.MODEL_ID || "gemini-3-pro-preview"; 

export {};

async function runAgenticQA() {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    console.error('❌ Error: GEMINI_API_KEY environment variable is not set.');
    console.log('Please set it using: export GEMINI_API_KEY=your_key_here');
    process.exit(1);
  }

  console.log(`🚀 Starting Visual Agentic QA Audit for: ${BASE_URL}`);

  let browser;
  try {
    // 1. Launch Browser & Take Screenshot
    console.log('📸 Launching Headless Browser...');
    browser = await chromium.launch();
    const page = await browser.newPage();
    
    // Set viewport to a standard desktop size
    await page.setViewportSize({ width: 1280, height: 800 });
    
    console.log(`📡 Navigating to ${BASE_URL}...`);
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    
    // Wait a moment for animations to settle
    await page.waitForTimeout(2000);

    console.log('🖼️  Capturing Screenshot...');
    const screenshotBuffer = await page.screenshot({ fullPage: false }); // Single fold or fullPage: true
    const base64Image = screenshotBuffer.toString('base64');
    
    // Get text content as backup/context
    const textContent = await page.innerText('body');
    const cleanedText = textContent.replace(/\s+/g, ' ').trim().substring(0, 2000);

    await browser.close();
    browser = null;

    console.log(`🧠 Sending visual data to ${MODEL_ID} for analysis...`);

    // 2. Construct the Multimodal Prompt
    const promptText = `
      You are an expert QA Automation Agent specializing in UI/UX and Educational Technology.
      
      CONTEXT:
      You are auditing the "Statecraft: The Situation Room" landing page. 
      It is a high-stakes simulation for AP Government students.
      
      AUDIT TASK:
      Analyze the attached SCREENSHOT and the text context provided.
      
      CRITERIA:
      1. Visual Hierarchy: Is the "Primary Call to Action" (Request/Authorize Access) clearly distinct?
      2. Ghost Buttons: Do any secondary buttons (like "Draft Legislation") look too much like the primary CTA?
      3. Immersion: Does the visual style (colors, fonts, layout) feel like a government "Situation Room"?
      4. Professionalism: Does it look trustworthy for a school administrator?
      
      TEXT CONTEXT:
      ${cleanedText}
      
      RETURN JSON:
      {
        "score": (0-100),
        "visual_hierarchy_rating": (0-10),
        "ghost_button_risk": ("High" | "Medium" | "Low"),
        "strengths": ["string"],
        "weaknesses": ["string"],
        "critical_fix": "string or null"
      }
    `;

    // 3. Call Gemini API with Image
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent?key=${GEMINI_API_KEY}`;
    
    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: promptText },
            {
              inline_data: {
                mime_type: "image/png",
                data: base64Image
              }
            }
          ]
        }],
        generationConfig: { responseMimeType: 'application/json' }
      })
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json();
      throw new Error(`Gemini API Error: ${errorData.error?.message || geminiResponse.statusText}`);
    }

    const data = await geminiResponse.json();
    const reportText = data.candidates[0].content.parts[0].text;
    const report = JSON.parse(reportText);

    // 4. Output Results
    console.log('\n' + '='.repeat(50));
    console.log('👁️  VISUAL QA REPORT');
    console.log('='.repeat(50));
    console.log(`OVERALL SCORE:      ${report.score}/100`);
    console.log(`VISUAL HIERARCHY:   ${report.visual_hierarchy_rating}/10`);
    console.log(`GHOST BUTTON RISK:  ${report.ghost_button_risk}`);
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
      console.error('❌ Status: FAILED (Score below 80)');
      process.exit(1);
    } else {
      console.log('✨ Status: PASSED');
      process.exit(0);
    }

  } catch (error: any) {
    console.error(`\n❌ Visual QA Execution Error: ${error.message}`);
    if (browser) await browser.close();
    process.exit(1);
  }
}

runAgenticQA();
