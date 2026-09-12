const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TEMP_USER_DATA = path.join(os.tmpdir(), 'chrome_cdp_pulse_' + Date.now());

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
  if (!fs.existsSync(TEMP_USER_DATA)) fs.mkdirSync(TEMP_USER_DATA, { recursive: true });

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9227',
    '--disable-gpu',
    `--user-data-dir=${TEMP_USER_DATA}`,
    '--window-size=1440,900',
    'http://localhost:3000'
  ]);

  try {
    let target = null;
    for (let i = 0; i < 30; i++) {
      await sleep(300);
      try {
        const targets = await httpGet('http://127.0.0.1:9227/json/list');
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

    await send('Runtime.enable');
    await send('Page.enable');
    await sleep(2200);

    // Scroll to 900px
    await send('Input.dispatchMouseEvent', {
      type: 'mouseWheel',
      x: 720,
      y: 450,
      deltaX: 0,
      deltaY: 900
    });
    await sleep(700);

    // Capture screenshot of both active buttons with ~2s pulse & ring
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    const shotPath = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c\\screenshot_active_2s_pulse.png';
    fs.writeFileSync(shotPath, Buffer.from(shot.data, 'base64'));
    console.log('Saved 2s pulse screenshot to:', shotPath);

    ws.close();
  } finally {
    chromeProc.kill();
    try { fs.rmSync(TEMP_USER_DATA, { recursive: true, force: true }); } catch (e) {}
  }
}

main().catch(console.error);
