const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

async function captureFooter() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9648;
  const tempDir = path.join(os.tmpdir(), 'chrome_footer_' + Date.now());
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
        await send('DOM.enable');

        await new Promise(r => setTimeout(r, 1500));

        // Scroll to footer
        await send('Runtime.evaluate', {
          expression: `
            const f = document.querySelector('footer');
            if (f) {
              window.scrollTo({ top: f.offsetTop, behavior: 'instant' });
            }
          `
        });

        await new Promise(r => setTimeout(r, 800));

        // Desktop screenshot of footer brand area
        const shotDesktop = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'footer_brand_updated_desktop.png'), Buffer.from(shotDesktop.data, 'base64'));

        // Switch to mobile viewport (390px)
        await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
        await send('Runtime.evaluate', {
          expression: `
            const f = document.querySelector('footer');
            if (f) {
              const rect = f.getBoundingClientRect();
              window.scrollTo({ top: window.scrollY + rect.top, behavior: 'instant' });
            }
          `
        });

        await new Promise(r => setTimeout(r, 1000));

        const shotMobile = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(ARTIFACT_DIR, 'footer_brand_updated_mobile.png'), Buffer.from(shotMobile.data, 'base64'));

        console.log('Successfully captured desktop and mobile footer screenshots');
        ws.close();
        p.kill();
        process.exit(0);
      } catch (err) {
        console.error('Error:', err);
        p.kill();
        process.exit(1);
      }
    });
  }).on('error', (e) => {
    console.error('HTTP error:', e);
    p.kill();
    process.exit(1);
  });
}

captureFooter();
