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
  console.log('==================================================');
  console.log('1. LAUNCHING CHROME CDP FOR IMAGE-FIRST HERO AUDIT');
  console.log('==================================================');

  const tempUserData = path.join(os.tmpdir(), 'chrome_cdp_hero_' + Date.now());
  fs.mkdirSync(tempUserData, { recursive: true });
  const port = 9340;

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${tempUserData}`,
    '--window-size=1440,1000',
    'http://localhost:3000/projects/managed-farmland-concept-i'
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

    // Wait for Next.js hydration and Motion animations
    await sleep(2000);

    // ==========================================
    // TEST 1: DESKTOP 1440x900
    // ==========================================
    console.log('\n--- DESKTOP (1440x900) VERIFICATION ---');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await sleep(600);

    const desktopData = await evaluate(`(() => {
      const hero = document.getElementById('project-hero');
      if (!hero) return { error: 'Hero not found' };

      const rect = hero.getBoundingClientRect();
      const img = hero.querySelector('img');
      const h1 = hero.querySelector('h1');
      const backLink = hero.querySelector('a[href="/projects"]');
      const allText = hero.innerText;

      const bodyWidth = document.documentElement.clientWidth;
      const scrollWidth = document.documentElement.scrollWidth;

      return {
        heroHeight: rect.height,
        viewportHeight: window.innerHeight,
        heightRatio: rect.height / window.innerHeight,
        hasImage: !!img,
        imgSrc: img ? img.src : null,
        hasH1: !!h1,
        h1Text: h1 ? h1.textContent : null,
        hasBackLink: !!backLink,
        hasConceptProject: allText.includes('CONCEPT PROJECT'),
        hasPreviewDisclosure: allText.includes('Preview presentation'),
        hasManagedFarmland: allText.includes('MANAGED FARMLAND'),
        hasNumber01: allText.includes('01'),
        hasShortDescription: allText.includes('A concept exploration of the Earth Heritage managed farmland approach'),
        hasHorizontalOverflow: scrollWidth > bodyWidth,
        scrollWidth,
        bodyWidth
      };
    })()`);

    console.log('Desktop Hero Audit Results:\n', JSON.stringify(desktopData, null, 2));

    assert(desktopData.hasImage, 'Hero must have cover image');
    assert(desktopData.hasH1, 'Hero must have H1 title');
    assert.strictEqual(desktopData.h1Text, 'Managed Farmland — Concept I');
    assert(desktopData.hasBackLink, 'Hero must have Back to All Projects link');
    assert(desktopData.hasConceptProject, 'Hero must include CONCEPT PROJECT badge');
    assert(desktopData.hasPreviewDisclosure, 'Hero must include subtle preview disclosure');
    assert(desktopData.hasManagedFarmland, 'Hero must include MANAGED FARMLAND category');
    assert(desktopData.hasNumber01, 'Hero must include project number 01');
    assert(!desktopData.hasHorizontalOverflow, 'Desktop must have no horizontal overflow');

    // Screenshot Desktop Hero in Viewport
    await captureScreenshot(path.join(ARTIFACT_DIR, 'project_detail_image_first_hero_1440.png'), {
      x: 0,
      y: 0,
      width: 1440,
      height: 900,
      scale: 1
    });

    // ==========================================
    // TEST 2: MOBILE 390x844
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
      const hero = document.getElementById('project-hero');
      const rect = hero ? hero.getBoundingClientRect() : null;
      const bodyWidth = document.documentElement.clientWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      const h1 = hero ? hero.querySelector('h1') : null;

      return {
        heroHeight: rect ? rect.height : null,
        viewportHeight: window.innerHeight,
        heightRatio: rect ? rect.height / window.innerHeight : null,
        hasHorizontalOverflow: scrollWidth > bodyWidth,
        scrollWidth,
        bodyWidth,
        h1Text: h1 ? h1.textContent : null
      };
    })()`);

    console.log('Mobile Hero Audit Results:\n', JSON.stringify(mobileData, null, 2));

    assert(!mobileData.hasHorizontalOverflow, 'Mobile must have no horizontal overflow');

    // Screenshot Mobile Viewport
    await captureScreenshot(path.join(ARTIFACT_DIR, 'project_detail_image_first_hero_390.png'), {
      x: 0,
      y: 0,
      width: 390,
      height: 844,
      scale: 1
    });

    // ==========================================
    // TEST 3: VERIFY /projects LISTING PAGE UNCHANGED
    // ==========================================
    console.log('\n--- PORTFOLIO LISTING /projects REGRESSION CHECK ---');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    await send('Page.navigate', { url: 'http://localhost:3000/projects' });
    await sleep(1500);

    const listingTitle = await evaluate(`document.querySelector('h1')?.textContent`);
    console.log('Projects Listing Page H1:', listingTitle);
    assert(listingTitle.includes('Places with purpose'), 'Projects page H1 must be preserved');

    console.log('\n==============================================');
    console.log('✔ ALL IMAGE-FIRST HERO CHECKS PASSED PERFECTLY!');
    console.log('==============================================');

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
