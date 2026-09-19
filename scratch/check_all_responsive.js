const http = require('http');
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

const ROUTES = [
  '/',
  '/about',
  '/managed-farmland',
  '/farm-management',
  '/how-it-works',
  '/projects',
  '/projects/managed-farmland-concept-i',
  '/gallery',
  '/blogs',
  '/blogs/understanding-managed-farmland',
  '/events',
  '/contact',
  '/privacy-policy',
  '/terms',
  '/disclaimer'
];

const VIEWPORTS = [
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-375', width: 375, height: 667 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'tablet-1024', width: 1024, height: 768 }
];

async function checkResponsive() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9656;
  const tempDir = path.join(os.tmpdir(), 'chrome_audit_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });

  const p = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + tempDir,
    '--window-size=390,844',
    'http://localhost:3000/'
  ]);
  await new Promise(r => setTimeout(r, 2000));

  http.get(`http://127.0.0.1:${port}/json/list`, res => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', async () => {
      const targets = JSON.parse(data);
      const page = targets.find(t => t.type === 'page');
      const ws = new WebSocket(page.webSocketDebuggerUrl);
      let id = 1;
      const send = (method, params = {}) => new Promise(resolve => {
        const myId = id++;
        const handler = e => {
          const msg = JSON.parse(e.data);
          if (msg.id === myId) {
            ws.removeEventListener('message', handler);
            resolve(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: myId, method, params }));
      });
      await new Promise(r => ws.onopen = r);
      await send('Page.enable');
      await send('DOM.enable');

      console.log('=== AUDITING RESPONSIVENESS ACROSS ALL ROUTES ===');
      const issues = [];

      for (const route of ROUTES) {
        for (const vp of VIEWPORTS) {
          await send('Emulation.setDeviceMetricsOverride', {
            width: vp.width,
            height: vp.height,
            deviceScaleFactor: 2,
            mobile: vp.width < 768
          });

          await send('Page.navigate', { url: `http://localhost:3000${route}` });
          await new Promise(r => setTimeout(r, 1200));

          const res = await send('Runtime.evaluate', {
            expression: `
              (() => {
                const scrollW = document.documentElement.scrollWidth;
                const innerW = window.innerWidth;
                const clientW = document.documentElement.clientWidth;
                const hasOverflow = scrollW > innerW + 1; // 1px tolerance
                
                let overflowingElements = [];
                if (hasOverflow) {
                  const all = document.querySelectorAll('*');
                  for (const el of all) {
                    const rect = el.getBoundingClientRect();
                    if (rect.right > innerW + 2) {
                      overflowingElements.push({
                        tag: el.tagName,
                        id: el.id,
                        className: (el.className && typeof el.className === 'string') ? el.className.slice(0, 80) : '',
                        right: Math.round(rect.right),
                        width: Math.round(rect.width)
                      });
                      if (overflowingElements.length >= 5) break;
                    }
                  }
                }

                return {
                  route: "${route}",
                  viewport: "${vp.name}",
                  scrollW,
                  innerW,
                  clientW,
                  hasOverflow,
                  overflowingElements
                };
              })()
            `,
            returnByValue: true
          });

          const val = res.result.value;
          if (val.hasOverflow) {
            console.log(`[OVERFLOW DETECTED] ${val.route} @ ${val.viewport}: scrollWidth=${val.scrollW}, innerWidth=${val.innerW}`);
            issues.push(val);
          } else {
            console.log(`✓ OK: ${val.route} @ ${val.viewport} (scrollW: ${val.scrollW}, innerW: ${val.innerW})`);
          }
        }
      }

      console.log('\n=== AUDIT RESULTS SUMMARY ===');
      if (issues.length === 0) {
        console.log('ALL ROUTES AND VIEWPORTS PASSED WITH ZERO HORIZONTAL OVERFLOW!');
      } else {
        console.log(`Found ${issues.length} overflow instances:`);
        console.log(JSON.stringify(issues, null, 2));
      }

      ws.close();
      p.kill();
      process.exit(0);
    });
  });
}

checkResponsive().catch(err => {
  console.error(err);
  process.exit(1);
});
