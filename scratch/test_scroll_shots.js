const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

async function runScrollShots() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9470;
  const tempDir = path.join(os.tmpdir(), 'chrome_scroll_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });

  const p = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + tempDir,
    '--window-size=1440,1100',
    'http://localhost:3000/lp/managed-farmland'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  http.get(`http://127.0.0.1:${port}/json/list`, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', async () => {
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

      await new Promise(r => ws.onopen = r);
      await send('Page.enable');

      // Scroll down to section 3 (Split Section)
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, 1100)` });
      await new Promise(r => setTimeout(r, 600));
      const shot2 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, 'lp_managed_farmland_split.png'), Buffer.from(shot2.data, 'base64'));

      // Scroll down to section 4 (What We Manage)
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, 2000)` });
      await new Promise(r => setTimeout(r, 600));
      const shot3 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, 'lp_managed_farmland_manage.png'), Buffer.from(shot3.data, 'base64'));

      // Scroll down to FAQ & Final CTA
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, 5200)` });
      await new Promise(r => setTimeout(r, 600));
      const shot4 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, 'lp_managed_farmland_faq_cta.png'), Buffer.from(shot4.data, 'base64'));

      ws.close();
      p.kill();
      try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
      process.exit(0);
    });
  });
}

runScrollShots().catch(console.error);
