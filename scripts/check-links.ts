const BASE_URL = process.argv[2] || 'http://localhost:3000';

async function checkLinks() {
  console.log(`🚀 Starting link checker against: ${BASE_URL}\n`);

  const visited = new Set<string>();
  const queue = ['/'];
  const brokenLinks: { url: string; source: string; status: number }[] = [];

  while (queue.length > 0) {
    const path = queue.shift()!;
    // Strip hash for checking the page itself
    const cleanPath = path.split('#')[0] || '/';
    
    if (visited.has(cleanPath)) continue;
    visited.add(cleanPath);

    const fullUrl = cleanPath.startsWith('http') ? cleanPath : `${BASE_URL}${cleanPath}`;
    
    try {
      console.log(`🔍 Checking: ${cleanPath}...`);
      const response = await fetch(fullUrl);
      
      if (!response.ok) {
        brokenLinks.push({ url: cleanPath, source: 'Internal Link', status: response.status });
        console.error(`❌ Broken: ${cleanPath} (Status: ${response.status})`);
        continue;
      }

      // If it's an internal HTML page, scan for more links
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('text/html') && fullUrl.startsWith(BASE_URL)) {
        const html = await response.text();
        const linkRegex = /href="([^"]+)"/g;
        let match;

        while ((match = linkRegex.exec(html)) !== null) {
          const link = match[1];
          
          // Filter for internal links
          if (link.startsWith('/') && !link.startsWith('//')) {
            const internalPath = link.split('#')[0] || '/';
            if (!visited.has(internalPath)) {
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
