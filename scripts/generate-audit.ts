import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = process.argv[2] || 'http://localhost:3000';
const OUTPUT_DIR = path.join(process.cwd(), 'audit');

const PAGES = [
  { name: 'ap-gov', path: '/' },
  { name: 'higher-ed', path: '/higher-ed/gov' }
];

async function generateAudit() {
  console.log(`🚀 Starting audit generation for: ${BASE_URL}`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  const browser = await chromium.launch();
  const context = await browser.newContext();

  try {
    for (const p of PAGES) {
      const pageUrl = `${BASE_URL}${p.path}`;
      const page = await context.newPage();
      
      console.log(`\n🌐 Navigating to ${p.name} (${pageUrl})...`);
      
      // Override geolocation/permissions if needed
      await page.goto(pageUrl, { waitUntil: 'networkidle' });

      // 1. Generate Visuals
      console.log(`📸 Generating visuals for ${p.name}...`);
      
      await page.screenshot({ 
        path: path.join(OUTPUT_DIR, `${p.name}-full.png`), 
        fullPage: true 
      });

      await page.pdf({ 
        path: path.join(OUTPUT_DIR, `${p.name}.pdf`), 
        format: 'A4', 
        printBackground: true, 
        margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' }
      });
      
      // 2. Extract Content & Links
      console.log(`📝 Extracting content and links for ${p.name}...`);
      
      const data = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a')).map(a => {
          return {
            text: a.innerText.replace(/\n/g, ' ').trim() || '[No Text/Image]',
            href: a.href,
            isExternal: a.hostname !== window.location.hostname
          };
        });

        const elements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, button'));
        const content = elements.map(el => {
          let text = (el as HTMLElement).innerText.trim();
          if (!text) return null;
          text = text.replace(/\s+/g, ' ');
          return {
            tag: el.tagName.toLowerCase(),
            text: text
          };
        }).filter(item => item !== null);

        return { links, content };
      });

      // 3. Generate Markdown Report
      let mdContent = `# Site Content Audit: ${p.name.toUpperCase()}\n`;
      mdContent += `URL: ${pageUrl}\n`;
      mdContent += `Generated: ${new Date().toLocaleString()}\n\n`;

      mdContent += `## 🔗 Navigation & Link Analysis\n`;
      mdContent += `| Link Text | Destination | Type |\n`;
      mdContent += `|-----------|-------------|------|\n`;
      
      data.links.forEach(link => {
        const type = link.isExternal ? 'External 🌍' : 'Internal 🏠';
        const safeText = link.text.replace(/\|/g, '\\|');
        mdContent += `| ${safeText} | ${link.href} | ${type} |\n`;
      });

      mdContent += `\n## 📄 Page Content Structure\n`;
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
          if (lastTag.startsWith('h')) mdContent += '\n';
          mdContent += `${item.text}\n\n`;
        }
        lastTag = item.tag;
      });

      fs.writeFileSync(path.join(OUTPUT_DIR, `${p.name}-content.md`), mdContent);
      await page.close();
    }
    
    console.log(`\n✅ Audit generated successfully in: ${OUTPUT_DIR}/`);

  } catch (error) {
    console.error('❌ Error during audit:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

generateAudit();
