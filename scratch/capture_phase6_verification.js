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
  const tempUserData = path.join(os.tmpdir(), 'chrome_cdp_phase6_' + Date.now());
  fs.mkdirSync(tempUserData, { recursive: true });
  const port = 9336;

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${tempUserData}`,
    '--window-size=1440,1100',
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

    // Desktop: 1440x950
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 950,
      deviceScaleFactor: 1,
      mobile: false
    });

    await sleep(2500);

    // 1. HOW IT WORKS SECTION — STEP 01
    const hiwPos = await evaluate(`(() => {
      const el = document.getElementById('how-it-works-overview');
      return el ? el.getBoundingClientRect().top + window.scrollY : null;
    })()`);
    if (hiwPos) {
      await evaluate(`window.scrollTo(0, ${hiwPos - 20})`);
      await sleep(800);
      const shot1 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, 'phase6_hiw_step01.png'), Buffer.from(shot1.data, 'base64'));
      console.log('✓ Captured phase6_hiw_step01.png');

      // Click Step 02 to test smooth step slide!
      await evaluate(`(() => {
        const step2Btn = document.querySelectorAll('#how-it-works-overview button')[3]; // Step 02 pill
        if (step2Btn) step2Btn.click();
      })()`);
      await sleep(800);
      const shot2 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, 'phase6_hiw_step02_slid.png'), Buffer.from(shot2.data, 'base64'));
      console.log('✓ Captured phase6_hiw_step02_slid.png');
    }

    // 2. CONTACT & LOCATION SECTION (Form on left, Get In Touch on right, Map below)
    const contactPos = await evaluate(`(() => {
      const el = document.getElementById('contact-location');
      return el ? el.getBoundingClientRect().top + window.scrollY : null;
    })()`);
    if (contactPos) {
      // View top part: Form on left, Get in touch on right
      await evaluate(`window.scrollTo(0, ${contactPos - 10})`);
      await sleep(800);
      const shotTop = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, 'phase6_form_getintouch_top.png'), Buffer.from(shotTop.data, 'base64'));
      console.log('✓ Captured phase6_form_getintouch_top.png');

      // Scroll slightly to capture the full width map below both
      await evaluate(`window.scrollTo(0, ${contactPos + 480})`);
      await sleep(800);
      const shotMap = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, 'phase6_map_fullwidth_bottom.png'), Buffer.from(shotMap.data, 'base64'));
      console.log('✓ Captured phase6_map_fullwidth_bottom.png');
    }

    // Check desktop overflow
    const deskOverflow = await evaluate(`(() => {
      const docWidth = document.documentElement.clientWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      return { clientWidth: docWidth, scrollWidth: scrollWidth, hasOverflow: scrollWidth > docWidth };
    })()`);
    console.log('Desktop 1440 overflow check:', deskOverflow);

    // Mobile: 390x844
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await sleep(1500);

    const mobContactPos = await evaluate(`(() => {
      const el = document.getElementById('contact-location');
      return el ? el.getBoundingClientRect().top + window.scrollY : null;
    })()`);
    if (mobContactPos) {
      await evaluate(`window.scrollTo(0, ${mobContactPos})`);
      await sleep(800);
      const shotMob = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(ARTIFACT_DIR, 'phase6_mobile_form_contact.png'), Buffer.from(shotMob.data, 'base64'));
      console.log('✓ Captured phase6_mobile_form_contact.png');
    }

    const mobOverflow = await evaluate(`(() => {
      const docWidth = document.documentElement.clientWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      return { clientWidth: docWidth, scrollWidth: scrollWidth, hasOverflow: scrollWidth > docWidth };
    })()`);
    console.log('Mobile 390 overflow check:', mobOverflow);

    ws.close();
  } finally {
    chromeProc.kill();
    try { fs.rmSync(tempUserData, { recursive: true, force: true }); } catch (e) {}
  }
}

capture().catch(err => {
  console.error('Phase 6 capture failed:', err);
  process.exit(1);
});
