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
  const tempUserData = path.join(os.tmpdir(), 'chrome_cdp_inspect_all_imgs_' + Date.now());
  fs.mkdirSync(tempUserData, { recursive: true });
  const port = 9380;

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

    await send('Page.enable');
    await send('DOM.enable');
    await sleep(1500);

    const allImagesAnalysis = await evaluate(`(async () => {
      const images = [
        { name: 'hero-landscape.jpg', src: '/images/landing/hero-landscape.jpg' },
        { name: 'statement-landscape.jpg', src: '/images/landing/statement-landscape.jpg' },
        { name: 'solution-management.jpg', src: '/images/landing/solution-management.jpg' },
        { name: 'philosophy-panorama.jpg', src: '/images/landing/philosophy-panorama.jpg' },
        { name: 'cta-landscape.jpg', src: '/images/landing/cta-landscape.jpg' },
        { name: 'principles-land.jpg', src: '/images/landing/principles-land.jpg' },
        { name: 'problem-land.jpg', src: '/images/landing/problem-land.jpg' },
        { name: 'intro-farmland.jpg', src: '/images/managed-farmland/intro-farmland.jpg' },
        { name: 'nature-responsibility.jpg', src: '/images/managed-farmland/nature-responsibility.jpg' }
      ];

      function loadImage(src) {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = () => resolve(null);
          img.src = src;
        });
      }

      const results = [];
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      for (const item of images) {
        const img = await loadImage(item.src);
        if (!img) {
          results.push({ name: item.name, error: 'Failed to load' });
          continue;
        }
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);

        const sx = Math.floor(canvas.width * 0.2);
        const sy = Math.floor(canvas.height * 0.2);
        const sw = Math.floor(canvas.width * 0.6);
        const sh = Math.floor(canvas.height * 0.4);

        const imgData = ctx.getImageData(sx, sy, sw, sh);
        const data = imgData.data;
        let rSum = 0, gSum = 0, bSum = 0, lumSum = 0;
        let count = 0;
        let lightCount = 0;

        for (let i = 0; i < data.length; i += 40) {
          const r = data[i];
          const g = data[i+1];
          const b = data[i+2];
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          rSum += r;
          gSum += g;
          bSum += b;
          lumSum += lum;
          if (lum > 180) lightCount++;
          count++;
        }

        results.push({
          name: item.name,
          avgRGB: \`rgb(\${Math.round(rSum / count)}, \${Math.round(gSum / count)}, \${Math.round(bSum / count)})\`,
          avgLuminance: Math.round(lumSum / count),
          lightPixelPercent: Math.round((lightCount / count) * 100)
        });
      }

      return results;
    })()`);

    console.log('All Images Analysis:', JSON.stringify(allImagesAnalysis, null, 2));

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    try { chromeProc.kill(); } catch (e) {}
    try { fs.rmSync(tempUserData, { recursive: true, force: true }); } catch (e) {}
  }
}

run();
