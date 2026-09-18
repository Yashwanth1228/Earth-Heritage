const puppeteer = require('puppeteer-core');
const http = require('http');

function getWsEndpoint() {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json/version', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.webSocketDebuggerUrl);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  let browser;
  try {
    const wsEndpoint = await getWsEndpoint();
    browser = await puppeteer.connect({ browserWSEndpoint: wsEndpoint });
    const page = await browser.newPage();

    const viewports = [
      { name: 'Desktop (1440px)', width: 1440, height: 900 },
      { name: 'Tablet (768px)', width: 768, height: 1024 },
      { name: 'Mobile (390px)', width: 390, height: 844 }
    ];

    console.log('=== BROWSER VIEWPORT & INTERACTION TEST ===\n');

    for (const vp of viewports) {
      console.log(`Testing ${vp.name}...`);
      await page.setViewport({ width: vp.width, height: vp.height });

      // Test /
      await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
      await page.evaluate(() => new Promise(r => setTimeout(r, 1000)));

      let hasOverflowHome = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      console.log(`  - / Horizontal Overflow: ${hasOverflowHome}`);

      // Test /lp/managed-farmland
      await page.goto('http://localhost:3000/lp/managed-farmland', { waitUntil: 'domcontentloaded' });
      await page.evaluate(() => new Promise(r => setTimeout(r, 1000)));

      let hasOverflowLp = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      console.log(`  - /lp/managed-farmland Horizontal Overflow: ${hasOverflowLp}`);

      // Scroll test on /lp/managed-farmland
      await page.evaluate(() => window.scrollTo(0, 1200));
      await page.evaluate(() => new Promise(r => setTimeout(r, 600)));

      const isHeaderVisible = await page.evaluate(() => {
        const header = document.querySelector('header[aria-label="Earth Heritage Corporate Navigation"]');
        if (!header) return false;
        const inner = header.firstElementChild;
        return inner && !inner.className.includes('invisible') && !inner.className.includes('opacity-0');
      });
      console.log(`  - /lp/managed-farmland Header revealed on scroll: ${isHeaderVisible}`);
    }

    await page.close();
    await browser.disconnect();
    console.log('\n=== BROWSER CDP TESTS COMPLETED SUCCESSFULLY ===');
  } catch (err) {
    console.log('CDP connection note:', err.message);
    if (browser) await browser.disconnect();
  }
}

run();
