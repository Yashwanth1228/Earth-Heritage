const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

async function auditHero() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9660;
  const tempDir = path.join(os.tmpdir(), 'chrome_hero_audit_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });

  const p = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + tempDir,
    '--window-size=1440,900',
    'http://localhost:3000/'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  http.get(`http://127.0.0.1:${port}/json/list`, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', async () => {
      try {
        const targets = JSON.parse(data);
        const page = targets.find(t => t.type === 'page');
        const ws = new WebSocket(page.webSocketDebuggerUrl);

        let id = 1;
        const send = (method, params = {}) => new Promise(resolve => {
          const myId = id++;
          const handler = (e) => {
            const msg = JSON.parse(e.data);
            if (msg.id === myId) {
              ws.removeEventListener('message', handler);
              resolve(msg.result);
            }
          };
          ws.addEventListener('message', handler);
          ws.send(JSON.stringify({ id: myId, method, params }));
        });

        await new Promise(r => ws.addEventListener('open', r, { once: true }));
        await send('Page.enable');
        await send('Runtime.enable');
        await send('DOM.enable');

        // 1. DESKTOP VIEWPORT (1440px)
        await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
        await send('Page.navigate', { url: 'http://localhost:3000/' });
        
        // Wait for hero image to complete loading
        await send('Runtime.evaluate', {
          awaitPromise: true,
          expression: `new Promise((resolve) => {
            const check = () => {
              const img = document.querySelector('#hero img');
              if (img && img.complete && img.naturalWidth > 0) return resolve(true);
              setTimeout(check, 100);
            };
            check();
          })`
        });
        await new Promise(r => setTimeout(r, 600));

        const shot1440 = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'hero_redesign_desktop_1440.png'), Buffer.from(shot1440.data, 'base64'));

        // Check overflow at 1440
        const overflow1440 = await send('Runtime.evaluate', {
          expression: '({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth })',
          returnByValue: true
        });

        // 2. TABLET VIEWPORT (1024px)
        await send('Emulation.setDeviceMetricsOverride', { width: 1024, height: 768, deviceScaleFactor: 1, mobile: false });
        await new Promise(r => setTimeout(r, 1000));
        const shot1024 = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'hero_redesign_tablet_1024.png'), Buffer.from(shot1024.data, 'base64'));

        // 3. MOBILE VIEWPORT (390px)
        await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
        await new Promise(r => setTimeout(r, 1000));
        const shot390 = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'hero_redesign_mobile_390.png'), Buffer.from(shot390.data, 'base64'));

        const overflow390 = await send('Runtime.evaluate', {
          expression: '({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth })',
          returnByValue: true
        });

        // 4. VERIFY /lp/managed-farmland
        await send('Page.navigate', { url: 'http://localhost:3000/lp/managed-farmland' });
        await new Promise(r => setTimeout(r, 2000));

        const lpCheck = await send('Runtime.evaluate', {
          expression: `
            const ids = [
              'hero', 'statement', 'responsibility', 'solution',
              'management-sequence', 'how-it-works', 'philosophy',
              'principles', 'founders', 'location', 'contact-cta'
            ];
            ids.every(id => document.getElementById(id) !== null)
          `,
          returnByValue: true
        });

        const report = {
          hero1440Overflow: overflow1440.result.value,
          hero390Overflow: overflow390.result.value,
          lpManagedFarmlandAll11SectionsPresent: lpCheck.result.value
        };

        fs.writeFileSync(path.join(ARTIFACT_DIR, 'hero_redesign_audit_report.json'), JSON.stringify(report, null, 2));
        console.log('AUDIT COMPLETE:', JSON.stringify(report, null, 2));

        ws.close();
        p.kill();
        process.exit(0);
      } catch (e) {
        console.error('Audit Error:', e);
        p.kill();
        process.exit(1);
      }
    });
  }).on('error', (err) => {
    console.error('Connection Error:', err);
    p.kill();
    process.exit(1);
  });
}

auditHero();
