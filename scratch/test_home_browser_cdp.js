const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c';

async function runHomeBrowserQA() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9530;
  const tempDir = path.join(os.tmpdir(), 'chrome_home_' + Date.now());
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

        console.log('=== VERIFYING NEW HOME IN BROWSER ===\n');

        for (const vp of viewports) {
          console.log(`[Testing Viewport: ${vp.name.toUpperCase()} (${vp.width}x${vp.height})]`);
          await send('Emulation.setDeviceMetricsOverride', {
            width: vp.width,
            height: vp.height,
            deviceScaleFactor: 1,
            mobile: vp.name === 'mobile'
          });

          await send('Page.navigate', { url: 'http://localhost:3000/' });
          await new Promise(r => setTimeout(r, 2000));

          const evalHome = await send('Runtime.evaluate', {
            expression: `({
              scrollWidth: document.documentElement.scrollWidth,
              innerWidth: window.innerWidth,
              overflow: document.documentElement.scrollWidth > window.innerWidth,
              heroFound: !!document.getElementById('home-hero'),
              headerFound: !!document.querySelector('header[aria-label="Earth Heritage Corporate Navigation"]'),
              footerFound: !!document.querySelector('footer[aria-label="Earth Heritage Corporate Footer"]'),
              navbarVisibleTop: (() => {
                const header = document.querySelector('header[aria-label="Earth Heritage Corporate Navigation"]');
                if (!header) return false;
                const inner = header.firstElementChild;
                return inner && !inner.className.includes('invisible') && !inner.className.includes('opacity-0');
              })(),
              navbarIsDarkTheme: (() => {
                const header = document.querySelector('header[aria-label="Earth Heritage Corporate Navigation"]');
                if (!header) return false;
                const inner = header.firstElementChild;
                return inner && inner.className.includes('bg-[#0e2114]');
              })()
            })`,
            returnByValue: true
          });
          console.log(`  Top state:`, evalHome.result.value);

          // Scroll down to test navbar theme adaptation and floating controls
          await send('Runtime.evaluate', { expression: `window.scrollTo(0, 1200);` });
          await new Promise(r => setTimeout(r, 600));

          const evalScrolled = await send('Runtime.evaluate', {
            expression: `({
              scrollY: window.scrollY,
              navbarVisibleScrolled: (() => {
                const header = document.querySelector('header[aria-label="Earth Heritage Corporate Navigation"]');
                if (!header) return false;
                const inner = header.firstElementChild;
                return inner && !inner.className.includes('invisible');
              })()
            })`,
            returnByValue: true
          });
          console.log(`  Scrolled state (scrollY=1200):`, evalScrolled.result.value);

          // Capture screenshot
          const shot = await send('Page.captureScreenshot', { format: 'png' });
          const shotPath = path.join(ARTIFACT_DIR, `new_home_${vp.name}.png`);
          fs.writeFileSync(shotPath, Buffer.from(shot.data, 'base64'));
          console.log(`  Saved screenshot: ${shotPath}\n`);
        }

        console.log('=== BROWSER VALIDATION COMPLETE ===');
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

runHomeBrowserQA().catch(console.error);
