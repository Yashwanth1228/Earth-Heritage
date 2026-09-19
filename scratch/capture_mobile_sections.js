const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

async function captureMobile() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9698;
  const tempDir = path.join(os.tmpdir(), 'chrome_mob_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });

  const p = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + tempDir,
    '--window-size=390,844',
    'http://localhost:3000/'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  http.get(`http://127.0.0.1:${port}/json/list`, (res) => {
    let d = ''; res.on('data', c => d += c);
    res.on('end', async () => {
      try {
        const targets = JSON.parse(d);
        const page = targets.find(t => t.type === 'page');
        const ws = new WebSocket(page.webSocketDebuggerUrl);
        await new Promise(r => ws.addEventListener('open', r, { once: true }));

        let id = 1;
        const send = (method, params = {}) => new Promise(resolve => {
          const myId = id++;
          const h = (e) => {
            const msg = JSON.parse(e.data);
            if (msg.id === myId) {
              ws.removeEventListener('message', h);
              resolve(msg.result);
            }
          };
          ws.addEventListener('message', h);
          ws.send(JSON.stringify({ id: myId, method, params }));
        });

        await send('Page.enable');
        await send('Runtime.enable');
        await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });

        const sections = [
          { id: 'about-overview', file: 'mobile_sec02_about.png' },
          { id: 'managed-farmland-overview', file: 'mobile_sec03_managed_farmland.png' },
          { id: 'how-it-works-overview', file: 'mobile_sec04_how_it_works.png' },
          { id: 'contact-location', file: 'mobile_sec08_contact.png' }
        ];

        for (const s of sections) {
          await send('Runtime.evaluate', {
            expression: `document.getElementById('${s.id}')?.scrollIntoView({ behavior: 'instant', block: 'start' })`
          });
          await new Promise(r => setTimeout(r, 800));
          const shot = await send('Page.captureScreenshot', { format: 'png' });
          fs.writeFileSync(path.join(ARTIFACT_DIR, s.file), Buffer.from(shot.data, 'base64'));
          console.log(`✓ Saved ${s.file}`);
        }

        p.kill();
        process.exit(0);
      } catch (err) {
        console.error(err);
        p.kill();
        process.exit(1);
      }
    });
  });
}

captureMobile();
