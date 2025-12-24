const BASE_URL = process.argv[2] || 'http://localhost:3000';

export {};

async function checkLinks() {
  console.log(`🚀 Starting link checker against: ${BASE_URL}\n`);

  const visited = new Set<string>();
  const queue: string[] = ['/'];
  const brokenLinks: { url: string; source: string; status: number }[] = [];

  // Try to add URLs from sitemap.xml first
  try {
    console.log(`📡 Fetching sitemap.xml for initial paths...`);
    const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
    if (sitemapRes.ok) {
      const xml = await sitemapRes.text();
      const locRegex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
      let match;
      while ((match = locRegex.exec(xml)) !== null) {
        const url = match[1];
        // Extract the path regardless of what the domain in the sitemap is
        try {
          const urlObj = new URL(url);
          const path = urlObj.pathname + urlObj.search;
          if (!visited.has(path) && !queue.includes(path)) {
            queue.push(path);
          }
        } catch (e) {
          console.warn(`⚠️ Could not parse URL from sitemap: ${url}`);
        }
      }
      console.log(`✅ Found ${queue.length} paths in sitemap.\n`);
    } else {
      console.log(`⚠️ No sitemap.xml found at ${BASE_URL}/sitemap.xml. Falling back to crawl only.\n`);
    }
  } catch (error) {
    console.log(`⚠️ Error fetching sitemap: Falling back to crawl only.\n`);
  }

  while (queue.length > 0) {
    const path = queue.shift()!;
    // Strip hash for checking the page itself
    const cleanPath = path.split('#')[0] || '/';
    
    if (visited.has(cleanPath)) continue;
    visited.add(cleanPath);

    const fullUrl = cleanPath.startsWith('http') ? cleanPath : `${BASE_URL}${cleanPath}`;
    
    try {
      console.log(`🔍 Checking: ${cleanPath}...`);
      const response = await fetch(fullUrl, { method: 'GET' });
      
      if (!response.ok) {
        brokenLinks.push({ url: cleanPath, source: 'Internal Link', status: response.status });
        console.error(`❌ Broken: ${cleanPath} (Status: ${response.status})`);
        continue;
      }

      // If it's an internal HTML page, scan for more links
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('text/html') && (fullUrl.startsWith(BASE_URL) || fullUrl.startsWith('/'))) {
        const html = await response.text();
        const linkRegex = /href="([^"]+)"/g;
        let match;

        while ((match = linkRegex.exec(html)) !== null) {
          const link = match[1];
          
          // Filter for internal links
          if (link.startsWith('/') && !link.startsWith('//')) {
            const internalPath = link.split('#')[0] || '/';
            if (!visited.has(internalPath)) {
              console.log(`📍 Found internal link: ${link} on ${cleanPath}`);
              queue.push(internalPath);
            }
          } else if (link.startsWith(BASE_URL)) {
            const internalPath = link.replace(BASE_URL, '').split('#')[0] || '/';
            if (!visited.has(internalPath)) {
              queue.push(internalPath);
            }
          }
        }
      }
    } catch (error: any) {
      brokenLinks.push({ url: cleanPath, source: 'Network Error', status: 0 });
      console.error(`❌ Error checking ${cleanPath}: ${error.message}`);
    }
  }

  console.log('\n--- Link Check Results ---');
  console.log(`Total Pages Checked: ${visited.size}`);
  
  if (brokenLinks.length === 0) {
    console.log('✅ No broken links found!');
    process.exit(0);
  } else {
    console.log(`❌ Found ${brokenLinks.length} broken links:`);
    brokenLinks.forEach(link => {
      console.log(`- ${link.url} (Status: ${link.status})`);
    });
    process.exit(1);
  }
}

checkLinks();
