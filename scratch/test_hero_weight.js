const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DIR = path.join(os.tmpdir(), 'chrome_cdp_weight_' + Date.now());
fs.mkdirSync(DIR, { recursive: true });

const p = spawn(CHROME, ['--headless=new', '--remote-debugging-port=9377', '--disable-gpu', '--no-first-run', '--user-data-dir=' + DIR, '--window-size=375,750', 'http://localhost:3000/']);

setTimeout(async () => {
  try {
    const list = await new Promise((res, rej) => http.get('http://127.0.0.1:9377/json/list', r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => res(JSON.parse(d)));
    }).on('error', rej));

    const target = list.find(t => t.type === 'page');
    const ws = new globalThis.WebSocket(target.webSocketDebuggerUrl);
    await new Promise(r => ws.addEventListener('open', r, { once: true }));

    let id = 1;
    const send = (m, params = {}) => new Promise(r => {
      const mid = id++;
      const h = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.id === mid) {
          ws.removeEventListener('message', h);
          r(msg.result);
        }
      };
      ws.addEventListener('message', h);
      ws.send(JSON.stringify({ id: mid, method: m, params }));
    });

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 750, deviceScaleFactor: 2, mobile: true });
    await new Promise(r => setTimeout(r, 4000));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(__dirname, 'mobile_hero_slide1_weight_test.png'), Buffer.from(shot.data, 'base64'));

    const metrics = await send('Runtime.evaluate', {
      expression: `(() => {
        const h1 = document.querySelector('#hero h1');
        const lines = Array.from(h1 ? h1.querySelectorAll('span.block') : []);
        return {
          windowWidth: window.innerWidth,
          lines: lines.map(l => {
            const r = l.getBoundingClientRect();
            return {
              text: l.innerText.replace(/\\n/g, ' '),
              left: r.left,
              right: r.right,
              width: r.width,
              isOverflowing: r.right > window.innerWidth
            };
          })
        };
      })()`,
      returnByValue: true
    });

    console.log('METRICS:', JSON.stringify(metrics.result.value, null, 2));
    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    p.kill();
    try { fs.rmSync(DIR, { recursive: true, force: true }); } catch (e) {}
  }
}, 1200);
