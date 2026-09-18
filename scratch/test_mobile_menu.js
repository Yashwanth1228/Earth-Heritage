const http = require('http');
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

async function testMobileMenu() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9655;
  const tempDir = path.join(os.tmpdir(), 'chrome_mobmenu_' + Date.now());
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
      await send('Page.navigate', { url: 'http://localhost:3000/' });
      await new Promise(r => setTimeout(r, 2500));

      // Click mobile menu button
      const openRes = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const btn = document.querySelector('header button[aria-label*="mobile" i], header button[aria-label*="Open mobile" i]');
            if (!btn) return { found: false };
            btn.click();
            return { found: true };
          })()
        `,
        returnByValue: true
      });
      console.log('Clicked menu button:', openRes.result.value);
      await new Promise(r => setTimeout(r, 600));

      const drawerState = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const drawer = document.querySelector('div[role="dialog"][aria-label="Mobile Navigation"]');
            return {
              isOpen: !!drawer,
              bodyOverflow: document.body.style.overflow,
              linksCount: drawer ? drawer.querySelectorAll('nav a').length : 0
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Drawer State after click:', drawerState.result.value);

      ws.close();
      p.kill();
      process.exit(0);
    });
  });
}
testMobileMenu();
