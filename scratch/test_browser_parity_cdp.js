const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

async function runParityQA() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9520;
  const tempDir = path.join(os.tmpdir(), 'chrome_parity_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });

  const p = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + tempDir,
    '--window-size=1440,1100',
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

        await new Promise(r => ws.onopen = r);
        await send('Page.enable');
        await send('DOM.enable');

        const viewports = [
          { name: 'desktop', width: 1440, height: 1100 },
          { name: 'tablet', width: 768, height: 1024 },
          { name: 'mobile', width: 390, height: 844 }
        ];

        console.log('=== VERIFYING / and /lp/managed-farmland IN BROWSER ===\n');

        for (const vp of viewports) {
          console.log(`[Testing Viewport: ${vp.name.toUpperCase()} (${vp.width}x${vp.height})]`);
          await send('Emulation.setDeviceMetricsOverride', {
            width: vp.width,
            height: vp.height,
            deviceScaleFactor: 1,
            mobile: vp.name === 'mobile'
          });

          // Test /
          await send('Page.navigate', { url: 'http://localhost:3000/' });
          await new Promise(r => setTimeout(r, 2000));
          const evalHome = await send('Runtime.evaluate', {
            expression: `({
              scrollWidth: document.documentElement.scrollWidth,
              innerWidth: window.innerWidth,
              overflow: document.documentElement.scrollWidth > window.innerWidth,
              heroFound: !!document.getElementById('hero'),
              headerFound: !!document.querySelector('header[aria-label="Earth Heritage Corporate Navigation"]'),
              footerFound: !!document.querySelector('footer[aria-label="Earth Heritage Corporate Footer"]')
            })`,
            returnByValue: true
          });
          console.log(`  Route /:`, evalHome.result.value);

          // Test /lp/managed-farmland
          await send('Page.navigate', { url: 'http://localhost:3000/lp/managed-farmland' });
          await new Promise(r => setTimeout(r, 2000));
          const evalLp = await send('Runtime.evaluate', {
            expression: `({
              scrollWidth: document.documentElement.scrollWidth,
              innerWidth: window.innerWidth,
              overflow: document.documentElement.scrollWidth > window.innerWidth,
              heroFound: !!document.getElementById('hero'),
              headerFound: !!document.querySelector('header[aria-label="Earth Heritage Corporate Navigation"]'),
              footerFound: !!document.querySelector('footer[aria-label="Earth Heritage Corporate Footer"]')
            })`,
            returnByValue: true
          });
          console.log(`  Route /lp/managed-farmland:`, evalLp.result.value);

          // Scroll test on /lp/managed-farmland
          await send('Runtime.evaluate', { expression: `window.scrollTo(0, 1400);` });
          await new Promise(r => setTimeout(r, 800));

          const scrollEval = await send('Runtime.evaluate', {
            expression: `({
              scrollY: window.scrollY,
              headerVisible: (() => {
                const header = document.querySelector('header[aria-label="Earth Heritage Corporate Navigation"]');
                if (!header) return false;
                const inner = header.firstElementChild;
                return inner && !inner.className.includes('invisible') && !inner.className.includes('opacity-0');
              })(),
              floatingEnquiryVisible: (() => {
                const btn = document.querySelector('button[aria-label="Quick enquiry"]');
                return btn && !btn.className.includes('opacity-0');
              })()
            })`,
            returnByValue: true
          });
          console.log(`  Scroll check (scrollY=1400):`, scrollEval.result.value);

          // Capture screenshot for visual audit
          const shot = await send('Page.captureScreenshot', { format: 'png' });
          const shotPath = path.join(ARTIFACT_DIR, `parity_lp_${vp.name}.png`);
          fs.writeFileSync(shotPath, Buffer.from(shot.data, 'base64'));
          console.log(`  Saved screenshot: ${shotPath}\n`);
        }

        console.log('=== BROWSER PARITY VERIFICATION COMPLETE ===');
        ws.close();
        p.kill();
        process.exit(0);
      } catch (err) {
        console.error('Test error:', err);
        p.kill();
        process.exit(1);
      }
    });
  });
}

runParityQA().catch(console.error);
