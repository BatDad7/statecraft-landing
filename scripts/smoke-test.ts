/**
 * System Smoke Test
 * Checks core system health: URL, API, and Persistence availability.
 */

const BASE_URL = process.argv[2] || 'http://localhost:3000';

export {};

async function runSmokeTest() {
  console.log(`🚀 Starting Smoke Test for: ${BASE_URL}\n`);
  
  const results = {
    frontend: { status: 'PENDING', message: '' },
    api_intel: { status: 'PENDING', message: '' },
    sitemap: { status: 'PENDING', message: '' },
  };

  try {
    // 1. Check Frontend
    console.log('🔍 Checking Frontend availability...');
    const feRes = await fetch(BASE_URL);
    if (feRes.ok) {
      results.frontend.status = 'PASS';
      results.frontend.message = `Landing page returned ${feRes.status}`;
    } else {
      results.frontend.status = 'FAIL';
      results.frontend.message = `Landing page returned ${feRes.status}`;
    }

    // 2. Check API (/api/intel)
    console.log('🔍 Checking Intelligence API (/api/intel)...');
    const apiRes = await fetch(`${BASE_URL}/api/intel`);
    if (apiRes.ok) {
      const data = await apiRes.json();
      if (data.headline) {
        results.api_intel.status = 'PASS';
        results.api_intel.message = `API returned valid headline: "${data.headline}"`;
      } else {
        results.api_intel.status = 'FAIL';
        results.api_intel.message = 'API returned 200 but payload is invalid/empty';
      }
    } else {
      results.api_intel.status = 'FAIL';
      results.api_intel.message = `API returned status ${apiRes.status}`;
    }

    // 3. Check Sitemap
    console.log('🔍 Checking Sitemap generation...');
    const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
    if (sitemapRes.ok) {
      results.sitemap.status = 'PASS';
      results.sitemap.message = 'Sitemap.xml is accessible';
    } else {
      results.sitemap.status = 'FAIL';
      results.sitemap.message = `Sitemap returned ${sitemapRes.status}`;
    }

  } catch (error: any) {
    console.error(`\n❌ Network/Execution Error: ${error.message}`);
    process.exit(1);
  }

  // Final Report
  console.log('\n--- SMOKE TEST REPORT ---');
  let hasFailures = false;
  
  Object.entries(results).forEach(([key, val]) => {
    const icon = val.status === 'PASS' ? '✅' : '❌';
    console.log(`${icon} ${key.toUpperCase()}: ${val.status}`);
    console.log(`   ${val.message}`);
    if (val.status === 'FAIL') hasFailures = true;
  });

  console.log('-------------------------\n');

  if (hasFailures) {
    console.error('🚨 SMOKE TEST FAILED');
    process.exit(1);
  } else {
    console.log('✨ SMOKE TEST PASSED');
    process.exit(0);
  }
}

runSmokeTest();

