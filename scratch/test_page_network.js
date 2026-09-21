const http = require('http');
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

async function testPageNetwork() {
  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9662;
  const tempDir = path.join(os.tmpdir(), 'chrome_net_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });

  const p = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + tempDir,
    '--window-size=390,844',
    'http://localhost:3000/'
  ]);
  await new Promise(r => setTimeout(r, 2500));

  http.get(`http://127.0.0.1:${port}/json/list`, res => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', async () => {
      try {
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
        await send('Network.enable');

        ws.addEventListener('message', (e) => {
          const msg = JSON.parse(e.data);
          if (msg.method === 'Log.entryAdded') {
            console.log('LOG:', msg.params.entry);
          }
          if (msg.method === 'Network.responseReceived') {
            const url = msg.params.response.url;
            if (url.includes('.css') || url.includes('/_next/')) {
              // console.log('NET:', msg.params.response.status, url);
            }
          }
        });

        await send('Emulation.setDeviceMetricsOverride', {
          width: 390,
          height: 844,
          deviceScaleFactor: 2,
          mobile: true
        });

        await send('Page.navigate', { url: 'http://localhost:3000/' });
        // Wait for page load event
        await new Promise(resolve => {
          const handler = (e) => {
            const msg = JSON.parse(e.data);
            if (msg.method === 'Page.loadEventFired') {
              ws.removeEventListener('message', handler);
              resolve();
            }
          };
          ws.addEventListener('message', handler);
          setTimeout(resolve, 5000);
        });

        await new Promise(r => setTimeout(r, 2000));

        // Let's check computed styles of .aspect-[16/10] in community-events
        const checkStyles = await send('Runtime.evaluate', {
          expression: `(() => {
            const el = document.querySelector('#community-events button');
            if (!el) return { found: false };
            const comp = window.getComputedStyle(el);
            return {
              found: true,
              display: comp.display,
              position: comp.position,
              borderRadius: comp.borderRadius,
              width: comp.width,
              height: comp.height,
              classList: Array.from(el.classList)
            };
          })()`,
          returnByValue: true
        });
        console.log('EVENTS BUTTON STYLES:', checkStyles.result.value);

        // Scroll to events smoothly so images load
        await send('Runtime.evaluate', {
          expression: `(() => {
            const el = document.getElementById('community-events');
            if (el) el.scrollIntoView();
          })()`
        });
        await new Promise(r => setTimeout(r, 2500));

        const eventsShot = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync('scratch/inspect_mobile_events_centered2.png', Buffer.from(eventsShot.data, 'base64'));
        console.log('Saved scratch/inspect_mobile_events_centered2.png');

        p.kill();
        process.exit(0);
      } catch (e) {
        console.error(e);
        p.kill();
        process.exit(1);
      }
    });
  });
}

testPageNetwork();
