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

async function capture() {
  const tempUserData = path.join(os.tmpdir(), 'chrome_cdp_stepper_' + Date.now());
  fs.mkdirSync(tempUserData, { recursive: true });
  const port = 9348;

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${tempUserData}`,
    '--window-size=1440,900',
    'http://localhost:3000'
  ]);

  try {
    let target = null;
    for (let i = 0; i < 40; i++) {
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

    if (!target) throw new Error('Could not attach to Chrome CDP target');

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

    // Desktop: Standard 1440x900 viewport (100% ratio)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    await sleep(2500);

    // Get position of #how-it-works-overview
    const hiwInfo = await evaluate(`(() => {
      const el = document.getElementById('how-it-works-overview');
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { top: r.top + window.scrollY, height: r.height };
    })()`);
    console.log('How It Works element position:', hiwInfo);

    if (hiwInfo) {
      // 1. Scroll right to the start of the pinned section (Step 01 active)
      await evaluate(`window.scrollTo(0, ${hiwInfo.top})`);
      await sleep(800);
      const shot1 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, 'scroll_step01_100percent.png'), Buffer.from(shot1.data, 'base64'));
      console.log('✓ Captured scroll_step01_100percent.png');

      // 2. Scroll down 450px: Should advance to Step 02!
      await evaluate(`window.scrollTo(0, ${hiwInfo.top + 480})`);
      await sleep(800);
      const active1 = await evaluate(`document.querySelector('#how-it-works-overview span.bg-\\\\[\\\\#15341C\\\\]')?.textContent || 'checked'`);
      console.log('After scrolling +480px, state info:', active1);
      const shot2 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, 'scroll_step02_scrolled.png'), Buffer.from(shot2.data, 'base64'));
      console.log('✓ Captured scroll_step02_scrolled.png');

      // 3. Scroll down another 500px: Should advance to Step 03!
      await evaluate(`window.scrollTo(0, ${hiwInfo.top + 1050})`);
      await sleep(800);
      const shot3 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, 'scroll_step03_scrolled.png'), Buffer.from(shot3.data, 'base64'));
      console.log('✓ Captured scroll_step03_scrolled.png');

      // 4. Scroll down further to Step 04
      await evaluate(`window.scrollTo(0, ${hiwInfo.top + 1600})`);
      await sleep(800);
      const shot4 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, 'scroll_step04_scrolled.png'), Buffer.from(shot4.data, 'base64'));
      console.log('✓ Captured scroll_step04_scrolled.png');
    }

    // Check desktop overflow
    const deskOverflow = await evaluate(`(() => {
      const docWidth = document.documentElement.clientWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      return { clientWidth: docWidth, scrollWidth: scrollWidth, hasOverflow: scrollWidth > docWidth };
    })()`);
    console.log('Desktop 1440 overflow check:', deskOverflow);

    ws.close();
  } finally {
    chromeProc.kill();
    try { fs.rmSync(tempUserData, { recursive: true, force: true }); } catch (e) {}
  }
}

capture().catch(err => {
  console.error('Stepper capture failed:', err);
  process.exit(1);
});
