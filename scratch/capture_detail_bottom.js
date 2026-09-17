const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = path.resolve('C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c');

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

async function captureBottom() {
  const tempUserData = path.join(os.tmpdir(), 'chrome_cdp_bot_' + Date.now());
  fs.mkdirSync(tempUserData, { recursive: true });
  const port = 9345;

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${tempUserData}`,
    '--window-size=1440,1000',
    'http://localhost:3000/projects/managed-farmland-concept-i'
  ]);

  try {
    let target = null;
    for (let i = 0; i < 30; i++) {
      await sleep(300);
      try {
        const targets = await httpGet(`http://127.0.0.1:${port}/json/list`);
        if (targets && targets.length > 0) {
          const pageTarget = targets.find(t => t.type === 'page');
          if (pageTarget) {
            target = pageTarget;
            break;
          }
        }
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
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
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

    // 1. Scroll directly to Gallery
    await evaluate(`(() => {
      const gal = document.getElementById('project-gallery');
      if (gal) gal.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()`);
    await sleep(800);
    const shotGal = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'project_detail_gallery_view.png'), Buffer.from(shotGal.data, 'base64'));
    console.log('✓ Captured project_detail_gallery_view.png');

    // 2. Scroll directly to Navigation & CTA
    await evaluate(`(() => {
      const nav = document.querySelector('nav[aria-label="Adjacent Projects Navigation"]');
      if (nav) nav.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()`);
    await sleep(800);
    const shotBottom = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'project_detail_navigation_and_cta.png'), Buffer.from(shotBottom.data, 'base64'));
    console.log('✓ Captured project_detail_navigation_and_cta.png');

    ws.close();
  } finally {
    chromeProc.kill();
    try { fs.rmSync(tempUserData, { recursive: true, force: true }); } catch (e) {}
  }
}

captureBottom().catch(err => {
  console.error(err);
  process.exit(1);
});
