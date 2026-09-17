const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const assert = require('assert');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = path.resolve('C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c');

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

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

async function runBrowserVerification() {
  console.log('==============================================');
  console.log('1. VERIFYING DATA INTEGRITY (NO FAKE STATUS)');
  console.log('==============================================');
  
  const { projects } = require('../data/projects');
  assert.strictEqual(projects.length, 3, 'Must have exactly 3 concept demo projects');
  assert.strictEqual(projects[0].slug, 'managed-farmland-concept-i');
  assert.strictEqual(projects[1].slug, 'managed-farmland-concept-ii');
  assert.strictEqual(projects[2].slug, 'land-and-legacy-concept-iii');
  
  projects.forEach((p, idx) => {
    assert.strictEqual(p.isDemo, true, `Project ${idx + 1} must have isDemo: true`);
    assert.strictEqual(p.imageIsTemporary, true, `Project ${idx + 1} must have imageIsTemporary: true`);
    assert.notStrictEqual(p.status, 'Ongoing', 'Project must NOT be labeled Ongoing');
    assert.notStrictEqual(p.status, 'Completed', 'Project must NOT be labeled Completed');
  });
  console.log('✔ All 3 projects verified: isDemo: true, imageIsTemporary: true, no fake status');

  console.log('\n==============================================');
  console.log('2. VERIFYING HTTP ENDPOINTS');
  console.log('==============================================');
  const urlsToTest = [
    'http://localhost:3000/projects',
    'http://localhost:3000/projects/managed-farmland-concept-i',
    'http://localhost:3000/projects/managed-farmland-concept-ii',
    'http://localhost:3000/projects/land-and-legacy-concept-iii'
  ];

  for (const url of urlsToTest) {
    const res = await fetchUrl(url);
    assert.strictEqual(res.statusCode, 200, `Expected 200 for ${url}, got ${res.statusCode}`);
    console.log(`✔ HTTP 200 OK: ${url}`);
  }

  console.log('\n==============================================');
  console.log('3. LAUNCHING CHROME CDP BROWSER TESTS');
  console.log('==============================================');

  const tempUserData = path.join(os.tmpdir(), 'chrome_cdp_hierarchy_' + Date.now());
  fs.mkdirSync(tempUserData, { recursive: true });
  const port = 9277;

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${tempUserData}`,
    '--window-size=1440,1000',
    'http://localhost:3000/projects'
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

    // --- TEST 1: DESKTOP 1440px ---
    console.log('\n--- Desktop 1440px Viewport Analysis ---');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false
    });

    await sleep(2000); // Allow render

    // Analyze Layout & Hierarchy
    const layoutMetrics = await evaluate(`(() => {
      const articles = document.querySelectorAll('article');
      const metrics = [];
      articles.forEach((art, idx) => {
        const rect = art.getBoundingClientRect();
        const img = art.querySelector('img');
        const heading = art.querySelector('h3');
        const link = art.querySelector('a');
        metrics.push({
          index: idx,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          heading: heading ? heading.innerText.trim() : null,
          href: link ? link.getAttribute('href') : null,
          imgSrc: img ? img.getAttribute('src') : null,
          hasImg: !!img
        });
      });
      const overflow = document.documentElement.scrollWidth > window.innerWidth;
      return { metrics, count: articles.length, overflow };
    })()`);

    console.log('Article Card Metrics (1440px Desktop):', layoutMetrics);

    assert.strictEqual(layoutMetrics.count, 3, 'Must render exactly 3 article cards');
    assert.strictEqual(layoutMetrics.overflow, false, 'Desktop must have no horizontal overflow');
    
    // Verify Project 01 is wider and dominant
    const [p1, p2, p3] = layoutMetrics.metrics;
    console.log(`P1 Width: ${p1.width}px, Height: ${p1.height}px`);
    console.log(`P2 Width: ${p2.width}px, Height: ${p2.height}px`);
    console.log(`P3 Width: ${p3.width}px, Height: ${p3.height}px`);

    // P1 should span the full container (approx 1200px+), while P2 and P3 are 2-column (approx 580px each)
    assert(p1.width > p2.width * 1.5, `Project 01 (${p1.width}px) must be substantially wider than Project 02 (${p2.width}px)`);
    assert(Math.abs(p2.width - p3.width) <= 10, `Project 02 (${p2.width}px) and Project 03 (${p3.width}px) must have equal width`);
    assert.strictEqual(p1.href, '/projects/managed-farmland-concept-i');
    assert.strictEqual(p2.href, '/projects/managed-farmland-concept-ii');
    assert.strictEqual(p3.href, '/projects/land-and-legacy-concept-iii');
    console.log('✔ Desktop hierarchy verified: Project 01 is large featured, Project 02 & 03 are equal 2-column supporting cards');

    // Scroll and capture Desktop screenshots
    // 1. Featured card view
    await evaluate('window.scrollTo(0, 300)');
    await sleep(600);
    const shot1 = await send('Page.captureScreenshot', { format: 'png' });
    const desktopShot1 = path.join(ARTIFACT_DIR, 'projects_hierarchy_desktop_featured.png');
    fs.writeFileSync(desktopShot1, Buffer.from(shot1.data, 'base64'));
    console.log(`✓ Saved screenshot: ${desktopShot1}`);

    // 2. Supporting cards view
    await evaluate('window.scrollTo(0, 900)');
    await sleep(600);
    const shot2 = await send('Page.captureScreenshot', { format: 'png' });
    const desktopShot2 = path.join(ARTIFACT_DIR, 'projects_hierarchy_desktop_supporting.png');
    fs.writeFileSync(desktopShot2, Buffer.from(shot2.data, 'base64'));
    console.log(`✓ Saved screenshot: ${desktopShot2}`);

    // --- TEST 2: MOBILE 390px ---
    console.log('\n--- Mobile 390px Viewport Analysis ---');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });

    await sleep(1500);

    const mobileMetrics = await evaluate(`(() => {
      const articles = document.querySelectorAll('article');
      const overflow = document.documentElement.scrollWidth > window.innerWidth;
      const metrics = [];
      articles.forEach((art, idx) => {
        const rect = art.getBoundingClientRect();
        metrics.push({
          index: idx,
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        });
      });
      return { metrics, count: articles.length, overflow };
    })()`);

    console.log('Mobile Metrics (390px):', mobileMetrics);
    assert.strictEqual(mobileMetrics.overflow, false, 'Mobile must have no horizontal overflow');
    console.log('✔ Mobile verified: 0 horizontal overflow');

    // Scroll and capture Mobile screenshots
    // 1. Mobile Featured View
    await evaluate('window.scrollTo(0, 240)');
    await sleep(600);
    const mobShot1 = await send('Page.captureScreenshot', { format: 'png' });
    const mobileShot1 = path.join(ARTIFACT_DIR, 'projects_hierarchy_mobile_featured.png');
    fs.writeFileSync(mobileShot1, Buffer.from(mobShot1.data, 'base64'));
    console.log(`✓ Saved screenshot: ${mobileShot1}`);

    // 2. Mobile Supporting View
    await evaluate('window.scrollTo(0, 950)');
    await sleep(600);
    const mobShot2 = await send('Page.captureScreenshot', { format: 'png' });
    const mobileShot2 = path.join(ARTIFACT_DIR, 'projects_hierarchy_mobile_supporting.png');
    fs.writeFileSync(mobileShot2, Buffer.from(mobShot2.data, 'base64'));
    console.log(`✓ Saved screenshot: ${mobileShot2}`);

    ws.close();
    console.log('\n==============================================');
    console.log('ALL VERIFICATION CHECKS PASSED SUCCESSFULLY! 🎉');
    console.log('==============================================');
  } finally {
    chromeProc.kill();
    try { fs.rmSync(tempUserData, { recursive: true, force: true }); } catch (e) {}
  }
}

runBrowserVerification().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
