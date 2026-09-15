const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TEMP_USER_DATA = path.join(os.tmpdir(), 'chrome_cdp_full_' + Date.now());

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
function httpGet(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve(data); }
      });
    }).on('error', reject);
  });
}

async function main() {
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9229',
    '--disable-gpu',
    `--user-data-dir=${TEMP_USER_DATA}`,
    '--window-size=1440,900',
    'http://localhost:3000/gallery'
  ]);

  try {
    let target = null;
    for (let i = 0; i < 30; i++) {
      await sleep(300);
      try {
        const targets = await httpGet('http://127.0.0.1:9229/json/list');
        const page = targets.find(t => t.type === 'page');
        if (page) { target = page; break; }
      } catch (e) {}
    }

    const ws = new WebSocket(target.webSocketDebuggerUrl);
    let msgId = 1;
    const pending = new Map();
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && pending.has(msg.id)) {
        const { resolve, reject } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) reject(msg.error); else resolve(msg.result);
      }
    };
    await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
    function send(method, params = {}) {
      const id = msgId++;
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });
    }
    async function evaluate(expression) {
      const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      return res.result?.value;
    }

    await send('Runtime.enable');
    await send('Page.enable');
    await sleep(2000);

    // Scroll to exhibition catalog
    await evaluate(`window.scrollTo({ top: 900, behavior: 'instant' })`);
    await sleep(600);
    const shotGrid = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c\\scratch\\gallery_grid_view.png', Buffer.from(shotGrid.data, 'base64'));

    // Scroll to philosophy & CTA
    await evaluate(`document.getElementById('gallery-philosophy')?.scrollIntoView({ block: 'center' })`);
    await sleep(1500);

    const philInfo = await evaluate(`
      (() => {
        const sec = document.getElementById('gallery-philosophy');
        const h2 = sec?.querySelector('h2');
        const p = sec?.querySelector('p');
        const badge = sec?.querySelector('span.font-mono');
        return {
          secRect: sec?.getBoundingClientRect(),
          h2Text: h2?.textContent,
          h2Opacity: h2 ? window.getComputedStyle(h2).opacity : null,
          h2ParentOpacity: h2?.parentElement ? window.getComputedStyle(h2.parentElement).opacity : null,
          h2ParentTransform: h2?.parentElement ? window.getComputedStyle(h2.parentElement).transform : null,
          pOpacity: p ? window.getComputedStyle(p).opacity : null,
          badgeOpacity: badge ? window.getComputedStyle(badge).opacity : null
        };
      })()
    `);
    console.log('Philosophy info:', philInfo);

    const shotPhilosophy = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c\\scratch\\gallery_philosophy_view.png', Buffer.from(shotPhilosophy.data, 'base64'));

    // Scroll to CTA
    await evaluate(`document.getElementById('cta')?.scrollIntoView({ block: 'center' })`);
    await sleep(1000);
    const shotCta = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c\\scratch\\gallery_cta_view.png', Buffer.from(shotCta.data, 'base64'));

    console.log('✓ Grid, Philosophy, and CTA screenshots captured.');
    ws.close();
  } finally {
    chromeProc.kill();
    try { fs.rmSync(TEMP_USER_DATA, { recursive: true, force: true }); } catch (e) {}
  }
}

main().catch(console.error);
