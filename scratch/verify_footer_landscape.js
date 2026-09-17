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
  console.log('VERIFYING BESPOKE FOOTER LANDSCAPE BACKGROUND ARTWORK');
  console.log('======================================================');

  const tempUserData = path.join(os.tmpdir(), 'chrome_cdp_footer_verify_' + Date.now());
  fs.mkdirSync(tempUserData, { recursive: true });
  const port = 9410;

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${tempUserData}`,
    '--window-size=1440,1100',
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
    await sleep(2000);

    // ==========================================
    // 1. AUDIT FOOTER DOM & ARTWORK ELEMENTS
    // ==========================================
    console.log('\n--- 1. AUDITING FOOTER DOM & ARTWORK ELEMENTS ---');
    const footerAudit = await evaluate(`(() => {
      const footer = document.querySelector('footer');
      if (!footer) return { error: 'Footer not found' };

      const oldEllipses = footer.querySelectorAll('ellipse');
      const desktopSvg = footer.querySelector('svg[viewBox="0 0 1440 850"]');
      const mobileSvg = footer.querySelector('svg[viewBox="0 0 390 1675"]');
      const paths = desktopSvg ? desktopSvg.querySelectorAll('path') : [];
      const circles = desktopSvg ? desktopSvg.querySelectorAll('circle') : [];
      const lines = desktopSvg ? desktopSvg.querySelectorAll('line') : [];

      // Check key footer content elements to confirm zero regressions
      const logo = footer.querySelector('img[alt*="Earth Heritage"]') || footer.querySelector('svg');
      const navLinks = footer.querySelectorAll('a');
      const legalText = footer.innerText.includes('Ownership & Management Notice');
      const brandPill = footer.innerText.includes('You own the land. We manage the farm.');

      return {
        hasFooter: true,
        oldEllipsesCount: oldEllipses.length, // should be 0
        hasDesktopSvg: !!desktopSvg,
        hasMobileSvg: !!mobileSvg,
        desktopPathCount: paths.length,
        desktopCircleCount: circles.length,
        desktopLineCount: lines.length,
        hasLogo: !!logo,
        linkCount: navLinks.length,
        hasLegalNotice: legalText,
        hasBrandPill: brandPill
      };
    })()`);

    console.log('Footer Audit Results:', JSON.stringify(footerAudit, null, 2));

    assert.strictEqual(footerAudit.oldEllipsesCount, 0, 'Old circular/orbital lines must be completely removed');
    assert(footerAudit.hasDesktopSvg, 'Desktop landscape background SVG must be present');
    assert(footerAudit.hasMobileSvg, 'Mobile landscape background SVG must be present');
    assert(footerAudit.desktopPathCount > 15, 'Must contain landscape paths (ridges, trees, birds, foliage, roots)');
    assert(footerAudit.desktopCircleCount >= 4, 'Must contain tractor wheels and foliage details');
    assert(footerAudit.hasLegalNotice, 'Footer legal notice must be preserved');
    assert(footerAudit.hasBrandPill, 'Footer proposition pill must be preserved');
    assert(footerAudit.linkCount > 8, 'All footer navigation links must be preserved');

    // ==========================================
    // 2. DESKTOP 1440x1100 VERIFICATION & SCREENSHOT
    // ==========================================
    console.log('\n--- 2. DESKTOP 1440x1100 FOOTER VERIFICATION ---');
    await evaluate(`(() => {
      const footer = document.querySelector('footer');
      if (footer) footer.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()`);
    await sleep(1000);

    const desktopStats = await evaluate(`(() => {
      const footer = document.querySelector('footer');
      const rect = footer ? footer.getBoundingClientRect() : null;
      const scrollWidth = document.documentElement.scrollWidth;
      const clientWidth = document.documentElement.clientWidth;

      return {
        footerHeight: rect ? rect.height : null,
        scrollWidth,
        clientWidth,
        hasHorizontalOverflow: scrollWidth > clientWidth
      };
    })()`);

    console.log('Desktop Stats:', JSON.stringify(desktopStats, null, 2));
    assert(!desktopStats.hasHorizontalOverflow, 'Zero horizontal overflow on desktop');

    await captureScreenshot(path.join(ARTIFACT_DIR, 'footer_landscape_desktop_1440.png'));

    // ==========================================
    // 3. MOBILE 390x844 VERIFICATION & SCREENSHOT
    // ==========================================
    console.log('\n--- 3. MOBILE 390x844 FOOTER VERIFICATION ---');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await sleep(800);

    await evaluate(`(() => {
      const footer = document.querySelector('footer');
      if (footer) footer.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()`);
    await sleep(800);

    const mobileStats = await evaluate(`(() => {
      const footer = document.querySelector('footer');
      const rect = footer ? footer.getBoundingClientRect() : null;
      const scrollWidth = document.documentElement.scrollWidth;
      const clientWidth = document.documentElement.clientWidth;

      return {
        footerHeight: rect ? rect.height : null,
        scrollWidth,
        clientWidth,
        hasHorizontalOverflow: scrollWidth > clientWidth
      };
    })()`);

    console.log('Mobile Stats:', JSON.stringify(mobileStats, null, 2));
    assert(!mobileStats.hasHorizontalOverflow, 'Zero horizontal overflow on mobile');

    await captureScreenshot(path.join(ARTIFACT_DIR, 'footer_landscape_mobile_390.png'));

    // Capture lower section of mobile footer
    await evaluate(`(() => {
      const footer = document.querySelector('footer');
      if (footer) footer.scrollIntoView({ behavior: 'instant', block: 'end' });
    })()`);
    await sleep(800);
    await captureScreenshot(path.join(ARTIFACT_DIR, 'footer_landscape_mobile_lower_390.png'));

    console.log('\n======================================================');
    console.log('✔ ALL FOOTER LANDSCAPE BACKGROUND AUDITS PASSED!');
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
