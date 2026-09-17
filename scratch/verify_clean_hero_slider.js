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
  console.log('1. AUDITING CLEAN HERO SLIDER & WORD REVEAL ANIMATIONS');
  console.log('======================================================');

  const tempUserData = path.join(os.tmpdir(), 'chrome_cdp_clean_hero_' + Date.now());
  fs.mkdirSync(tempUserData, { recursive: true });
  const port = 9355;

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${tempUserData}`,
    '--window-size=1440,1000',
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

    async function captureScreenshot(filepath, clip = null) {
      const params = { format: 'png' };
      if (clip) params.clip = clip;
      const res = await send('Page.captureScreenshot', params);
      fs.writeFileSync(filepath, Buffer.from(res.data, 'base64'));
      console.log('Saved screenshot:', filepath);
    }

    await send('Page.enable');
    await send('DOM.enable');

    await sleep(1500);

    // ==========================================
    // TEST 1: DESKTOP 1440x900 — SLIDE 01 & WORD ANIMATIONS
    // ==========================================
    console.log('\n--- VERIFYING SLIDE 01 & NUMBERED PILL REMOVAL ---');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await sleep(600);

    const slide1Data = await evaluate(`(() => {
      const hero = document.getElementById('hero');
      const h1 = hero ? hero.querySelector('h1') : null;
      const tabs = document.querySelectorAll('[role="tab"]');
      const wordSpans = hero ? hero.querySelectorAll('span.overflow-hidden') : [];

      return {
        hasHero: !!hero,
        h1Text: h1 ? h1.innerText.replace(/\\n/g, ' ') : null,
        tabCount: tabs.length,
        hasWordAnimations: wordSpans.length > 0,
        wordCount: wordSpans.length
      };
    })()`);

    console.log('Slide 01 Status:', JSON.stringify(slide1Data, null, 2));
    assert(slide1Data.hasHero, 'Hero section must exist');
    assert.strictEqual(slide1Data.tabCount, 0, 'Numbered thumbnail pill must be completely removed');
    assert(slide1Data.hasWordAnimations, 'Headline must have word-by-word reveal animations');
    assert(slide1Data.h1Text.includes('Own a Piece of Earth'), 'Must render main brand headline');

    await captureScreenshot(path.join(ARTIFACT_DIR, 'clean_hero_slide_01.png'), {
      x: 0, y: 0, width: 1440, height: 900, scale: 1
    });

    // ==========================================
    // TEST 2: AUTOPLAY TO SLIDE 02 (WITHOUT STALLING)
    // ==========================================
    console.log('\n--- WAITING 6.8s FOR AUTOPLAY TO ADVANCE TO SLIDE 02 ---');
    await sleep(6800);

    const slide2Data = await evaluate(`(() => {
      const hero = document.getElementById('hero');
      const heading = hero ? hero.querySelector('h1, h2') : null;
      return {
        headingText: heading ? heading.innerText.replace(/\\n/g, ' ') : null
      };
    })()`);

    console.log('Slide 02 Status:', JSON.stringify(slide2Data, null, 2));
    assert(slide2Data.headingText.includes('Land is More Than an Asset'), 'Autoplay must advance cleanly to Slide 02');

    await captureScreenshot(path.join(ARTIFACT_DIR, 'clean_hero_slide_02.png'), {
      x: 0, y: 0, width: 1440, height: 900, scale: 1
    });

    // ==========================================
    // TEST 3: MOBILE 390x844 CHECK
    // ==========================================
    console.log('\n--- MOBILE (390x844) VERIFICATION ---');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await sleep(800);

    const mobileData = await evaluate(`(() => {
      const bodyWidth = document.documentElement.clientWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      return {
        scrollWidth,
        bodyWidth,
        hasHorizontalOverflow: scrollWidth > bodyWidth
      };
    })()`);

    console.log('Mobile Stats:', JSON.stringify(mobileData, null, 2));
    assert(!mobileData.hasHorizontalOverflow, 'Mobile must have no horizontal overflow');

    await captureScreenshot(path.join(ARTIFACT_DIR, 'clean_hero_mobile_390.png'), {
      x: 0, y: 0, width: 390, height: 844, scale: 1
    });

    console.log('\n======================================================');
    console.log('✔ ALL CLEAN HERO & WORD ANIMATION AUDITS PASSED!');
    console.log('======================================================');

    ws.close();
  } catch (err) {
    console.error('Audit failed with error:', err);
    process.exitCode = 1;
  } finally {
    try { chromeProc.kill(); } catch (e) {}
    try { fs.rmSync(tempUserData, { recursive: true, force: true }); } catch (e) {}
  }
}

run();
