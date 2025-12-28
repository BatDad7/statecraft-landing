import { generateDailyBrief } from '../lib/intel';
import fs from 'fs';
import path from 'path';

// Load .env.local manually
console.log('📂 Loading environment variables...');
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    // Match KEY="VALUE" or KEY=VALUE, handling comments
    const match = line.match(/^\s*([\w_]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      // Remove quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
      // console.log(`Loaded key: ${key}`);
    }
  });
  console.log(`✅ .env.local loaded (${Object.keys(process.env).length} vars available)`);
  console.log('Debug: KV_REST_API_URL present?', !!process.env.KV_REST_API_URL);
} else {
  console.warn('⚠️ .env.local not found');
}

async function main() {
  console.log('🚀 Starting Multi-Vertical Intelligence Generation...');

  try {
    console.log('\n--- Generating AP GOV Brief ---');
    await generateDailyBrief('ap-gov');
    console.log('✅ AP GOV Complete');

    console.log('\n--- Generating COLLEGE GOV Brief ---');
    await generateDailyBrief('college-gov');
    console.log('✅ COLLEGE GOV Complete');

    console.log('\n✨ All verticals updated successfully.');
  } catch (error) {
    console.error('❌ Fatal Error:', error);
    process.exit(1);
  }
}

main();
