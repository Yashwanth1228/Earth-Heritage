const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

async function captureAll() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9680;
  const tempDir = path.join(os.tmpdir(), 'chrome_all_' + Date.now());
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
    let d = ''; res.on('data', c => d += c);
    res.on('end', async () => {
      const targets = JSON.parse(d);
      const page = targets.find(t => t.type === 'page');
      const ws = new WebSocket(page.webSocketDebuggerUrl);
      await new Promise(r => ws.addEventListener('open', r, { once: true }));

      let id = 1;
      const send = (method, params = {}) => new Promise(res => {
        const myId = id++;
        const h = (e) => {
          const msg = JSON.parse(e.data);
          if (msg.id === myId) {
            ws.removeEventListener('message', h);
            res(msg.result);
          }
        };
        ws.addEventListener('message', h);
        ws.send(JSON.stringify({ id: myId, method, params }));
      });

      await send('Page.enable');
      await send('Runtime.enable');

      // 1. Desktop 1440
      await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
      await new Promise(r => setTimeout(r, 1200));
      const shot1440 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, 'hero_editorial_desktop_1440.png'), Buffer.from(shot1440.data, 'base64'));

      // Check overflow 1440
      const ov1440 = await send('Runtime.evaluate', {
        expression: '({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth })',
        returnByValue: true
      });

      // 2. Tablet 1024
      await send('Emulation.setDeviceMetricsOverride', { width: 1024, height: 768, deviceScaleFactor: 1, mobile: false });
      await new Promise(r => setTimeout(r, 1200));
      const shot1024 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, 'hero_editorial_tablet_1024.png'), Buffer.from(shot1024.data, 'base64'));

      // Check overflow 1024
      const ov1024 = await send('Runtime.evaluate', {
        expression: '({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth })',
        returnByValue: true
      });

      // 3. Mobile 390
      await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
      await new Promise(r => setTimeout(r, 1200));
      const shot390 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, 'hero_editorial_mobile_390.png'), Buffer.from(shot390.data, 'base64'));

      // Check overflow 390
      const ov390 = await send('Runtime.evaluate', {
        expression: '({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth })',
        returnByValue: true
      });

      // 4. Verify LP preservation
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

      const audit = {
        overflow1440: ov1440.result.value,
        overflow1024: ov1024.result.value,
        overflow390: ov390.result.value,
        lpAll11SectionsPresent: lpCheck.result.value
      };

      console.log('AUDIT RESULT:', JSON.stringify(audit, null, 2));
      fs.writeFileSync(path.join(ARTIFACT_DIR, 'final_hero_audit.json'), JSON.stringify(audit, null, 2));

      ws.close();
      p.kill();
      process.exit(0);
    });
  });
}

captureAll();
