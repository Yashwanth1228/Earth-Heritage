const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TEMP_USER_DATA = path.join(os.tmpdir(), 'chrome_cdp_blogs_' + Date.now());

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

async function captureViewport(url, width, height, outputPath) {
  if (!fs.existsSync(TEMP_USER_DATA)) fs.mkdirSync(TEMP_USER_DATA, { recursive: true });

  const port = 9240 + Math.floor(Math.random() * 50);
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${TEMP_USER_DATA}`,
    `--window-size=${width},${height}`,
    url
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

    if (!target) throw new Error('Chrome target not found');

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

    await send('Runtime.enable');
    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 600
    });

    for (let i = 0; i < 30; i++) {
      const ready = await evaluate('document.readyState');
      if (ready === 'complete') break;
      await sleep(200);
    }
    await sleep(2500); // Allow animations / font rendering to settle

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outputPath, Buffer.from(shot.data, 'base64'));
    console.log(`✓ Screenshot captured: ${outputPath} (${width}x${height})`);

    const domInfo = await evaluate(`
      (() => {
        const heroH1 = document.querySelector('h1');
        const emptyStateH2 = document.querySelector('#journal-portfolio h2');
        const navbar = document.querySelector('nav');
        return {
          title: document.title,
          h1: heroH1 ? heroH1.innerText : null,
          emptyStateHeading: emptyStateH2 ? emptyStateH2.innerText : null,
          hasNavbar: !!navbar
        };
      })()
    `);
    console.log('DOM check:', domInfo);

    ws.close();
  } finally {
    chromeProc.kill();
    try { fs.rmSync(TEMP_USER_DATA, { recursive: true, force: true }); } catch (e) {}
  }
}

async function main() {
  const brainDir = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c\\scratch';
  if (!fs.existsSync(brainDir)) fs.mkdirSync(brainDir, { recursive: true });

  const desktopPath = path.join(brainDir, 'blogs_desktop_1440.png');
  const mobilePath = path.join(brainDir, 'blogs_mobile_390.png');

  console.log('--- Capturing Desktop View (1440x1080) ---');
  await captureViewport('http://localhost:3000/blogs', 1440, 1080, desktopPath);

  console.log('\n--- Capturing Mobile View (390x844) ---');
  await captureViewport('http://localhost:3000/blogs', 390, 844, mobilePath);

  console.log('\nVisual captures successfully generated!');
}

main().catch(err => {
  console.error('Visual capture error:', err);
  process.exit(1);
});
