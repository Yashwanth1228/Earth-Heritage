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
  console.log('====================================================');
  console.log('1. LAUNCHING CHROME CDP FOR HOMEPAGE HERO SLIDER AUDIT');
  console.log('====================================================');

  const tempUserData = path.join(os.tmpdir(), 'chrome_cdp_hero_slider_' + Date.now());
  fs.mkdirSync(tempUserData, { recursive: true });
  const port = 9348;

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

    // Wait for Next.js initial render
    await sleep(1500);

    // ==========================================
    // TEST 1: DESKTOP 1440x900 — SLIDE 01
    // ==========================================
    console.log('\n--- VERIFYING SLIDE 01 (Initial Load) ---');
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
      const eyebrow = hero ? hero.querySelector('[role="carousel"] span, [aria-roledescription="carousel"] span') : null;
      const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
      const activeTab = tabs.find(t => t.getAttribute('aria-selected') === 'true');

      return {
        hasHero: !!hero,
        h1Text: h1 ? h1.innerText.replace(/\\n/g, ' ') : null,
        activeTab: activeTab ? activeTab.innerText.trim() : null,
        totalTabs: tabs.length
      };
    })()`);

    console.log('Slide 01 Status:', JSON.stringify(slide1Data, null, 2));
    assert(slide1Data.hasHero, 'Hero section must exist with id="hero"');
    assert(slide1Data.h1Text.includes('Own a Piece of Earth'), 'Slide 01 must have main brand H1');
    assert.strictEqual(slide1Data.totalTabs, 4, 'Must have 4 slide tabs');

    await captureScreenshot(path.join(ARTIFACT_DIR, 'homepage_hero_slide_01.png'), {
      x: 0, y: 0, width: 1440, height: 900, scale: 1
    });

    // ==========================================
    // TEST 2: AUTOPLAY TO SLIDE 02 (~6.5s)
    // ==========================================
    console.log('\n--- WAITING FOR AUTOPLAY TO ADVANCE TO SLIDE 02 (~6.5s) ---');
    // We wait 7.2s for transition
    await sleep(7200);

    const slide2Data = await evaluate(`(() => {
      const hero = document.getElementById('hero');
      const heading = hero ? hero.querySelector('h1, h2') : null;
      const activeTab = Array.from(document.querySelectorAll('[role="tab"]')).find(t => t.getAttribute('aria-selected') === 'true');
      return {
        headingText: heading ? heading.innerText.replace(/\\n/g, ' ') : null,
        activeTab: activeTab ? activeTab.innerText.trim() : null
      };
    })()`);

    console.log('Slide 02 Status:', JSON.stringify(slide2Data, null, 2));
    assert(slide2Data.headingText.includes('Land is More Than an Asset'), 'Slide 02 headline must match Chapter 02');

    await captureScreenshot(path.join(ARTIFACT_DIR, 'homepage_hero_slide_02.png'), {
      x: 0, y: 0, width: 1440, height: 900, scale: 1
    });

    // ==========================================
    // TEST 3: MANUAL TAB NAVIGATION TO SLIDE 03 & 04
    // ==========================================
    console.log('\n--- TESTING MANUAL INTERACTION (Click Slide 03 Tab) ---');
    await evaluate(`(() => {
      const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
      if (tabs[2]) tabs[2].click();
    })()`);

    await sleep(1000);

    const slide3Data = await evaluate(`(() => {
      const hero = document.getElementById('hero');
      const heading = hero ? hero.querySelector('h1, h2') : null;
      const activeTab = Array.from(document.querySelectorAll('[role="tab"]')).find(t => t.getAttribute('aria-selected') === 'true');
      return {
        headingText: heading ? heading.innerText.replace(/\\n/g, ' ') : null,
        activeTab: activeTab ? activeTab.innerText.trim() : null
      };
    })()`);

    console.log('Slide 03 Status after click:', JSON.stringify(slide3Data, null, 2));
    assert(slide3Data.headingText.includes('You Own the Land'), 'Slide 03 headline must match Chapter 03');

    await captureScreenshot(path.join(ARTIFACT_DIR, 'homepage_hero_slide_03.png'), {
      x: 0, y: 0, width: 1440, height: 900, scale: 1
    });

    console.log('\n--- TESTING MANUAL INTERACTION (Click Slide 04 Tab) ---');
    await evaluate(`(() => {
      const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
      if (tabs[3]) tabs[3].click();
    })()`);

    await sleep(1000);

    const slide4Data = await evaluate(`(() => {
      const hero = document.getElementById('hero');
      const heading = hero ? hero.querySelector('h1, h2') : null;
      const activeTab = Array.from(document.querySelectorAll('[role="tab"]')).find(t => t.getAttribute('aria-selected') === 'true');
      return {
        headingText: heading ? heading.innerText.replace(/\\n/g, ' ') : null,
        activeTab: activeTab ? activeTab.innerText.trim() : null
      };
    })()`);

    console.log('Slide 04 Status after click:', JSON.stringify(slide4Data, null, 2));
    assert(slide4Data.headingText.includes('Back to Roots'), 'Slide 04 headline must match Chapter 04');

    await captureScreenshot(path.join(ARTIFACT_DIR, 'homepage_hero_slide_04.png'), {
      x: 0, y: 0, width: 1440, height: 900, scale: 1
    });

    // ==========================================
    // TEST 4: AUTOPLAY LOOP FROM 04 -> 01
    // ==========================================
    console.log('\n--- WAITING FOR AUTOPLAY TO LOOP FROM 04 -> 01 (~7s) ---');
    await sleep(7200);

    const loopedData = await evaluate(`(() => {
      const hero = document.getElementById('hero');
      const heading = hero ? hero.querySelector('h1, h2') : null;
      const activeTab = Array.from(document.querySelectorAll('[role="tab"]')).find(t => t.getAttribute('aria-selected') === 'true');
      return {
        headingText: heading ? heading.innerText.replace(/\\n/g, ' ') : null,
        activeTab: activeTab ? activeTab.innerText.trim() : null
      };
    })()`);

    console.log('Looped Back Status:', JSON.stringify(loopedData, null, 2));
    assert(loopedData.headingText.includes('Own a Piece of Earth'), 'Must loop smoothly back to Slide 01');

    // ==========================================
    // TEST 5: SCROLLING PAST HERO REVEALS NAVBAR
    // ==========================================
    console.log('\n--- VERIFYING HOMEPAGE FLOATING NAVBAR ON SCROLL ---');
    // Check initial navbar hidden state
    const initialNavVisible = await evaluate(`(() => {
      const header = document.querySelector('header');
      return header && header.classList.contains('pointer-events-auto') && !header.querySelector('div').classList.contains('opacity-0');
    })()`);
    console.log('Initial navbar visible at hero top:', initialNavVisible, '(expected false or hidden)');

    // Scroll down 950px (past 80% of hero)
    await evaluate(`(() => {
      window.scrollTo({ top: 950, behavior: 'instant' });
      window.dispatchEvent(new Event('scroll'));
    })()`);
    await sleep(800);

    const scrolledNavVisible = await evaluate(`(() => {
      const header = document.querySelector('header');
      return header && header.classList.contains('pointer-events-auto');
    })()`);
    console.log('Navbar visible after scrolling past hero:', scrolledNavVisible);
    assert(scrolledNavVisible, 'Floating navbar must reveal after scrolling past hero');

    // Scroll back to top
    await evaluate(`window.scrollTo({ top: 0, behavior: 'instant' })`);
    await sleep(500);

    // ==========================================
    // TEST 6: MOBILE 390x844
    // ==========================================
    console.log('\n--- MOBILE (390x844) VERIFICATION ---');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await sleep(800);

    const mobileStats = await evaluate(`(() => {
      const bodyWidth = document.documentElement.clientWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      const hero = document.getElementById('hero');
      const h1 = hero ? hero.querySelector('h1, h2') : null;

      return {
        scrollWidth,
        bodyWidth,
        hasHorizontalOverflow: scrollWidth > bodyWidth,
        headingText: h1 ? h1.innerText.replace(/\\n/g, ' ') : null
      };
    })()`);

    console.log('Mobile Stats:', JSON.stringify(mobileStats, null, 2));
    assert(!mobileStats.hasHorizontalOverflow, 'Mobile must have no horizontal overflow');

    await captureScreenshot(path.join(ARTIFACT_DIR, 'homepage_hero_mobile_390.png'), {
      x: 0, y: 0, width: 390, height: 844, scale: 1
    });

    console.log('\n====================================================');
    console.log('✔ ALL HOMEPAGE HERO SLIDER TESTS PASSED PERFECTLY!');
    console.log('====================================================');

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
