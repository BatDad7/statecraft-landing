import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = process.argv[2] || 'http://localhost:3000';
const OUTPUT_DIR = path.join(process.cwd(), 'audit');

async function generateAudit() {
  console.log(`🚀 Starting audit generation for: ${BASE_URL}`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', exception => console.log(`PAGE ERROR: "${exception}"`));

  try {
    console.log('🌐 Navigating to page...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // 1. Generate Visuals
    console.log(`📸 Generating visuals...`);
    
    // Full page screenshot (good for visual layout review)
    await page.screenshot({ 
      path: path.join(OUTPUT_DIR, 'homepage-full.png'), 
      fullPage: true 
    });

    // PDF (good for document style review)
    await page.pdf({ 
      path: path.join(OUTPUT_DIR, 'homepage.pdf'), 
      format: 'A4', 
      printBackground: true,
      margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' }
    });
    
    // 2. Extract Content & Links
    console.log(`📝 Extracting content and links...`);
    
    const data = await page.evaluate(() => {
      // Get all links
      const links = Array.from(document.querySelectorAll('a')).map(a => {
        return {
          text: a.innerText.replace(/\n/g, ' ').trim() || '[No Text/Image]',
          href: a.href,
          isExternal: a.hostname !== window.location.hostname
        };
      });

      // Get text structure
      // We grab headings and paragraphs to give the LLM a sense of the outline
      const elements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, button'));
      const content = elements.map(el => {
        let text = (el as HTMLElement).innerText.trim();
        if (!text) return null;
        
        // Clean up text
        text = text.replace(/\s+/g, ' ');
        
        return {
          tag: el.tagName.toLowerCase(),
          text: text
        };
      }).filter(item => item !== null);

      return { links, content };
    });

    // 3. Generate Markdown Report
    let mdContent = `# Site Content Audit: ${BASE_URL}\n`;
    mdContent += `Generated: ${new Date().toLocaleString()}\n\n`;

    mdContent += `## 🔗 Navigation & Link Analysis\n`;
    mdContent += `This section lists all clickable links found on the page to verify destinations.\n\n`;
    mdContent += `| Link Text | Destination | Type |\n`;
    mdContent += `|-----------|-------------|------|\n`;
    
    data.links.forEach(link => {
      const type = link.isExternal ? 'External 🌍' : 'Internal 🏠';
      // Escape pipes in text
      const safeText = link.text.replace(/\|/g, '\\|');
      mdContent += `| ${safeText} | ${link.href} | ${type} |\n`;
    });

    mdContent += `\n## 📄 Page Content Structure\n`;
    mdContent += `This section outlines the text hierarchy to check for clarity and flow.\n\n`;
    
    let lastTag = '';
    data.content.forEach(item => {
      if (!item) return;
      
      let prefix = '';
      if (item.tag.startsWith('h')) {
        const level = parseInt(item.tag[1]);
        prefix = '#'.repeat(level) + ' ';
        mdContent += `\n${prefix}${item.text}\n`;
      } else if (item.tag === 'li') {
        mdContent += `- ${item.text}\n`;
      } else if (item.tag === 'button') {
        mdContent += `> [Button: ${item.text}]\n`;
      } else {
        // paragraphs
        if (lastTag.startsWith('h')) mdContent += '\n'; // spacing after header
        mdContent += `${item.text}\n\n`;
      }
      lastTag = item.tag;
    });

    fs.writeFileSync(path.join(OUTPUT_DIR, 'site_content.md'), mdContent);
    
    console.log(`\n✅ Audit generated successfully in: ${OUTPUT_DIR}/`);
    console.log(`   FILES GENERATED:`);
    console.log(`   1. homepage-full.png  (Best for visual layout review)`);
    console.log(`   2. homepage.pdf       (Printable version)`);
    console.log(`   3. site_content.md    (Text content & Link list for LLM analysis)`);

  } catch (error) {
    console.error('❌ Error during audit:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

generateAudit();

