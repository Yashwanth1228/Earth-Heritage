const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TEMP_USER_DATA = path.join(os.tmpdir(), 'chrome_cdp_shots_' + Date.now());

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
  if (!fs.existsSync(TEMP_USER_DATA)) fs.mkdirSync(TEMP_USER_DATA, { recursive: true });

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9225',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${TEMP_USER_DATA}`,
    '--window-size=1440,900',
    'http://localhost:3000'
  ]);

  try {
    let target = null;
    for (let i = 0; i < 30; i++) {
      await sleep(300);
      try {
        const targets = await httpGet('http://127.0.0.1:9225/json/list');
        if (targets && targets.length > 0) {
          const pageTarget = targets.find(t => t.type === 'page');
          if (pageTarget) { target = pageTarget; break; }
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

    await sleep(2500);

    // 1. Scroll past hero
    await send('Input.dispatchMouseEvent', {
      type: 'mouseWheel',
      x: 720,
      y: 450,
      deltaX: 0,
      deltaY: 1000
    });
    await sleep(1500);

    // Capture screenshot showing BOTH buttons (Enquire Now at bottom-center + WhatsApp at bottom-right)
    const shot1 = await send('Page.captureScreenshot', { format: 'png' });
    const shot1Path = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c\\scratch\\shot_both_buttons_visible.png';
    fs.writeFileSync(shot1Path, Buffer.from(shot1.data, 'base64'));
    console.log('Saved shot 1 to:', shot1Path);

    // 2. Click "Enquire Now" to open modal
    await evaluate(`
      (() => {
        const btn = document.querySelector('button[aria-label="Open Earth Heritage enquiry form"]');
        if (btn) btn.click();
      })()
    `);
    await sleep(700);

    // Capture screenshot showing Modal Open with form and background lock
    const shot2 = await send('Page.captureScreenshot', { format: 'png' });
    const shot2Path = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c\\scratch\\shot_modal_open.png';
    fs.writeFileSync(shot2Path, Buffer.from(shot2.data, 'base64'));
    console.log('Saved shot 2 to:', shot2Path);

    ws.close();
  } finally {
    chromeProc.kill();
    try { fs.rmSync(TEMP_USER_DATA, { recursive: true, force: true }); } catch (e) {}
  }
}

main().catch(console.error);
