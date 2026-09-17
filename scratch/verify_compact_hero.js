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

async function verifyCompactHero() {
  const tempUserData = path.join(os.tmpdir(), 'chrome_cdp_compact_' + Date.now());
  fs.mkdirSync(tempUserData, { recursive: true });
  const port = 9312;

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${tempUserData}`,
    '--window-size=1440,900',
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

    await send('Runtime.enable');
    await send('Page.enable');

    // 1. Desktop 1440x900 viewport (Initial Above-The-Fold view)
    console.log('=== TESTING DESKTOP VIEWPORT: 1440x900 (SCROLL = 0) ===');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    await sleep(2000);

    const desktopFoldData = await evaluate(`(() => {
      const hero = document.getElementById('hero');
      const heroRect = hero ? hero.getBoundingClientRect() : null;
      const firstArticle = document.querySelector('article');
      const articleRect = firstArticle ? firstArticle.getBoundingClientRect() : null;
      const h1 = document.querySelector('h1');
      const h1Rect = h1 ? h1.getBoundingClientRect() : null;
      
      // Check if old information box exists
      const bodyText = document.body.innerText;
      const hasOldInfoBox = bodyText.includes('These concept profiles demonstrate how Earth Heritage project stories will be presented');

      return {
        viewportHeight: window.innerHeight,
        hero: heroRect ? { top: Math.round(heroRect.top), bottom: Math.round(heroRect.bottom), height: Math.round(heroRect.height) } : null,
        h1: h1Rect ? { top: Math.round(h1Rect.top), height: Math.round(h1Rect.height), text: h1.innerText.trim() } : null,
        firstProject: articleRect ? {
          top: Math.round(articleRect.top),
          bottom: Math.round(articleRect.bottom),
          height: Math.round(articleRect.height),
          visiblePixelsAboveFold: Math.round(Math.max(0, Math.min(window.innerHeight, articleRect.bottom) - articleRect.top))
        } : null,
        hasOldInfoBox,
        scrollY: window.scrollY
      };
    })()`);

    console.log('Desktop 1440x900 Above-The-Fold Metrics:', desktopFoldData);

    assert.strictEqual(desktopFoldData.hasOldInfoBox, false, 'Old info box must be completely removed');
    assert(desktopFoldData.hero.height < 320, `Hero height (${desktopFoldData.hero.height}px) must be compact (< 320px)`);
    assert(desktopFoldData.firstProject.top < 900, `Project 01 top (${desktopFoldData.firstProject.top}px) must be well within the 900px viewport`);
    assert(desktopFoldData.firstProject.visiblePixelsAboveFold > 350, `At least 350px of Project 01 must be visible above the fold (Actual: ${desktopFoldData.firstProject.visiblePixelsAboveFold}px)`);

    console.log(`✔ SUCCESS: Hero is compact (${desktopFoldData.hero.height}px)`);
    console.log(`✔ SUCCESS: Project 01 begins at ${desktopFoldData.firstProject.top}px — with ${desktopFoldData.firstProject.visiblePixelsAboveFold}px visibly above the fold at 1440x900!`);

    // Capture initial 1440x900 screenshot (no scrolling)
    const deskShot = await send('Page.captureScreenshot', { format: 'png' });
    const deskShotPath = path.join(ARTIFACT_DIR, 'projects_above_the_fold_1440x900.png');
    fs.writeFileSync(deskShotPath, Buffer.from(deskShot.data, 'base64'));
    console.log(`✓ Saved screenshot: ${deskShotPath}`);

    // 2. Mobile 390x844 viewport (Initial view)
    console.log('\n=== TESTING MOBILE VIEWPORT: 390x844 (SCROLL = 0) ===');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });

    await sleep(1500);

    const mobileFoldData = await evaluate(`(() => {
      const hero = document.getElementById('hero');
      const heroRect = hero ? hero.getBoundingClientRect() : null;
      const firstArticle = document.querySelector('article');
      const articleRect = firstArticle ? firstArticle.getBoundingClientRect() : null;
      const overflow = document.documentElement.scrollWidth > window.innerWidth;

      return {
        viewportHeight: window.innerHeight,
        hero: heroRect ? { top: Math.round(heroRect.top), bottom: Math.round(heroRect.bottom), height: Math.round(heroRect.height) } : null,
        firstProject: articleRect ? {
          top: Math.round(articleRect.top),
          bottom: Math.round(articleRect.bottom),
          height: Math.round(articleRect.height),
          visiblePixelsAboveFold: Math.round(Math.max(0, Math.min(window.innerHeight, articleRect.bottom) - articleRect.top))
        } : null,
        overflow
      };
    })()`);

    console.log('Mobile 390x844 Metrics:', mobileFoldData);
    assert.strictEqual(mobileFoldData.overflow, false, 'Mobile must have 0 horizontal overflow');
    assert(mobileFoldData.firstProject.top < 844, `Project 01 must start within or immediately near the initial mobile fold (Actual top: ${mobileFoldData.firstProject.top}px)`);

    console.log(`✔ SUCCESS: Mobile Project 01 begins at ${mobileFoldData.firstProject.top}px (${mobileFoldData.firstProject.visiblePixelsAboveFold}px visible on initial screen)!`);

    const mobShot = await send('Page.captureScreenshot', { format: 'png' });
    const mobShotPath = path.join(ARTIFACT_DIR, 'projects_above_the_fold_390x844.png');
    fs.writeFileSync(mobShotPath, Buffer.from(mobShot.data, 'base64'));
    console.log(`✓ Saved screenshot: ${mobShotPath}`);

    ws.close();
    console.log('\n✔ ALL COMPACT HERO CHECKS PASSED!');
  } finally {
    chromeProc.kill();
    try { fs.rmSync(tempUserData, { recursive: true, force: true }); } catch (e) {}
  }
}

verifyCompactHero().catch(err => {
  console.error(err);
  process.exit(1);
});
