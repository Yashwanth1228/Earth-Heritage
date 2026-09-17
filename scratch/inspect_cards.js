const { spawn } = require('child_process');
const http = require('http');
const path = require('path');
const os = require('os');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
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

async function run() {
  const tempDir = path.join(os.tmpdir(), 'chrome_cdp_inspect_' + Date.now());
  fs.mkdirSync(tempDir, { recursive: true });
  const port = 9340;
  const proc = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--disable-gpu',
    '--no-first-run',
    '--user-data-dir=' + tempDir,
    '--window-size=1440,1080',
    'http://localhost:3000/projects'
  ]);

  try {
    let target = null;
    for (let i = 0; i < 30; i++) {
      await sleep(300);
      try {
        const targets = await httpGet('http://127.0.0.1:' + port + '/json/list');
        if (targets && targets.length > 0) {
          const pt = targets.find(t => t.type === 'page');
          if (pt) { target = pt; break; }
        }
      } catch (e) {}
    }
    if (!target) throw new Error('Target not found');

    const ws = new WebSocket(target.webSocketDebuggerUrl);
    let msgId = 1;
    const pending = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && pending.has(msg.id)) {
        const { resolve, reject } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };

    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

    function send(method, params = {}) {
      const id = msgId++;
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    async function evaluate(exp) {
      const res = await send('Runtime.evaluate', { expression: exp, returnByValue: true, awaitPromise: true });
      return res.result?.value;
    }

    await send('Runtime.enable');
    await send('Page.enable');
    await sleep(2500);

    const cards = await evaluate(`
      (() => {
        const articles = document.querySelectorAll('#portfolio article');
        return Array.from(articles).map((a, i) => {
          const rect = a.getBoundingClientRect();
          return {
            index: i,
            top: Math.round(rect.top + window.scrollY),
            bottom: Math.round(rect.bottom + window.scrollY),
            height: Math.round(rect.height),
            title: a.querySelector('h3')?.innerText?.trim()
          };
        });
      })()
    `);

    console.log('Cards detected in DOM:', cards);

    const brainDir = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c\\scratch';

    // Now capture each card cleanly by scrolling card directly into view
    for (let i = 0; i < cards.length; i++) {
      await evaluate(`
        (() => {
          const a = document.querySelectorAll('#portfolio article')[${i}];
          if (a) {
            a.scrollIntoView({ behavior: 'instant', block: 'center' });
            window.dispatchEvent(new Event('scroll'));
          }
        })()
      `);
      await sleep(800);

      const shot = await send('Page.captureScreenshot', { format: 'png' });
      const filename = path.join(brainDir, `projects_equal_card_${i + 1}.png`);
      fs.writeFileSync(filename, Buffer.from(shot.data, 'base64'));
      console.log(`Saved screenshot for card ${i + 1}:`, filename);
    }

    ws.close();
  } finally {
    proc.kill();
    try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
  }
}

run().catch(console.error);
