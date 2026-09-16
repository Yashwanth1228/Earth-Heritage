const puppeteer = require('puppeteer');

async function testBrowser() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Test 1: /projects
  await page.setViewport({ width: 1440, height: 900 });
  const res1 = await page.goto('http://localhost:3000/projects', { waitUntil: 'networkidle2' });
  console.log('/projects status:', res1.status());
  
  // Check horizontal overflow
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  console.log(`ScrollWidth: ${scrollWidth}, ClientWidth: ${clientWidth} (Overflow: ${scrollWidth > clientWidth})`);
  
  await page.screenshot({ path: 'scratch/projects_page_verified.png' });
  console.log('Saved scratch/projects_page_verified.png');

  // Test 2: /projects/invalid-slug
  const res2 = await page.goto('http://localhost:3000/projects/invalid-slug', { waitUntil: 'networkidle2' });
  console.log('/projects/invalid-slug status:', res2.status());
  await page.screenshot({ path: 'scratch/projects_404_verified.png' });
  console.log('Saved scratch/projects_404_verified.png');

  await browser.close();
}

testBrowser().catch(err => {
  console.error('Browser test error:', err);
  process.exit(1);
});
