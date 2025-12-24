const { JSDOM } = require('jsdom');

const BASE_URL = 'http://localhost:3000';
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;

async function checkLinks() {
  console.log(`🚀 Starting Link Validator at ${BASE_URL}...`);
  
  const checkedUrls = new Set();
  const queue = [BASE_URL];
  const brokenLinks = [];

  // 1. Try to get sitemap
  try {
    const sitemapRes = await fetch(SITEMAP_URL);
    if (sitemapRes.ok) {
      const xml = await sitemapRes.text();
      const urls = xml.match(/<loc>(.*?)<\/loc>/g)?.map(tag => tag.replace(/<\/?loc>/g, '')) || [];
      console.log(`📍 Found ${urls.length} URLs in sitemap.`);
      urls.forEach(u => queue.push(u));
    }
  } catch (e) {
    console.warn('⚠️ Could not fetch sitemap.xml. Falling back to crawler mode.');
  }

  while (queue.length > 0) {
    const url = queue.shift();
    if (checkedUrls.has(url) || !url.startsWith(BASE_URL)) continue;
    checkedUrls.add(url);

    console.log(`🔍 Checking: ${url}`);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        brokenLinks.push({ url, status: res.status });
        console.error(`❌ BROKEN: ${url} (Status: ${res.status})`);
        continue;
      }

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        const html = await res.text();
        const dom = new JSDOM(html);
        const links = dom.window.document.querySelectorAll('a');

        links.forEach(link => {
          let href = link.getAttribute('href');
          if (!href) return;

          // Resolve relative URLs
          if (href.startsWith('/')) {
            href = `${BASE_URL}${href}`;
          }

          if (href.startsWith(BASE_URL) && !checkedUrls.has(href)) {
            queue.push(href);
          } else if (!href.startsWith('http') && !href.startsWith('#')) {
            // Handle other protocols or fragments if needed
          }
        });
      }
    } catch (error) {
      brokenLinks.push({ url, error: error.message });
      console.error(`❌ ERROR: ${url} (${error.message})`);
    }
  }

  console.log('\n--- Link Check Results ---');
  console.log(`✅ Checked ${checkedUrls.size} internal URLs.`);
  if (brokenLinks.length === 0) {
    console.log('🎉 No broken links found!');
    process.exit(0);
  } else {
    console.error(`🚨 Found ${brokenLinks.length} broken links:`);
    brokenLinks.forEach(b => console.error(` - ${b.url} (${b.status || b.error})`));
    process.exit(1);
  }
}

checkLinks();

