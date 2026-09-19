const http = require('http');
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

async function testDesktopEvents() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9658;
  const tempDir = path.join(os.tmpdir(), 'chrome_dt_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });

  const p = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + tempDir,
    '--window-size=1440,900',
    'http://localhost:3000/events'
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
      await send('Page.navigate', { url: 'http://localhost:3000/events' });
      await new Promise(r => setTimeout(r, 2000));

      const dtOrder = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const firstArticle = document.querySelector('#events-list article');
            if (!firstArticle) return { error: 'No article found' };
            const narrativeWrapper = firstArticle.querySelector('.order-2');
            const imageWrapper = firstArticle.querySelector('.order-1');
            if (!narrativeWrapper || !imageWrapper) return { error: 'Not found' };
            const narrRect = narrativeWrapper.getBoundingClientRect();
            const imgRect = imageWrapper.getBoundingClientRect();
            return {
              narrLeft: Math.round(narrRect.left),
              imgLeft: Math.round(imgRect.left),
              narrTop: Math.round(narrRect.top),
              imgTop: Math.round(imgRect.top),
              isSideBySide: Math.abs(narrRect.top - imgRect.top) < 60 && narrRect.left < imgRect.left
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Desktop Events side-by-side check:', dtOrder.result.value);

      ws.close();
      p.kill();
      process.exit(0);
    });
  });
}
testDesktopEvents().catch(console.error);
