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

async function run() {
  const tempUserData = path.join(os.tmpdir(), 'chrome_cdp_test_slide2_' + Date.now());
  fs.mkdirSync(tempUserData, { recursive: true });
  const port = 9375;

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${tempUserData}`,
    '--window-size=1440,900',
    'http://localhost:3000/'
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
      if (res.exceptionDetails) {
        throw new Error(res.exceptionDetails.exception?.description || res.exceptionDetails.text);
      }
      return res.result?.value;
    }

    async function captureScreenshot(filepath) {
      const res = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(filepath, Buffer.from(res.data, 'base64'));
      console.log('Saved screenshot:', filepath);
    }

    await send('Page.enable');
    await send('DOM.enable');
    await sleep(1500);

    // Navigate to Slide 02
    console.log('Waiting for Slide 02...');
    await sleep(6500);

    // Test Option A on Slide 02: Deep forest green / charcoal typography
    await evaluate(`(() => {
      const h2 = document.querySelector('#hero h2');
      if (h2) {
        const line1 = h2.querySelector('span:first-child');
        const line2 = h2.querySelector('span:last-child');
        if (line1) {
          line1.querySelectorAll('span').forEach(s => {
            s.style.color = '#0F2114';
            s.style.fontWeight = '500';
          });
        }
        if (line2) {
          line2.querySelectorAll('span').forEach(s => {
            s.style.color = '#5C3E14';
            s.style.fontWeight = '500';
          });
        }
      }
      const p = document.querySelector('#hero p');
      if (p) {
        p.style.color = '#1C2E20';
        p.style.fontWeight = '400';
        p.style.textShadow = 'none';
      }
    })()`);

    await captureScreenshot(path.join(ARTIFACT_DIR, 'test_slide_02_dark_font.png'));

    // Test Option B on Slide 02: Crisp White with soft text legibility shadow (drop-shadow)
    await evaluate(`(() => {
      const h2 = document.querySelector('#hero h2');
      if (h2) {
        const line1 = h2.querySelector('span:first-child');
        const line2 = h2.querySelector('span:last-child');
        if (line1) {
          line1.querySelectorAll('span').forEach(s => {
            s.style.color = '#FFFFFF';
            s.style.fontWeight = '400';
            s.style.textShadow = '0 2px 14px rgba(0,0,0,0.85), 0 0 2px rgba(0,0,0,0.9)';
          });
        }
        if (line2) {
          line2.querySelectorAll('span').forEach(s => {
            s.style.color = '#E5C378';
            s.style.fontWeight = '400';
            s.style.textShadow = '0 2px 14px rgba(0,0,0,0.85), 0 0 2px rgba(0,0,0,0.9)';
          });
        }
      }
      const p = document.querySelector('#hero p');
      if (p) {
        p.style.color = '#EDE7DE';
        p.style.textShadow = '0 1px 8px rgba(0,0,0,0.8)';
      }
    })()`);

    await captureScreenshot(path.join(ARTIFACT_DIR, 'test_slide_02_shadow_font.png'));

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    try { chromeProc.kill(); } catch (e) {}
    try { fs.rmSync(tempUserData, { recursive: true, force: true }); } catch (e) {}
  }
}

run();
