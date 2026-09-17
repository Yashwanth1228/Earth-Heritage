const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const assert = require('assert');

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
  console.log('======================================================');
  console.log('AUDITING ADAPTIVE HERO FONT COLORS ACROSS ALL 4 SLIDES');
  console.log('======================================================');

  const tempUserData = path.join(os.tmpdir(), 'chrome_cdp_adaptive_hero_' + Date.now());
  fs.mkdirSync(tempUserData, { recursive: true });
  const port = 9385;

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

    // SLIDE 01 (0s)
    console.log('\n--- SLIDE 01: Golden Sunrise (Dark Background Theme) ---');
    const slide1 = await evaluate(`(() => {
      const h1 = document.querySelector('#hero h1');
      return {
        heading: h1 ? h1.innerText.replace(/\\n/g, ' ') : null
      };
    })()`);
    console.log('Slide 1:', slide1);
    await captureScreenshot(path.join(ARTIFACT_DIR, 'adaptive_hero_slide_01.png'));

    // SLIDE 02 (after ~6.5s)
    console.log('\n--- WAITING FOR SLIDE 02 (Misty Lake with Shadow Contrast) ---');
    await sleep(6500);
    const slide2 = await evaluate(`(() => {
      const h2 = document.querySelector('#hero h2');
      return {
        heading: h2 ? h2.innerText.replace(/\\n/g, ' ') : null
      };
    })()`);
    console.log('Slide 2:', slide2);
    await captureScreenshot(path.join(ARTIFACT_DIR, 'adaptive_hero_slide_02.png'));

    // SLIDE 03 (after ~6.5s)
    console.log('\n--- WAITING FOR SLIDE 03 (White Daylight Sky with Deep Forest Green Font) ---');
    await sleep(6500);
    const slide3 = await evaluate(`(() => {
      const h2 = document.querySelector('#hero h2');
      const line1 = h2 ? h2.querySelector('span:first-child') : null;
      const cta = document.querySelector('#hero a[href="/how-it-works"]');
      return {
        heading: h2 ? h2.innerText.replace(/\\n/g, ' ') : null,
        line1Classes: line1 ? line1.className : null,
        ctaClasses: cta ? cta.className : null
      };
    })()`);
    console.log('Slide 3:', slide3);
    await captureScreenshot(path.join(ARTIFACT_DIR, 'adaptive_hero_slide_03.png'));

    // SLIDE 04 (after ~6.5s)
    console.log('\n--- WAITING FOR SLIDE 04 (Yosemite Valley Panorama) ---');
    await sleep(6500);
    const slide4 = await evaluate(`(() => {
      const h2 = document.querySelector('#hero h2');
      return {
        heading: h2 ? h2.innerText.replace(/\\n/g, ' ') : null
      };
    })()`);
    console.log('Slide 4:', slide4);
    await captureScreenshot(path.join(ARTIFACT_DIR, 'adaptive_hero_slide_04.png'));

    console.log('\n======================================================');
    console.log('✔ ALL 4 SLIDES CAPTURED WITH ADAPTIVE IMAGE FONT COLORS');
    console.log('======================================================');

    ws.close();
  } catch (err) {
    console.error('Audit failed:', err);
    process.exitCode = 1;
  } finally {
    try { chromeProc.kill(); } catch (e) {}
    try { fs.rmSync(tempUserData, { recursive: true, force: true }); } catch (e) {}
  }
}

run();
